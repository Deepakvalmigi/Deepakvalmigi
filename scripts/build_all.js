const fs = require('fs');
const path = require('path');

// Load optimized base64 assets
const imgBadge = fs.readFileSync('assets/portrait_badge_opt.jpg').toString('base64');
const imgWaving = fs.readFileSync('assets/character_waving_opt.jpg').toString('base64');
const imgPointing = fs.readFileSync('assets/character_pointing_opt.jpg').toString('base64');

// Brand Icons SVGs (24x24 paths)
const ICONS = {
  github: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  linkedin: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  gmail: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  react: 'M12 9c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 4.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm10.5-2.5c0-1.5-2.5-3.5-6-4.5 1.5-2 2-4 1.5-5-.5-1-2.5-1-5 .5-1.5-2-3.5-3-5-3s-3.5 1-5 3c-2.5-1.5-4.5-1.5-5-.5-.5 1 0 3 1.5 5-3.5 1-6 3-6 4.5s2.5 3.5 6 4.5c-1.5 2-2 4-1.5 5 .5 1 2.5 1 5-.5 1.5 2 3.5 3 5 3s3.5-1 5-3c2.5 1.5 4.5 1.5 5 .5.5-1 0-3-1.5-5 3.5-1 6-3 6-4.5z',
  nextjs: 'M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.83 17.5l-6.5-8.4v8.4H9.5V6.5h1.83l6.5 8.4V6.5h1.83v11h-1.83z',
  typescript: 'M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.53 0-.96.083-1.289.248-.33.166-.495.427-.495.784 0 .232.06.43.18.595.12.165.3.3.541.407.24.107.545.207.915.3l.79.204c.82.204 1.488.487 2.003.848.514.362.772.909.772 1.642 0 .553-.14 1.033-.42 1.442a3.7 3.7 0 0 1-1.168 1.05c-.499.277-1.11.416-1.834.416-.763 0-1.492-.083-2.187-.25a9.387 9.387 0 0 1-1.653-.612v-2.616c.642.39 1.25.68 1.824.87.574.19 1.12.285 1.64.285.508 0 .918-.088 1.23-.264.312-.176.468-.45.468-.823 0-.312-.108-.567-.323-.765a3.86 3.86 0 0 0-1.047-.565l-.89-.253c-.76-.214-1.378-.507-1.853-.88-.475-.372-.713-.912-.713-1.62 0-.58.146-1.08.438-1.5.292-.42.715-.745 1.27-.975.556-.23 1.228-.345 2.016-.345zM3.445 9.945h8.84v2.336H9.72v8.528H6.965v-8.528H3.445z',
  nodejs: 'M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm8.3 16.8L12 21.6 3.7 16.8V7.2L12 2.4l8.3 4.8v9.6z',
  flutter: 'M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zm.086 11.23L7.7 18 14.4 24h7.3l-6.7-6 6.7-6.77h-7.3z',
  openai: 'M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.509-2.9A6.065 6.065 0 0 0 4.981 4.18a5.984 5.984 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494z',
  tailwind: 'M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z'
};

