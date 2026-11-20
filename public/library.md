# Design library brief

> From Nik Danish's design library (https://personal-portfolio-library.vercel.app/). Read this before building or reviewing UI. Use it on top of your own instructions; they win on conflict.

## What's new

Added 20 Nov 2026: UI rules from “A site with a sense of place” (3); UI rules from “10 niche design hacks” (10); Bold Ideas palette; Raspberry Pink · Mellow White · Pastel Turquoise palette; Azure Navy · Snowy White · Coral Red palette.

## How to use

1. UI rules: apply every rule below. Values are starting points; adjust when the context needs it.
2. Colour: pick the palette below whose mood fits the brief. First colour is the base (about 60%), second the support (about 30%), third the accent (about 10%). Keep text contrast at 4.5:1 or more.
3. UI Library: before building a component from scratch, look for a resource below that fits the stack, style and budget. Prefer entries marked (pick).
4. Web designs: borrow layout patterns from the sites listed at the end.

## UI rules (50)

### 7 UX Laws

Tags: ux, usability, hierarchy, choice

#### Fitts’s Law
- When: Main actions and touch targets.
- Do: One big, easy-to-hit button.
- Avoid: Too small. Too far. Too crowded.
- Values: Targets at least 44×44px, 8px apart, near the thumb or cursor path.
- Check: Destructive actions never sit beside frequent ones.

#### Hick’s Law
- When: Menus, plans and action bars.
- Do: Fewer choices. One next step.
- Avoid: Nine plans. Six actions.
- Values: Three primary choices at most; group or reveal the rest.
- Check: Each screen has one obvious next step.

#### Zeigarnik Effect
- When: Onboarding and multi-step tasks.
- Do: Show what’s left to finish.
- Avoid: An unfinished task with no cue.
- Values: A checklist of what’s left, with a resume button.
- Check: A returning user sees what remains.

#### Jakob’s Law
- When: Navigation, icons and common flows.
- Do: Use familiar patterns.
- Avoid: Unfamiliar icons and labels.
- Values: Standard places: logo top-left, search with a magnifier, cart top-right.
- Check: A first-time user finds the nav without hunting.

#### Goal Gradient
- When: Multi-step flows and rewards.
- Do: Show progress and the finish.
- Avoid: Hide the distance to the goal.
- Values: A progress bar with step count. Start part-filled only when honest.
- Check: Every step shows how far is left.

#### Von Restorff
- When: Screens with several actions.
- Do: Let one action stand out.
- Avoid: Every action shouts.
- Values: One filled primary button; the rest outline or text.
- Check: Squint: one element stands out.

#### Miller’s Law
- When: Long lists, nav and forms.
- Do: Chunk related items.
- Avoid: One long, ungrouped list.
- Values: Groups of about five to seven, each with a label.
- Check: No ungrouped list longer than seven.

### 30 reasons your site looks vibecoded

Tags: colour, typography, layout, copy, motion, trust

#### Soft gradients
- When: Backgrounds, buttons and hero fills.
- Do: Blend two close hues.
- Avoid: Loud, clashing colour shifts.
- Values: Two neighbouring hues, under 30° apart, low saturation.
- Check: Text keeps 4.5:1 contrast across the whole gradient.

#### Icons with a purpose
- When: Adding icons to nav, features or buttons.
- Do: Icons only where they help.
- Avoid: Default icons on everything.
- Values: One icon set, one stroke weight. Icons only where they speed recognition.
- Check: Hide the icon: if the label reads the same, drop it.

