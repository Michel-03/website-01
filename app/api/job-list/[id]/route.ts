import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/requireAdmin";
import { getSupabase } from "@/lib/supabaseclient";

type Context = { params: Promise<{ id: string }> };

function jobPayload(body: Record<string, unknown>) {
  return {
    title: String(body.title ?? "").trim(),
    location: String(body.location ?? "").trim(),
    salary: String(body.salary ?? "").trim(),
    description: String(body.description ?? "").trim(),
    experience: String(body.experience ?? "").trim(),
    skills: String(body.skills ?? "").trim(),
    slug: String(body.slug ?? "").trim(),
  };
}

export async function GET(_request: Request, context: Context) {
  const denied = await assertAdmin();
  if (denied) return denied;

  try {
    const { id } = await context.params;
    const supabase = getSupabase();
    const { data, error } = await supabase.from("job").select("*").eq("id", id).single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: error?.message ?? "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, job: data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, context: Context) {
  const denied = await assertAdmin();
  if (denied) return denied;

  try {
    const { id } = await context.params;
    const payload = jobPayload(await request.json());

    if (!payload.title || !payload.slug) {
      return NextResponse.json(
        { success: false, error: "Title and slug are required." },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("job")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, job: data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: Context) {
  const denied = await assertAdmin();
  if (denied) return denied;

  try {
    const { id } = await context.params;
    const supabase = getSupabase();
    const { error } = await supabase.from("job").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
