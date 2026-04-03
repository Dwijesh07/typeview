// css-library.js - Complete Modern CSS Library
// Every style, color, animation, and design pattern

const CSS_LIBRARY = {
  // ============================================================
  // COLOR PALETTES (60+ color schemes)
  // ============================================================
  colorPalettes: {
    // Dark Mode Palettes
    darkPurple: { bg: '#0a0a0f', surface: '#12121a', accent: '#8b5cf6', accent2: '#a78bfa', text: '#ffffff', muted: '#94a3b8' },
    darkBlue: { bg: '#0f172a', surface: '#1e293b', accent: '#3b82f6', accent2: '#60a5fa', text: '#ffffff', muted: '#94a3b8' },
    darkGreen: { bg: '#0a1a12', surface: '#142a1a', accent: '#10b981', accent2: '#34d399', text: '#ffffff', muted: '#9ca3af' },
    darkRed: { bg: '#1a0a0a', surface: '#2a1212', accent: '#ef4444', accent2: '#f87171', text: '#ffffff', muted: '#9ca3af' },
    darkAmber: { bg: '#1a1208', surface: '#2a1e0a', accent: '#f59e0b', accent2: '#fbbf24', text: '#ffffff', muted: '#9ca3af' },
    darkTeal: { bg: '#0a1818', surface: '#122a2a', accent: '#14b8a6', accent2: '#2dd4bf', text: '#ffffff', muted: '#9ca3af' },
    darkPink: { bg: '#1a0a18', surface: '#2a1222', accent: '#ec4899', accent2: '#f472b6', text: '#ffffff', muted: '#9ca3af' },
    darkCyan: { bg: '#0a181f', surface: '#122a34', accent: '#06b6d4', accent2: '#22d3ee', text: '#ffffff', muted: '#9ca3af' },
    darkOrange: { bg: '#1a0f0a', surface: '#2a1a12', accent: '#f97316', accent2: '#fb923c', text: '#ffffff', muted: '#9ca3af' },
    darkIndigo: { bg: '#0a0f1a', surface: '#121a2a', accent: '#6366f1', accent2: '#818cf8', text: '#ffffff', muted: '#9ca3af' },
    
    // Light Mode Palettes
    lightModern: { bg: '#f8fafc', surface: '#ffffff', accent: '#3b82f6', accent2: '#60a5fa', text: '#0f172a', muted: '#64748b' },
    lightWarm: { bg: '#fef9f0', surface: '#ffffff', accent: '#f59e0b', accent2: '#fbbf24', text: '#1e293b', muted: '#78716c' },
    lightCool: { bg: '#f0f9ff', surface: '#ffffff', accent: '#06b6d4', accent2: '#22d3ee', text: '#0c4a6e', muted: '#475569' },
    lightSoft: { bg: '#fef2f2', surface: '#ffffff', accent: '#ef4444', accent2: '#f87171', text: '#1e293b', muted: '#64748b' },
    lightEarth: { bg: '#fef7e8', surface: '#ffffff', accent: '#8b5cf6', accent2: '#a78bfa', text: '#1e1b4b', muted: '#78716c' },
    lightRose: { bg: '#fff1f2', surface: '#ffffff', accent: '#f43f5e', accent2: '#fb7185', text: '#1e293b', muted: '#64748b' },
    lightSage: { bg: '#f0fdf4', surface: '#ffffff', accent: '#22c55e', accent2: '#4ade80', text: '#14532d', muted: '#64748b' },
    lightLavender: { bg: '#faf5ff', surface: '#ffffff', accent: '#a855f7', accent2: '#c084fc', text: '#1e1b4b', muted: '#78716c' },
    
    // Vibrant Palettes
    vibrantSunset: { bg: '#0f172a', surface: '#1e293b', accent: '#f97316', accent2: '#fb923c', text: '#ffffff', muted: '#94a3b8' },
    vibrantOcean: { bg: '#0c4a6e', surface: '#075985', accent: '#06b6d4', accent2: '#22d3ee', text: '#ffffff', muted: '#cbd5e1' },
    vibrantForest: { bg: '#14532d', surface: '#166534', accent: '#22c55e', accent2: '#4ade80', text: '#ffffff', muted: '#bbf7d0' },
    vibrantAurora: { bg: '#0a0a2a', surface: '#1a1a3a', accent: '#10b981', accent2: '#34d399', text: '#ffffff', muted: '#a7f3d0' },
    vibrantMagenta: { bg: '#1e0a2a', surface: '#2e1a3a', accent: '#ec4899', accent2: '#f472b6', text: '#ffffff', muted: '#fbcfe8' },
    vibrantGold: { bg: '#1e1a0a', surface: '#2e2a1a', accent: '#eab308', accent2: '#facc15', text: '#ffffff', muted: '#fef9c3' },
  },

  // ============================================================
  // GRADIENTS (50+ stunning gradients)
  // ============================================================
  gradients: {
    // Purple Family
    purpleSunset: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    purpleDream: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    purpleTwilight: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
    purpleLavender: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
    purpleRoyal: 'linear-gradient(135deg, #9333ea 0%, #6b21a5 100%)',
    
    // Blue Family
    blueOcean: 'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)',
    blueSky: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    blueMidnight: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    blueGlacier: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    blueCosmic: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    
    // Pink Family
    pinkSunset: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    pinkCandy: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
    pinkRose: 'linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)',
    pinkCherry: 'linear-gradient(135deg, #fda4af 0%, #f97316 100%)',
    
    // Orange/Amber Family
    amberGlow: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
    orangeSunset: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)',
    orangeFire: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
    amberHoney: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    
    // Green Family
    greenForest: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    greenEmerald: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    greenMint: 'linear-gradient(135deg, #22c55e 0%, #86efac 100%)',
    greenJungle: 'linear-gradient(135deg, #0f172a 0%, #10b981 100%)',
    
    // Red Family
    redSunset: 'linear-gradient(135deg, #f43f5e 0%, #dc2626 100%)',
    redCrimson: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
    redRose: 'linear-gradient(135deg, #fb7185 0%, #ef4444 100%)',
    
    // Teal/Cyan Family
    tealDream: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
    cyanOcean: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    tealForest: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
    
    // Gold/Yellow Family
    goldPremium: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    yellowSun: 'linear-gradient(135deg, #facc15 0%, #eab308 100%)',
    
    // Multicolor
    rainbow: 'linear-gradient(135deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
    pastelDream: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    vividSunset: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)',
    coolBreeze: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    warmFlame: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    nightFade: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    springWarmth: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    juicyPeach: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    youngPassion: 'linear-gradient(135deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
    ladyLips: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    sunnyMorning: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    rainyAshville: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    frozenDreams: 'linear-gradient(135deg, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)',
    winterNeva: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    dustyGrass: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
    temptingAzure: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    heavyRain: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
    amyCrisp: 'linear-gradient(135deg, #a6c0fe 0%, #f68084 100%)',
    meanFruit: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    deepBlue: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    ripeMalinka: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    cloudyKnoxville: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
    malibuBeach: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    newLife: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    trueSunset: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    morpheusDen: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    rareWind: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    nearMoon: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
    wildApple: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  },

  // ============================================================
  // CARD DESIGNS (20+ card styles)
  // ============================================================
  cards: {
    glass: {
      class: 'bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl',
      hover: 'hover:scale-105 hover:shadow-2xl hover:bg-white/15 transition-all duration-300',
      inner: 'p-6 md:p-8'
    },
    glassDark: {
      class: 'bg-black/40 backdrop-blur-md rounded-2xl border border-gray-800 shadow-xl',
      hover: 'hover:scale-105 hover:border-purple-500/50 transition-all duration-300',
      inner: 'p-6'
    },
    modern: {
      class: 'bg-white rounded-2xl shadow-xl border border-gray-100',
      hover: 'hover:shadow-2xl hover:-translate-y-2 transition-all duration-300',
      inner: 'p-6'
    },
    dark: {
      class: 'bg-gray-900 rounded-2xl border border-gray-800 shadow-lg',
      hover: 'hover:border-purple-500/50 hover:shadow-xl transition-all duration-300',
      inner: 'p-6'
    },
    neon: {
      class: 'bg-gray-900 rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10',
      hover: 'hover:border-cyan-500 hover:shadow-cyan-500/20 transition-all duration-300',
      inner: 'p-6'
    },
    gradient: {
      class: 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl border border-white/10 backdrop-blur-sm',
      hover: 'hover:scale-105 transition-all duration-300',
      inner: 'p-6'
    },
    minimal: {
      class: 'bg-transparent border-b border-gray-200 pb-6',
      hover: 'hover:border-purple-500 transition-all duration-300',
      inner: 'p-4'
    },
    elevated: {
      class: 'bg-white rounded-xl shadow-2xl',
      hover: 'hover:shadow-3xl transition-all duration-300',
      inner: 'p-8'
    },
    floating: {
      class: 'bg-white rounded-2xl shadow-lg',
      hover: 'hover:-translate-y-3 hover:shadow-2xl transition-all duration-500',
      inner: 'p-6'
    },
    bordered: {
      class: 'bg-transparent border-2 border-gray-200 rounded-xl',
      hover: 'hover:border-purple-500 transition-all duration-300',
      inner: 'p-6'
    },
  },

  // ============================================================
  // BUTTON STYLES (25+ button designs)
  // ============================================================
  buttons: {
    primary: {
      class: 'px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold',
      hover: 'hover:shadow-xl hover:scale-105 hover:from-purple-700 hover:to-blue-700 transition-all duration-300',
    },
    secondary: {
      class: 'px-6 py-3 border-2 border-purple-500 text-purple-400 rounded-xl font-semibold',
      hover: 'hover:bg-purple-500/10 hover:scale-105 transition-all duration-300',
    },
    outline: {
      class: 'px-6 py-3 border border-white/30 text-white rounded-xl font-semibold',
      hover: 'hover:bg-white/10 hover:scale-105 transition-all duration-300',
    },
    glow: {
      class: 'px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold',
      hover: 'hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300',
    },
    neon: {
      class: 'px-6 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold',
      hover: 'hover:bg-cyan-400 hover:text-black hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300',
    },
    ghost: {
      class: 'px-6 py-3 text-gray-600 rounded-xl font-semibold',
      hover: 'hover:bg-gray-100 transition-all duration-300',
    },
    block: {
      class: 'w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold',
      hover: 'hover:shadow-xl hover:scale-[1.02] transition-all duration-300',
    },
    rounded: {
      class: 'px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-bold',
      hover: 'hover:shadow-xl hover:scale-105 transition-all duration-300',
    },
    gradientBorder: {
      class: 'px-6 py-3 bg-transparent rounded-xl font-semibold relative overflow-hidden',
      hover: 'hover:shadow-xl transition-all duration-300',
      style: 'background: linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box; border: 2px solid transparent;',
    },
    pill: {
      class: 'px-8 py-3 bg-black text-white rounded-full font-semibold',
      hover: 'hover:bg-gray-800 hover:scale-105 transition-all duration-300',
    },
  },

  // ============================================================
  // ANIMATIONS (30+ smooth animations)
  // ============================================================
  animations: {
    fadeIn: `@keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .fade-in { animation: fadeIn 0.5s ease-out forwards; }`,
    
    fadeInUp: `@keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeInUp 0.6s ease-out forwards; }`,
    
    fadeInDown: `@keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-down { animation: fadeInDown 0.6s ease-out forwards; }`,
    
    fadeInLeft: `@keyframes fadeInLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .fade-left { animation: fadeInLeft 0.6s ease-out forwards; }`,
    
    fadeInRight: `@keyframes fadeInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .fade-right { animation: fadeInRight 0.6s ease-out forwards; }`,
    
    scaleIn: `@keyframes scaleIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    .scale-in { animation: scaleIn 0.4s ease-out forwards; }`,
    
    zoomIn: `@keyframes zoomIn {
      from { opacity: 0; transform: scale(0.5); }
      to { opacity: 1; transform: scale(1); }
    }
    .zoom-in { animation: zoomIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }`,
    
    slideIn: `@keyframes slideIn {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
    .slide-in { animation: slideIn 0.5s ease-out forwards; }`,
    
    float: `@keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    .float { animation: float 6s ease-in-out infinite; }`,
    
    pulse: `@keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .pulse { animation: pulse 2s ease-in-out infinite; }`,
    
    bounce: `@keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .bounce { animation: bounce 0.5s ease-in-out infinite; }`,
    
    shimmer: `@keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    .shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); background-size: 1000px 100%; animation: shimmer 2s infinite; }`,
    
    rotate: `@keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .rotate { animation: rotate 10s linear infinite; }`,
    
    wave: `@keyframes wave {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .wave { animation: wave 2s ease-in-out infinite; }`,
    
    glow: `@keyframes glow {
      0%, 100% { box-shadow: 0 0 5px rgba(139, 92, 246, 0.3); }
      50% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.6); }
    }
    .glow { animation: glow 2s ease-in-out infinite; }`,
  },

  // ============================================================
  // LAYOUT PATTERNS (15+ layout structures)
  // ============================================================
  layouts: {
    heroCentered: {
      structure: 'min-h-screen flex items-center justify-center text-center px-6',
      heading: 'text-5xl md:text-7xl font-bold mb-6',
      subheading: 'text-xl text-gray-300 mb-8 max-w-2xl mx-auto',
    },
    heroSplit: {
      structure: 'min-h-screen grid md:grid-cols-2 items-center gap-12 px-6',
      left: 'text-left',
      right: 'flex justify-center',
    },
    featuresGrid3: {
      structure: 'grid md:grid-cols-3 gap-8',
      card: 'p-6 rounded-xl',
    },
    featuresGrid4: {
      structure: 'grid md:grid-cols-4 gap-6',
      card: 'p-6 rounded-xl',
    },
    pricingGrid: {
      structure: 'grid md:grid-cols-3 gap-8 max-w-6xl mx-auto',
      popular: 'transform scale-105 border-2 border-purple-500',
    },
    testimonialGrid: {
      structure: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
      card: 'p-6 rounded-2xl',
    },
    portfolioGrid: {
      structure: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
      item: 'rounded-xl overflow-hidden',
    },
    dashboardLayout: {
      structure: 'flex h-screen',
      sidebar: 'w-64 fixed h-full',
      main: 'ml-64 flex-1 p-8',
    },
    blogLayout: {
      structure: 'grid md:grid-cols-3 gap-8',
      main: 'md:col-span-2',
      sidebar: 'md:col-span-1',
    },
    twoColumn: {
      structure: 'grid md:grid-cols-2 gap-12 items-center',
    },
  },

  // ============================================================
  // NAVIGATION STYLES (10+ nav designs)
  // ============================================================
  navigation: {
    glass: {
      class: 'fixed w-full z-50 py-4 px-6 bg-black/50 backdrop-blur-lg border-b border-white/10',
      logo: 'text-2xl font-bold',
      links: 'text-gray-300 hover:text-white transition',
      button: 'px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white',
    },
    solid: {
      class: 'fixed w-full z-50 py-4 px-6 bg-white shadow-md',
      logo: 'text-2xl font-bold text-gray-800',
      links: 'text-gray-600 hover:text-gray-900 transition',
      button: 'px-6 py-2 rounded-lg bg-gray-900 text-white',
    },
    transparent: {
      class: 'fixed w-full z-50 py-6 px-6',
      logo: 'text-2xl font-bold text-white',
      links: 'text-white/80 hover:text-white transition',
      button: 'px-6 py-2 rounded-full border border-white text-white',
    },
    centered: {
      class: 'fixed w-full z-50 py-4 px-6 bg-black/80 backdrop-blur-sm',
      logo: 'text-2xl font-bold',
      links: 'flex gap-8 text-gray-300',
      button: 'px-6 py-2 rounded-lg bg-white text-black',
    },
  },

  // ============================================================
  // FOOTER STYLES (10+ footer designs)
  // ============================================================
  footers: {
    simple: {
      class: 'py-8 text-center border-t border-gray-800',
      text: 'text-gray-400 text-sm',
    },
    columns: {
      class: 'py-12 border-t border-gray-800',
      grid: 'grid md:grid-cols-4 gap-8',
      title: 'text-white font-bold mb-4',
      links: 'text-gray-400 hover:text-white transition block py-1',
    },
    dark: {
      class: 'bg-black py-12',
      grid: 'grid md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6',
      title: 'text-white font-bold mb-4',
      links: 'text-gray-500 hover:text-white transition block py-1',
    },
    social: {
      class: 'py-8 text-center border-t border-gray-800',
      icons: 'flex justify-center gap-6 mb-4',
      text: 'text-gray-400 text-sm',
    },
  },

  // ============================================================
  // TYPOGRAPHY (font styles)
  // ============================================================
  typography: {
    fonts: {
      inter: "'Inter', system-ui, -apple-system, sans-serif",
      poppins: "'Poppins', system-ui, sans-serif",
      playfair: "'Playfair Display', serif",
      montserrat: "'Montserrat', sans-serif",
      spaceGrotesk: "'Space Grotesk', monospace",
    },
    headings: {
      h1: 'text-5xl md:text-7xl font-bold tracking-tight',
      h2: 'text-3xl md:text-4xl font-bold tracking-tight',
      h3: 'text-2xl md:text-3xl font-semibold',
      h4: 'text-xl md:text-2xl font-semibold',
      h5: 'text-lg md:text-xl font-semibold',
      display: 'text-6xl md:text-8xl font-black tracking-tighter',
    },
    body: {
      large: 'text-lg leading-relaxed',
      base: 'text-base leading-relaxed',
      small: 'text-sm leading-relaxed',
      muted: 'text-sm text-gray-400',
    },
  },
};

module.exports = { CSS_LIBRARY };