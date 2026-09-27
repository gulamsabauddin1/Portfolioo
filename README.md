# Portfolio

A Vite + React + TypeScript portfolio, built around the Originkit component
set (Liquid Carve / Slide Fill buttons, Metal Rosette, Text Carousel, Block
Text Reveal, Click Effects, Particle Tether, Smooth Scroll Slider, and Slice
Blade as a hidden easter egg in the footer).

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production build
in `dist/`, and `npm run preview` serves that build locally.

## Before you ship it

A few things are placeholders on purpose — search for them and swap in your
real details:

- `src/components/Footer.tsx` — email address, GitHub URL, LinkedIn URL are
  all placeholders (`your-email@example.com`, `your-username`, `your-handle`).
- `src/data/projects.ts` — project blurbs are written from what's in our
  chat history. Check the years, stack lists, and wording against how you'd
  actually describe each one, and add real screenshots if you have them
  (swap `posterFor(p)` for a real image URL per project — the slider accepts
  either).
- The Metal Rosette in the hero and the loading-screen orb both use a cobalt
  blue (`#2f5cff`) as the accent. If you want a different accent color,
  it's set in `src/index.css` (`--accent`) and passed as a prop in a few
  places (`Hero.tsx`, `Footer.tsx`, `Loader.tsx`, `CustomCursor.tsx`) since
  the WebGL/canvas components take real color values, not CSS variables.

## What's in `src/components/ui/`

These are the components you provided, kept unmodified as reusable
primitives (only `SmoothScrollSlider`'s default `images` array was cleared
so it doesn't ship with placeholder stock photos). Everything site-specific
— color choices, copy, layout — lives in the components one level up
(`Hero.tsx`, `Projects.tsx`, `About.tsx`, `Footer.tsx`, `Nav.tsx`,
`Loader.tsx`, `CustomCursor.tsx`, `EasterEgg.tsx`) and in `App.tsx`, which
assembles the page.

## Not wired in yet

The Slice Blade mini-game is included but only reachable through the small
scissors icon in the footer, by design — see the chat for why. If you'd
rather it not be there at all, delete the icon and the `EasterEgg` import
in `Footer.tsx`.
