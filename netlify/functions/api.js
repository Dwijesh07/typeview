const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

// Import CSS Library
const { CSS_LIBRARY } = require('../../backend/css-library.js');

// Environment variables (set in Netlify dashboard)
const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
const NVIDIA_MODEL = 'mistralai/mistral-small-4-119b-2603';

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

function extractHTML(raw) {
    const fenced = raw.match(/```html\s*([\s\S]*?)```/i);
    if (fenced) return fenced[1].trim();
    const bare = raw.match(/```([\s\S]*?)```/);
    if (bare) return bare[1].trim();
    const idx = raw.search(/<(!DOCTYPE|html)/i);
    if (idx !== -1) return raw.slice(idx).trim();
    return raw.trim();
}

async function getUnsplashImages(searchTerm, count = 5) {
    if (!UNSPLASH_ACCESS_KEY) return [];
    
    try {
        const url = `${UNSPLASH_API_URL}?query=${encodeURIComponent(searchTerm)}&per_page=${count}&orientation=landscape`;
        const response = await fetch(url, {
            headers: { 'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}` }
        });
        if (!response.ok) throw new Error(`Unsplash API error: ${response.status}`);
        const data = await response.json();
        return data.results.map(img => ({
            url: img.urls.regular,
            thumb: img.urls.thumb,
            credit: { name: img.user.name, link: img.links.html }
        }));
    } catch (error) {
        return [];
    }
}

function detectImageSearchTerms(prompt) {
    const lower = prompt.toLowerCase();
    const termMap = {
        'coffee': 'coffee shop', 'restaurant': 'restaurant interior',
        'portfolio': 'creative studio', 'saas': 'startup office',
        'ecommerce': 'product photography', 'fashion': 'clothing store',
        'tech': 'technology', 'education': 'classroom',
        'health': 'wellness', 'real estate': 'modern house',
        'automotive': 'car dealership', 'nature': 'nature landscape'
    };
    for (const [key, term] of Object.entries(termMap)) {
        if (lower.includes(key)) return term;
    }
    return 'business workspace';
}

async function callNvidiaAPI(messages, maxTokens = 8000) {
    const payload = {
        model: NVIDIA_MODEL,
        messages: messages,
        max_tokens: maxTokens,
        temperature: 0.3,
        top_p: 1.0,
        stream: false
    };
    const response = await fetch(NVIDIA_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${NVIDIA_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`NVIDIA API error: ${response.status}`);
    const data = await response.json();
    return data.choices[0]?.message?.content || '';
}

function buildSystemPrompt(isEdit, currentCode) {
    const colorPalettesStr = Object.entries(CSS_LIBRARY.colorPalettes).slice(0, 5).map(([name, colors]) => 
        `- ${name}: accent: ${colors.accent}`
    ).join('\n');
    
    const systemPrompt = `You are TypeView, a world-class UI designer and front-end engineer.

CSS LIBRARY REFERENCE:
${colorPalettesStr}

Create a COMPLETE, BEAUTIFUL, SINGLE HTML file based on the user's request.

RULES:
1. Use Tailwind CSS CDN for styling
2. Use Font Awesome icons
3. Make it FULLY RESPONSIVE
4. Add working JavaScript for all interactive elements
5. NO placeholder text — write REAL, SPECIFIC content
6. Make all links open in new tab

OUTPUT: <!DOCTYPE html> first. </html> last. Absolutely nothing else.`;

    return systemPrompt;
}

// Main handler for all API routes
exports.handler = async (event, context) => {
    const path = event.path.replace('/.netlify/functions/api', '');
    
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };
    
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }
    
    // ========== GENERATE ENDPOINT ==========
    if (path === '/generate' && event.httpMethod === 'POST') {
        try {
            const { prompt, currentCode, isEdit } = JSON.parse(event.body);
            
            console.log(`📝 Prompt: "${prompt}"`);
            
            let images = [];
            let userMessage = isEdit ? `Edit request: ${prompt}` : `Build this website: ${prompt}`;
            
            if (!isEdit) {
                const searchTerm = detectImageSearchTerms(prompt);
                images = await getUnsplashImages(searchTerm, 3);
                if (images.length > 0) {
                    userMessage += `\n\n📸 IMAGES FROM UNSPLASH:\n`;
                    images.forEach((img, i) => {
                        userMessage += `\nImage ${i + 1}: ${img.url}`;
                    });
                }
            }
            
            const systemPrompt = buildSystemPrompt(isEdit, currentCode);
            const messages = [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ];
            
            const raw = await callNvidiaAPI(messages, 6000);
            let html = extractHTML(raw);
            
            html = html.replace(/<a\s+href=(["'])(.*?)\1/gi, '<a href=$1$2$1 target="_blank" rel="noopener noreferrer"');
            
            if (!html.includes('tailwindcss')) {
                html = html.replace('<head>', `<head>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">`);
            }
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true, html, isEdit: isEdit || false })
            };
            
        } catch (error) {
            console.error('Error:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ success: false, error: error.message })
            };
        }
    }
    
    // ========== WAITLIST JOIN ENDPOINT ==========
    if (path === '/waitlist/join' && event.httpMethod === 'POST') {
        try {
            const { email, name } = JSON.parse(event.body);
            
            if (!email) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ success: false, error: 'Email is required' })
                };
            }
            
            const { data: existing } = await supabase
                .from('waitlist')
                .select('email')
                .eq('email', email)
                .single();
            
            if (existing) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ success: false, error: 'Email already on waitlist!' })
                };
            }
            
            await supabase
                .from('waitlist')
                .insert([{ email, name, source: 'typeview_website' }]);
            
            // Send email (optional - may fail on free tier)
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                try {
                    await transporter.sendMail({
                        from: `"TypeView" <${process.env.EMAIL_USER}>`,
                        to: email,
                        subject: '🎉 Welcome to TypeView Waitlist!',
                        html: `<h1>Welcome to TypeView!</h1><p>Thanks for joining the waitlist!</p>`
                    });
                } catch (emailError) {
                    console.log('Email not sent:', emailError.message);
                }
            }
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true, message: 'Joined waitlist!' })
            };
            
        } catch (error) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ success: false, error: error.message })
            };
        }
    }
    
    // ========== WAITLIST CHECK ENDPOINT ==========
    if (path === '/waitlist/check' && event.httpMethod === 'POST') {
        try {
            const { email } = JSON.parse(event.body);
            const { data } = await supabase
                .from('waitlist')
                .select('email, created_at')
                .eq('email', email)
                .single();
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true, onWaitlist: !!data })
            };
        } catch (error) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true, onWaitlist: false })
            };
        }
    }
    
    // 404 for unknown routes
    return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Not found' })
    };
};