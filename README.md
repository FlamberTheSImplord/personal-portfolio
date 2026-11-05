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
- Web designs: Fluento and Ember dashboard recreations with animated metrics.
- UI Designs and Tips: form and paywall before/after studies with automatic stages and sketch annotations.
- UI Library: four responsive website concepts plus a Forge reference card, snapshot previews, and individual colour themes.

## Source structure

- `src/App.tsx`: seven modules, navigation, and standalone showcase routing.
- `src/palette/`: palette data, the scaled website recreations and their scoped styles.
- `src/style.css`: responsive layouts and original demo illustrations.
- `src/main.tsx`: React entry point.
- `vendor/stageshow/`: complete upstream Stageshow source, skill and references.

## Vercel

Deployed on Vercel from this repository; every push to `main` triggers a new production deployment. Settings: Vite framework preset, build command `npm run build`, output directory `dist`, no environment variables. Both the main app and the nested Stageshow playground (`/vendor/stageshow/playground/index.html`) are built. The main navigation uses hashes, so no SPA rewrite is needed (and a catch-all rewrite would break the nested playground).

## References and attribution

The collection uses **6 distinct Instagram references: 5 reels and 1 carousel**, plus the separate Stageshow GitHub source.

Palette study: [niki.aroca reel](https://www.instagram.com/reels/DfIaULMIRC-/). Includes charcoal/royal blue, the tangerine-accent variation, aqua/midnight, and the baby-pink variation. HEX values are as printed on the reel's swatch cards. The two websites are recreated from the reel's frames with transcribed copy; the reel's photography is replaced with drawn illustrations. These are not the original sites.

Alignment study: [zanderwhitehurst reel](https://www.instagram.com/reels/DcN2nJEu9L2/). Uses an original SVG exercise bike and illustrative product copy/prices.

Stageshow: [Benji Taylor's skills repository](https://github.com/benjitaylor/skills), commit `299140fafd08df55a9c234e610c3f64af3f45531`. MIT license and upstream notices are preserved under `vendor/stageshow`. Brand marks belong to their owners. These are scripted UI demonstrations. The playground HTML script URL was made relative to support the nested build; other upstream source is retained.

The portfolio content is placeholder content; the intro, projects and contact details will be replaced. Google Fonts are used with system-font fallbacks.

## Web designs

The fifth tab (`#web-designs`) recreates Fluento’s Dashboard V15 and Word library screens plus Ember’s project dashboard from [code.xr's reel](https://www.instagram.com/reels/DezD0vhzvvL/). Source is isolated in `src/web-designs/`. The reference desktop composition scales proportionally on smaller screens. Portraits are drawn substitutes; exact font, tiny text, and chart data are approximate. Sample content is local demonstration data.

## UI Designs and Tips

Open `#ui-tips` for two square before/after study cards. Each opens an accessible large overlay with the original, five improvement stages, explanations, and a reference link. The form study follows [zanderwhitehurst's reel](https://www.instagram.com/reels/Db8J5z5Oy8-/); the habit-app paywall follows [ux.amish's carousel](https://www.instagram.com/p/DfPJktslgBZ/?img_index=8). Recreated with HTML/CSS; exact fonts and fine details are approximate. Inputs and plan selections are demonstration state only.

## UI Library

Open `/#ui-library` for five library cards: four website concepts and a reference-only Forge card. Each available showcase offers a snapshot and a separate, full responsive website with its own colour palette, header, navigation, content, interactions, and footer:

- Contour / Vengeance UI: FlipText and InteractiveHoverButton, project selector, enquiry demo.
- Tempo / Animate UI v1: FlipButton, GradientBackground, looping task demo with pause/reset/manual selection, sample plan selection.
- Edition / Uiverse: attributed community buttons, filterable concept collection, enquiry demo.
- Forge UI: reference-only card with official website, repository and reel links. No adapted Forge source or full showcase is included until redistribution permission is obtained.
- Luma / Uilora: freely accessible Stroke Fill source, replayable wordmark, service selector, enquiry demo. Premium Modern Buttons is not used.

Full sites open at `?showcase=vengeance#ui-library`, `?showcase=animate#ui-library`, `?showcase=uiverse#ui-library`, and `?showcase=uilora#ui-library`. All concepts and sample plans are fictional. Forms do not transmit data. Each has one **Reference link** beside its source links; no library catalogue or Instagram iframe is embedded. Free/pro badges describe the source library's offerings, not a purchase flow on this website.

Source revisions, adaptations and licence notices are in `src/ui-library/SOURCES.md` and `src/ui-library/vendor/`. Forge restricts source redistribution, so its adapted components and full showcase are excluded from this public release. The card links to official sources only. Uilora allows credited application/open-source use under its terms; its free source was accessed through the normal signed-in Code view, with no premium source copied.

Showcase code is lazy-loaded only for a full site. Snapshot dialogs contain images and restore focus on close. Local animations respect reduced-motion preferences. No new backend or environment variables are needed.
