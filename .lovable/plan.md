

## Replace Logo Text with Logo URL

Swap the "Logo Text" field for a "Logo URL" field, and render the logo as an image in both the preview and the copied HTML.

### What changes

- The "Logo Text" input becomes a "Logo URL" input where you paste a link to your logo image
- The preview shows the actual logo image (with a text fallback if no URL is provided)
- The copied HTML uses an `<img>` tag with inline styles for email compatibility
- A small thumbnail preview appears next to the input so you can confirm the image loads

### Design details

- Logo image will be constrained to a max height of ~40px to keep the signature compact
- If the URL is empty, the preview falls back to the company name as plain text (like it does now)
- The generated HTML uses a standard `<img>` tag with `alt` text set to the company name -- this is the most email-client-compatible approach

### Files to update

1. **`src/components/SignatureForm.tsx`**
   - Rename the `logoText` field in the interface to `logoUrl`
   - Replace the "Logo Text" `ClearableInput` with a "Logo URL" input
   - Add a small image preview thumbnail below the input when a URL is entered

2. **`src/components/SignaturePreview.tsx`**
   - Update the interface: `logoText` becomes `logoUrl`
   - In the preview, render an `<img>` tag when `logoUrl` is set; fall back to company name text otherwise
   - Update `generateSignatureHTML` to output an `<img>` tag with inline styles (`display:block; max-height:40px;`) or fall back to text

3. **`src/pages/Index.tsx`**
   - Rename `logoText: ""` to `logoUrl: ""` in the initial state

No new dependencies or backend needed.
