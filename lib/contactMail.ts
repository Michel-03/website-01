import { siteConfig } from "@/data/site";
import { readLocalEnv } from "@/lib/localAdmin";

const DEFAULT_INBOX = "nagendragampala03@gmail.com";

export type ContactMail = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export async function sendContactEmail(fields: ContactMail) {
  const inbox = readLocalEnv("CONTACT_TO_EMAIL") || DEFAULT_INBOX;
  const name = [fields.firstName, fields.lastName].filter(Boolean).join(" ") || "Website visitor";

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: siteConfig.url,
      Referer: `${siteConfig.url}/contact`,
    },
    body: JSON.stringify({
      name,
      email: fields.email,
      phone: fields.phone || "Not provided",
      message: fields.message,
      _subject: `Website inquiry from ${name}`,
      _template: "table",
      _captcha: "false",
      _replyto: fields.email,
    }),
  });

  const payload = await response.json().catch(() => null);
  const accepted = response.ok && String(payload?.success ?? "true") !== "false";
  if (!accepted) {
    const detail = typeof payload?.message === "string" ? payload.message : `Mail service returned ${response.status}`;
    throw new Error(detail);
  }
}
