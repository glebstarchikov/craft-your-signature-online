

## Show Phone and Twitter Defaults in Preview

Currently, the name, title, and company fields show placeholder defaults in the preview when empty, but phone and twitter do not. This makes them invisible until the user types something. We'll add fallback defaults so the preview always shows a complete, realistic signature.

### Changes

**`src/components/SignaturePreview.tsx`**

- Update `hasContact` to always be true when fallback values would apply (i.e., treat empty phone/twitter as having defaults)
- Display `data.phone || "+1 (555) 123-4567"` instead of just `data.phone`
- Display `data.twitter || "@exampletag"` instead of just `data.twitter`
- Apply the same changes in the `generateSignatureHTML` function

This way the preview always shows the full signature layout, matching the form placeholders exactly.

