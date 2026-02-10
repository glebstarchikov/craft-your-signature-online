

## Remove All Fallback Defaults from Exported HTML

If the user hasn't filled in a field, it should be completely absent from the copied HTML. If nothing at all is provided, the result is an empty string.

### Changes

**`src/components/SignaturePreview.tsx`** -- `generateSignatureHTML` function only

- **Name**: Remove `data.name || "Gleb Starchikov"` fallback. Only render the name row if `data.name` is non-empty.
- **Title**: Remove `data.title || "Product Owner"` fallback. Only render the title row if `data.title` is non-empty.
- **Company**: Remove `data.company || "Starco"` and `data.companyUrl || "https://starcoai.com"` fallbacks. Only render the logo/company row if `data.company` or `data.logoUrl` is non-empty.
- **Phone / Twitter**: Already conditional (current behavior is correct).
- **Entire table**: If no rows exist at all, return an empty string instead of an empty `<table>` tag.

The preview component continues to show placeholder defaults visually -- no changes there.

### Technical detail

Build each row as an optional string, then join them. If all are empty, return `""`. Otherwise wrap in the `<table>` shell.

