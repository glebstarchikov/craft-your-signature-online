

## Interactive Import Instructions

Transform the static list of instructions into a tabbed, step-by-step experience that's easier to follow and more engaging.

### What changes

**Tabbed email client selector**
- Replace the stacked list of all three clients with clickable tabs (Gmail, macOS Mail, iOS Mail) with icons
- Only one client's instructions are visible at a time, reducing visual clutter

**Step-by-step progression**
- Show one step at a time with a "Next" / "Back" navigation and a progress indicator (dots or a small progress bar)
- Each step is displayed in a larger, more readable format with a step number badge
- A "Done" button on the final step closes the modal with a subtle success state

**Visual enhancements**
- Add simple icons for each email client tab (Mail, Settings gear, etc.) using lucide-react
- Highlight actionable keywords in each step (e.g., bold "Settings", "Paste") so users can scan quickly
- Animate step transitions with a gentle slide for a polished feel

### Design details

- Tabs sit at the top of the modal as pill-shaped buttons; the active one gets the primary color fill
- The step card has a large circled number on the left and the instruction text on the right
- Progress dots below the step card show how far along you are
- Keyboard-friendly: arrow keys or Enter to advance steps

### Files to modify

1. **`src/components/ImportModal.tsx`** -- Full rewrite of the modal content:
   - Add state for `activeClient` (tab index) and `activeStep` (step index)
   - Render tab buttons at the top with icons (Chrome/Globe for Gmail, Monitor for macOS, Smartphone for iOS)
   - Show a single step at a time with animated transitions
   - Add Next/Back buttons and progress dots
   - Bold key action words in step text using a simple formatter (split on keywords like "Settings", "Paste", "Click", wrap in `<strong>`)

2. **`src/index.css`** -- Add a subtle slide-left / slide-right transition for step changes

