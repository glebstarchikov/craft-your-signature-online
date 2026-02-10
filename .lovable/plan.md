
## Two Cleanups

### 1. Remove logo URL preview (SignatureForm.tsx)
Remove the wrapper `<div className="space-y-1.5">` around the Logo URL input and the conditional image preview block beneath it (lines 95-115). Replace with a plain `ClearableInput` like the other fields.

### 2. Remove transition from preview box (SignaturePreview.tsx)
Remove `transition-colors duration-300` from the preview container class on line 53, leaving just `rounded-xl border border-input p-6`.