// ==========================================
// 1. HERO.SVG
// ==========================================
function buildHero() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 360" width="100%" height="100%">
  <defs>
    <linearGradient id="hero-card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0b12" />
      <stop offset="50%" stop-color="#0d0e16" />
      <stop offset="100%" stop-color="#090a10" />
    </linearGradient>

    <linearGradient id="hero-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.8" />
      <stop offset="45%" stop-color="#a78bfa" stop-opacity="0.7" />
      <stop offset="80%" stop-color="#f472b6" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0.4" />
    </linearGradient>

    <linearGradient id="hero-name-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="48%" stop-color="#a78bfa" />
      <stop offset="100%" stop-color="#f472b6" />
    </linearGradient>

    <linearGradient id="hero-aurora-ramp" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="50%" stop-color="#a78bfa" />
      <stop offset="100%" stop-color="#f472b6" />
    </linearGradient>

    <pattern id="hero-dot-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#334155" fill-opacity="0.3" />
    </pattern>

    <filter id="hero-glow-soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <clipPath id="hero-name-mask">
      <rect x="0" y="80" width="600" height="90">
        <animate attributeName="height" from="0" to="90" dur="1s" fill="freeze" begin="0s" keyTimes="0;1" values="0;90" />
        <animate attributeName="y" from="170" to="80" dur="1s" fill="freeze" begin="0s" keyTimes="0;1" values="170;80" />
      </rect>
    </clipPath>

    <clipPath id="hero-vf-clip">
      <rect x="590" y="35" width="310" height="290" rx="16" />
    </clipPath>

    <radialGradient id="hero-edge-melt-grad" cx="50%" cy="50%" r="50%">
      <stop offset="70%" stop-color="#ffffff" stop-opacity="1" />
      <stop offset="92%" stop-color="#ffffff" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <mask id="hero-edge-mask">
      <rect x="590" y="35" width="310" height="290" rx="16" fill="url(#hero-edge-melt-grad)" />
    </mask>
  </defs>

  <style>
    .hero-font {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    .hero-mono {
      font-family: 'SF Mono', 'Fira Code', 'Roboto Mono', Consolas, monospace;
    }
    @keyframes heroBlink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .hero-cursor {
      animation: heroBlink 1s infinite;
    }
    @keyframes heroPulse {
      0% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(2.2); opacity: 0; }
      100% { transform: scale(1); opacity: 0; }
    }
    .hero-pulse-ring {
      animation: heroPulse 2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
      transform-origin: 64px 54px;
    }
  </style>

  <rect x="10" y="10" width="920" height="340" rx="20" fill="url(#hero-card-bg)" stroke="url(#hero-border-grad)" stroke-width="1.5" />
  <rect x="10" y="10" width="920" height="340" rx="20" fill="url(#hero-dot-pattern)" />

  <circle cx="160" cy="140" r="140" fill="#22d3ee" fill-opacity="0.08" filter="url(#hero-glow-soft)" />
  <circle cx="480" cy="200" r="160" fill="#a78bfa" fill-opacity="0.06" filter="url(#hero-glow-soft)" />
  <circle cx="750" cy="180" r="140" fill="#f472b6" fill-opacity="0.08" filter="url(#hero-glow-soft)" />

  <!-- Status Pill -->
  <g transform="translate(45, 40)">
    <rect x="0" y="0" width="180" height="28" rx="14" fill="#121526" stroke="#22d3ee" stroke-opacity="0.4" stroke-width="1" />
    <circle cx="18" cy="14" r="7" fill="#10b981" fill-opacity="0.25" class="hero-pulse-ring" />
    <circle cx="18" cy="14" r="4" fill="#10b981" />
    <text x="32" y="18" class="hero-mono" font-size="10.5" font-weight="700" fill="#22d3ee" letter-spacing="1.2">OPEN TO COLLABS</text>
  </g>

  <!-- Greeting -->
  <g transform="translate(45, 100)">
    <text x="0" y="0" class="hero-font" font-size="18" font-weight="500" fill="#94a3b8" letter-spacing="1">Hi there, I'm</text>
    <line x1="108" y1="-15" x2="108" y2="4" stroke="#22d3ee" stroke-width="2.5" class="hero-cursor" stroke-linecap="round" />
  </g>

  <!-- Name -->
  <g clip-path="url(#hero-name-mask)">
    <text x="45" y="156" class="hero-font" font-size="52" font-weight="900" fill="url(#hero-name-grad)" letter-spacing="2">DEEPAK</text>
    <text x="270" y="156" class="hero-font" font-size="52" font-weight="300" fill="#ffffff" fill-opacity="0.9" letter-spacing="1">VALMIGI</text>
  </g>

  <!-- Cycling Role Lines -->
  <g transform="translate(45, 192)">
    <g opacity="1">
      <animate attributeName="opacity" dur="12s" repeatCount="indefinite"
        values="1;1;0;0;0;0;0;0;0;0;0;1"
        keyTimes="0;0.22;0.26;0.27;0.50;0.52;0.74;0.76;0.96;0.98;0.99;1" />
      <animateTransform attributeName="transform" type="translate" dur="12s" repeatCount="indefinite"
        values="0,0; 0,0; 0,-8; 0,-8; 0,8; 0,8; 0,8; 0,8; 0,8; 0,8; 0,8; 0,0"
        keyTimes="0;0.22;0.26;0.27;0.50;0.52;0.74;0.76;0.96;0.98;0.99;1" />
      <circle cx="6" cy="-5" r="3" fill="#22d3ee" />
      <text x="18" y="0" class="hero-font" font-size="16" font-weight="700" fill="#e2e8f0" letter-spacing="0.5">Founder @ VersalFlow</text>
    </g>

    <g opacity="0">
      <animate attributeName="opacity" dur="12s" repeatCount="indefinite"
        values="0;0;1;1;0;0;0;0;0;0;0;0"
        keyTimes="0;0.24;0.27;0.48;0.52;0.53;0.74;0.76;0.96;0.98;0.99;1" />
      <animateTransform attributeName="transform" type="translate" dur="12s" repeatCount="indefinite"
        values="0,8; 0,8; 0,0; 0,0; 0,-8; 0,-8; 0,8; 0,8; 0,8; 0,8; 0,8; 0,8"
        keyTimes="0;0.24;0.27;0.48;0.52;0.53;0.74;0.76;0.96;0.98;0.99;1" />
      <circle cx="6" cy="-5" r="3" fill="#a78bfa" />
      <text x="18" y="0" class="hero-font" font-size="16" font-weight="700" fill="#e2e8f0" letter-spacing="0.5">Principal Product Architect</text>
    </g>

    <g opacity="0">
      <animate attributeName="opacity" dur="12s" repeatCount="indefinite"
        values="0;0;0;0;1;1;0;0;0;0;0;0"
        keyTimes="0;0.48;0.50;0.51;0.54;0.73;0.77;0.78;0.96;0.98;0.99;1" />
      <animateTransform attributeName="transform" type="translate" dur="12s" repeatCount="indefinite"
        values="0,8; 0,8; 0,8; 0,8; 0,0; 0,0; 0,-8; 0,-8; 0,8; 0,8; 0,8; 0,8"
        keyTimes="0;0.48;0.50;0.51;0.54;0.73;0.77;0.78;0.96;0.98;0.99;1" />
      <circle cx="6" cy="-5" r="3" fill="#f472b6" />
      <text x="18" y="0" class="hero-font" font-size="16" font-weight="700" fill="#e2e8f0" letter-spacing="0.5">AI Business Automation Builder</text>
    </g>

    <g opacity="0">
      <animate attributeName="opacity" dur="12s" repeatCount="indefinite"
        values="0;0;0;0;0;0;1;1;0;0;0;0"
        keyTimes="0;0.72;0.74;0.75;0.76;0.78;0.80;0.96;0.99;0.995;0.998;1" />
      <animateTransform attributeName="transform" type="translate" dur="12s" repeatCount="indefinite"
        values="0,8; 0,8; 0,8; 0,8; 0,8; 0,8; 0,0; 0,0; 0,-8; 0,-8; 0,8; 0,8"
        keyTimes="0;0.72;0.74;0.75;0.76;0.78;0.80;0.96;0.99;0.995;0.998;1" />
      <circle cx="6" cy="-5" r="3" fill="#38bdf8" />
      <text x="18" y="0" class="hero-font" font-size="16" font-weight="700" fill="#e2e8f0" letter-spacing="0.5">Enterprise Software Innovator</text>
    </g>
  </g>

  <!-- Pitch -->
  <text x="45" y="235" class="hero-font" font-size="13.5" font-weight="400" fill="#94a3b8">
    Architecting autonomous business ecosystems, scalable backends &amp; real-time SaaS.
  </text>

  <!-- Meta Row -->
  <g transform="translate(45, 275)">
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="132" height="26" rx="13" fill="#121524" stroke="#1e293b" stroke-width="1" />
      <path d="M12 7c-2.2 0-4 1.8-4 4 0 3 4 7 4 7s4-4 4-7c0-2.2-1.8-4-4-4zm0 5.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" fill="#22d3ee" transform="translate(4, 0) scale(0.9)" />
      <text x="24" y="16.5" class="hero-font" font-size="11" font-weight="600" fill="#cbd5e1">Bengaluru, IN</text>
    </g>

    <g transform="translate(142, 0)">
      <rect x="0" y="0" width="112" height="26" rx="13" fill="#121524" stroke="#1e293b" stroke-width="1" />
      <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M2 21h16M9 7h2M9 11h2M9 15h2" stroke="#a78bfa" stroke-width="1.6" fill="none" stroke-linecap="round" transform="translate(6, 1) scale(0.85)" />
      <text x="26" y="16.5" class="hero-font" font-size="11" font-weight="600" fill="#cbd5e1">VersalFlow</text>
    </g>

    <g transform="translate(264, 0)">
      <rect x="0" y="0" width="98" height="26" rx="13" fill="#121524" stroke="#1e293b" stroke-width="1" />
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="#eab308" transform="translate(5, 2) scale(0.75)" />
      <text x="26" y="16.5" class="hero-font" font-size="11" font-weight="600" fill="#cbd5e1">150+ Stars</text>
    </g>

    <g transform="translate(372, 0)">
      <rect x="0" y="0" width="102" height="26" rx="13" fill="#121524" stroke="#1e293b" stroke-width="1" />
      <path d="M4 6l8-4 8 4-8 4-8-4zm0 6l8 4 8-4M4 18l8 4 8-4" stroke="#f472b6" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="translate(6, 2) scale(0.75)" />
      <text x="26" y="16.5" class="hero-font" font-size="11" font-weight="600" fill="#cbd5e1">20+ Repos</text>
    </g>
  </g>

  <!-- Viewfinder -->
  <g>
    <rect x="590" y="35" width="310" height="290" rx="16" fill="#07080f" stroke="#1e293b" stroke-width="1" />

    <g clip-path="url(#hero-vf-clip)">
      <g mask="url(#hero-edge-mask)">
        <image x="580" y="25" width="330" height="310" preserveAspectRatio="xMidYMid slice"
          href="data:image/jpeg;base64,${imgBadge}">
          <animate attributeName="opacity" dur="4s" repeatCount="indefinite"
            values="1; 1; 0; 0; 0; 1"
            keyTimes="0; 0.40; 0.48; 0.90; 0.96; 1" />
        </image>

        <image x="580" y="25" width="330" height="310" preserveAspectRatio="xMidYMid slice"
          href="data:image/jpeg;base64,${imgWaving}">
          <animate attributeName="opacity" dur="4s" repeatCount="indefinite"
            values="0; 0; 1; 1; 0; 0"
            keyTimes="0; 0.42; 0.50; 0.90; 0.98; 1" />
        </image>

        <rect x="590" y="35" width="310" height="290" fill="none" stroke="#22d3ee" stroke-width="0.3" stroke-opacity="0.1" stroke-dasharray="2 3" />
      </g>
    </g>

    <!-- Corner Brackets -->
    <path d="M 605 55 L 605 45 L 615 45" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round">
      <animate attributeName="stroke-dasharray" values="0,30; 30,0" dur="1s" fill="freeze" begin="0s" />
    </path>
    <path d="M 875 45 L 885 45 L 885 55" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round">
      <animate attributeName="stroke-dasharray" values="0,30; 30,0" dur="1s" fill="freeze" begin="0s" />
    </path>
    <path d="M 605 305 L 605 315 L 615 315" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round">
      <animate attributeName="stroke-dasharray" values="0,30; 30,0" dur="1s" fill="freeze" begin="0s" />
    </path>
    <path d="M 875 315 L 885 315 L 885 305" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round">
      <animate attributeName="stroke-dasharray" values="0,30; 30,0" dur="1s" fill="freeze" begin="0s" />
    </path>

    <g opacity="0.35" transform="translate(745, 180)">
      <line x1="-8" y1="0" x2="8" y2="0" stroke="#22d3ee" stroke-width="1" />
      <line x1="0" y1="-8" x2="0" y2="8" stroke="#22d3ee" stroke-width="1" />
      <circle cx="0" cy="0" r="16" fill="none" stroke="#22d3ee" stroke-width="0.8" stroke-dasharray="3 3" />
    </g>

    <g transform="translate(605, 52)">
      <circle cx="5" cy="5" r="4.5" fill="#ef4444">
        <animate attributeName="opacity" values="1;0.15;1" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <text x="16" y="9" class="hero-mono" font-size="10" font-weight="800" fill="#ef4444" letter-spacing="1">REC</text>
    </g>

    <text x="660" y="61" class="hero-mono" font-size="9.5" font-weight="600" fill="#94a3b8" letter-spacing="0.5">CAM_01_DEEPAK.RAW</text>
    <text x="840" y="61" class="hero-mono" font-size="9" font-weight="600" fill="#64748b" letter-spacing="1">4K 60FPS</text>

    <g transform="translate(605, 290)">
      <text x="0" y="6" class="hero-mono" font-size="9.5" font-weight="600" fill="#e2e8f0" letter-spacing="1">00:00:02:18</text>

      <g transform="translate(85, -2)">
        <rect x="0" y="2" width="2" height="6" fill="#10b981">
          <animate attributeName="height" values="4;8;3;7;4" dur="0.8s" repeatCount="indefinite" />
        </rect>
        <rect x="4" y="0" width="2" height="8" fill="#10b981">
          <animate attributeName="height" values="8;3;8;5;8" dur="0.9s" repeatCount="indefinite" />
        </rect>
        <rect x="8" y="3" width="2" height="5" fill="#22d3ee">
          <animate attributeName="height" values="3;7;4;8;3" dur="0.7s" repeatCount="indefinite" />
        </rect>
        <rect x="12" y="1" width="2" height="7" fill="#a78bfa">
          <animate attributeName="height" values="6;2;7;3;6" dur="1s" repeatCount="indefinite" />
        </rect>
      </g>

      <text x="210" y="6" class="hero-mono" font-size="8.5" font-weight="500" fill="#64748b" letter-spacing="0.5">ISO 400 · 1/120</text>

      <rect x="0" y="15" width="280" height="3" rx="1.5" fill="#1e293b" />
      <rect x="0" y="15" width="0" height="3" rx="1.5" fill="url(#hero-aurora-ramp)">
        <animate attributeName="width" values="0; 280" dur="4s" repeatCount="indefinite" />
      </rect>
      <circle cx="0" cy="16.5" r="3.5" fill="#ffffff">
        <animate attributeName="cx" values="0; 280" dur="4s" repeatCount="indefinite" />
      </circle>
    </g>
  </g>
