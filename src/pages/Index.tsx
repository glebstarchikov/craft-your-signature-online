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
    logoUrl: "",
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
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl space-y-10">
        {/* Hero */}
        <div className="text-center animate-fade-up">
          <span className="inline-block font-mono text-xs tracking-widest uppercase text-muted-foreground mb-3">
            Email Signature Generator
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-3 leading-tight">
            Craft your{" "}
            <span className="relative inline-block">
              <span className="relative z-10">signature</span>
              <span className="absolute bottom-1 left-0 w-full h-2.5 bg-primary/25 rounded-sm -z-0" />
            </span>
            <span className="animate-blink text-primary ml-0.5 font-light">|</span>
          </h1>
          <p className="text-muted-foreground text-sm italic">A signature that leaves an impression.</p>
        </div>

        {/* Form Card */}
        <div className="animate-fade-up-delay-1">
          <div className="rounded-xl border border-input bg-card shadow-md border-l-4 border-l-primary p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Details</span>
            </div>
            <SignatureForm data={data} onChange={setData} />
          </div>
        </div>

        {/* Preview Card */}
        <div className="rounded-xl border border-input bg-card shadow-md p-6">
          <SignaturePreview data={data} darkPreview={darkPreview} onToggleDark={() => setDarkPreview(!darkPreview)} />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 animate-fade-up-delay-3">
          <button
            onClick={handleCopy}
            className="btn-press flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy Signature"}
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="btn-press flex items-center justify-center gap-2 rounded-lg border border-input px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <HelpCircle size={16} />
            How to import?
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center animate-fade-up-delay-4">
          <p className="text-xs text-muted-foreground/60">
            Built by{" "}
            <a
              href="https://glebstarchikov.nl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Gleb Starchikov
            </a>
          </p>
        </footer>
      </div>

      <ImportModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;
