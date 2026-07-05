# ShadowStack Website

Marketing site for **ShadowStack** — Joensuu's clan of AI natives.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) — green theme, sharp corners
- [Geist Mono](https://vercel.com/font) typeface
- [GSAP](https://gsap.com) for the hero smile-gallery and scroll reveals
- Deployed on [Vercel](https://vercel.com) (Yoosh team)

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

Single-page site composed of section components in `src/components/site/`:

- `hero.tsx` + `smile-gallery.tsx` — headline, CTA, and the infinite smile-shaped image gallery
- `vibe-jams.tsx` — what vibe coding jams are
- `feedback.tsx` — community testimonials
- `about.tsx` — what ShadowStack is
- `footer.tsx` — contact + social links

Placeholder content lives in `src/lib/` (`site.ts`, `gallery-data.ts`, `testimonials.ts`) and is meant to be rewritten. Hero images are seeded [picsum.photos](https://picsum.photos) placeholders.

## Notes

- A Sanity CMS integration is planned but **not yet wired up**.
- The "Explore Events" CTA links to the ShadowStack [Luma](https://lu.ma/shadowstack) calendar.
