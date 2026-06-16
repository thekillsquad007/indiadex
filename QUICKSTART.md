# Indiadex - Quick Start Guide

## Setup

```bash
cd indiadex
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Get Your Transak API Key

1. Sign up at **https://partners.transak.com/**
2. Create a new project
3. Copy your **API Key** and **API Secret**
4. Update `.env.local`:

```
TRANSAK_API_KEY=your_api_key_here
TRANSAK_API_SECRET=your_api_secret_here
TRANSAK_ENV=STAGING
```

5. Switch to `TRANSAK_ENV=PRODUCTION` when ready to go live

## How It Works

- Users select crypto → enter wallet address → pay via UPI
- Transak widget opens in-page (no redirect)
- Crypto sent directly to user's wallet
- **You earn a markup on every transaction**

## Earning Money

Set your fee markup in the Transak partner dashboard:
- Transak charges base fee (e.g. 2%)
- You add your markup (e.g. 1%)
- Users pay 3% total, you keep 1%
- Payout: Monthly to your bank account

## Deploy

```bash
npm run build
npm start
```

Or deploy to Vercel:
```bash
npx vercel
```

## Files

- `src/app/page.tsx` - Main landing page
- `src/app/api/transak/route.ts` - Transak session API
- `src/components/OnrampWidget.tsx` - Swap widget
- `src/components/Header.tsx` - Navigation
- `src/components/Features.tsx` - Feature cards
- `src/components/HowItWorks.tsx` - Steps section
- `src/components/FAQ.tsx` - Accordion FAQ
- `src/components/Footer.tsx` - Site footer
