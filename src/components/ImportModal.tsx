import { X } from "lucide-react";

interface ImportModalProps {
  open: boolean;
  onClose: () => void;
}

const steps = [
  {
    title: "Gmail",
    steps: [
      "Open Gmail → Settings (gear icon) → See all settings",
      "Scroll down to the Signature section",
      "Click + Create new, name your signature",
      "Paste the copied signature into the editor",
      "Click Save Changes at the bottom",
    ],
  },
  {
    title: "macOS Mail",
    steps: [
      "Open Mail → Settings → Signatures tab",
      "Click + to create a new signature",
      "Uncheck 'Always match my default message font'",
      "Paste the copied signature",
      "Close the preferences window",
    ],
  },
  {
    title: "iOS Mail",
    steps: [
      "Open Settings → Mail → Signature",
      "Select the account you want to update",
      "Clear the existing signature and paste the new one",
      "Close Settings — changes save automatically",
    ],
  },
];

const ImportModal = ({ open, onClose }: ImportModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl border border-input bg-card p-6 shadow-xl animate-fade-up">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl text-foreground">
            How to import your signature
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5">
          {steps.map((client) => (
            <div key={client.title}>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                {client.title}
              </h3>
              <ol className="space-y-1.5 text-sm text-muted-foreground">
                {client.steps.map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="shrink-0 font-medium text-foreground/60">
                      {i + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
