import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseclient";

export async function POST(req: Request) {
  const { id, stage } = await req.json();

//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   );

  const { error } = await supabase
    .from("applications")
    .update({ stage })
    .eq("id", id);

  if (error)
    return NextResponse.json({ success: false, message: error.message });

  return NextResponse.json({ success: true });
}
