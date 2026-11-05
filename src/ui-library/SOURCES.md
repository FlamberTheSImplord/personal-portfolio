# UI Library provenance

Current implementation updated 2026-11-06. See the revision section at the end for the full-site implementation; the initial hosted-preview approach below is historical and has been removed.

Reference: https://www.instagram.com/reels/DfNBVUroUTO/

These are original, composed monochrome showcase websites, not exact copies of the official landing pages. The gallery and viewer are app UI. No component from one collection is used in another collection's demo. Generic semantic HTML/layout CSS composes each page.

## Vengeance UI
- Website: https://www.vengenceui.com/
- Source: https://github.com/Ashutoshx7/VengeanceUI
- Snapshot: 298075bd1b883fbcc7b25d8c9894b76a8d683161
- Upstream: src/components/ui/flip-text.tsx and the FlipText section of src/app/globals.css.
- Local: vendor/vengeance/FlipText.tsx and flip.css.
- Changes: utility join helper replaces project alias; CSS is scoped/namespaced; equivalent inline-block utilities supplied locally; monochrome composition, pause and reduced-motion styles added. Original character timing and 3D face animation retained.
- Licence: original MIT notice retained in vendor/vengeance/LICENSE.

## Animate UI
- Website: https://animate-ui.com/ (latest site); selected components are the v1 generation.
- Source: https://github.com/imskyleen/animate-ui
- Snapshot: 1d00dd0fd203ff7f7f4f21e3c104592007283b72
- Upstream apps/v1/apps/www/registry/components/backgrounds/gradient/index.tsx; primitives/buttons/flip/index.tsx; lib/get-strict-context/index.tsx.
- Local: vendor/animate/Gradient.tsx, Flip.tsx, context.tsx.
- Changes: import paths; unused asChild/Slot polymorphism omitted for the React 18 app; focus animation added to hover animation; gradient utility classes replaced by grayscale scoped CSS. Flip variant construction and spring motion retained. Motion 12 supports the existing React 18 app.
- Licence: MIT + Commons Clause, retained verbatim in vendor/animate/LICENSE.md. Components used as part of a composed website. No standalone source-copy/download UI, library packaging or source sale.

## Uiverse
- Website: https://uiverse.io/
- Repository: https://github.com/uiverse-io/galaxy
- Snapshot: adbd2adde0a299a3956ea288fb444ec01891ca41
- Elements: https://uiverse.io/cssbuttons-io/brown-otter-21 and https://uiverse.io/0xnihilism/fast-cat-82.
- Original HTML source and original author comments retained under vendor/uiverse. CSS adaptations scoped to .ul-uiverse; slide keyframes namespaced. The brutalist button colours converted to grayscale. Original interactive structures retained, content and links adapted to creator attribution. A native focus outline is added.
- Licence: original Uiverse.io MIT notice retained in vendor/uiverse/LICENSE. Elements credited individually in the viewer.

## Forge UI
- Website: https://forgeui.in/
- Repository: https://github.com/AmanShakya0018/forgeui
- Repo licence inspected: use in applications allowed, repackaging as a UI library/component collection and distribution repositories prohibited. No Forge source copied into this application.
- Public standalone /preview routes in the repository returned 404 in production. Embed the verified official /components/animated-tabs#preview and /components/stats-card#preview documentation pages, including their original navigation. Full official pages, not isolated local widgets. Both have external fallback links.

## Uilora
- Website: https://www.uilora.com/
- Terms: https://www.uilora.com/terms
- Public source reference: https://www.uilora.com/get-started/web/components/ui-components/buttons/uilora-modern-buttons?full=true
- Official hosted preview: https://library.uilora.com/UIComponents/Button/Modern
- Free/premium access varies. No gated source copied; embed the official public interactive preview with built-in Uilora attribution. No official library GitHub repository verified; the site's GitHub link is a founder profile and is not mislabelled as a repo.

## Website thumbnails and embeds
- Screenshots captured from the five official homepages via the browser on 2026-11-05. Original marks belong to their owners. Displayed with CSS grayscale. Not AI-generated or fabricated screenshots.
- Hosted previews are filtered to grayscale, never intercepted or modified internally. Their availability, behaviour, and internal accessibility/reduced-motion support remain controlled by their creators. No forms or real payments are implemented here.
- Instagram embed loads only on request. Each page always has a direct link to the reel. Third-party restrictions or login can prevent embed playback.


## Full website revision — 2026-11-06 (current)

The initial catalogue embeds and Instagram embed are removed. Gallery images are now actual screenshots of the original concepts implemented in this project, captured through the browser. Every card offers a snapshot dialog and a standalone full website. Each site has its own header, working section navigation/mobile menu, content progression, interactions and footer. A single external Reference link remains per study. No optional device toggle/component panel was implemented.

