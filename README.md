# My Pompano Dentist — Landing Page

Conversion-focused landing page for **Dr. Andrew Browne, DDS** at My Pompano Dentist in Pompano Beach, FL.

## Live Site

Deployed on Vercel: [my-pompano-dentist-landing.vercel.app](https://my-pompano-dentist-landing.vercel.app)

## What's Included

- **Landing page** (`website/index.html`) — New patient special ($129), services, doctor bio, reviews, specials, and CTAs driving to phone
- **Dr. Browne photo** (`website/dr-browne.png`)
- **AI chatbot** (`api/chat.js`) — Vercel serverless function proxying to Anthropic Claude Sonnet 4.5. Currently disabled pending API key fix. Answers practice questions and simulates appointment booking with lead capture.

## Chatbot Setup

The AI chatbot is built but currently disabled (HTML commented out). To enable:

1. Get a fresh API key from [console.anthropic.com](https://console.anthropic.com/settings/keys)
2. Set it in Vercel: `vercel env add ANTHROPIC_API_KEY production`
3. Optionally set `ALLOWED_ORIGIN` env var if using a custom domain
4. Uncomment the chat widget in `website/index.html` (search for "Chat Widget (disabled")
5. Uncomment the chat CSS block above `</style>` (search for "Chat Widget (disabled) ──")
6. Redeploy: `vercel --prod`

The chatbot uses Claude Sonnet 4.5, is pre-loaded with all practice data, and simulates appointment booking with lead capture (name, phone, email, preferred date, reason for visit).

## Security

- CORS locked to Vercel deployment domains only (regex-validated allowlist)
- Rate limiting: 10 requests/minute per IP on the chat API
- Input validation: max 50 messages, 2000 chars each, role/content type checked
- Security headers: HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy
- API key stored server-side in Vercel env vars (never exposed to client)
- All external links use `rel="noopener noreferrer"`

## Site Optimizations Identified

1. **Inconsistent business hours** — Homepage says Friday closed, contact page says Friday 8AM-12PM
2. **Stale reviews page** — Last updated March 2024, missing ~2 years of reviews
3. **Smile gallery missing procedure labels** — 20 before/after cases with no descriptions (missed SEO)

## Tech Stack

- Static HTML/CSS (no framework, no build step)
- Google Fonts (Inter + Playfair Display)
- Vercel serverless functions (Node.js)
- Anthropic Claude API
