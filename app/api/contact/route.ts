import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/contactMail";
import { getSupabase } from "@/lib/supabaseclient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!email || !message) {
      return NextResponse.json(
        { success: false, error: "Email and message are required." },
        { status: 400 }
      );
    }

    const inquiry = {
      firstName: String(body.firstName ?? "").trim(),
      lastName: String(body.lastName ?? "").trim(),
      email,
      phone: String(body.phone ?? "").trim(),
      message,
    };

    const supabase = getSupabase();
    const { error } = await supabase.from("contact_form").insert({
      first_name: inquiry.firstName,
      last_name: inquiry.lastName,
      email: inquiry.email,
      phone: inquiry.phone,
      message: inquiry.message,
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    let mailed = true;
    try {
      await sendContactEmail(inquiry);
    } catch (error) {
      mailed = false;
      console.error(error instanceof Error ? error.message : "Contact email failed");
    }

    return NextResponse.json({ success: true, mailed });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Server error" },
      { status: 503 }
    );
  }
}
