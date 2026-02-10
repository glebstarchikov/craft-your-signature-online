import { Sun, Moon } from "lucide-react";

interface SignatureData {
  name: string;
  title: string;
  phone: string;
  twitter: string;
  company: string;
  companyUrl: string;
  logoUrl: string;
}

interface SignaturePreviewProps {
  data: SignatureData;
  darkPreview: boolean;
  onToggleDark: () => void;
}

const DEFAULT_COMPANY = "Starco";
const DEFAULT_URL = "https://starcoai.com";

const SignaturePreview = ({ data, darkPreview, onToggleDark }: SignaturePreviewProps) => {
  const phone = data.phone || "+1 (555) 123-4567";
  const twitter = data.twitter || "@exampletag";
  const hasContact = true;
  const companyName = data.company || DEFAULT_COMPANY;
  const companyUrl = data.companyUrl || DEFAULT_URL;
  const bg = darkPreview ? "#1a1a1a" : "#ffffff";
  const fg = darkPreview ? "#e5e5e5" : "#1a1a1a";
  const mutedFg = darkPreview ? "#888888" : "#737373";
  const borderColor = darkPreview ? "#333333" : "#e5e5e5";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Preview
          </span>
        </div>
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
                {data.logoUrl ? (
                  <a href={companyUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <img src={data.logoUrl} alt={companyName} style={{ display: "block", maxHeight: 40 }} />
                  </a>
                ) : (
                  <a
                    href={companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2, color: mutedFg, textDecoration: "none" }}
                  >
                    {companyName}
                  </a>
                )}
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
                  {data.name || "Gleb Starchikov"}
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ paddingBottom: hasContact ? 10 : 0 }}>
                <span style={{ fontSize: 13, color: mutedFg }}>
                  {data.title || "Product Owner"} · {companyName}
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
                    {phone} ·{" "}
                    <a
                      href={`https://x.com/${twitter.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: mutedFg, textDecoration: "none" }}
                    >
                      {twitter}
                    </a>
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
  const companyName = data.company || "Starco";
  const companyUrl = data.companyUrl || "https://starcoai.com";

  const logoHtml = data.logoUrl
    ? `<a href="${companyUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;"><img src="${data.logoUrl}" alt="${companyName}" style="display:block;max-height:40px;" /></a>`
    : `<a href="${companyUrl}" target="_blank" rel="noopener noreferrer" style="font-size:16px;font-weight:700;letter-spacing:2px;color:#737373;text-decoration:none;">${companyName}</a>`;

  const hasPhone = !!data.phone.trim();
  const hasTwitter = !!data.twitter.trim();
  const hasContact = hasPhone || hasTwitter;

  let contactHtml = "";
  if (hasContact) {
    const parts: string[] = [];
    if (hasPhone) parts.push(data.phone);
    if (hasTwitter) {
      const handle = data.twitter.replace("@", "");
      parts.push(`<a href="https://x.com/${handle}" target="_blank" rel="noopener noreferrer" style="color:#737373;text-decoration:none;">${data.twitter}</a>`);
    }
    contactHtml = `
    <tr>
      <td style="padding-top:10px;border-top:1px solid #e5e5e5;">
        <span style="font-size:13px;color:#737373;">${parts.join(" · ")}</span>
      </td>
    </tr>`;
  }

  return `<table cellpadding="0" cellspacing="0" style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;">
  <tbody>
    <tr>
      <td style="padding-bottom:12px;">
        ${logoHtml}
      </td>
    </tr>
    <tr>
      <td style="padding-bottom:4px;">
        <span style="font-size:15px;font-weight:600;color:#1a1a1a;">${data.name || "Gleb Starchikov"}</span>
      </td>
    </tr>
    <tr>
      <td style="padding-bottom:${hasContact ? "10" : "0"}px;">
        <span style="font-size:13px;color:#737373;">${data.title || "Product Owner"} · ${companyName}</span>
      </td>
    </tr>${contactHtml}
  </tbody>
</table>`;
}
