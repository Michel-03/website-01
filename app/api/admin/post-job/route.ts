import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseclient";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, location, salary, description, experience, skills, slug } =
      body;
    console.log("Body",body)
    const { data, error } = await supabase
      .from("job")
      .insert([
        { title, location, salary, description, experience, skills, slug }
      ]);

    if (error) {
      return NextResponse.json({ success: false, error });
    }

    return NextResponse.json({ success: true, job: data });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Server error" });
  }
}
