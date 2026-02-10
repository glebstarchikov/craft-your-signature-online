

## Memorable Design Refresh

The goal is to make a recruiter pause and remember this tool when scrolling through your portfolio. The current layout is clean but flat -- we'll add personality through subtle motion, a strong visual hierarchy, and one signature design moment that sticks.

### Design Strategy

Keep the minimalist soul but add **craft details** that show you care about polish -- exactly what recruiters look for in a portfolio piece.

### Changes

**1. Hero section with personality (Index.tsx)**
- Replace the plain heading with a two-line layout: a small mono-font label ("Email Signature Generator") above, and a large serif headline below with a word highlighted using an animated underline or gradient accent
- Add a brief, confident tagline: something like "Craft a signature that leaves an impression." styled in muted italic
- Add a subtle animated cursor/caret blinking next to the headline for a "live typing" feel

**2. Card-based layout (Index.tsx)**
- Wrap the form and preview in distinct card containers with soft shadows and rounded corners
- Add small section labels ("Details" / "Preview") with a colored dot indicator
- Visually separate the two sections so the page reads like a polished app, not a plain form

**3. Micro-interactions and motion (index.css + components)**
- Add a gentle floating animation to the preview card (slow, subtle up-down bob) so it feels alive
- Smooth input focus transitions: inputs slightly elevate (shadow) on focus
- The "Copy Signature" button gets a satisfying scale-down on click and a brief confetti-like checkmark animation on success
- Stagger the fade-up animations with slightly longer delays for a more cinematic entrance

**4. Accent color pop**
- Use the existing teal/green primary color more boldly: colored left border on the form card, a gradient tint on the copy button, and a small colored badge or pill near the headline
- Keep everything else neutral so the accent pops

**5. Footer / credit line (Index.tsx)**
- Add a minimal footer: "Built by [Your Name]" with a subtle link style -- shows ownership and is portfolio-appropriate
- Small text, sits at the bottom, doesn't distract

**6. Background texture (index.css)**
- Add a very subtle dot grid or noise texture to the page background using a CSS pattern -- adds depth without heaviness
- Keep it barely visible so it's felt rather than seen

### Files to modify

1. **`src/pages/Index.tsx`** -- Restructure into hero + card layout, add footer, enhance button interactions
2. **`src/index.css`** -- Add floating animation keyframes, dot-grid background pattern, input focus elevation styles, button press animation
3. **`src/components/SignatureForm.tsx`** -- Wrap in card styling with section label and colored dot
4. **`src/components/SignaturePreview.tsx`** -- Wrap in card styling with section label, add floating animation class
5. **`src/components/ImportModal.tsx`** -- Minor polish: add enter/exit animation for consistency

### Technical details

- All animations use CSS only (keyframes + transitions) -- no new dependencies
- The dot-grid background uses a repeating CSS radial-gradient, purely decorative
- The floating animation is a gentle `translateY` oscillation over ~6 seconds, subtle enough to not distract
- Button press uses `transform: scale(0.97)` on `:active` for tactile feedback
- Cards use the existing `--card` color variable with `shadow-md` for elevation