</svg>`;
}

// ==========================================
// 2. ABOUT-LIFE.SVG
// ==========================================
function buildAboutLife() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 370" width="100%" height="100%">
  <defs>
    <linearGradient id="about-card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0b12" />
      <stop offset="50%" stop-color="#0d0e16" />
      <stop offset="100%" stop-color="#090a10" />
    </linearGradient>

    <linearGradient id="about-border-left" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#a78bfa" stop-opacity="0.4" />
    </linearGradient>
    <linearGradient id="about-border-right" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#f472b6" stop-opacity="0.8" />
    </linearGradient>

    <linearGradient id="about-text-grad-l" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="100%" stop-color="#a78bfa" />
    </linearGradient>
    <linearGradient id="about-text-grad-r" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a78bfa" />
      <stop offset="100%" stop-color="#f472b6" />
    </linearGradient>

    <pattern id="about-dot-pattern" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#334155" fill-opacity="0.25" />
    </pattern>

    <filter id="about-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <style>
    .about-font {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    .about-mono {
      font-family: 'SF Mono', 'Fira Code', 'Roboto Mono', Consolas, monospace;
    }
    @keyframes aboutBlink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .about-cursor {
      animation: aboutBlink 1s infinite;
    }
  </style>

  <!-- Left Card: What I Build -->
  <g transform="translate(10, 10)">
    <rect x="0" y="0" width="450" height="350" rx="18" fill="url(#about-card-bg)" stroke="url(#about-border-left)" stroke-width="1.5" />
    <rect x="0" y="0" width="450" height="350" rx="18" fill="url(#about-dot-pattern)" />
    <circle cx="100" cy="180" r="100" fill="#22d3ee" fill-opacity="0.06" filter="url(#about-glow)" />

    <!-- Browser Chrome -->
    <rect x="0" y="0" width="450" height="42" rx="18" fill="#111320" />
    <rect x="0" y="24" width="450" height="18" fill="#111320" />
    <line x1="0" y1="42" x2="450" y2="42" stroke="#1e293b" stroke-width="1" />

    <circle cx="20" cy="21" r="5" fill="#ef4444" />
    <circle cx="36" cy="21" r="5" fill="#f59e0b" />
    <circle cx="52" cy="21" r="5" fill="#10b981" />

    <rect x="75" y="10" width="355" height="22" rx="11" fill="#090a12" stroke="#1e293b" stroke-width="1" />
    <path d="M88 18v-2a2 2 0 0 1 4 0v2M86 18h8v6h-8z" fill="none" stroke="#22d3ee" stroke-width="1.3" />
    <text x="100" y="25" class="about-mono" font-size="10" fill="#94a3b8">https://versalflow.io/deepak/manifesto</text>
    <line x1="334" y1="15" x2="334" y2="27" stroke="#22d3ee" stroke-width="1.8" class="about-cursor" />

    <g transform="translate(24, 66)">
      <text x="0" y="0" class="about-font" font-size="11" font-weight="800" fill="url(#about-text-grad-l)" letter-spacing="1.5">CAPABILITIES &amp; ARCHITECTURE</text>
      <text x="0" y="20" class="about-font" font-size="18" font-weight="800" fill="#f8fafc">What I Build</text>
    </g>

    <!-- Row 1 -->
    <g transform="translate(24, 115)">
      <rect x="0" y="0" width="40" height="40" rx="10" fill="#141727" stroke="#22d3ee" stroke-opacity="0.5" stroke-width="1" />
      <path d="M8 32V12a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v20M6 32h28M22 18h10a2 2 0 0 1 2 2v12M14 16h2M14 22h2M14 28h2M26 24h2M26 28h2" stroke="#22d3ee" stroke-width="1.8" fill="none" stroke-linecap="round" transform="translate(2, -2) scale(0.9)" />
      <text x="52" y="16" class="about-font" font-size="13" font-weight="700" fill="#f1f5f9">Enterprise &amp; Multi-Tenant ODMS</text>
      <text x="52" y="32" class="about-font" font-size="11" font-weight="400" fill="#94a3b8">B2B order distribution, multi-warehouse inventory &amp; CRM.</text>
    </g>

    <!-- Row 2 -->
    <g transform="translate(24, 178)">
      <rect x="0" y="0" width="40" height="40" rx="10" fill="#141727" stroke="#a78bfa" stroke-opacity="0.5" stroke-width="1" />
      <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2M20 12h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M4 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2M6 8h12a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z" stroke="#a78bfa" stroke-width="1.8" fill="none" stroke-linecap="round" transform="translate(8, 7) scale(0.9)" />
      <circle cx="16" cy="20" r="1.5" fill="#a78bfa" />
      <circle cx="24" cy="20" r="1.5" fill="#a78bfa" />
      <text x="52" y="16" class="about-font" font-size="13" font-weight="700" fill="#f1f5f9">Autonomous AI &amp; Lead Routing</text>
      <text x="52" y="32" class="about-font" font-size="11" font-weight="400" fill="#94a3b8">OpenAI LLM agents, WhatsApp automation &amp; smart queues.</text>
    </g>

    <!-- Row 3 -->
    <g transform="translate(24, 241)">
      <rect x="0" y="0" width="40" height="40" rx="10" fill="#141727" stroke="#f472b6" stroke-opacity="0.5" stroke-width="1" />
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#f472b6" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="translate(8, 7) scale(0.9)" />
      <text x="52" y="16" class="about-font" font-size="13" font-weight="700" fill="#f1f5f9">Omnichannel SaaS &amp; Flutter Apps</text>
      <text x="52" y="32" class="about-font" font-size="11" font-weight="400" fill="#94a3b8">Next.js dashboards, Flutter cross-platform &amp; Firebase sync.</text>
    </g>

    <line x1="24" y1="302" x2="426" y2="302" stroke="#1e293b" stroke-width="1" />
    <g transform="translate(24, 324)">
      <circle cx="4" cy="0" r="3" fill="#10b981" />
      <text x="14" y="3.5" class="about-mono" font-size="9.5" fill="#64748b">STATUS: DEPLOYED &amp; SCALING PRODUCTION SUITE</text>
    </g>
  </g>

  <!-- Right Card: Hobbies & Daily Rhythms -->
  <g transform="translate(480, 10)">
    <rect x="0" y="0" width="450" height="350" rx="18" fill="url(#about-card-bg)" stroke="url(#about-border-right)" stroke-width="1.5" />
    <rect x="0" y="0" width="450" height="350" rx="18" fill="url(#about-dot-pattern)" />
    <circle cx="340" cy="180" r="100" fill="#f472b6" fill-opacity="0.06" filter="url(#about-glow)" />

    <!-- Progress Bars -->
    <g transform="translate(24, 18)">
      <rect x="0" y="0" width="128" height="3.5" rx="2" fill="#1e293b" />
      <rect x="0" y="0" width="128" height="3.5" rx="2" fill="#22d3ee">
        <animate attributeName="width" dur="12s" repeatCount="indefinite"
          values="0; 128; 128; 128; 128; 0"
          keyTimes="0; 0.33; 0.34; 0.98; 0.99; 1" />
      </rect>

      <rect x="136" y="0" width="128" height="3.5" rx="2" fill="#1e293b" />
      <rect x="136" y="0" width="0" height="3.5" rx="2" fill="#a78bfa">
        <animate attributeName="width" dur="12s" repeatCount="indefinite"
          values="0; 0; 128; 128; 128; 0"
          keyTimes="0; 0.33; 0.66; 0.67; 0.99; 1" />
      </rect>

      <rect x="272" y="0" width="128" height="3.5" rx="2" fill="#1e293b" />
      <rect x="272" y="0" width="0" height="3.5" rx="2" fill="#f472b6">
        <animate attributeName="width" dur="12s" repeatCount="indefinite"
          values="0; 0; 0; 128; 128; 0"
          keyTimes="0; 0.66; 0.67; 0.98; 0.99; 1" />
      </rect>
    </g>

    <g transform="translate(24, 52)">
      <text x="0" y="0" class="about-font" font-size="11" font-weight="800" fill="url(#about-text-grad-r)" letter-spacing="1.5">HOBBIES &amp; PASSIONS</text>
      <text x="0" y="20" class="about-font" font-size="18" font-weight="800" fill="#f8fafc">Daily Story &amp; Flow</text>
    </g>

    <!-- Carousel Slides -->
    <g transform="translate(24, 98)">
      <!-- Slide 1 -->
      <g opacity="1">
        <animate attributeName="opacity" dur="12s" repeatCount="indefinite"
          values="1; 1; 0; 0; 0; 0; 0; 1"
          keyTimes="0; 0.30; 0.34; 0.35; 0.67; 0.95; 0.98; 1" />
        <animateTransform attributeName="transform" type="translate" dur="12s" repeatCount="indefinite"
          values="0,0; 0,0; -12,0; -12,0; 12,0; 12,0; 12,0; 0,0"
          keyTimes="0; 0.30; 0.34; 0.35; 0.67; 0.95; 0.98; 1" />

        <rect x="0" y="0" width="402" height="74" rx="12" fill="#131526" stroke="#22d3ee" stroke-opacity="0.3" stroke-width="1" />
        <g transform="translate(14, 18)">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" stroke="#22d3ee" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <text x="56" y="28" class="about-font" font-size="14" font-weight="700" fill="#f1f5f9">☕ Espresso &amp; System Design</text>
        <text x="56" y="48" class="about-font" font-size="11.5" font-weight="400" fill="#94a3b8">Dialing in 1:2 espresso extractions while mapping scalable DB schemas.</text>
      </g>

      <!-- Slide 2 -->
      <g opacity="0">
        <animate attributeName="opacity" dur="12s" repeatCount="indefinite"
          values="0; 0; 1; 1; 0; 0; 0; 0"
          keyTimes="0; 0.33; 0.36; 0.63; 0.67; 0.68; 0.99; 1" />
        <animateTransform attributeName="transform" type="translate" dur="12s" repeatCount="indefinite"
          values="12,0; 12,0; 0,0; 0,0; -12,0; -12,0; 12,0; 12,0"
          keyTimes="0; 0.33; 0.36; 0.63; 0.67; 0.68; 0.99; 1" />

        <rect x="0" y="0" width="402" height="74" rx="12" fill="#131526" stroke="#a78bfa" stroke-opacity="0.3" stroke-width="1" />
        <g transform="translate(14, 18)">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3m5.5-3.5L12 6M15 9l3 3M9 15L6 12m10.5-8.5a7.5 7.5 0 0 1 4 4c0 4-5.5 10.5-5.5 10.5S8 12.5 8 8.5a7.5 7.5 0 0 1 7.5-7.5z" stroke="#a78bfa" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <text x="56" y="28" class="about-font" font-size="14" font-weight="700" fill="#f1f5f9">🚀 Autonomous AI Exploration</text>
        <text x="56" y="48" class="about-font" font-size="11.5" font-weight="400" fill="#94a3b8">Testing self-learning agents, neural synthesis &amp; smart tool integrations.</text>
      </g>

      <!-- Slide 3 -->
      <g opacity="0">
        <animate attributeName="opacity" dur="12s" repeatCount="indefinite"
          values="0; 0; 0; 0; 1; 1; 0; 0"
          keyTimes="0; 0.65; 0.66; 0.69; 0.72; 0.95; 0.98; 1" />
        <animateTransform attributeName="transform" type="translate" dur="12s" repeatCount="indefinite"
          values="12,0; 12,0; 12,0; 12,0; 0,0; 0,0; -12,0; -12,0"
          keyTimes="0; 0.65; 0.66; 0.69; 0.72; 0.95; 0.98; 1" />

        <rect x="0" y="0" width="402" height="74" rx="12" fill="#131526" stroke="#f472b6" stroke-opacity="0.3" stroke-width="1" />
        <g transform="translate(14, 18)">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" stroke="#f472b6" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <text x="56" y="28" class="about-font" font-size="14" font-weight="700" fill="#f1f5f9">🎧 Synthwave &amp; Nocturnal Flow</text>
        <text x="56" y="48" class="about-font" font-size="11.5" font-weight="400" fill="#94a3b8">Deep nocturnal focus fueled by cyberpunk beats &amp; mechanical switches.</text>
      </g>
    </g>

    <!-- Daily Rings -->
    <g transform="translate(24, 192)">
      <text x="0" y="10" class="about-mono" font-size="9.5" font-weight="700" fill="#64748b" letter-spacing="1">DAILY ACTIVITY RINGS</text>

      <g transform="translate(70, 72)">
        <circle cx="0" cy="0" r="48" fill="none" stroke="#1a2035" stroke-width="7.5" />
        <circle cx="0" cy="0" r="48" fill="none" stroke="#22d3ee" stroke-width="7.5" stroke-linecap="round"
          stroke-dasharray="301.6" stroke-dashoffset="15" transform="rotate(-90)">
          <animate attributeName="stroke-dashoffset" values="301.6; 15" dur="1.8s" fill="freeze" begin="0s" />
        </circle>

        <circle cx="0" cy="0" r="35" fill="none" stroke="#1a2035" stroke-width="7.5" />
        <circle cx="0" cy="0" r="35" fill="none" stroke="#a78bfa" stroke-width="7.5" stroke-linecap="round"
          stroke-dasharray="219.9" stroke-dashoffset="26" transform="rotate(-90)">
          <animate attributeName="stroke-dashoffset" values="219.9; 26" dur="2s" fill="freeze" begin="0s" />
        </circle>

        <circle cx="0" cy="0" r="22" fill="none" stroke="#1a2035" stroke-width="7.5" />
        <circle cx="0" cy="0" r="22" fill="none" stroke="#f472b6" stroke-width="7.5" stroke-linecap="round"
          stroke-dasharray="138.2" stroke-dashoffset="0" transform="rotate(-90)">
          <animate attributeName="stroke-dashoffset" values="138.2; 0" dur="2.2s" fill="freeze" begin="0s" />
        </circle>
      </g>

      <g transform="translate(150, 42)">
        <g transform="translate(0, 0)">
          <circle cx="5" cy="5" r="4.5" fill="#22d3ee" />
          <text x="16" y="8.5" class="about-font" font-size="12" font-weight="700" fill="#f1f5f9">95% Architecture</text>
          <text x="16" y="21" class="about-font" font-size="10" fill="#94a3b8">Clean schemas &amp; zero-latency APIs</text>
        </g>
        <g transform="translate(0, 32)">
          <circle cx="5" cy="5" r="4.5" fill="#a78bfa" />
          <text x="16" y="8.5" class="about-font" font-size="12" font-weight="700" fill="#f1f5f9">88% AI &amp; Agents</text>
          <text x="16" y="21" class="about-font" font-size="10" fill="#94a3b8">LLM routing &amp; autonomous workers</text>
        </g>
        <g transform="translate(0, 64)">
          <circle cx="5" cy="5" r="4.5" fill="#f472b6" />
          <text x="16" y="8.5" class="about-font" font-size="12" font-weight="700" fill="#f1f5f9">100% Espresso &amp; Focus</text>
          <text x="16" y="21" class="about-font" font-size="10" fill="#94a3b8">High caffeine nocturnal velocity</text>
        </g>
      </g>
    </g>
  </g>
</svg>`;
}

