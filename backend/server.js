const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Import CSS Library
const { CSS_LIBRARY } = require('./css-library.js');

// NVIDIA NIM API configuration
const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
const NVIDIA_MODEL = 'mistralai/mistral-small-4-119b-2603';

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

// Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

// Email transporter
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
    if (!UNSPLASH_ACCESS_KEY) {
        console.log('⚠️ No Unsplash API key found. Using placeholders.');
        return [];
    }
    
    try {
        const url = `${UNSPLASH_API_URL}?query=${encodeURIComponent(searchTerm)}&per_page=${count}&orientation=landscape`;
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Unsplash API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        return data.results.map(img => ({
            url: img.urls.regular,
            thumb: img.urls.thumb,
            small: img.urls.small,
            credit: {
                name: img.user.name,
                link: img.links.html
            },
            description: img.alt_description || searchTerm
        }));
        
    } catch (error) {
        console.error('Unsplash API error:', error.message);
        return [];
    }
}

function detectImageSearchTerms(prompt) {
    const lower = prompt.toLowerCase();
    
    const termMap = {
        'coffee': ['coffee shop', 'cafe', 'coffee barista'],
        'restaurant': ['restaurant interior', 'food plating', 'dining'],
        'portfolio': ['workspace', 'desk', 'creative studio', 'developer', 'coder'],
        'saas': ['technology', 'dashboard', 'startup office'],
        'ecommerce': ['product photography', 'shopping', 'store'],
        'fashion': ['fashion model', 'clothing', 'studio'],
        'travel': ['travel destination', 'beach', 'mountain'],
        'food': ['food photography', 'dish', 'cuisine'],
        'tech': ['technology', 'coding', 'computer'],
        'fitness': ['gym', 'workout', 'fitness'],
        'beauty': ['makeup', 'skincare', 'beauty studio'],
        'education': ['classroom', 'student', 'library'],
        'health': ['wellness', 'healthcare', 'medical'],
        'real estate': ['modern house', 'interior design', 'property'],
        'automotive': ['car', 'luxury vehicle', 'automotive'],
        'event': ['event planning', 'wedding', 'celebration'],
        'nature': ['nature', 'landscape', 'forest'],
        'office': ['office', 'workspace', 'coworking'],
    };
    
    for (const [key, terms] of Object.entries(termMap)) {
        if (lower.includes(key)) {
            return terms[0];
        }
    }
    
    return 'business workspace';
}

