# Gulam Saba Uddin — Portfolio

A responsive portfolio built with Vite, React, and TypeScript. The visual direction is playful and light, with soft green, peach, blue, and yellow accents.

## Run locally

```bash
npm install
npm run dev
```

Use `npm run build` to create the production site in `dist/`, or `npm run preview` to view that build locally.

## Page structure

- `src/components/Hero.tsx` — introduction, portrait, text animation, rosette, and primary action.
- `src/components/Skills.tsx` — skill group carousel and readable technology lists.
- `src/components/Projects.tsx` — responsive project cards and links.
- `src/components/About.tsx` — education and background.
- `src/components/Footer.tsx` — contact links and optional Slice Blade easter egg.
- `src/index.css` — site-wide visual system and responsive layouts.
- `src/data/projects.ts` — project descriptions and technology stacks.
- `src/components/ui/` — reusable Originkit UI components.

The hero portrait is `src/assets/photo.jpeg`. Replace it there to use a different photo. The footer currently uses Gulam's email, GitHub, and LinkedIn links.
