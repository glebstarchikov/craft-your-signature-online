

## Fix: Only Include Filled Fields in Exported HTML

The preview should show placeholder defaults for phone and twitter when empty, but the **copied/exported HTML** should omit those fields entirely if the user didn't fill them in.

### Changes

**`src/components/SignaturePreview.tsx`**

The preview component already works correctly (shows defaults visually). Only the `generateSignatureHTML` function needs to change:

- Remove the fallback defaults for `phone` and `twitter` in `generateSignatureHTML`
- Build the contact row conditionally: only include phone if `data.phone` is provided, only include twitter if `data.twitter` is provided
- Only render the entire contact row (with the border-top separator) if at least one of phone or twitter is filled
- Adjust the title row's `padding-bottom` based on whether the contact row exists

This way the preview acts as a realistic example, but the actual signature HTML only contains what the user explicitly entered.

