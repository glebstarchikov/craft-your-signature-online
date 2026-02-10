import { Sun, Moon } from "lucide-react";

interface SignatureData {
  name: string;
  title: string;
  phone: string;
  twitter: string;
  company: string;
  companyUrl: string;
  logoText: string;
}

interface SignaturePreviewProps {
  data: SignatureData;
  darkPreview: boolean;
  onToggleDark: () => void;
}

const DEFAULT_COMPANY = "Starco";
const DEFAULT_URL = "https://starcoai.com";
const DEFAULT_LOGO = "STARCO";

const SignaturePreview = ({ data, darkPreview, onToggleDark }: SignaturePreviewProps) => {
  const hasContact = data.phone || data.twitter;
  const companyName = data.company || DEFAULT_COMPANY;
  const companyUrl = data.companyUrl || DEFAULT_URL;
  const logoText = data.logoText || DEFAULT_LOGO;
  const bg = darkPreview ? "#1a1a1a" : "#ffffff";
  const fg = darkPreview ? "#e5e5e5" : "#1a1a1a";
  const mutedFg = darkPreview ? "#888888" : "#737373";
  const borderColor = darkPreview ? "#333333" : "#e5e5e5";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Preview
        </span>
        <button
          onClick={onToggleDark}
          className="flex items-center gap-1.5 rounded-lg border border-input px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Toggle preview theme"
        >
          {darkPreview ? <Sun size={13} /> : <Moon size={13} />}
          {darkPreview ? "Light" : "Dark"}
        </button>
      </div>

      <div
        className="rounded-xl border border-input p-6 transition-colors duration-300"
        style={{ backgroundColor: bg }}
      >
        {/* Rendered signature */}
        <table cellPadding={0} cellSpacing={0} style={{ fontFamily: "'DM Sans', Arial, sans-serif", fontSize: 14 }}>
          <tbody>
            <tr>
              <td style={{ paddingBottom: 12 }}>
                <a
                  href={companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: 2,
                    color: mutedFg,
                    textDecoration: "none",
                  }}
                >
                  {logoText}
                </a>
              </td>
            </tr>
            <tr>
              <td style={{ paddingBottom: 4 }}>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: fg,
                  }}
                >
                  {data.name || "Your Name"}
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ paddingBottom: hasContact ? 10 : 0 }}>
                <span style={{ fontSize: 13, color: mutedFg }}>
                  {data.title || "Your Title"} · {companyName}
                </span>
              </td>
            </tr>
            {hasContact && (
              <tr>
                <td
                  style={{
                    paddingTop: 10,
                    borderTop: `1px solid ${borderColor}`,
                  }}
                >
                  <span style={{ fontSize: 13, color: mutedFg }}>
                    {data.phone}
                    {data.phone && data.twitter && " · "}
                    {data.twitter && (
                      <a
                        href={`https://x.com/${data.twitter.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: mutedFg, textDecoration: "none" }}
                      >
                        {data.twitter}
                      </a>
                    )}
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SignaturePreview;

export function generateSignatureHTML(data: SignatureData): string {
  const hasContact = data.phone || data.twitter;
  const companyName = data.company || "Starco";
  const companyUrl = data.companyUrl || "https://starcoai.com";
  const logoText = data.logoText || "STARCO";

  const contactParts: string[] = [];
  if (data.phone) contactParts.push(data.phone);
  if (data.twitter) {
    const handle = data.twitter.replace("@", "");
    contactParts.push(
      `<a href="https://x.com/${handle}" target="_blank" rel="noopener noreferrer" style="color:#737373;text-decoration:none;">${data.twitter}</a>`
    );
  }

  return `<table cellpadding="0" cellspacing="0" style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;">
  <tbody>
    <tr>
      <td style="padding-bottom:12px;">
        <a href="${companyUrl}" target="_blank" rel="noopener noreferrer" style="font-size:16px;font-weight:700;letter-spacing:2px;color:#737373;text-decoration:none;">${logoText}</a>
      </td>
    </tr>
    <tr>
      <td style="padding-bottom:4px;">
        <span style="font-size:15px;font-weight:600;color:#1a1a1a;">${data.name || "Your Name"}</span>
      </td>
    </tr>
    <tr>
      <td style="padding-bottom:${hasContact ? "10" : "0"}px;">
        <span style="font-size:13px;color:#737373;">${data.title || "Your Title"} · ${companyName}</span>
      </td>
    </tr>${
      hasContact
        ? `
    <tr>
      <td style="padding-top:10px;border-top:1px solid #e5e5e5;">
        <span style="font-size:13px;color:#737373;">${contactParts.join(" · ")}</span>
      </td>
    </tr>`
        : ""
    }
  </tbody>
</table>`;
}