- **Contour** uses Vengeance FlipText above and adds `src/components/ui/interactive-hover-button.tsx` from the same source revision. Native element structure and dot-expansion/two-layer transition retained; utility CSS translated, monochrome palette, focus support and reduced-motion styles applied. Source retained as `vendor/vengeance/InteractiveHoverButton.tsx`. Project selection and forms are original application composition.
- **Tempo** uses the previously attributed Animate UI v1 components. A task workflow is an original application demo animated with their Motion dependency; automatic advancement pauses when hidden or reduced motion is enabled, and supports manual pause/reset/task selection. Pricing is illustrative; selection does not create an account/payment.
- **Edition** uses the same two Uiverse community elements. The outline element is adapted from an anchor to a button for local navigation; author structure/effects retained. Filtering, project descriptions, poster artwork and enquiry forms are original application composition.
- **Forma** replaces the full Forge documentation iframe with `registry/forgeui/animated-tabs.tsx` from the inspected Forge snapshot. `vendor/forge/AnimatedTabs.tsx` preserves the original spring/layout animation, translates Tailwind utilities to scoped CSS, and adds onChange/aria-pressed. Used as part of the fictional workspace application under the application-use grant. Licence retained verbatim in `vendor/forge/LICENSE`. This does not grant standalone library/component-pack redistribution. The licence also restricts source distribution; do not upload the adapted Forge source to a public GitHub repository without resolving that permission. No deployment or source publication was performed.
- **Luma** replaces the Uilora catalogue iframe with freely accessible **Stroke Fill**, obtained through the normal signed-in Code → Show Full Component view at https://www.uilora.com/get-started/web/components/animations-motion/text-animations/stroke-fill . Modern Buttons was explicitly Pro-only and was not copied. `vendor/uilora/StrokeFill.tsx` preserves SVG text stroke/fill timing; adapts the Motion import, themed typography/fill, scoped CSS, and container size. The website supplies replay and reduced-motion behaviour. Terms/attribution recorded in `vendor/uilora/NOTICE.md`; application/open-source use requires attribution. No credentials, cookies or tokens saved in project files. No official library GitHub repository verified.

Snapshots live in `public/ui-library/snapshots/`. They are actual screenshots, with the gallery displaying their top section. Old official-site thumbnail files are not used by the new gallery. No source-copy/download component service is provided.

## Colour revision — 2026-11-06 (current theme)

User replaced the monochrome requirement with individual colour palettes. `site-colours.css` now supplies application-specific themes: Contour warm ivory/terracotta; Tempo indigo with blue/purple/pink gradient and green completion states; Edition cream/yellow/coral/cobalt; Forma pale slate/blue/teal; Luma porcelain/plum/rose. These are original concept palettes, not claims of official library brand colours. Thumbnail grayscale filtering is removed and screenshots regenerated from all five coloured websites. Uilora StrokeFill's inline target fill and reduced-motion final fill now match the plum theme. Component logic and licence attribution remain unchanged.


## Production release decision — 2026-11-06 (current)

The user selected a reference-only Forge card pending permission. No adapted Forge component source, derivative utility styles or Forma snapshot is included in this release. The old local implementation described historically above was removed before publication. The official Forge website thumbnail and outbound website/GitHub/reference links remain. There are four available full websites and five library cards. The old Forge query URL renders a reference-only notice, never an adapted component.

## BoardUI — added 2026-11-06
- Official: https://www.boardui.com/ · free source: https://github.com/BoardUI/boardui · terms: https://www.boardui.com/license .
- Six actual upstream free components: Switch, Checkbox, Slider, Radio, Tabs and SegmentedControl. Source and shared theme/typography are under `vendor/boardui`, with the complete MIT license and a revision/adaptation notice. No paid Pro source is included.
- Original independent landing-page composition, dashboard mockup, before/after scanner and eight non-interactive orbit thumbnails. These are not official BoardUI marketing-page source or an exact copy of the whole catalogue. Reference interactions: https://www.vengenceui.com/ (scanner), https://animate-ui.com/ (scrolling component arrangement), https://uiverse.io/ (six interactive showcases). Those sites' source was not copied for this addition.
- Reel: https://www.instagram.com/reels/DfQoEk3DosD/ . Free MIT code permits reuse with the notice retained. Pro terms separately restrict source redistribution and competing libraries; buying Pro does not by itself grant those rights.
- Existing React 18 retained. Unused React 19 public ref forwarding removed, local measurement ref retained. Imports are relative; Tailwind output is scoped under `.bui-kit` using `npm run build:boardui`. Keep source MIT notice with redistributed copies.

## SmoothUI — reference only, 2026-11-06
User requested an official reference card without a landing page or component integration. Website: https://smoothui.dev/ . Repository: https://github.com/educlopez/smoothui . Repository LICENSE verified as MIT, copyright 2024 Eduardo Calvo: https://github.com/educlopez/smoothui/blob/main/LICENSE . Only an official-homepage browser screenshot is stored at public/ui-library/thumbnails/smoothui.png; no component or marketing-page source copied. Card links directly to official website, repository and license. Reference-only is a user choice, not a licensing blocker.