// ==========================================
// 3. STACK.SVG (WITH PRECISE ELLIPTICAL ORBITS & MOONS)
// ==========================================
function buildStack() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 480" width="100%" height="100%">
  <defs>
    <linearGradient id="stack-card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0b12" />
      <stop offset="50%" stop-color="#0d0e16" />
      <stop offset="100%" stop-color="#080910" />
    </linearGradient>

    <linearGradient id="stack-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#a78bfa" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#f472b6" stop-opacity="0.8" />
    </linearGradient>

    <linearGradient id="stack-header-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="50%" stop-color="#a78bfa" />
      <stop offset="100%" stop-color="#f472b6" />
    </linearGradient>

    <radialGradient id="stack-core-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="35%" stop-color="#22d3ee" />
      <stop offset="70%" stop-color="#a78bfa" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#a78bfa" stop-opacity="0" />
    </radialGradient>

    <pattern id="stack-dot-pattern" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#334155" fill-opacity="0.25" />
    </pattern>

    <filter id="stack-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="16" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <!-- Paths for AnimateMotion (Ellipses) -->
    <!-- Orbit 1: rx=200, ry=58 -->
    <path id="stack-path-orbit1" d="M -200,0 A 200 58 0 1 0 200,0 A 200 58 0 1 0 -200,0" fill="none" />
    <!-- Orbit 2: rx=290, ry=74 -->
    <path id="stack-path-orbit2" d="M -290,0 A 290 74 0 1 0 290,0 A 290 74 0 1 0 -290,0" fill="none" />
    <!-- Orbit 3: rx=380, ry=90 -->
    <path id="stack-path-orbit3" d="M -380,0 A 380 90 0 1 0 380,0 A 380 90 0 1 0 -380,0" fill="none" />
  </defs>

  <style>
    .stack-font {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    .stack-mono {
      font-family: 'SF Mono', 'Fira Code', 'Roboto Mono', Consolas, monospace;
    }

    @keyframes chipGlow {
      0%, 100% { border-color: #1e293b; stroke: #1e293b; }
      50% { stroke: #22d3ee; }
    }
    .chip-1 { animation: chipGlow 4s infinite 0.2s; }
    .chip-2 { animation: chipGlow 4s infinite 0.6s; }
    .chip-3 { animation: chipGlow 4s infinite 1.0s; }
    .chip-4 { animation: chipGlow 4s infinite 1.4s; }
    .chip-5 { animation: chipGlow 4s infinite 1.8s; }
    .chip-6 { animation: chipGlow 4s infinite 2.2s; }
    .chip-7 { animation: chipGlow 4s infinite 2.6s; }
    .chip-8 { animation: chipGlow 4s infinite 3.0s; }
  </style>

  <!-- Frame -->
  <rect x="10" y="10" width="920" height="460" rx="20" fill="url(#stack-card-bg)" stroke="url(#stack-border-grad)" stroke-width="1.5" />
  <rect x="10" y="10" width="920" height="460" rx="20" fill="url(#stack-dot-pattern)" />

  <!-- Header -->
  <g transform="translate(40, 42)">
    <text x="0" y="0" class="stack-font" font-size="11" font-weight="800" fill="url(#stack-header-grad)" letter-spacing="1.5">PLANETARY ARCHITECTURE</text>
    <text x="0" y="24" class="stack-font" font-size="22" font-weight="900" fill="#f8fafc">Tech Orbit &amp; Capability Matrix</text>
    <text x="0" y="44" class="stack-font" font-size="12" fill="#94a3b8">Simple Icons riding three tilted elliptical orbits around the VersalFlow core engine.</text>
  </g>

  <!-- ================= TECH ORBIT VISUALIZATION (CENTER: 470, 195) ================= -->
  <!-- Ambient Core Glow -->
  <circle cx="470" cy="195" r="90" fill="#22d3ee" fill-opacity="0.08" filter="url(#stack-glow-strong)" />
  <circle cx="470" cy="195" r="140" fill="#a78bfa" fill-opacity="0.06" filter="url(#stack-glow-strong)" />

  <!-- ORBIT 3 (OUTER, Tilted -8deg) -->
  <g transform="translate(470, 195) rotate(-8)">
    <ellipse cx="0" cy="0" rx="380" ry="90" fill="none" stroke="#334155" stroke-opacity="0.4" stroke-width="1.2" stroke-dasharray="4 6" />

    <!-- Planet 3A: Flutter (Placed at -380,0) -->
    <g>
      <animateMotion dur="26s" repeatCount="indefinite" begin="0s">
        <mpath href="#stack-path-orbit3" />
      </animateMotion>
      <circle cx="0" cy="0" r="15" fill="#0d111d" stroke="#38bdf8" stroke-width="1.5" />
      <path d="${ICONS.flutter}" fill="#38bdf8" transform="translate(-7, -7) scale(0.6)" />
      <text x="0" y="24" class="stack-font" font-size="9" font-weight="700" fill="#cbd5e1" text-anchor="middle">Flutter</text>
    </g>

    <!-- Planet 3B: OpenAI (Placed offset along orbit) -->
    <g>
      <animateMotion dur="26s" repeatCount="indefinite" begin="-8.6s">
        <mpath href="#stack-path-orbit3" />
      </animateMotion>
      <circle cx="0" cy="0" r="15" fill="#0d111d" stroke="#10b981" stroke-width="1.5" />
      <path d="${ICONS.openai}" fill="#10b981" transform="translate(-7, -7) scale(0.6)" />
      <text x="0" y="24" class="stack-font" font-size="9" font-weight="700" fill="#cbd5e1" text-anchor="middle">OpenAI</text>
    </g>

    <!-- Planet 3C: Linux/CI -->
    <g>
      <animateMotion dur="26s" repeatCount="indefinite" begin="-17.3s">
        <mpath href="#stack-path-orbit3" />
      </animateMotion>
      <circle cx="0" cy="0" r="15" fill="#0d111d" stroke="#f59e0b" stroke-width="1.5" />
      <path d="${ICONS.github}" fill="#f59e0b" transform="translate(-7, -7) scale(0.6)" />
      <text x="0" y="24" class="stack-font" font-size="9" font-weight="700" fill="#cbd5e1" text-anchor="middle">Linux/CI</text>
    </g>
  </g>

  <!-- ORBIT 2 (MIDDLE, Tilted +18deg) -->
  <g transform="translate(470, 195) rotate(18)">
    <ellipse cx="0" cy="0" rx="290" ry="74" fill="none" stroke="#334155" stroke-opacity="0.5" stroke-width="1.2" stroke-dasharray="3 5" />

    <!-- Planet 2A: Node.js -->
    <g>
      <animateMotion dur="20s" repeatCount="indefinite" begin="0s">
        <mpath href="#stack-path-orbit2" />
      </animateMotion>
      <circle cx="0" cy="0" r="15" fill="#0d111d" stroke="#22c55e" stroke-width="1.5" />
      <path d="${ICONS.nodejs}" fill="#22c55e" transform="translate(-7, -7) scale(0.6)" />
      <text x="0" y="24" class="stack-font" font-size="9" font-weight="700" fill="#cbd5e1" text-anchor="middle">Node.js</text>
    </g>

    <!-- Planet 2B: Next.js -->
    <g>
      <animateMotion dur="20s" repeatCount="indefinite" begin="-6.6s">
        <mpath href="#stack-path-orbit2" />
      </animateMotion>
      <circle cx="0" cy="0" r="15" fill="#0d111d" stroke="#ffffff" stroke-width="1.5" />
      <path d="${ICONS.nextjs}" fill="#ffffff" transform="translate(-7, -7) scale(0.6)" />
      <text x="0" y="24" class="stack-font" font-size="9" font-weight="700" fill="#cbd5e1" text-anchor="middle">Next.js</text>
    </g>

    <!-- Planet 2C: TypeScript -->
    <g>
      <animateMotion dur="20s" repeatCount="indefinite" begin="-13.3s">
        <mpath href="#stack-path-orbit2" />
      </animateMotion>
      <circle cx="0" cy="0" r="15" fill="#0d111d" stroke="#3178c6" stroke-width="1.5" />
      <path d="${ICONS.typescript}" fill="#3178c6" transform="translate(-7, -7) scale(0.6)" />
      <text x="0" y="24" class="stack-font" font-size="9" font-weight="700" fill="#cbd5e1" text-anchor="middle">TypeScript</text>
    </g>
  </g>

  <!-- ORBIT 1 (INNER, Tilted -16deg, rx=200, ry=58) -->
  <g transform="translate(470, 195) rotate(-16)">
    <ellipse cx="0" cy="0" rx="200" ry="58" fill="none" stroke="#22d3ee" stroke-opacity="0.6" stroke-width="1.4" stroke-dasharray="2 4" />

    <!-- Planet 1A: REACT + TWO ORBITING MOONS (Vite & Zustand) -->
    <g>
      <animateMotion dur="14s" repeatCount="indefinite" begin="0s">
        <mpath href="#stack-path-orbit1" />
      </animateMotion>

      <!-- React Body -->
      <circle cx="0" cy="0" r="17" fill="#0b101d" stroke="#22d3ee" stroke-width="2" />
      <path d="${ICONS.react}" fill="#22d3ee" transform="translate(-8, -8) scale(0.7)" />
      <text x="0" y="26" class="stack-font" font-size="9.5" font-weight="800" fill="#22d3ee" text-anchor="middle">React</text>

      <!-- Moon 1: Vite (Rotates around React at radius 24px) -->
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite" />
        <circle cx="24" cy="0" r="5.5" fill="#0d111d" stroke="#a78bfa" stroke-width="1" />
        <text x="24" y="2.5" class="stack-mono" font-size="5.5" font-weight="800" fill="#a78bfa" text-anchor="middle">V</text>
      </g>

      <!-- Moon 2: Zustand (Rotates opposite side at radius 24px) -->
      <g>
        <animateTransform attributeName="transform" type="rotate" from="180" to="540" dur="3s" repeatCount="indefinite" />
        <circle cx="24" cy="0" r="5.5" fill="#0d111d" stroke="#f472b6" stroke-width="1" />
        <text x="24" y="2.5" class="stack-mono" font-size="5.5" font-weight="800" fill="#f472b6" text-anchor="middle">Z</text>
      </g>
    </g>

    <!-- Planet 1B: Tailwind CSS (Halfway along orbit) -->
    <g>
      <animateMotion dur="14s" repeatCount="indefinite" begin="-7s">
        <mpath href="#stack-path-orbit1" />
      </animateMotion>
      <circle cx="0" cy="0" r="15" fill="#0b101d" stroke="#38bdf8" stroke-width="1.5" />
      <path d="${ICONS.tailwind}" fill="#38bdf8" transform="translate(-7, -7) scale(0.6)" />
      <text x="0" y="24" class="stack-font" font-size="9" font-weight="700" fill="#cbd5e1" text-anchor="middle">Tailwind</text>
    </g>
  </g>

  <!-- CENTRAL GLOWING CORE (VERSALFLOW ATOM CORE) -->
  <g transform="translate(470, 195)">
    <!-- Rotating energy rings -->
    <circle cx="0" cy="0" r="38" fill="none" stroke="#22d3ee" stroke-width="1.5" stroke-opacity="0.4" stroke-dasharray="6 4">
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
    </circle>
    <circle cx="0" cy="0" r="46" fill="none" stroke="#a78bfa" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="3 6">
      <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="14s" repeatCount="indefinite" />
    </circle>
    <!-- Core Sphere -->
    <circle cx="0" cy="0" r="26" fill="url(#stack-core-glow)" />
    <circle cx="0" cy="0" r="26" fill="#0c101d" stroke="#22d3ee" stroke-width="2" />
    <text x="0" y="6" class="stack-mono" font-size="14" font-weight="900" fill="url(#stack-header-grad)" text-anchor="middle">VF</text>
  </g>

  <!-- ================= GROUPED CHIP GRID (4 COLUMNS) ================= -->
  <g transform="translate(35, 335)">
    <!-- Column 1: Frontend -->
    <g transform="translate(0, 0)">
      <text x="0" y="0" class="stack-mono" font-size="10" font-weight="700" fill="#22d3ee" letter-spacing="1">FRONTEND &amp; UI</text>
      <g transform="translate(0, 12)">
        <rect x="0" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-1" />
        <text x="49" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">Next.js 14</text>
        <rect x="106" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-2" />
        <text x="155" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">React 19</text>
      </g>
      <g transform="translate(0, 46)">
        <rect x="0" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-3" />
        <text x="49" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">TypeScript</text>
        <rect x="106" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-4" />
        <text x="155" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">Tailwind CSS</text>
      </g>
    </g>

    <!-- Column 2: Backend & Microservices -->
    <g transform="translate(225, 0)">
      <text x="0" y="0" class="stack-mono" font-size="10" font-weight="700" fill="#a78bfa" letter-spacing="1">BACKEND &amp; LOGIC</text>
      <g transform="translate(0, 12)">
        <rect x="0" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-5" />
        <text x="49" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">Node.js</text>
        <rect x="106" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-6" />
        <text x="155" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">Express.js</text>
      </g>
      <g transform="translate(0, 46)">
        <rect x="0" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-7" />
        <text x="49" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">PHP 8.x</text>
        <rect x="106" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-8" />
        <text x="155" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">PM2 Cluster</text>
      </g>
    </g>

    <!-- Column 3: Data & Cloud -->
    <g transform="translate(450, 0)">
      <text x="0" y="0" class="stack-mono" font-size="10" font-weight="700" fill="#f472b6" letter-spacing="1">DATA &amp; CLOUD</text>
      <g transform="translate(0, 12)">
        <rect x="0" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-1" />
        <text x="49" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">MySQL</text>
        <rect x="106" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-2" />
        <text x="155" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">Firebase RTDB</text>
      </g>
      <g transform="translate(0, 46)">
        <rect x="0" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-3" />
        <text x="49" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">Linux Server</text>
        <rect x="106" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-4" />
        <text x="155" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">Nginx Proxy</text>
      </g>
    </g>

    <!-- Column 4: AI & Mobile -->
    <g transform="translate(675, 0)">
      <text x="0" y="0" class="stack-mono" font-size="10" font-weight="700" fill="#38bdf8" letter-spacing="1">AI &amp; MOBILE</text>
      <g transform="translate(0, 12)">
        <rect x="0" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-5" />
        <text x="49" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">OpenAI API</text>
        <rect x="106" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-6" />
        <text x="155" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">Flutter App</text>
      </g>
      <g transform="translate(0, 46)">
        <rect x="0" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-7" />
        <text x="49" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">WhatsApp API</text>
        <rect x="106" y="0" width="98" height="26" rx="6" fill="#131627" stroke="#1e293b" stroke-width="1" class="chip-8" />
        <text x="155" y="17" class="stack-font" font-size="11" font-weight="600" fill="#cbd5e1" text-anchor="middle">Agent Workflows</text>
      </g>
    </g>
  </g>
</svg>`;
}

// ==========================================
// 4. ID-DASHBOARD.SVG (WITH SOLID FINAL BARS)
// ==========================================
function buildIdDashboard() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 430" width="100%" height="100%">
  <defs>
    <linearGradient id="id-card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0b12" />
      <stop offset="50%" stop-color="#0d0e16" />
      <stop offset="100%" stop-color="#090a10" />
    </linearGradient>

    <linearGradient id="id-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#a78bfa" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#f472b6" stop-opacity="0.8" />
    </linearGradient>

    <linearGradient id="id-holo-sweep" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0" />
      <stop offset="35%" stop-color="#22d3ee" stop-opacity="0.25" />
      <stop offset="50%" stop-color="#a78bfa" stop-opacity="0.35" />
      <stop offset="65%" stop-color="#f472b6" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0" />
    </linearGradient>

    <linearGradient id="id-metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#64748b" />
      <stop offset="40%" stop-color="#e2e8f0" />
      <stop offset="60%" stop-color="#cbd5e1" />
      <stop offset="100%" stop-color="#475569" />
    </linearGradient>

    <linearGradient id="id-strap-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="50%" stop-color="#312e81" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>

    <linearGradient id="id-gold-chip" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#ca8a04" />
    </linearGradient>

    <linearGradient id="id-beam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="50%" stop-color="#a78bfa" />
      <stop offset="100%" stop-color="#f472b6" />
    </linearGradient>

    <linearGradient id="id-bar-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="100%" stop-color="#a78bfa" />
    </linearGradient>

    <pattern id="id-dot-pattern" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#334155" fill-opacity="0.25" />
    </pattern>

    <clipPath id="id-card-clip">
      <rect x="0" y="0" width="200" height="310" rx="14" />
    </clipPath>
    <clipPath id="id-photo-clip">
      <rect x="0" y="0" width="80" height="85" rx="8" />
    </clipPath>
  </defs>

  <style>
    .id-font {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    .id-mono {
      font-family: 'SF Mono', 'Fira Code', 'Roboto Mono', Consolas, monospace;
    }
  </style>

  <rect x="10" y="10" width="920" height="410" rx="20" fill="url(#id-card-bg)" stroke="url(#id-border-grad)" stroke-width="1.5" />
  <rect x="10" y="10" width="920" height="410" rx="20" fill="url(#id-dot-pattern)" />

  <!-- Lanyard ID Badge Assembly -->
  <g id="id-pendulum-assembly">
    <animateTransform attributeName="transform" type="rotate" dur="6s" repeatCount="indefinite"
      values="0 155 10; 6 155 10; -5 155 10; 4 155 10; -2.5 155 10; 1.5 155 10; -0.8 155 10; 0.3 155 10; 0 155 10; 0 155 10"
      keyTimes="0; 0.12; 0.25; 0.38; 0.50; 0.62; 0.74; 0.86; 0.95; 1"
      calcMode="spline"
      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />

    <polygon points="144,0 152,0 152,50 144,50" fill="url(#id-strap-grad)" />
    <polygon points="158,0 166,0 166,50 158,50" fill="url(#id-strap-grad)" />

    <g transform="translate(155, 30) rotate(-90)">
      <text x="-16" y="2" class="id-mono" font-size="7.5" font-weight="800" fill="#22d3ee" letter-spacing="1">VF·ARCH</text>
    </g>

    <g transform="translate(155, 55)">
      <circle cx="0" cy="0" r="8" fill="none" stroke="url(#id-metal-grad)" stroke-width="3" />
      <rect x="-6" y="7" width="12" height="12" rx="3" fill="url(#id-metal-grad)" />
      <path d="M-4 18h8v12h-8z" fill="url(#id-metal-grad)" />
    </g>

    <!-- Badge Card -->
    <g transform="translate(55, 85)">
      <rect x="0" y="0" width="200" height="310" rx="14" fill="#0c0e18" stroke="#334155" stroke-width="1.2" />

      <g clip-path="url(#id-card-clip)">
        <rect x="-240" y="-50" width="200" height="400" transform="rotate(25)" fill="url(#id-holo-sweep)">
          <animate attributeName="x" values="-240; 340" dur="4.5s" repeatCount="indefinite" />
        </rect>
      </g>

      <rect x="82" y="8" width="36" height="6" rx="3" fill="#05060a" stroke="#475569" stroke-width="1" />

      <g transform="translate(16, 32)">
        <text x="0" y="0" class="id-font" font-size="11" font-weight="900" fill="#22d3ee" letter-spacing="1.5">VERSALFLOW</text>
        <text x="168" y="0" class="id-mono" font-size="8.5" font-weight="700" fill="#10b981" text-anchor="end">LEVEL 01</text>
        <line x1="0" y1="8" x2="168" y2="8" stroke="#1e293b" stroke-width="1" />
      </g>

      <g transform="translate(16, 54)">
        <g>
          <rect x="0" y="0" width="80" height="85" rx="8" fill="#111422" stroke="#1e293b" stroke-width="1.5" />
          <g clip-path="url(#id-photo-clip)">
            <image x="-5" y="-5" width="90" height="95" preserveAspectRatio="xMidYMid slice"
              href="data:image/jpeg;base64,${imgBadge}" />
          </g>
          <rect x="0" y="0" width="80" height="85" rx="8" fill="none" stroke="url(#id-beam-grad)" stroke-width="2.5"
            stroke-dasharray="50 280">
            <animate attributeName="stroke-dashoffset" values="330; 0" dur="3s" repeatCount="indefinite" />
          </rect>
        </g>

        <g transform="translate(94, 4)">
          <rect x="0" y="0" width="36" height="28" rx="4" fill="url(#id-gold-chip)" stroke="#92400e" stroke-width="0.8" />
          <line x1="12" y1="0" x2="12" y2="28" stroke="#854d0e" stroke-width="0.7" />
          <line x1="24" y1="0" x2="24" y2="28" stroke="#854d0e" stroke-width="0.7" />
          <line x1="0" y1="14" x2="36" y2="14" stroke="#854d0e" stroke-width="0.7" />
          <circle cx="18" cy="14" r="3" fill="#ca8a04" />

          <g transform="translate(0, 42)">
            <circle cx="18" cy="14" r="14" fill="#12172a" stroke="#22d3ee" stroke-width="1" stroke-dasharray="2 3" />
            <text x="18" y="17" class="id-mono" font-size="8" font-weight="900" fill="#a78bfa" text-anchor="middle">VALID</text>
          </g>
        </g>
      </g>

      <g transform="translate(16, 162)">
        <text x="0" y="0" class="id-font" font-size="17" font-weight="900" fill="#f8fafc" letter-spacing="1">DEEPAK</text>
        <text x="0" y="16" class="id-mono" font-size="9.5" font-weight="700" fill="#22d3ee" letter-spacing="0.5">FOUNDER &amp; PRODUCT ARCHITECT</text>
        <text x="0" y="32" class="id-font" font-size="10" fill="#94a3b8">Ecosystem Engineering &amp; AI Systems</text>
      </g>

      <g transform="translate(16, 222)">
        <line x1="0" y1="0" x2="168" y2="0" stroke="#1e293b" stroke-width="1" />
        <g transform="translate(14, 10)">
          <rect x="0" y="0" width="3" height="32" fill="#e2e8f0" />
          <rect x="6" y="0" width="1.5" height="32" fill="#e2e8f0" />
          <rect x="11" y="0" width="4" height="32" fill="#e2e8f0" />
          <rect x="18" y="0" width="2" height="32" fill="#e2e8f0" />
          <rect x="23" y="0" width="5" height="32" fill="#e2e8f0" />
          <rect x="31" y="0" width="2" height="32" fill="#e2e8f0" />
          <rect x="36" y="0" width="1" height="32" fill="#e2e8f0" />
          <rect x="40" y="0" width="4" height="32" fill="#e2e8f0" />
          <rect x="47" y="0" width="2" height="32" fill="#e2e8f0" />
          <rect x="52" y="0" width="4" height="32" fill="#e2e8f0" />
          <rect x="59" y="0" width="1.5" height="32" fill="#e2e8f0" />
          <rect x="64" y="0" width="5" height="32" fill="#e2e8f0" />
          <rect x="72" y="0" width="2" height="32" fill="#e2e8f0" />
          <rect x="77" y="0" width="3" height="32" fill="#e2e8f0" />
          <rect x="83" y="0" width="1.5" height="32" fill="#e2e8f0" />
          <rect x="88" y="0" width="4" height="32" fill="#e2e8f0" />
          <rect x="95" y="0" width="3" height="32" fill="#e2e8f0" />
          <rect x="101" y="0" width="1.5" height="32" fill="#e2e8f0" />
          <rect x="106" y="0" width="4" height="32" fill="#e2e8f0" />
          <rect x="113" y="0" width="2" height="32" fill="#e2e8f0" />
          <rect x="118" y="0" width="4" height="32" fill="#e2e8f0" />
          <rect x="125" y="0" width="2" height="32" fill="#e2e8f0" />
          <rect x="130" y="0" width="5" height="32" fill="#e2e8f0" />
          <rect x="138" y="0" width="2" height="32" fill="#e2e8f0" />
        </g>
        <text x="84" y="56" class="id-mono" font-size="8.5" font-weight="700" fill="#64748b" text-anchor="middle" letter-spacing="1">VF-2026-ARCH-0786</text>
      </g>
    </g>
  </g>

  <!-- Dashboard -->
  <g transform="translate(290, 35)">
    <g transform="translate(0, 0)">
      <circle cx="5" cy="5" r="4.5" fill="#10b981" />
      <text x="18" y="9" class="id-mono" font-size="11" font-weight="800" fill="#22d3ee" letter-spacing="1.5">TELEMETRY &amp; ECOSYSTEM METRICS</text>
      <text x="610" y="9" class="id-mono" font-size="10" fill="#64748b" text-anchor="end">SYS_STATUS: OPTIMAL</text>
    </g>

    <!-- 4 KPI Tiles Grid -->
    <g transform="translate(0, 24)">
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="144" height="66" rx="10" fill="#111424" stroke="#1e293b" stroke-width="1" />
        <text x="14" y="20" class="id-mono" font-size="9" font-weight="700" fill="#64748b">PROD PLATFORMS</text>
        <text x="14" y="46" class="id-font" font-size="22" font-weight="900" fill="#f8fafc">14+</text>
        <text x="64" y="44" class="id-mono" font-size="10" font-weight="700" fill="#10b981">▲ Live</text>
      </g>

      <g transform="translate(155, 0)">
        <rect x="0" y="0" width="144" height="66" rx="10" fill="#111424" stroke="#1e293b" stroke-width="1" />
        <text x="14" y="20" class="id-mono" font-size="9" font-weight="700" fill="#64748b">SYSTEM UPTIME</text>
        <text x="14" y="46" class="id-font" font-size="22" font-weight="900" fill="#22d3ee">99.9%</text>
        <text x="94" y="44" class="id-mono" font-size="10" font-weight="700" fill="#22d3ee">● SLA</text>
      </g>

      <g transform="translate(310, 0)">
        <rect x="0" y="0" width="144" height="66" rx="10" fill="#111424" stroke="#1e293b" stroke-width="1" />
        <text x="14" y="20" class="id-mono" font-size="9" font-weight="700" fill="#64748b">MONTHLY OPS</text>
        <text x="14" y="46" class="id-font" font-size="22" font-weight="900" fill="#a78bfa">1.8M+</text>
        <text x="86" y="44" class="id-mono" font-size="10" font-weight="700" fill="#a78bfa">▲ High</text>
      </g>

      <g transform="translate(465, 0)">
        <rect x="0" y="0" width="144" height="66" rx="10" fill="#111424" stroke="#1e293b" stroke-width="1" />
        <text x="14" y="20" class="id-mono" font-size="9" font-weight="700" fill="#64748b">USERS EMPOWERED</text>
        <text x="14" y="46" class="id-font" font-size="22" font-weight="900" fill="#f472b6">25k+</text>
        <text x="82" y="44" class="id-mono" font-size="10" font-weight="700" fill="#f472b6">★ Scale</text>
      </g>
    </g>

    <!-- Bar Chart -->
    <g transform="translate(0, 108)">
      <text x="0" y="0" class="id-mono" font-size="10" font-weight="700" fill="#94a3b8" letter-spacing="1">CORE REPOSITORY PERFORMANCE &amp; STAR VELOCITY</text>

      <g transform="translate(0, 14)">
        <!-- Bar 1 -->
        <g transform="translate(0, 0)">
          <text x="0" y="14" class="id-font" font-size="11.5" font-weight="600" fill="#e2e8f0">versalflow-crm</text>
          <text x="210" y="14" class="id-mono" font-size="10.5" font-weight="700" fill="#22d3ee">98% (18.4k req)</text>
          <rect x="330" y="4" width="280" height="12" rx="6" fill="#171a2c" />
          <rect x="330" y="4" width="274" height="12" rx="6" fill="url(#id-bar-grad)">
            <animate attributeName="width" from="14" to="274" dur="1.2s" fill="freeze" begin="0s" />
          </rect>
        </g>

        <!-- Bar 2 -->
        <g transform="translate(0, 26)">
          <text x="0" y="14" class="id-font" font-size="11.5" font-weight="600" fill="#e2e8f0">odms-logistics-engine</text>
          <text x="210" y="14" class="id-mono" font-size="10.5" font-weight="700" fill="#22d3ee">88% (14.2k req)</text>
          <rect x="330" y="4" width="280" height="12" rx="6" fill="#171a2c" />
          <rect x="330" y="4" width="246" height="12" rx="6" fill="url(#id-bar-grad)">
            <animate attributeName="width" from="14" to="246" dur="1.4s" fill="freeze" begin="0s" />
          </rect>
        </g>

        <!-- Bar 3 -->
        <g transform="translate(0, 52)">
          <text x="0" y="14" class="id-font" font-size="11.5" font-weight="600" fill="#e2e8f0">whatsapp-omnichannel-api</text>
          <text x="210" y="14" class="id-mono" font-size="10.5" font-weight="700" fill="#22d3ee">94% (21.5k req)</text>
          <rect x="330" y="4" width="280" height="12" rx="6" fill="#171a2c" />
          <rect x="330" y="4" width="263" height="12" rx="6" fill="url(#id-bar-grad)">
            <animate attributeName="width" from="14" to="263" dur="1.6s" fill="freeze" begin="0s" />
          </rect>
        </g>

        <!-- Bar 4 -->
        <g transform="translate(0, 78)">
          <text x="0" y="14" class="id-font" font-size="11.5" font-weight="600" fill="#e2e8f0">ai-business-automations</text>
          <text x="210" y="14" class="id-mono" font-size="10.5" font-weight="700" fill="#22d3ee">92% (16.9k req)</text>
          <rect x="330" y="4" width="280" height="12" rx="6" fill="#171a2c" />
          <rect x="330" y="4" width="257" height="12" rx="6" fill="url(#id-bar-grad)">
            <animate attributeName="width" from="14" to="257" dur="1.8s" fill="freeze" begin="0s" />
          </rect>
        </g>

        <!-- Bar 5 -->
        <g transform="translate(0, 104)">
          <text x="0" y="14" class="id-font" font-size="11.5" font-weight="600" fill="#e2e8f0">flutter-enterprise-suite</text>
          <text x="210" y="14" class="id-mono" font-size="10.5" font-weight="700" fill="#22d3ee">84% (11.1k req)</text>
          <rect x="330" y="4" width="280" height="12" rx="6" fill="#171a2c" />
          <rect x="330" y="4" width="235" height="12" rx="6" fill="url(#id-bar-grad)">
            <animate attributeName="width" from="14" to="235" dur="2s" fill="freeze" begin="0s" />
          </rect>
        </g>
      </g>
    </g>

    <!-- "NOW" Terminal Panel -->
    <g transform="translate(0, 275)">
      <rect x="0" y="0" width="610" height="58" rx="10" fill="#090b14" stroke="#1e293b" stroke-width="1" />
      <g transform="translate(16, 20)">
        <circle cx="4" cy="0" r="3.5" fill="#10b981">
          <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="16" y="3.5" class="id-mono" font-size="10" font-weight="800" fill="#10b981">NOW:</text>
        <text x="56" y="3.5" class="id-font" font-size="12" font-weight="500" fill="#f1f5f9">
          Scaling VersalFlow multi-warehouse ODMS distribution &amp; autonomous agent pipelines.
        </text>
      </g>
      <text x="16" y="45" class="id-mono" font-size="9" fill="#64748b">
        LAST SPRINT: 48 commits pushed • Next release: v3.2-alpha
      </text>
    </g>
  </g>
</svg>`;
}

// ==========================================
// 5. CONNECT.SVG (WITH IN-CARD NUDGING ARROWS)
// ==========================================
function buildConnect() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 300" width="100%" height="100%">
  <defs>
    <linearGradient id="conn-card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0b12" />
      <stop offset="50%" stop-color="#0d0e16" />
      <stop offset="100%" stop-color="#090a10" />
    </linearGradient>

    <linearGradient id="conn-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#a78bfa" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#f472b6" stop-opacity="0.8" />
    </linearGradient>

    <linearGradient id="conn-header-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="50%" stop-color="#a78bfa" />
      <stop offset="100%" stop-color="#f472b6" />
    </linearGradient>

    <pattern id="conn-dot-pattern" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#334155" fill-opacity="0.25" />
    </pattern>

    <filter id="conn-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="14" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <clipPath id="conn-char-clip">
      <circle cx="130" cy="150" r="110" />
    </clipPath>
  </defs>

  <style>
    .conn-font {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    .conn-mono {
      font-family: 'SF Mono', 'Fira Code', 'Roboto Mono', Consolas, monospace;
    }

    @keyframes nudgeArrow {
      0%, 100% { transform: translateX(0px); }
      50% { transform: translateX(6px); }
    }
    .nudge-arr {
      animation: nudgeArrow 1.5s ease-in-out infinite;
    }
  </style>

  <rect x="10" y="10" width="920" height="280" rx="20" fill="url(#conn-card-bg)" stroke="url(#conn-border-grad)" stroke-width="1.5" />
  <rect x="10" y="10" width="920" height="280" rx="20" fill="url(#conn-dot-pattern)" />

  <circle cx="130" cy="150" r="120" fill="#22d3ee" fill-opacity="0.08" filter="url(#conn-glow)" />
  <circle cx="130" cy="150" r="80" fill="#a78bfa" fill-opacity="0.12" filter="url(#conn-glow)" />

  <!-- Left: Pointing Character -->
  <g id="conn-character-group">
    <circle cx="130" cy="150" r="114" fill="none" stroke="#22d3ee" stroke-width="1.5" stroke-dasharray="4 6">
      <animateTransform attributeName="transform" type="rotate" from="0 130 150" to="360 130 150" dur="20s" repeatCount="indefinite" />
    </circle>
    <circle cx="130" cy="150" r="118" fill="none" stroke="#f472b6" stroke-width="1" stroke-opacity="0.5" stroke-dasharray="8 8">
      <animateTransform attributeName="transform" type="rotate" from="360 130 150" to="0 130 150" dur="25s" repeatCount="indefinite" />
    </circle>

    <g clip-path="url(#conn-char-clip)">
      <image x="10" y="30" width="240" height="240" preserveAspectRatio="xMidYMid slice"
        href="data:image/jpeg;base64,${imgPointing}" />
    </g>

    <g transform="translate(225, 140)">
      <polygon points="0,0 12,6 0,12" fill="#22d3ee">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
      </polygon>
    </g>
  </g>

  <!-- Right: Header & Link Cards -->
  <g transform="translate(265, 30)">
    <g transform="translate(0, 0)">
      <text x="0" y="0" class="conn-mono" font-size="10.5" font-weight="800" fill="url(#conn-header-grad)" letter-spacing="1.5">LET'S CONNECT &amp; COLLABORATE</text>
      <text x="0" y="24" class="conn-font" font-size="22" font-weight="900" fill="#f8fafc">Build The Future With Deepak</text>
    </g>

    <!-- 4 Cards in 2x2 Grid -->
    <g transform="translate(0, 42)">
      <!-- Card 1: GitHub -->
      <a href="https://github.com/Deepakvalmigi" target="_blank">
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="315" height="68" rx="12" fill="#121526" stroke="#1e293b" stroke-width="1" />
          <rect x="12" y="12" width="44" height="44" rx="10" fill="#0a0c16" stroke="#22d3ee" stroke-opacity="0.4" stroke-width="1" />
          <path d="${ICONS.github}" fill="#f8fafc" transform="translate(22, 22) scale(1.0)" />
          <text x="68" y="28" class="conn-font" font-size="13.5" font-weight="700" fill="#f8fafc">GitHub Profile</text>
          <text x="68" y="46" class="conn-mono" font-size="10" fill="#94a3b8">@Deepakvalmigi · 20+ Repos</text>
          <!-- Nudging Arrow Inside Card at right edge -->
          <g class="nudge-arr" transform="translate(278, 34)">
            <path d="M0 0l6-4-6-4v3h-10v2h10z" fill="#22d3ee" />
          </g>
        </g>
      </a>

      <!-- Card 2: LinkedIn -->
      <a href="https://linkedin.com/in/deepak-v0786" target="_blank">
        <g transform="translate(330, 0)">
          <rect x="0" y="0" width="315" height="68" rx="12" fill="#121526" stroke="#1e293b" stroke-width="1" />
          <rect x="12" y="12" width="44" height="44" rx="10" fill="#0a0c16" stroke="#0077b5" stroke-opacity="0.4" stroke-width="1" />
          <path d="${ICONS.linkedin}" fill="#0077b5" transform="translate(22, 22) scale(1.0)" />
          <text x="68" y="28" class="conn-font" font-size="13.5" font-weight="700" fill="#f8fafc">LinkedIn Network</text>
          <text x="68" y="46" class="conn-mono" font-size="10" fill="#94a3b8">in/deepak-v0786 · Partnerships</text>
          <g class="nudge-arr" transform="translate(278, 34)">
            <path d="M0 0l6-4-6-4v3h-10v2h10z" fill="#0077b5" />
          </g>
        </g>
      </a>

      <!-- Card 3: Email -->
      <a href="mailto:versalflow.deepak@gmail.com" target="_blank">
        <g transform="translate(0, 80)">
          <rect x="0" y="0" width="315" height="68" rx="12" fill="#121526" stroke="#1e293b" stroke-width="1" />
          <rect x="12" y="12" width="44" height="44" rx="10" fill="#0a0c16" stroke="#ea4335" stroke-opacity="0.4" stroke-width="1" />
          <path d="${ICONS.gmail}" fill="#ea4335" transform="translate(22, 22) scale(1.0)" />
          <text x="68" y="28" class="conn-font" font-size="13.5" font-weight="700" fill="#f8fafc">Direct Founder Email</text>
          <text x="68" y="46" class="conn-mono" font-size="9.5" fill="#94a3b8">versalflow.deepak@gmail.com</text>
          <g class="nudge-arr" transform="translate(278, 34)">
            <path d="M0 0l6-4-6-4v3h-10v2h10z" fill="#ea4335" />
          </g>
        </g>
      </a>

      <!-- Card 4: Instagram -->
      <a href="https://www.instagram.com/_d_e_e_p_a_k_v?igsh=bGUxaXkwOWZhMGtx" target="_blank">
        <g transform="translate(330, 80)">
          <rect x="0" y="0" width="315" height="68" rx="12" fill="#121526" stroke="#1e293b" stroke-width="1" />
          <rect x="12" y="12" width="44" height="44" rx="10" fill="#0a0c16" stroke="#e4405f" stroke-opacity="0.4" stroke-width="1" />
          <path d="${ICONS.instagram}" fill="#e4405f" transform="translate(22, 22) scale(1.0)" />
          <text x="68" y="28" class="conn-font" font-size="13.5" font-weight="700" fill="#f8fafc">Instagram</text>
          <text x="68" y="46" class="conn-mono" font-size="10" fill="#94a3b8">@_d_e_e_p_a_k_v · Founder Life</text>
          <g class="nudge-arr" transform="translate(278, 34)">
            <path d="M0 0l6-4-6-4v3h-10v2h10z" fill="#e4405f" />
          </g>
        </g>
      </a>
    </g>
  </g>
</svg>`;
}

// Generate all 5 files
console.log('Re-building SVGs...');
fs.writeFileSync('hero.svg', buildHero());
fs.writeFileSync('about-life.svg', buildAboutLife());
fs.writeFileSync('stack.svg', buildStack());
fs.writeFileSync('id-dashboard.svg', buildIdDashboard());
fs.writeFileSync('connect.svg', buildConnect());
console.log('ALL 5 SVGS RE-GENERATED SUCCESSFULLY!');
