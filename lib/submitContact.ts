export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => null);

    if (response.ok && data?.success) return { ok: true };
    return {
      ok: false,
      error:
        typeof data?.error === "string"
          ? data.error
          : "We could not send your message right now. Please try again or email info@byteanalytics.co.in.",
    };
  } catch {
    return { ok: false, error: "Network error. Check your connection and try again." };
  }
}
