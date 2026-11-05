# Personal Portfolio & Design Library

A placeholder portfolio and personal UI resource library built with React, TypeScript and Vite.

Live site: https://personal-portfolio-library.vercel.app

## Run locally

```sh
git clone https://github.com/FlamberTheSImplord/personal-portfolio.git
cd personal-portfolio
npm install
npm run dev
```

Open the URL printed by Vite. No environment variables or account credentials are required.

```sh
npm run build
npm run preview
```

## Pages

- Portfolio: placeholder intro, project previews and about section.
- Colour palette: recreations of the two landing pages shown in the reel (Editeaze and Globynk), each in its base and accent state.
- Stageshow: complete upstream playground with 72 catalog entries, motion controls and teaching comparisons.
- Text alignment: switch between centered and left-aligned product-card compositions.

## Source structure

- `src/App.tsx`: four pages and UI interactions.
- `src/palette/`: palette data, the scaled website recreations and their scoped styles.
- `src/style.css`: responsive layouts and original demo illustrations.
- `src/main.tsx`: React entry point.
- `vendor/stageshow/`: complete upstream Stageshow source, skill and references.

## Vercel

Deployed on Vercel from this repository; every push to `main` triggers a new production deployment. Settings: Vite framework preset, build command `npm run build`, output directory `dist`, no environment variables. Both the main app and the nested Stageshow playground (`/vendor/stageshow/playground/index.html`) are built. The main navigation uses hashes, so no SPA rewrite is needed (and a catch-all rewrite would break the nested playground).

## References and attribution

Palette study: [niki.aroca reel](https://www.instagram.com/reels/DfIaULMIRC-/). Includes charcoal/royal blue, the tangerine-accent variation, aqua/midnight, and the baby-pink variation. HEX values are as printed on the reel's swatch cards. The two websites are recreated from the reel's frames with transcribed copy; the reel's photography is replaced with drawn illustrations. These are not the original sites.

Alignment study: [zanderwhitehurst reel](https://www.instagram.com/reels/DcN2nJEu9L2/). Uses an original SVG exercise bike and illustrative product copy/prices.

Stageshow: [Benji Taylor's skills repository](https://github.com/benjitaylor/skills), commit `299140fafd08df55a9c234e610c3f64af3f45531`. MIT license and upstream notices are preserved under `vendor/stageshow`. Brand marks belong to their owners. These are scripted UI demonstrations. The playground HTML script URL was made relative to support the nested build; other upstream source is retained.

The portfolio content is placeholder content; the intro, projects and contact details will be replaced. Google Fonts are used with system-font fallbacks.
