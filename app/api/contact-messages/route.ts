import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/requireAdmin";
import { supabase } from "../../../lib/supabaseclient";

export async function GET() {
  const denied = await assertAdmin();
  if (denied) return denied;

  try {
    const { data, error } = await supabase
      .from("contact_form")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, messages: data });
  } catch (err: any) {
    console.error("API Error:", err.message);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
