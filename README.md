# AURA — آئورا

A modern, elegant, and fully-responsive RTL e-commerce experience for a contemporary
women's fashion brand. Built as a production-quality portfolio project with Persian
as the primary language.

## Tech Stack

- **Next.js 15** — App Router, RSC, typed routes
- **TypeScript**
- **Tailwind CSS v4** — design tokens via `@theme`
- **Framer Motion** — subtle, calm micro-interactions
- **Lucide React** — refined iconography
- **next/font** — Vazirmatn (body), El Messiri (display), Cormorant Garamond (Latin logo)
- **React Context** — lightweight cart with `localStorage` persistence

## Features

- Homepage — editorial hero, brand marquee, collections, featured grid, about teaser, newsletter
- Shop — category filters + sorting (newest, price) with URL params
- Product page — detail gallery (zoom views), color swatches, size picker, quantity, animated accordions, related items
- Cart — quantity steppers, remove/clear, live totals, free-shipping progress hint
- Collections, About, Contact (working form demo), 404
- Sticky glass header, full-screen search overlay, mobile menu, add-to-cart toast
- Fully RTL, mobile-first, WCAG-minded (aria labels, focus rings, logical properties)

## Design System

| Token        | Value      |
| ------------ | ---------- |
| `--color-cream` | `#F8F6F2` |
| `--color-ink`   | `#1F1D1B` |
| `--color-mute`  | `#8B8378` |
| `--color-rose`  | `#B98A7D` |
| `--color-sage`  | `#9AA18B` |

Product imagery is generated art-directional SVG (see `scripts/generate-product-art.mjs`)
so the site is fully self-contained with zero external image dependencies.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/                  # Routes (App Router)
components/
  layout/             # Header, footer, search overlay, toast
  home/               # Homepage sections
  product/            # Product card, gallery, info
  shop/  cart/  contact/
  ui/                 # Container, Button, Reveal, SectionHeading
context/              # Cart context
data/                 # Products, collections, site config
types/                # Shared TypeScript types
lib/                  # Utilities
public/images/        # Generated SVG artwork
scripts/              # SVG art generator
```
