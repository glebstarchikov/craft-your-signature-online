

## Make Company Details Customizable

Replace the hardcoded "Acme Inc." placeholders with editable form fields so you can enter your own company name, website URL, and logo text.

### What changes

- **Form**: Add three new fields -- "Company Name", "Company URL", and "Logo Text" -- below the existing inputs
- **Preview**: The signature will update live as you type, just like the other fields
- **Copy output**: The copied HTML will use your custom values
- **Defaults**: Placeholder text will show "Starco", "https://starcoai.com", and "STARCO" so you know what goes where

### Files to update

1. **`src/pages/Index.tsx`** -- Add `company`, `companyUrl`, and `logoText` to the state object
2. **`src/components/SignatureForm.tsx`** -- Add three new `ClearableInput` fields for the new data
3. **`src/components/SignaturePreview.tsx`** -- Replace the hardcoded constants with values from props, falling back to the current defaults; update `generateSignatureHTML` to accept the new fields

No new dependencies or files needed.

