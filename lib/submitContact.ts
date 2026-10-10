import { siteSettings } from "@/config/site";

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

// Hosted servers can be refused by the mail service, so the visitor's browser
// sends the email itself when the server could not.
async function mailFromBrowser(payload: ContactPayload) {
  const inbox = siteSettings.contactEmail.trim();
  if (!inbox) return false;
  const name = [payload.firstName, payload.lastName].filter(Boolean).join(" ") || "Website visitor";
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name,
        email: payload.email,
        phone: payload.phone || "Not provided",
        message: payload.message,
        _subject: `Website inquiry from ${name}`,
        _template: "table",
        _captcha: "false",
        _replyto: payload.email,
      }),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || String(data?.success ?? "true") === "false") {
      console.error("Contact email was not sent:", data?.message ?? response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Contact email was not sent:", error instanceof Error ? error.message : error);
    return false;
  }
}

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => null);

    if (response.ok && data?.success) {
      if (data.mailed === false) await mailFromBrowser(payload);
      return { ok: true };
    }
    if (response.status >= 500 && (await mailFromBrowser(payload))) return { ok: true };
    return {
      ok: false,
      error:
        typeof data?.error === "string"
          ? data.error
          : "We could not send your message right now. Please try again or email info@byteanalytics.co.in.",
    };
  } catch {
    if (await mailFromBrowser(payload)) return { ok: true };
    return { ok: false, error: "Network error. Check your connection and try again." };
  }
}
