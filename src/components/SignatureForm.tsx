import { X } from "lucide-react";

interface SignatureData {
  name: string;
  title: string;
  phone: string;
  twitter: string;
  company: string;
  companyUrl: string;
  logoUrl: string;
}

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

const ClearableInput = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-foreground">{label}</label>
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-elevate w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition-all"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label={`Clear ${label}`}
        >
          <X size={14} />
        </button>
      )}
    </div>
  </div>
);

const SignatureForm = ({ data, onChange }: SignatureFormProps) => {
  const update = (field: keyof SignatureData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <ClearableInput
        label="Full Name"
        value={data.name}
        onChange={(v) => update("name", v)}
        placeholder="Gleb Starchikov"
      />
      <ClearableInput
        label="Title"
        value={data.title}
        onChange={(v) => update("title", v)}
        placeholder="Product Owner"
      />
      <ClearableInput
        label="Phone"
        value={data.phone}
        onChange={(v) => update("phone", v)}
        placeholder="+1 (555) 123-4567"
      />
      <ClearableInput
        label="Twitter / X"
        value={data.twitter}
        onChange={(v) => update("twitter", v)}
        placeholder="@exampletag"
      />
      <ClearableInput
        label="Company Name"
        value={data.company}
        onChange={(v) => update("company", v)}
        placeholder="Starco"
      />
      <ClearableInput
        label="Company URL"
        value={data.companyUrl}
        onChange={(v) => update("companyUrl", v)}
        placeholder="https://starcoai.com"
      />
      <ClearableInput
        label="Logo URL"
        value={data.logoUrl}
        onChange={(v) => update("logoUrl", v)}
        placeholder="https://example.com/logo.png"
      />
    </div>
  );
};

export default SignatureForm;