#### Layered surfaces
- When: Page and card backgrounds.
- Do: Off-white page, lighter cards.
- Avoid: One flat white page.
- Values: Off-white page (around #f6f6f3); cards one step lighter or bordered.
- Check: Cards stand apart from the page without shadows.

#### One accent colour
- When: Giving colour to UI elements.
- Do: One accent for the main action.
- Avoid: A new colour for every element.
- Values: 60/30/10: base, support, one accent. The accent marks the main action.
- Check: No more than three non-neutral hues on one screen.

#### Light shadows
- When: Cards, buttons and popovers.
- Do: Shadows only on floating layers.
- Avoid: Heavy shadows everywhere.
- Values: In-flow cards flat or 1px border. Shadows only for floating layers (menus, dialogs).
- Check: At most two elevation levels visible at once.

#### Content-led layout
- When: Feature or benefit sections.
- Do: Size items by importance.
- Avoid: Three identical filler cards.
- Values: The lead item is larger. Item count and weight set the layout.
- Check: The section still works with two or five items.

#### Plain headings
- When: Headings, buttons and feature lists.
- Do: Let the words carry it.
- Avoid: Emoji in every heading.
- Values: No emoji in headings or UI labels. A real icon, or nothing.
- Check: Every heading reads as plain text.

#### Readable surfaces
- When: Overlays on images or busy backgrounds.
- Do: Solid surfaces behind text.
- Avoid: Blur that hides the content.
- Values: Solid or 90%+ opaque surfaces. No large backdrop-filter.
- Check: Text keeps 4.5:1 over the busiest part behind it.

#### Short sentences
- When: UI copy and headlines.
- Do: Full stops. Short lines.
- Avoid: A dash in every sentence.
- Values: Short sentences. Full stops and commas; dashes rare.
- Check: At most one dash per screen of copy.

#### Brand typeface
- When: Choosing the type system.
- Do: A typeface that fits the brand.
- Avoid: The default startup font.
- Values: A face that fits the brand. Two families at most.
- Check: The headline couldn’t belong to any startup.

#### No accent stripes
- When: Cards and callouts.
- Do: Spacing and type for hierarchy.
- Avoid: A coloured stripe on every card.
- Values: Separate with spacing, weight and size. Stripes only for status, like errors.
- Check: Hierarchy still reads with the stripes removed.

#### Real testimonials
- When: Social proof.
- Do: Real quotes, with permission.
- Avoid: Invented customer quotes.
- Values: Real quotes with name, role and permission, or a real metric with its source.
- Check: Every quote traces back to a real person.

#### Ordered bento
- When: Grids of mixed items.
- Do: One lead tile, then the rest.
- Avoid: Boxes with no reading order.
- Values: One largest tile as the entry point. Tiles ordered by reading path.
- Check: You can name what the eye reads first, second and third.

#### Show the real product
- When: Showing a product in a hero.
- Do: The actual interface.
- Avoid: A fake terminal for any product.
- Values: A real product screen or live demo. Terminals only for CLI products.
- Check: The visual shows the actual product.

#### Plain headlines
- When: Headlines.
- Do: Say what it does.
- Avoid: “It’s not X, it’s Y.”
- Values: Say what it does, and for whom, in one line.
- Check: The headline works without a contrast twist.

#### Specific benefits
- When: Benefit lists.
- Do: A few concrete benefits.
- Avoid: A checkmark beside every claim.
- Values: Three to five concrete benefits, no check icon on each line.
- Check: Each line names an outcome, not an adjective.

#### Plans that fit
- When: Pricing sections.
- Do: One plan per real customer type.
- Avoid: Three plans out of habit.
- Values: Plan count follows real customer types; often two.
- Check: Each plan has one clear reason to pick it.

#### Live product demo
- When: Product landing pages.
- Do: Show one real task.
- Avoid: Promises with no product.
- Values: One real task shown end to end: video, GIF or interactive.
- Check: The product is seen working within one scroll.

#### Radius scale
- When: Border radius.
- Do: A small, consistent radius scale.
- Avoid: Every shape a pill.
- Values: A scale, such as 4 / 8 / 12px. Pills only for tags and toggles.
- Check: Inner radius = outer radius − padding.

#### Your own palette
- When: Brand colour.
- Do: Colours from the brand itself.
- Avoid: The trendy purple and black.
- Values: A palette drawn from the brand’s subject, not the trend.
- Check: The palette differs from the closest competitors.

#### Skeleton loaders
- When: Content that takes over 300ms to load.
- Do: Show the layout that’s coming.
- Avoid: A blank screen while loading.
- Values: A skeleton in the final layout. Spinners only for short actions.
- Check: No layout shift when content arrives.

#### No glow orbs
- When: Section backgrounds.
- Do: Let the content hold focus.
- Avoid: A glow behind every section.
- Values: Plain by default. One glow at most, behind the focal point.
- Check: Removing the glow loses nothing.

#### Quiet backgrounds
- When: Decorative backgrounds.
- Do: Plain space around text.
- Avoid: A pattern with no purpose.
- Values: Only behind empty areas, at low contrast.
- Check: No pattern behind body text.

#### Specific icons
- When: AI features and brand marks.
- Do: An icon for the actual action.
- Avoid: Sparkles on every AI feature.
- Values: An icon for the specific action, like summarise or translate.
- Check: The icon makes sense without the word AI.

#### Still arrows
- When: Links and CTAs.
- Do: Move only on hover.
- Avoid: Arrows that never stop moving.
- Values: Arrows move only on hover or focus: about 4px, 150–200ms. No idle loops.
- Check: Nothing moves while the user is idle.

#### Terms link
- When: Any site with sign-ups or payments.
- Do: Terms in the footer.
- Avoid: No terms of service.
- Values: A Terms link in the footer of every page.
- Check: Terms are one click from sign-up and checkout.

#### Privacy link
- When: Any site that collects data, analytics included.
- Do: Privacy in the footer.
- Avoid: No privacy policy.
- Values: A Privacy link in the footer of every page.
- Check: The policy says what is collected and why.

#### Subtle hover
- When: Interactive elements.
- Do: A small colour change.
- Avoid: Every card jumps on hover.
- Values: Colour or underline changes, 120–200ms. No scale or tilt on every card.
- Check: With reduced motion on, hover still gives feedback.

#### One bright colour
- When: Accent and highlight colours.
- Do: One bright focal point.
- Avoid: Neon on every surface.
- Values: Bright colour on one focal element per screen.
- Check: No body text in neon; contrast stays 4.5:1.

#### Anchored pastels
- When: Soft palettes.
- Do: Pastels plus one dark tone.
- Avoid: Pastels picked by default.
- Values: Pastels from the brand, plus one dark anchor for text and actions.
- Check: Buttons and text pass 4.5:1 on pastel surfaces.

### A site with a sense of place

Tags: motion, navigation, transitions

#### Carry, don’t cut
- When: A card, row or thumbnail opens a detail page.
- Do: Grow the tapped card into the page.
- Avoid: The page cuts in from nowhere.
- Values: Expand from the card’s own box, 300–400ms, ease-out. The image keeps its place.
- Check: You can tell which card opened the page.

#### Back to the card
- When: Leaving a detail page.
- Do: Shrink the page back into its card.
- Avoid: Back drops you at the top of the list.
- Values: Reverse the open motion, 250–300ms. Keep the list’s scroll position.
- Check: After back, the same card is in view and focused.

#### Menus from their button
- When: Menus, popovers and dropdowns.
- Do: Grow the menu out of its button.
- Avoid: The menu appears from nowhere.
- Values: transform-origin at the button. Scale 0.9 → 1 with a fade, 180–220ms. Close back into it.
- Check: Closing returns focus to the button.

### 10 niche design hacks

Tags: colour, css, motion, surface

#### Nested radius
- When: Cards, buttons or images inside rounded containers.
- Do: Inner radius = outer − padding.
- Avoid: Same radius inside and out.
- Values: inner = outer − padding. 24px outer with 8px padding → 16px inner.
- Check: The corners run parallel with an even gap.

#### Alpha borders
- When: Borders and dividers on varied backgrounds.
- Do: Borders in alpha, like rgb(0 0 0 / 0.12).
- Avoid: Solid grey borders that clash on colour.
- Values: rgb(0 0 0 / 0.08–0.15) on light, rgb(255 255 255 / 0.1–0.15) on dark.
- Check: The border looks right on every surface it sits on.

#### OKLCH palettes
- When: Colour scales and theme palettes.
- Do: Build palettes in OKLCH.
- Avoid: HSL colours that look uneven.
- Values: Keep L fixed for equal-weight colours; step L by about 0.08 for scales.
- Check: Swatches with the same L look equally bright.

#### Gradients in OKLCH
- When: Gradients between distant hues.
- Do: Add “in oklch” to the gradient.
- Avoid: A grey, muddy middle.
- Values: linear-gradient(90deg in oklch, blue, orange)
- Check: No grey band in the middle.

#### Icon stroke matches text
- When: Icons next to labels.
- Do: Match the stroke to the text weight.
- Avoid: Thin icons beside bold text.
- Values: At 20px: regular text ≈ 1.5px stroke, semibold ≈ 2px, bold ≈ 2.5px.
- Check: Icon and label look the same weight.

#### Faded carousel edges
- When: Horizontal scrollers and carousels.
- Do: Fade the edges with a mask.
- Avoid: Cards cut off by a hard edge.
- Values: mask: linear-gradient(90deg, transparent, black 15% 85%, transparent)
- Check: The edges hint at more without a hard cut.

#### Blurred icon swaps
- When: Toggles that change an icon, like copy → check.
- Do: Blur the old icon as it fades out.
- Avoid: Icons that snap from one to the next.
- Values: Outgoing icon: opacity 0, blur(4px), scale 0.8 over 150–200ms.
- Check: The swap reads as one motion, not a flicker.

#### Lighter surfaces in dark mode
- When: Dark themes with cards, menus and dialogs.
- Do: Raise surfaces by making them lighter.
- Avoid: Shadows that vanish on dark.
- Values: Each level about 4–6% lighter than the one below it.
- Check: Layers still read apart with shadows off.

#### Full height with 100dvh
- When: Full-screen heroes and app shells on mobile.
- Do: Use 100dvh for full-height sections.
- Avoid: 100vh hides content behind mobile browser bars.
- Values: min-height: 100dvh, with 100vh on the line before as a fallback.
- Check: In iOS Safari the bottom button stays visible.

#### Multiply product shots
- When: Product photos with white backgrounds on tinted surfaces.
- Do: mix-blend-mode: multiply on the image.
- Avoid: White boxes around product photos.
- Values: mix-blend-mode: multiply. Only on light backgrounds.
- Check: No white box shows around the product.

### Before → after studies

#### Form fields (https://www.instagram.com/reels/Db8J5z5Oy8-/)
- Spacing: Use a consistent gap between fields.
- Persistent labels: Keep labels visible after entry.
- Control shape: Match field and button shapes.
- Focused entry: Use numeric input. Try Account number.
- The result: A clear title, labels, and next action.

#### Paywall (https://www.instagram.com/p/DfPJktslgBZ/?img_index=8)
- The headline: Lead with the habit outcome.
- The hero: Show the habit grid.
- The benefits: Three icons. Three short benefits.
- The plans: Two plans. Clear savings and billing.
- The colours: Deep green, cream, and more space.

### Hero layouts

#### The stepped stage
A centred message inside a descending silhouette.
- Build a valley around the message: Lead the eye toward the message.
- Keep the reading path central: Keep the reading path predictable.
- Anchor the bottom edge: Balance the open space above.
- Motion: Staggered headline, light sweeps, rising button.

#### Future arm prosthetics
An editorial grid with a product as its spine.
- Give the product the central column: Let the product anchor the layout.
- Treat the headline as a shape: Balance the product without covering it.
- Put supporting stories at the edges: Separate primary and supporting information.
- Motion: Staggered entrance, product loop.

#### Yeezy in bloom
An immersive product stage with a quiet purchase corner.
- Let the product own the middle: Make the product instantly recognisable.
- Group the decision at bottom right: Keep the decision in one place.
- Use the edges for secondary controls: Give the product room.
- Motion: Moving petals, sliding purchase panel.

#### Minipresso GR2
Organic panels that turn a product into an experience.
- Shape the image around the content: Compose one connected surface.
- Explain the product beside its name: Show the product’s scale and purpose.
- Reserve a corner for the object: Connect the experience to the object.
- Motion: Brewing loop, staggered text.

#### ZYRO, one place
A luminous arc with a monumental wordmark.
- Use light to frame the name: Guide attention toward the centre.
- Make the identity the hero: Let the identity carry the hero.
- Place the explanation below the spectacle: Explain after the initial visual impact.
- Motion: Growing arc, staggered wordmark, soft glow.

## Colour palettes (25)

- Morning Butter · Blue Grey: base Morning Butter #F3D98F, support Blue Grey #7298C7. Moods: pastel, earthy. Best contrast 2.2:1.
- Petal Frost · Berry Blush: base Petal Frost #FEDDE8, support Berry Blush #974472. Moods: light, pastel, muted, mono, gradient. Best contrast 4.9:1.
- Cool Blue · Plum Noir: base Cool Blue #D8EFFD, support Plum Noir #341F28. Moods: dark, light, pastel, muted. Best contrast 12.9:1.
- Lime Cream · Vintage Grape: base Lime Cream #DDEA78, support Vintage Grape #433455. Moods: dark, light. Best contrast 8.7:1.
- Sand Dune · Hunter Green: base Sand Dune #DDD6B9, support Hunter Green #3E5F44. Moods: pastel, earthy, muted, gradient. Best contrast 4.9:1.
- Cherry Blossom · Phthalo Green: base Cherry Blossom #EFA8AC, support Phthalo Green #00382E. Moods: dark, earthy, muted. Best contrast 6.8:1.
- Cream · Dark Coffee: base Cream #FFFEC5, support Dark Coffee #39241F. Moods: dark, light, pastel, earthy, muted. Best contrast 14.0:1.
- Editeaze · Electric contrast: base Charcoal black #21232E, support Royal blue #105BFF, accent Tangerine orange #FE8500. Moods: dark, vivid, gradient. Best contrast 6.4:1.
- Globynk · After midnight: base Midnight abyss #171F44, support Aqua jade #74FFED, accent Baby pink #FE81D1. Moods: dark, pastel, vivid. Best contrast 13.1:1.
- Murmur · Done by morning: base Dusk Blue #8FB4E3, support Midnight Navy #0D1A33, accent Sunset Orange #FF6A2B. Moods: vivid. Best contrast 8.1:1.
- Timbre · Accent included: base Oxblood Red #4A0F14, support Apricot Glow #F6B27A, accent Electric Cyan #19D3FF. Moods: dark, earthy. Best contrast 8.6:1.
- Pocket · Swings like a person: base Chalk White #F3F2EE, support Ink Black #08080C, accent Acid Green #B6FF2E. Moods: light, vivid. Best contrast 17.8:1.
- Altaval · Fresh snow overnight: base Glacier Blue #62A7EA, support Navy #0C1B48, accent Lemon #F2EA1E. Moods: vivid. Best contrast 13.1:1.
- Kiln Coffee · Roasted to the core: base Deep Teal #013230, support Cream #F3EBDD, accent Orange #FF6A1F. Moods: dark, vivid, earthy, gradient. Best contrast 11.8:1.
- Merrow · Ten thousand orchids: base Cream #ECE6DC, support Ink #050505, accent Orchid Pink #E65BC4. Moods: light, vivid. Best contrast 16.4:1.
- Halden Dance Theatre · Spring season: base Bottle Green #0F372B, support Bone #EFE7DA, accent Vermilion #E8392B. Moods: dark, vivid, earthy, gradient. Best contrast 10.7:1.
- Bagni Ortensia · Sunbeds by the sea: base Sand #DFBFA0, support Terracotta #7A3E28, accent Cobalt #0C45B0. Moods: vivid, earthy, gradient. Best contrast 4.9:1.
- Naosu · Mended in gold: base Indigo #0B1325, support Celadon #A9CDBE, accent Gold #F2B53A. Moods: dark, vivid, muted, gradient. Best contrast 10.7:1.
- Feel Every Moment · Acid lime sound: base Midnight Black #06080C, support Electric Cobalt Blue #003BBF, accent Acid Lime #CDF31B. Moods: dark, vivid, gradient. Best contrast 15.7:1.
- Veyra · The future of work: base Concrete #C9BEB4, support Ink #111214, accent Lime #A7C81A. Moods: vivid, earthy, mono. Best contrast 10.3:1.
- Base Club · SocialFi people: base Red Orange #F32102, support Snowy White #FAF7FC, accent Yellow Punk #C1F701. Moods: vivid, gradient. Best contrast 3.9:1.
- Tennis Academy · Play strong: base Sky Blue #298BD0, support Cloud White #F4F6FA, accent Scarlet Red #E5282F. Moods: vivid, gradient. Best contrast 4.2:1.
- Bold Ideas · Creative branding: base Deep Maroon #250104, support Tomato Red #D71A06, accent Neon Yellow #CDF73E. Moods: dark, vivid, earthy, gradient. Best contrast 15.6:1.
- Raspberry Pink · Mellow White · Pastel Turquoise: base Raspberry Pink #CD096B, support Mellow White #FEFDFE, accent Pastel Turquoise #62FAC7. Moods: vivid, gradient. Best contrast 5.4:1.
- Azure Navy · Snowy White · Coral Red: base Azure Navy #044A88, support Snowy White #FEFDFE, accent Coral Red #FE5F4C. Moods: vivid, gradient. Best contrast 8.8:1.

## UI Library (90)

### Animated components
Copy-paste React effects.

- [React Bits](https://reactbits.dev/) (pick): Animated components and backgrounds for React. Use: shadcn CLI · copy-paste. Tags: text effects, backgrounds, micro-interactions. Stack: React, Tailwind, CSS. Price: Free + Pro.
- [Magic UI](https://magicui.design/) (pick): Animated components and templates for landing pages. Use: shadcn CLI. Tags: templates, text effects, backgrounds. Stack: React, Tailwind, Motion, shadcn. Price: Free + Pro.
- [Aceternity UI](https://ui.aceternity.com/) (pick): Animated React and Tailwind components, blocks and templates. Use: shadcn CLI · copy-paste. Tags: blocks, templates, backgrounds, cards. Stack: React, Tailwind, Motion. Price: Free + Pro.
- [Cult UI](https://www.cult-ui.com/) (pick): 154 free animated shadcn/ui components. Use: shadcn CLI. Tags: cards, blocks, charts. Stack: React, Tailwind, shadcn. Price: Free.
- [Animate UI](https://animate-ui.com/): Animated primitives for Radix, Base UI and React Aria. Use: shadcn CLI. Tags: icons, micro-interactions, buttons. Stack: React, Tailwind, Motion. Price: Free.
- [SmoothUI](https://smoothui.dev/): Animated shadcn/ui components and blocks. Use: shadcn CLI · copy-paste. Tags: blocks, templates, micro-interactions. Stack: React, Tailwind, Motion, shadcn. Price: Free.
- [Vengeance UI](https://www.vengenceui.com/): Hover effects, tooltips and scroll-driven layouts. Use: copy-paste. Tags: text effects, micro-interactions. Stack: React, CSS, Motion. Price: Free.
- [Uilora](https://www.uilora.com/): 700+ animated components for React and React Native. Use: copy-paste. Tags: text effects, micro-interactions. Stack: React, Tailwind. Price: Free + Pro.
- [Motion Primitives](https://motion-primitives.com/): Open-source animated components for React. Use: copy-paste. Tags: text effects, micro-interactions. Stack: React, Tailwind, Motion. Price: Free.
- [Animata](https://animata.design/): 157+ free animated React components. Use: copy-paste. Tags: backgrounds, buttons, text effects, cards. Stack: React. Price: Free.
- [Spell UI](https://spell.sh/): Refined React components for design engineers. Use: copy-paste. Tags: buttons, text effects, forms, backgrounds. Stack: React, Tailwind. Price: Free.
- [Eldora UI](https://www.eldoraui.site/): 150+ free animated React components. Use: copy-paste. Tags: templates, blocks, sections. Stack: React, Tailwind, Motion. Price: Free.
- [Fancy Components](https://www.fancycomponents.dev/): Playful React components and microinteractions. Use: copy-paste. Tags: text effects, micro-interactions. Stack: React, Tailwind, Motion. Price: Free.
- [Rare UI](https://www.rareui.com/): 30+ unusual animated React components. Use: shadcn CLI. Tags: text effects, forms, micro-interactions, mcp. Stack: React, Motion. Price: Free.
- [Devigner UI](https://ui.devigner.cc/): 28 animated React components, added as source files. Use: CLI · copy-paste. Tags: micro-interactions. Stack: React, Tailwind, Motion. Price: Free.
- [Microkit](https://microkit.co/): 57 microinteractions in React and CSS. Use: shadcn CLI · copy-paste. Tags: micro-interactions, buttons, forms, cards. Stack: React, Tailwind, CSS. Price: Free.
- [Bencho](https://bencho.dev/): Interactive React components and micro-interactions. Use: free account. Tags: micro-interactions, forms, cards, toggles. Stack: React. Price: Free + Pro.
- [Reverse UI](https://reverseui.com/): 69 animated components, 19 of them free. Use: copy-paste. Tags: text effects, navigation, loaders. Stack: React, Motion. Price: Free + Pro.
- [Spy UI](https://spyui.online/): 600+ animated React and Next.js components. Use: CLI · copy-paste. Tags: blocks, backgrounds, charts. Stack: React, Tailwind, Motion. Price: Free + Pro.
- [OriginKit](https://www.originkit.dev/): 806 free animated components for websites. Use: browse. Tags: backgrounds, buttons. Price: Free.
- [useLayouts](https://uselayouts.com/): 69 free animated React layouts and interactions. Use: copy-paste. Tags: blocks, navigation, micro-interactions. Stack: React, Tailwind, Motion. Price: Free.
- [Coded Visuals](https://codedvisuals.com/): Animated marketing visuals for React and shadcn/ui. Use: copy-paste. Tags: sections, ai ui, mcp. Stack: React, Tailwind, Motion, shadcn. Price: Free + Pro.
- [Libraries.dev](https://libraries.dev/): Effect libraries for AI interfaces, installed from npm. Use: npm. Tags: ai ui, micro-interactions. Stack: React. Price: Free + Pro.
- [Kinetics](https://kinetics.colorion.co/): 162 spring animation examples in CSS and React. Use: copy-paste. Tags: motion, micro-interactions, buttons. Stack: React, CSS. Price: Free.
- [Details Vault](https://www.details.so/vault): Searchable vault of web animation code snippets. Use: copy-paste. Tags: transitions, navigation, micro-interactions. Price: Free + Pro.

### Component kits
Everyday app UI to build with.

- [shadcn/ui](https://ui.shadcn.com/) (pick): Open-source components you copy in and own. Use: shadcn CLI. Tags: design systems, blocks, charts, forms. Stack: React, Tailwind, shadcn. Price: Free.
- [21st.dev](https://21st.dev/) (pick): 12,000+ React components, templates and themes. Use: shadcn CLI. Tags: templates, backgrounds, blocks. Stack: React, Tailwind. Price: Free + Pro.
- [BoardUI](https://www.boardui.com/): React design system for dashboards and data apps. Use: copy-paste · npm. Tags: design systems, charts, dashboards, forms. Stack: React, Tailwind. Price: Free + Pro.
- [Forge UI](https://forgeui.in/): shadcn/ui components, SaaS blocks and illustrations. Use: shadcn CLI. Tags: blocks, templates, sections. Stack: React, Motion, shadcn. Price: Free + Pro.
- [Kokonut UI](https://kokonutui.com/): 116 free React components for AI apps. Use: shadcn CLI. Tags: ai ui, cards, buttons, forms. Stack: React, Tailwind, Motion, shadcn. Price: Free + Pro.
- [UI Layouts](https://www.ui-layouts.com/): Components, effects and 100+ free blocks. Use: copy-paste. Tags: blocks, micro-interactions, mcp. Stack: React. Price: Free + Pro.
- [UIable](https://uiable.com/): 779+ shadcn blocks, templates and dashboards. Use: copy-paste. Tags: blocks, templates, sections, dashboards. Stack: React, Tailwind, Motion, shadcn. Price: Free + Pro.
- [UI Arc](https://uiarc.dev/): 247 animated components and 130 blocks. Use: shadcn CLI · copy-paste. Tags: blocks, dashboards, navigation, charts. Stack: React. Price: Free + Pro.
- [Kobra](https://kobra.systems/): shadcn-compatible components with Free and Pro tiers. Use: shadcn CLI. Tags: design systems, forms, navigation, ai ui. Stack: React, Motion, shadcn. Price: Free + Pro.
- [Nexvyn UI](https://ui.nexvyn.dev/): React UI library for design engineers, early access. Use: shadcn CLI. Tags: design systems, forms, buttons, navigation. Stack: React. Price: Free.
- [Beautiful UI](https://www.beautifului.dev/): 21 copy-paste primitives for AI interfaces. Use: copy-paste. Tags: ai ui, loaders. Price: Free.
- [Neobrutalism Components](https://www.neobrutalism.dev/): 64 neobrutalist components for shadcn/ui. Use: shadcn CLI · copy-paste. Tags: design systems, charts, forms. Stack: React, Tailwind, shadcn. Price: Free.
- [Oversight Supply](https://supply.madebyoversight.com/): 192 Webflow and Framer sections and templates. Use: copy-paste. Tags: templates, sections. Stack: No-code. Price: Free + Pro.
- [HorizonX](https://horizonx.so/): UI kits, templates, shaders and mockups by subscription. Use: download. Tags: templates, backgrounds, mcp. Stack: Figma, CSS. Price: Paid.
- [UI8](https://ui8.net/): Marketplace of 14,000+ UI kits and templates. Use: download. Tags: templates, mcp. Stack: Figma. Price: Paid.

### CSS snippets
Plain HTML and CSS, no framework.

- [Uiverse](https://uiverse.io/) (pick): Community HTML and CSS elements. Use: copy-paste. Tags: buttons, loaders, toggles, forms, cards. Stack: CSS. Price: Free.
- [Gradient Buttons](https://gradientbuttons.colorion.co/): CSS gradient buttons with one-click copy. Use: copy-paste. Tags: buttons. Stack: CSS. Price: Free.

### 3D & motion demos
Three.js scenes and scripted demos.

- [ThreeUI](https://threeui.com/): Three.js scenes, shaders and landing pages. Use: copy-paste. Tags: 3d, backgrounds, templates. Stack: Three.js. Price: Free + Pro.
- [Stageshow](https://personal-portfolio-library.vercel.app/vendor/stageshow/playground/index.html): Scripted product-demo animations, 72 examples. Use: local playground. Tags: motion. Price: Free.
- [Canvas UI](https://canvasui.dev/): 35 WebGL and WebGPU effects for HTML. Use: shadcn CLI. Tags: 3d, backgrounds. Stack: React, Vue, Svelte. Price: Free.
- [Motion in Design](https://motionin.design/): Interactive web sections delivered as AI prompts. Use: copy-paste. Tags: 3d, sections. Stack: React, Three.js. Price: Free + Pro.
- [Isoglow](https://isoglow.dev/): Claude skill for glowing isometric HTML figures. Use: download. Tags: 3d. Stack: Three.js. Price: Free + Pro.

### Specialty
One job each: icons, charts, maps, loaders, players.

- [Motion](https://motion.dev/) (pick): Animation library for React, JavaScript and Vue. Use: npm. Tags: motion. Stack: React, Vue. Price: Free + Pro.
- [Devigner Icons](https://icons.devigner.cc/): 2,496 free SVG icons in five styles. Use: npm · CDN. Tags: icons. Stack: React, Vue, Svelte, Tailwind. Price: Free.
- [Font Awesome](https://fontawesome.com/): 60k+ icons in 30+ styles, free set open source. Use: npm · CDN · kit. Tags: icons. Stack: React, Vue, CSS. Price: Free + Pro.
- [shadcn.io Icons](https://www.shadcn.io/icons): 222 icon libraries as React components. Third-party, not shadcn/ui. Use: shadcn CLI · copy-paste · download. Tags: icons. Stack: React. Price: Free + Pro.
- [IconMCP](https://iconmcp.com/): 6,248 original icons, searchable by meaning over MCP. Use: MCP · copy-paste. Tags: icons, mcp. Price: Free.
- [Evil Charts](https://evilcharts.com/): Animated shadcn charts on Recharts or ECharts. Use: shadcn CLI. Tags: charts. Stack: React, Motion, shadcn. Price: Free.
- [mapcn](https://www.mapcn.dev/): MapLibre map components for React and Tailwind. Use: shadcn CLI. Tags: maps. Stack: React, Tailwind, shadcn. Price: Free.
- [player.style](https://player.style/): Video and audio player themes by Mux. Use: copy-paste. Tags: media players. Stack: CSS, React, Vue, Svelte. Price: Free.
- [Toggles](https://toggles.dev/): 14 animated light and dark theme toggles. Use: shadcn CLI · npm · copy-paste. Tags: toggles. Stack: React, Vue, Svelte. Price: Free.
- [Circle Loaders](https://circleloaders.dominikakissi.com/): 24 monochrome SVG loaders, no dependencies. Use: copy-paste. Tags: loaders. Stack: CSS. Price: Free.
- [loading.dev](https://loading.dev/): React loading spinners, installed from npm. Use: npm. Tags: loaders. Stack: React. Price: Free.
- [Transitions.dev](https://transitions.dev/): 43+ UI transitions plus an AI builder. Use: copy-paste. Tags: transitions, mcp. Stack: CSS, React. Price: Free + Pro.
- [animos](https://animos.app/): Browser tool that turns design shots into motion videos. Use: browser app. Tags: motion. Stack: No-code. Price: Free + Pro.

### Inspiration
Real designs to study, not code.

- [Mobbin](https://mobbin.com/) (pick): 600,000+ screens from real mobile and web apps. Use: browse. Tags: screens. Price: Free + Pro.
- [Refero](https://refero.design/): Real web and iOS screens, flows and UX patterns. Use: browse. Tags: screens, mcp. Price: Free + Pro.
- [ScreensDesign](https://screensdesign.com/): Recorded app flows, including paywalls and onboarding. Use: browse. Tags: screens. Price: Free + Pro.
- [Unsection](https://www.unsection.com/): Website sections sorted by type. Use: browse. Tags: sections. Price: Free.
- [Bento Grids](https://bentogrids.com/): Bento grid layouts collected from real sites. Use: browse. Tags: sections. Price: Free.
- [mesh3d.gallery](https://mesh3d.gallery/): Curated gallery of Three.js and WebGL websites. Use: browse. Tags: screens, 3d. Price: Free.
- [Collect UI](https://collectui.com/): Interface shots sorted by component. Use: browse. Tags: screens. Price: Free.
- [Awwwards](https://www.awwwards.com/): Jury-picked best websites, daily. Use: browse. Tags: screens. Price: Free.
- [recent.design](https://recent.design/): Daily picks of design, sites and tools. Formerly Godly. Use: browse. Tags: screens. Price: Free.
- [Zajno Motion](https://motion.zajno.com/): Short guide to UI motion: easing, delay, morphing. Use: browse. Tags: motion. Price: Free.
- [Final UI](https://finalui.com/): Handpicked tools, kits, books and courses for UI work. Use: browse. Tags: directory. Price: Free.
- [Style UI](https://style.ai.id/ui-components/): Directory of 49 UI libraries and design tools. Use: browse. Tags: directory. Price: Free.

### Colour tools
Palettes, scales, gradients and contrast.

- [Realtime Colors](https://www.realtimecolors.com/) (pick): Try a palette and fonts on a sample website. Use: browser app · Figma plugin. Tags: palettes, contrast. Stack: CSS, Tailwind, Figma. Price: Free.
- [Happy Hues](https://www.happyhues.co/): 17 palettes shown applied to a real layout. Use: browse. Tags: palettes. Price: Free.
- [Adobe Color](https://color.adobe.com/create/color-wheel): Colour wheel with harmony rules and a contrast checker. Use: browser app. Tags: palettes, contrast. Price: Free.
- [Coolors](https://coolors.co/): Palette generator with 10M+ palettes to explore. Use: browser app · Figma plugin. Tags: palettes, gradients, contrast. Stack: CSS, Tailwind, Figma. Price: Free + Pro.
- [Color Hunt](https://colorhunt.co/): Hand-picked four-colour palettes, sorted by tag. Use: browse. Tags: palettes. Price: Free.
- [Huemint](https://huemint.com/): AI palettes for brands, websites and graphics. Use: browser app. Tags: palettes, ai tools. Price: Free.
- [Radix Colors](https://www.radix-ui.com/colors) (pick): 31 accessible 12-step colour scales for UI. Use: npm · copy-paste. Tags: palettes, contrast, design systems. Stack: CSS. Price: Free.
- [UI Colors](https://uicolors.app/): Tailwind shade generator, previewed on components. Use: browser app · Figma plugin. Tags: palettes. Stack: Tailwind, Figma. Price: Free + Pro.
- [OKLCH Picker](https://oklch.com/): OKLCH colour picker and converter by Evil Martians. Use: browser app. Tags: palettes, gradients. Stack: CSS. Price: Free.
- [uiGradients](https://uigradients.com/): Two-colour gradients with copy-ready CSS. Use: copy-paste. Tags: gradients, backgrounds. Stack: CSS. Price: Free.
- [OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl): Evil Martians guide: why OKLCH beats RGB and HSL. Use: read. Tags: palettes, gradients. Stack: CSS. Price: Free.
- [Building Your Color Palette](https://www.refactoringui.com/previews/building-your-color-palette): Refactoring UI chapter on greys, primaries and shade scales. Use: read. Tags: palettes, design systems. Price: Free.

### Beyond UI
Fonts, brands, decks, social posts and AI site tools.

- [Typewolf](https://www.typewolf.com/): Fonts used on real sites, plus pairing guides. Use: browse. Tags: fonts. Price: Free + Pro.
- [Brand Guidelines](https://www.brandguidelines.net/): Brand guideline PDFs from real companies. Use: browse. Tags: branding. Price: Free + Pro.
- [Deck.Gallery](https://www.deck.gallery/): Curated pitch decks, reports and brand guides. Use: browse. Tags: decks, branding, mcp. Price: Free + Pro.
- [MotionSites](https://motionsites.ai/): AI website prompts with motion-heavy previews. Use: copy prompt. Tags: ai tools, sections, motion, mcp. Stack: No-code. Price: Free + Pro.
- [Snalb](https://snalb.com/): Social media posts and carousels from real brands. Use: browse. Tags: social posts, branding. Price: Free.
- [MotionSites Studio](https://studio.motionsites.ai/): AI builds a site from a chosen MotionSites design. Use: browser app. Tags: ai tools. Stack: No-code. Price: Paid.

## Web designs (7)

- Fluento · Dashboard V15 and Word library
- Ember · Projects dashboard
- Code XR · Admin Dashboard V2 (overview, finance, moderation, announcements)
- Fintrack · working budget dashboard (drag-and-drop budget board, transactions, goals, summary), after yasrinoori
- Altaval · ski resort landing page (snow report, piste map, ski school, stays, pass builder), hero after charles.unemployed
- Kiln Coffee · roaster landing page (shop, roast dial, subscription builder, roast curve), hero after charles.unemployed
- Merrow Botanic Garden · orchid show landing page (events, species, glasshouses, tickets, membership), hero after charles.unemployed
