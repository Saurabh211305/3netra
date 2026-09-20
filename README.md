# 3NETRA — Intelligent Security & Surveillance Website

Single-page, conversion-focused marketing site for 3NETRA, built with Next.js 14
(App Router), TypeScript, Tailwind CSS and Framer Motion.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Structure

```
app/                  Root layout, global styles, the single page route
components/           Shared UI primitives (Button, Logo, ImageSlot, Reveal, ...)
components/sections/  The 10 primary landing page sections
lib/                  Analytics event helper, contact constants
```

## Before going live

- **Logo** — `components/Logo.tsx` is a placeholder wordmark. No official 3NETRA
  logo asset was supplied to this repository; swap it for the real SVG/PNG the
  moment one is available, without changing any call sites.
- **Photography** — every image area renders through `components/ImageSlot.tsx`,
  a clearly labelled placeholder (see the `data-image-slot="/images/..."`
  attribute on each). Replace these with real commercial photography at the
  suggested paths under `public/images/`.
- **Contact details** — `lib/contact.ts` holds placeholder phone/WhatsApp/email
  values. Replace with real numbers before launch.
- **Analytics** — GTM / GA4 / Meta Pixel only load when
  `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_META_PIXEL_ID` are set (see `.env.example`).
  No IDs are hard-coded.
- **Lead forms** — the Security Health Check and Final CTA forms currently only
  track analytics events and show a thank-you state client-side; wire
  `onSubmit` in `components/sections/SecurityHealthCheck.tsx` and
  `components/sections/FinalCTA.tsx` to your CRM/email endpoint of choice.
- **Dependency audit** — `npm audit` flags advisories against Next.js's own
  React Server Components/middleware surface; this site uses neither custom
  middleware, server actions, i18n rewrites nor websockets, so exposure is
  low, but revisit before a production deploy on a newer Next.js line.
