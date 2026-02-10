

## Standardise All Placeholders

Align every placeholder and default value across the form and preview so they tell a consistent story.

### New standard values

| Field        | Placeholder / Default     |
|--------------|---------------------------|
| Full Name    | Gleb Starchikov           |
| Title        | Product Owner             |
| Phone        | +1 (555) 123-4567        |
| Twitter / X  | @exampletag                   |
| Company Name | Starco                    |
| Company URL  | https://starcoai.com      |
| Logo URL     | https://example.com/logo.png |

### Files to modify

1. **`src/components/SignatureForm.tsx`**
   - Change the Name placeholder from "Jane Smith" to "Gleb Starchikov"
   - Change the Title placeholder from "Product Designer" to "Product Owner"
   - Change the Twitter placeholder from "@janesmith" to "@exampletag"
   - Phone, Company Name, Company URL, and Logo URL placeholders already match -- no changes needed

2. **`src/components/SignaturePreview.tsx`**
   - In the preview component: change `data.name || "Your Name"` to `data.name || "Gleb Starchikov"` and `data.title || "Your Title"` to `data.title || "Product Owner"`
   - In `generateSignatureHTML`: make the same two replacements (`"Your Name"` to `"Gleb Starchikov"`, `"Your Title"` to `"Product Owner"`)
   - The company defaults ("Starco" / "https://starcoai.com") are already correct

