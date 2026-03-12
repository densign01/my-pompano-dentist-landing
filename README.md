# My Pompano Dentist — Landing Page

Conversion-focused landing page for **Dr. Andrew Browne, DDS** at My Pompano Dentist in Pompano Beach, FL.

## Live Site

Deployed on Vercel: [my-pompano-dentist-landing.vercel.app](https://my-pompano-dentist-landing.vercel.app)

## What's Included

- **Landing page** (`website/index.html`) — New patient special ($129), services, doctor bio, reviews, specials, and CTAs driving to phone
- **Dr. Browne photo** (`website/dr-browne.png`)
- **AI chatbot** (`api/chat.js`) — Vercel serverless function proxying to Anthropic Claude Sonnet 4.5. Currently disabled pending API key fix. Answers practice questions and simulates appointment booking with lead capture.

## Chatbot Setup

1. Get an API key from [console.anthropic.com](https://console.anthropic.com/settings/keys)
2. Set it in Vercel: `vercel env add ANTHROPIC_API_KEY production`
3. Uncomment the chat widget in `website/index.html` (search for "Chat Widget (disabled")
4. Redeploy: `vercel --prod`

## Site Optimizations Identified

1. **Inconsistent business hours** — Homepage says Friday closed, contact page says Friday 8AM-12PM
2. **Stale reviews page** — Last updated March 2024, missing ~2 years of reviews
3. **Smile gallery missing procedure labels** — 20 before/after cases with no descriptions (missed SEO)

## Tech Stack

- Static HTML/CSS (no framework, no build step)
- Google Fonts (Inter + Playfair Display)
- Vercel serverless functions (Node.js)
- Anthropic Claude API
