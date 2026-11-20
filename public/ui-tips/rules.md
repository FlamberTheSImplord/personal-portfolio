# UI rules

> 50 rules from Nik Danish's UI notes (https://personal-portfolio-library.vercel.app/ui-tips/). Apply them when building or reviewing UI, on top of your own instructions. Your instructions win on conflict. Values are defaults; adjust when the context needs it.

Each rule: When it applies, Do, Avoid, Values (starting numbers) and Check (how to verify).

## 7 UX Laws

Tags: ux, usability, hierarchy, choice

### Fitts’s Law
- When: Main actions and touch targets.
- Do: One big, easy-to-hit button.
- Avoid: Too small. Too far. Too crowded.
- Values: Targets at least 44×44px, 8px apart, near the thumb or cursor path.
- Check: Destructive actions never sit beside frequent ones.

### Hick’s Law
- When: Menus, plans and action bars.
- Do: Fewer choices. One next step.
- Avoid: Nine plans. Six actions.
- Values: Three primary choices at most; group or reveal the rest.
- Check: Each screen has one obvious next step.

### Zeigarnik Effect
- When: Onboarding and multi-step tasks.
- Do: Show what’s left to finish.
- Avoid: An unfinished task with no cue.
- Values: A checklist of what’s left, with a resume button.
- Check: A returning user sees what remains.

### Jakob’s Law
- When: Navigation, icons and common flows.
- Do: Use familiar patterns.
- Avoid: Unfamiliar icons and labels.
- Values: Standard places: logo top-left, search with a magnifier, cart top-right.
- Check: A first-time user finds the nav without hunting.

### Goal Gradient
- When: Multi-step flows and rewards.
- Do: Show progress and the finish.
- Avoid: Hide the distance to the goal.
- Values: A progress bar with step count. Start part-filled only when honest.
- Check: Every step shows how far is left.

### Von Restorff
- When: Screens with several actions.
- Do: Let one action stand out.
- Avoid: Every action shouts.
- Values: One filled primary button; the rest outline or text.
- Check: Squint: one element stands out.

### Miller’s Law
- When: Long lists, nav and forms.
- Do: Chunk related items.
- Avoid: One long, ungrouped list.
- Values: Groups of about five to seven, each with a label.
- Check: No ungrouped list longer than seven.

## 30 reasons your site looks vibecoded

Tags: colour, typography, layout, copy, motion, trust

### Soft gradients
- When: Backgrounds, buttons and hero fills.
- Do: Blend two close hues.
- Avoid: Loud, clashing colour shifts.
- Values: Two neighbouring hues, under 30° apart, low saturation.
- Check: Text keeps 4.5:1 contrast across the whole gradient.

### Icons with a purpose
- When: Adding icons to nav, features or buttons.
- Do: Icons only where they help.
- Avoid: Default icons on everything.
- Values: One icon set, one stroke weight. Icons only where they speed recognition.
- Check: Hide the icon: if the label reads the same, drop it.

