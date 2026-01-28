import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseclient";

export async function GET() {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ success: false, message: error.message });
  console.log(data)
  return NextResponse.json({ success: true, data });
}
