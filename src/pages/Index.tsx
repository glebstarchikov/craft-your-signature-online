import { useState } from "react";
import { Copy, Check, HelpCircle } from "lucide-react";
import SignatureForm from "@/components/SignatureForm";
import SignaturePreview, { generateSignatureHTML } from "@/components/SignaturePreview";
import ImportModal from "@/components/ImportModal";

const Index = () => {
  const [data, setData] = useState({
    name: "",
    title: "",
    phone: "",
    twitter: "",
    company: "",
    companyUrl: "",
    logoText: "",
  });
  const [darkPreview, setDarkPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCopy = async () => {
    const html = generateSignatureHTML(data);
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([html], { type: "text/plain" }),
        }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-up">
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-2">
            Email Signature
          </h1>
          <p className="text-muted-foreground text-sm">
            Create a clean, professional signature in seconds.
          </p>
        </div>

        {/* Form */}
        <div className="animate-fade-up-delay-1">
          <SignatureForm data={data} onChange={setData} />
        </div>

        {/* Preview */}
        <div className="animate-fade-up-delay-2">
          <SignaturePreview
            data={data}
            darkPreview={darkPreview}
            onToggleDark={() => setDarkPreview(!darkPreview)}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 animate-fade-up-delay-3">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy Signature"}
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-2 rounded-lg border border-input px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <HelpCircle size={16} />
            How to import?
          </button>
        </div>
      </div>

      <ImportModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;
