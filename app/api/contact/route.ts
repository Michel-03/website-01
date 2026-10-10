import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/contactMail";
import { getSupabase } from "@/lib/supabaseclient";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UNAVAILABLE = "We could not send your message right now. Please try again or email info@byteanalytics.co.in.";

function field(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const inquiry = {
      firstName: field(body.firstName, 100),
      lastName: field(body.lastName, 100),
      email: field(body.email, 254),
      phone: field(body.phone, 40),
      message: field(body.message, 5000),
    };

    if (!inquiry.email || !inquiry.message) {
      return NextResponse.json(
        { success: false, error: "Email and message are required." },
        { status: 400 }
      );
    }
    if (!EMAIL_PATTERN.test(inquiry.email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    let saved = false;
    try {
      const { error } = await getSupabase().from("contact_form").insert({
        first_name: inquiry.firstName,
        last_name: inquiry.lastName,
        email: inquiry.email,
        phone: inquiry.phone,
        message: inquiry.message,
      });
      if (error) console.error("Contact insert failed:", error.message);
      else saved = true;
    } catch (dbError) {
      console.error("Contact insert failed:", dbError instanceof Error ? dbError.message : dbError);
    }

    let mailed = true;
    try {
      await sendContactEmail(inquiry);
    } catch (mailError) {
      mailed = false;
      console.error("Contact email failed:", mailError instanceof Error ? mailError.message : mailError);
    }

    if (!saved && !mailed) {
      return NextResponse.json({ success: false, mailed, saved, error: UNAVAILABLE }, { status: 503 });
    }
    return NextResponse.json({ success: true, mailed, saved });
  } catch (error) {
    console.error("Contact request failed:", error instanceof Error ? error.message : error);
    return NextResponse.json({ success: false, error: UNAVAILABLE }, { status: 503 });
  }
}