### Layered surfaces
- When: Page and card backgrounds.
- Do: Off-white page, lighter cards.
- Avoid: One flat white page.
- Values: Off-white page (around #f6f6f3); cards one step lighter or bordered.
- Check: Cards stand apart from the page without shadows.

### One accent colour
- When: Giving colour to UI elements.
- Do: One accent for the main action.
- Avoid: A new colour for every element.
- Values: 60/30/10: base, support, one accent. The accent marks the main action.
- Check: No more than three non-neutral hues on one screen.

### Light shadows
- When: Cards, buttons and popovers.
- Do: Shadows only on floating layers.
- Avoid: Heavy shadows everywhere.
- Values: In-flow cards flat or 1px border. Shadows only for floating layers (menus, dialogs).
- Check: At most two elevation levels visible at once.

### Content-led layout
- When: Feature or benefit sections.
- Do: Size items by importance.
- Avoid: Three identical filler cards.
- Values: The lead item is larger. Item count and weight set the layout.
- Check: The section still works with two or five items.

### Plain headings
- When: Headings, buttons and feature lists.
- Do: Let the words carry it.
- Avoid: Emoji in every heading.
- Values: No emoji in headings or UI labels. A real icon, or nothing.
- Check: Every heading reads as plain text.

### Readable surfaces
- When: Overlays on images or busy backgrounds.
- Do: Solid surfaces behind text.
- Avoid: Blur that hides the content.
- Values: Solid or 90%+ opaque surfaces. No large backdrop-filter.
- Check: Text keeps 4.5:1 over the busiest part behind it.

### Short sentences
- When: UI copy and headlines.
- Do: Full stops. Short lines.
- Avoid: A dash in every sentence.
- Values: Short sentences. Full stops and commas; dashes rare.
- Check: At most one dash per screen of copy.

### Brand typeface
- When: Choosing the type system.
- Do: A typeface that fits the brand.
- Avoid: The default startup font.
- Values: A face that fits the brand. Two families at most.
- Check: The headline couldn’t belong to any startup.

### No accent stripes
- When: Cards and callouts.
- Do: Spacing and type for hierarchy.
- Avoid: A coloured stripe on every card.
- Values: Separate with spacing, weight and size. Stripes only for status, like errors.
- Check: Hierarchy still reads with the stripes removed.

### Real testimonials
- When: Social proof.
- Do: Real quotes, with permission.
- Avoid: Invented customer quotes.
- Values: Real quotes with name, role and permission, or a real metric with its source.
- Check: Every quote traces back to a real person.

### Ordered bento
- When: Grids of mixed items.
- Do: One lead tile, then the rest.
- Avoid: Boxes with no reading order.
- Values: One largest tile as the entry point. Tiles ordered by reading path.
- Check: You can name what the eye reads first, second and third.

### Show the real product
- When: Showing a product in a hero.
- Do: The actual interface.
- Avoid: A fake terminal for any product.
- Values: A real product screen or live demo. Terminals only for CLI products.
- Check: The visual shows the actual product.

### Plain headlines
- When: Headlines.
- Do: Say what it does.
- Avoid: “It’s not X, it’s Y.”
- Values: Say what it does, and for whom, in one line.
- Check: The headline works without a contrast twist.

### Specific benefits
- When: Benefit lists.
- Do: A few concrete benefits.
- Avoid: A checkmark beside every claim.
- Values: Three to five concrete benefits, no check icon on each line.
- Check: Each line names an outcome, not an adjective.

### Plans that fit
- When: Pricing sections.
- Do: One plan per real customer type.
- Avoid: Three plans out of habit.
- Values: Plan count follows real customer types; often two.
- Check: Each plan has one clear reason to pick it.

### Live product demo
- When: Product landing pages.
- Do: Show one real task.
- Avoid: Promises with no product.
- Values: One real task shown end to end: video, GIF or interactive.
- Check: The product is seen working within one scroll.

### Radius scale
- When: Border radius.
- Do: A small, consistent radius scale.
- Avoid: Every shape a pill.
- Values: A scale, such as 4 / 8 / 12px. Pills only for tags and toggles.
- Check: Inner radius = outer radius − padding.

### Your own palette
- When: Brand colour.
- Do: Colours from the brand itself.
- Avoid: The trendy purple and black.
- Values: A palette drawn from the brand’s subject, not the trend.
- Check: The palette differs from the closest competitors.

### Skeleton loaders
- When: Content that takes over 300ms to load.
- Do: Show the layout that’s coming.
- Avoid: A blank screen while loading.
- Values: A skeleton in the final layout. Spinners only for short actions.
- Check: No layout shift when content arrives.

### No glow orbs
- When: Section backgrounds.
- Do: Let the content hold focus.
- Avoid: A glow behind every section.
- Values: Plain by default. One glow at most, behind the focal point.
- Check: Removing the glow loses nothing.

### Quiet backgrounds
- When: Decorative backgrounds.
- Do: Plain space around text.
- Avoid: A pattern with no purpose.
- Values: Only behind empty areas, at low contrast.
- Check: No pattern behind body text.

### Specific icons
- When: AI features and brand marks.
- Do: An icon for the actual action.
- Avoid: Sparkles on every AI feature.
- Values: An icon for the specific action, like summarise or translate.
- Check: The icon makes sense without the word AI.

### Still arrows
- When: Links and CTAs.
- Do: Move only on hover.
- Avoid: Arrows that never stop moving.
- Values: Arrows move only on hover or focus: about 4px, 150–200ms. No idle loops.
- Check: Nothing moves while the user is idle.

### Terms link
- When: Any site with sign-ups or payments.
- Do: Terms in the footer.
- Avoid: No terms of service.
- Values: A Terms link in the footer of every page.
- Check: Terms are one click from sign-up and checkout.

### Privacy link
- When: Any site that collects data, analytics included.
- Do: Privacy in the footer.
- Avoid: No privacy policy.
- Values: A Privacy link in the footer of every page.
- Check: The policy says what is collected and why.

### Subtle hover
- When: Interactive elements.
- Do: A small colour change.
- Avoid: Every card jumps on hover.
- Values: Colour or underline changes, 120–200ms. No scale or tilt on every card.
- Check: With reduced motion on, hover still gives feedback.

### One bright colour
- When: Accent and highlight colours.
- Do: One bright focal point.
- Avoid: Neon on every surface.
- Values: Bright colour on one focal element per screen.
- Check: No body text in neon; contrast stays 4.5:1.

### Anchored pastels
- When: Soft palettes.
- Do: Pastels plus one dark tone.
- Avoid: Pastels picked by default.
- Values: Pastels from the brand, plus one dark anchor for text and actions.
- Check: Buttons and text pass 4.5:1 on pastel surfaces.

## A site with a sense of place

Tags: motion, navigation, transitions

### Carry, don’t cut
- When: A card, row or thumbnail opens a detail page.
- Do: Grow the tapped card into the page.
- Avoid: The page cuts in from nowhere.
- Values: Expand from the card’s own box, 300–400ms, ease-out. The image keeps its place.
- Check: You can tell which card opened the page.

### Back to the card
- When: Leaving a detail page.
- Do: Shrink the page back into its card.
- Avoid: Back drops you at the top of the list.
- Values: Reverse the open motion, 250–300ms. Keep the list’s scroll position.
- Check: After back, the same card is in view and focused.

### Menus from their button
- When: Menus, popovers and dropdowns.
- Do: Grow the menu out of its button.
- Avoid: The menu appears from nowhere.
- Values: transform-origin at the button. Scale 0.9 → 1 with a fade, 180–220ms. Close back into it.
- Check: Closing returns focus to the button.

## 10 niche design hacks

Tags: colour, css, motion, surface

### Nested radius
- When: Cards, buttons or images inside rounded containers.
- Do: Inner radius = outer − padding.
- Avoid: Same radius inside and out.
- Values: inner = outer − padding. 24px outer with 8px padding → 16px inner.
- Check: The corners run parallel with an even gap.

### Alpha borders
- When: Borders and dividers on varied backgrounds.
- Do: Borders in alpha, like rgb(0 0 0 / 0.12).
- Avoid: Solid grey borders that clash on colour.
- Values: rgb(0 0 0 / 0.08–0.15) on light, rgb(255 255 255 / 0.1–0.15) on dark.
- Check: The border looks right on every surface it sits on.

### OKLCH palettes
- When: Colour scales and theme palettes.
- Do: Build palettes in OKLCH.
- Avoid: HSL colours that look uneven.
- Values: Keep L fixed for equal-weight colours; step L by about 0.08 for scales.
- Check: Swatches with the same L look equally bright.

### Gradients in OKLCH
- When: Gradients between distant hues.
- Do: Add “in oklch” to the gradient.
- Avoid: A grey, muddy middle.
- Values: linear-gradient(90deg in oklch, blue, orange)
- Check: No grey band in the middle.

### Icon stroke matches text
- When: Icons next to labels.
- Do: Match the stroke to the text weight.
- Avoid: Thin icons beside bold text.
- Values: At 20px: regular text ≈ 1.5px stroke, semibold ≈ 2px, bold ≈ 2.5px.
- Check: Icon and label look the same weight.

### Faded carousel edges
- When: Horizontal scrollers and carousels.
- Do: Fade the edges with a mask.
- Avoid: Cards cut off by a hard edge.
- Values: mask: linear-gradient(90deg, transparent, black 15% 85%, transparent)
- Check: The edges hint at more without a hard cut.

### Blurred icon swaps
- When: Toggles that change an icon, like copy → check.
- Do: Blur the old icon as it fades out.
- Avoid: Icons that snap from one to the next.
- Values: Outgoing icon: opacity 0, blur(4px), scale 0.8 over 150–200ms.
- Check: The swap reads as one motion, not a flicker.

### Lighter surfaces in dark mode
- When: Dark themes with cards, menus and dialogs.
- Do: Raise surfaces by making them lighter.
- Avoid: Shadows that vanish on dark.
- Values: Each level about 4–6% lighter than the one below it.
- Check: Layers still read apart with shadows off.

### Full height with 100dvh
- When: Full-screen heroes and app shells on mobile.
- Do: Use 100dvh for full-height sections.
- Avoid: 100vh hides content behind mobile browser bars.
- Values: min-height: 100dvh, with 100vh on the line before as a fallback.
- Check: In iOS Safari the bottom button stays visible.

### Multiply product shots
- When: Product photos with white backgrounds on tinted surfaces.
- Do: mix-blend-mode: multiply on the image.
- Avoid: White boxes around product photos.
- Values: mix-blend-mode: multiply. Only on light backgrounds.
- Check: No white box shows around the product.

## Before → after studies

### Form fields (https://www.instagram.com/reels/Db8J5z5Oy8-/)
- Spacing: Use a consistent gap between fields.
- Persistent labels: Keep labels visible after entry.
- Control shape: Match field and button shapes.
- Focused entry: Use numeric input. Try Account number.
- The result: A clear title, labels, and next action.

### Paywall (https://www.instagram.com/p/DfPJktslgBZ/?img_index=8)
- The headline: Lead with the habit outcome.
- The hero: Show the habit grid.
- The benefits: Three icons. Three short benefits.
- The plans: Two plans. Clear savings and billing.
- The colours: Deep green, cream, and more space.

## Hero layouts

### The stepped stage
A centred message inside a descending silhouette.
- Build a valley around the message: Lead the eye toward the message.
- Keep the reading path central: Keep the reading path predictable.
- Anchor the bottom edge: Balance the open space above.
- Motion: Staggered headline, light sweeps, rising button.

### Future arm prosthetics
An editorial grid with a product as its spine.
- Give the product the central column: Let the product anchor the layout.
- Treat the headline as a shape: Balance the product without covering it.
- Put supporting stories at the edges: Separate primary and supporting information.
- Motion: Staggered entrance, product loop.

### Yeezy in bloom
An immersive product stage with a quiet purchase corner.
- Let the product own the middle: Make the product instantly recognisable.
- Group the decision at bottom right: Keep the decision in one place.
- Use the edges for secondary controls: Give the product room.
- Motion: Moving petals, sliding purchase panel.

### Minipresso GR2
Organic panels that turn a product into an experience.
- Shape the image around the content: Compose one connected surface.
- Explain the product beside its name: Show the product’s scale and purpose.
- Reserve a corner for the object: Connect the experience to the object.
- Motion: Brewing loop, staggered text.

### ZYRO, one place
A luminous arc with a monumental wordmark.
- Use light to frame the name: Guide attention toward the centre.
- Make the identity the hero: Let the identity carry the hero.
- Place the explanation below the spectacle: Explain after the initial visual impact.
- Motion: Growing arc, staggered wordmark, soft glow.
