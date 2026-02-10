import { useState, useCallback, useEffect } from "react";
import { X, Globe, Monitor, Smartphone, ChevronRight, ChevronLeft, Check, Mail } from "lucide-react";

interface ImportModalProps {
  open: boolean;
  onClose: () => void;
}

const clients = [
  {
    title: "Gmail",
    icon: Globe,
    steps: [
      "Open Gmail → **Settings** (gear icon) → **See all settings**",
      "Scroll down to the **Signature** section",
      "**Click** + Create new, name your signature",
      "**Paste** the copied signature into the editor",
      "**Click** Save Changes at the bottom",
    ],
  },
  {
    title: "macOS Mail",
    icon: Monitor,
    steps: [
      "Open Mail → **Settings** → **Signatures** tab",
      "**Click** + to create a new signature",
      "Uncheck '**Always match my default message font**'",
      "**Paste** the copied signature",
      "Close the preferences window",
    ],
  },
  {
    title: "iOS Mail",
    icon: Smartphone,
    steps: [
      "Open **Settings** → **Mail** → **Signature**",
      "Select the account you want to update",
      "Clear the existing signature and **Paste** the new one",
      "Close **Settings** — changes save automatically",
    ],
  },
  {
    title: "Outlook",
    icon: Mail,
    steps: [
      "Open Outlook → **File** → **Options** → **Mail**",
      "**Click** **Signatures** in the Compose messages section",
      "**Click** **New**, name your signature",
      "**Paste** the copied signature into the editor",
      "**Click** **OK** to save and close",
    ],
  },
];

const formatStep = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const ImportModal = ({ open, onClose }: ImportModalProps) => {
  const [activeClient, setActiveClient] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const currentSteps = clients[activeClient].steps;
  const isLastStep = activeStep === currentSteps.length - 1;
  const isFirstStep = activeStep === 0;

  useEffect(() => {
    if (open) {
      setActiveClient(0);
      setActiveStep(0);
    }
  }, [open]);

  const goNext = useCallback(() => {
    if (isLastStep) {
      onClose();
      return;
    }
    setDirection("right");
    setActiveStep((s) => s + 1);
  }, [isLastStep, onClose]);

  const goBack = useCallback(() => {
    if (isFirstStep) return;
    setDirection("left");
    setActiveStep((s) => s - 1);
  }, [isFirstStep]);

  const switchClient = (index: number) => {
    setActiveClient(index);
    setActiveStep(0);
    setDirection("right");
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") goNext();
      if (e.key === "ArrowLeft") goBack();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, goNext, goBack, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg rounded-2xl border border-input bg-card p-6 shadow-xl animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl text-foreground">
            Import your signature
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Client Tabs */}
        <div className="flex gap-2 mb-6">
          {clients.map((client, i) => {
            const Icon = client.icon;
            const isActive = i === activeClient;
            return (
              <button
                key={client.title}
                onClick={() => switchClient(i)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                }`}
              >
                <Icon size={14} />
                {client.title}
              </button>
            );
          })}
        </div>

        {/* Step Card */}
        <div
          key={`${activeClient}-${activeStep}`}
          className={`flex items-start gap-4 rounded-xl border border-input bg-background p-5 min-h-[88px] ${
            direction === "right" ? "animate-slide-step-right" : "animate-slide-step-left"
          }`}
        >
          <span className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary font-semibold text-sm">
            {activeStep + 1}
          </span>
          <p className="text-sm text-muted-foreground leading-relaxed pt-1.5">
            {formatStep(currentSteps[activeStep])}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {currentSteps.map((_, i) => (
            <span
              key={i}
              className={`block rounded-full transition-all duration-300 ${
                i === activeStep
                  ? "w-5 h-1.5 bg-primary"
                  : i < activeStep
                  ? "w-1.5 h-1.5 bg-primary/40"
                  : "w-1.5 h-1.5 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={goBack}
            disabled={isFirstStep}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-0 transition-all"
          >
            <ChevronLeft size={14} />
            Back
          </button>
          <button
            onClick={goNext}
            className={`btn-press flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all shadow-sm ${
              isLastStep
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {isLastStep ? (
              <>
                Done
                <Check size={14} />
              </>
            ) : (
              <>
                Next
                <ChevronRight size={14} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
