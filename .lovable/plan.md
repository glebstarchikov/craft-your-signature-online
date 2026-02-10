

## Remove Logo URL Preview from Form

Remove the small logo preview thumbnail that appears below the Logo URL input field in the signature form.

### Changes

**`src/components/SignatureForm.tsx`**

- Remove the conditional block that renders the logo preview image below the Logo URL input (the `{data.logoUrl && (...)}` section with the `img` tag and "Preview" label)
- Keep the `ClearableInput` for Logo URL as-is

This is a small cleanup -- the main signature preview already shows the logo, so the inline form preview is redundant.