// ========== SIMPLIFIED: Always accept prompts - NO AI CALLS ==========
async function isPromptClear(prompt) {
    // Always return clear - generate immediately for any prompt
    console.log(`✅ Prompt accepted: "${prompt}"`);
    return { 
        isClear: true, 
        missingDetails: [], 
        suggestedQuestions: [] 
    };
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
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`NVIDIA API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
}

function buildSystemPrompt(isEdit, currentCode) {
    const colorPalettesStr = Object.entries(CSS_LIBRARY.colorPalettes).slice(0, 10).map(([name, colors]) => 
        `- ${name}: accent: ${colors.accent}, bg: ${colors.bg}`
    ).join('\n');
    
    const gradientsStr = Object.keys(CSS_LIBRARY.gradients).slice(0, 15).map(g => 
        `- ${g}: ${CSS_LIBRARY.gradients[g]}`
    ).join('\n');
    
    const cardsStr = Object.entries(CSS_LIBRARY.cards).slice(0, 10).map(([name, card]) => 
        `- ${name}: class="${card.class}" hover="${card.hover}"`
    ).join('\n');
    
    const buttonsStr = Object.entries(CSS_LIBRARY.buttons).slice(0, 10).map(([name, btn]) => 
        `- ${name}: class="${btn.class}"`
    ).join('\n');
    
    const animationsStr = Object.keys(CSS_LIBRARY.animations).slice(0, 15).join(', ');
    
    const layoutsStr = Object.keys(CSS_LIBRARY.layouts).slice(0, 10).join(', ');
    
    const navsStr = Object.keys(CSS_LIBRARY.navigation).slice(0, 5).join(', ');
    
    const footersStr = Object.keys(CSS_LIBRARY.footers).slice(0, 5).join(', ');
    
    const typographyStr = `Fonts: ${Object.keys(CSS_LIBRARY.typography.fonts).join(', ')}. Headings: ${CSS_LIBRARY.typography.headings.h1}, ${CSS_LIBRARY.typography.headings.h2}`;

    const systemPrompt = `You are TypeView, a world-class UI designer and front-end engineer. You have access to a comprehensive CSS Library.

════════════════════════════════════════
CSS LIBRARY REFERENCE (USE THESE!)
════════════════════════════════════════

🎨 COLOR PALETTES (choose one based on industry):
${colorPalettesStr}

🌈 GRADIENTS (choose one for hero/backgrounds):
${gradientsStr}

💳 CARD STYLES (use these exact classes):
${cardsStr}

🔘 BUTTON STYLES (use these exact classes):
${buttonsStr}

✨ ANIMATIONS (add these classes for effects):
${animationsStr}

📐 LAYOUT PATTERNS:
${layoutsStr}

🧭 NAVIGATION STYLES:
${navsStr}

📌 FOOTER STYLES:
${footersStr}

✍️ TYPOGRAPHY:
${typographyStr}

════════════════════════════════════════
IMAGE HANDLING
════════════════════════════════════════
When using images, ALWAYS use the image URLs provided. If no URLs are provided, use gradient backgrounds with icons instead of fake image URLs.

For hero backgrounds use: class="absolute inset-0 w-full h-full object-cover opacity-20"
For card images use: class="w-full h-48 object-cover rounded-t-2xl"
For profile images use: class="w-12 h-12 rounded-full object-cover"

════════════════════════════════════════
YOUR TASK
════════════════════════════════════════
Create a COMPLETE, BEAUTIFUL, SINGLE HTML file based on the user's request.

CRITICAL RULES:
1. Use EXACT classes from the CSS Library above
2. Pick appropriate color palette based on the industry
3. Use gradients for hero sections
4. Use proper card styles for features/pricing
5. Add animations (fade-up, scale-in, float) for visual appeal
6. Make it FULLY RESPONSIVE
7. Add working JavaScript for all interactive elements
8. NO placeholder text — write REAL, SPECIFIC content
9. Include Font Awesome icons
10. Make all links open in new tab (target="_blank")

OUTPUT: <!DOCTYPE html> first. </html> last. Absolutely nothing else.`;

    if (isEdit && currentCode) {
        return `You are TypeView AI in EDIT MODE.

RULES:
- Return the COMPLETE updated HTML — not a snippet, not a diff.
- Preserve ALL existing styling and structure UNLESS the user asks to change them.
- Only change what the user explicitly requests.
- You can use the CSS Library classes for any new elements you add.
- Start with <!DOCTYPE html>, end with </html>. Nothing else.

CURRENT HTML:
${(currentCode || '').substring(0, 10000)}

EDIT REQUEST: `;
    }
    
    return systemPrompt;
}

// ========== WAITLIST ENDPOINTS ==========

app.post('/api/waitlist/join', async (req, res) => {
    try {
        const { email, name } = req.body;
        
        if (!email) {
            return res.status(400).json({ success: false, error: 'Email is required' });
        }
        
        const { data: existing, error: checkError } = await supabase
            .from('waitlist')
            .select('email')
            .eq('email', email)
            .single();
        
        if (existing) {
            return res.status(400).json({ 
                success: false, 
                error: 'Email already on waitlist!' 
            });
        }
        
        const { data, error } = await supabase
            .from('waitlist')
            .insert([{ email, name, source: 'typeview_website' }])
            .select();
        
        if (error) {
            throw error;
        }
        
        const userEmailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Inter', sans-serif; background: #f5f5f5; padding: 40px; }
                    .container { max-width: 500px; margin: 0 auto; background: white; border-radius: 24px; padding: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
                    .logo { font-size: 28px; font-weight: bold; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20px; }
                    h1 { color: #1a1a2e; margin-bottom: 16px; }
                    p { color: #4a5568; line-height: 1.6; margin-bottom: 16px; }
                    .highlight { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 4px 12px; border-radius: 20px; display: inline-block; font-size: 14px; }
                    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #718096; text-align: center; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo">⚡ TypeView</div>
                    <div class="highlight">🎉 You're on the list!</div>
                    <h1>Welcome to TypeView, ${name || 'Creator'}!</h1>
                    <p>We're thrilled to have you join our waitlist. You're now among the first to experience the future of AI-powered website building.</p>
                    <p><strong>What happens next?</strong><br>
                    • We'll notify you as soon as early access opens<br>
                    • You'll get exclusive beta features<br>
                    • Priority support when you join</p>
                    <p>In the meantime, check out our <a href="http://localhost:3000/templates.html" style="color: #667eea;">templates</a> and see what TypeView can do!</p>
                    <div class="footer">
                        <p>© 2024 TypeView. Built with AI for creators like you.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
        
        await transporter.sendMail({
            from: `"TypeView" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🎉 Welcome to TypeView Waitlist!',
            html: userEmailHtml
        });
        
        const { count } = await supabase
            .from('waitlist')
            .select('*', { count: 'exact', head: true });
        
        const adminEmailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: monospace; padding: 20px; }
                    .card { background: #f0f0f0; padding: 20px; border-radius: 12px; }
                    .email { color: #2563eb; font-weight: bold; }
                </style>
            </head>
            <body>
                <h2>✨ New Waitlist Signup!</h2>
                <div class="card">
                    <p><strong>Email:</strong> <span class="email">${email}</span></p>
                    <p><strong>Name:</strong> ${name || 'Not provided'}</p>
                    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                    <p><strong>Source:</strong> TypeView Website</p>
                </div>
                <p>Total waitlist count: <strong>${count}</strong></p>
            </body>
            </html>
        `;
        
        await transporter.sendMail({
            from: `"TypeView Waitlist" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `🔔 New Waitlist Signup: ${email}`,
            html: adminEmailHtml
        });
        
        res.json({ 
            success: true, 
            message: 'Thanks for joining the waitlist! Check your email for confirmation.' 
        });
        
    } catch (error) {
        console.error('Waitlist error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/waitlist/check', async (req, res) => {
    try {
        const { email } = req.body;
        
        const { data, error } = await supabase
            .from('waitlist')
            .select('email, created_at')
            .eq('email', email)
            .single();
        
        if (data) {
            res.json({ success: true, onWaitlist: true, joinedAt: data.created_at });
        } else {
            res.json({ success: true, onWaitlist: false });
        }
        
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/waitlist/stats', async (req, res) => {
    try {
        const { count, error } = await supabase
            .from('waitlist')
            .select('*', { count: 'exact', head: true });
        
        const { data: recent } = await supabase
            .from('waitlist')
            .select('email, name, created_at')
            .order('created_at', { ascending: false })
            .limit(10);
        
        res.json({ 
            success: true, 
            total: count,
            recent: recent
        });
        
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ========== MAIN GENERATION ENDPOINT ==========

app.post('/api/generate', async (req, res) => {
    try {
        const { prompt, currentCode, isEdit } = req.body;
        if (!prompt) return res.status(400).json({ success: false, error: 'prompt is required' });

        console.log('\n' + '='.repeat(60));
        console.log(isEdit ? '✏️  EDIT MODE' : '🆕 NEW BUILD');
        console.log(`📝 Prompt: "${prompt}"`);
        console.log(`🤖 Model: ${NVIDIA_MODEL}`);
        console.log(`📚 CSS Library: Loaded with ${Object.keys(CSS_LIBRARY).length} categories`);

        // SIMPLIFIED: Always accept prompt - generate immediately
        // No AI clarity check, no delays
        console.log(`✅ Generating website for: "${prompt}"`);

        let images = [];
        let userMessage = isEdit ? `Edit request: ${prompt}` : `Build this website: ${prompt}`;
        
        if (!isEdit) {
            const searchTerm = detectImageSearchTerms(prompt);
            console.log(`🖼️  Fetching images from Unsplash for: "${searchTerm}"`);
            images = await getUnsplashImages(searchTerm, 5);
            
            if (images.length > 0) {
                console.log(`✅ Found ${images.length} images from Unsplash`);
                userMessage += `\n\n📸 REAL IMAGES FROM UNSPLASH (use these exact URLs):\n`;
                images.forEach((img, i) => {
                    userMessage += `\nImage ${i + 1}: ${img.url}\n   (Photo by ${img.credit.name} on Unsplash)`;
                });
                userMessage += `\n\nFor hero section, use the FIRST image as background with opacity 20%.\nFor cards, use the other images.\nAdd small credits like: "Photo by [name] on Unsplash" in a tiny caption.`;
            } else {
                console.log(`⚠️ No Unsplash images found, using gradient backgrounds`);
                userMessage += `\n\nNo real images available. Use gradient backgrounds with Font Awesome icons instead.`;
            }
        }

        const systemPrompt = buildSystemPrompt(isEdit, currentCode);
        
        const messages = isEdit && currentCode
            ? [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
              ]
            : [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
              ];

        const raw = await callNvidiaAPI(messages, 8000);
        let html = extractHTML(raw);

        html = html.replace(/<a\s+href=(["'])(.*?)\1/gi, '<a href=$1$2$1 target="_blank" rel="noopener noreferrer"');

        if (!html.includes('tailwindcss')) {
            html = html.replace('<head>', `<head>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">`);
        }

        console.log(`✅ Generated ${html.length} chars`);
        res.json({ success: true, html, isEdit: isEdit || false });

    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║  🚀 TypeView Server Running (NVIDIA NIM + CSS Library)       ║
║  📡 http://localhost:${PORT}                                   ║
║  🤖 Model: ${NVIDIA_MODEL}                                     ║
║  🖼️  Unsplash: ${UNSPLASH_ACCESS_KEY ? '✅ Enabled' : '❌ Disabled (add key to .env)'} ║
║  📚 CSS Library: Loaded!                                     ║
║  ✉️  Waitlist: ${process.env.SUPABASE_URL ? '✅ Enabled' : '❌ Disabled'}               ║
║  🔍 Prompt clarification: ❌ DISABLED - All prompts accepted  ║
║     - ${Object.keys(CSS_LIBRARY.colorPalettes).length} Color Palettes      ║
║     - ${Object.keys(CSS_LIBRARY.gradients).length} Gradients               ║
║     - ${Object.keys(CSS_LIBRARY.cards).length} Card Styles                ║
║     - ${Object.keys(CSS_LIBRARY.buttons).length} Button Styles             ║
║     - ${Object.keys(CSS_LIBRARY.animations).length} Animations             ║
╚══════════════════════════════════════════════════════════════╝
    `);
});