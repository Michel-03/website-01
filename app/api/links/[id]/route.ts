import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/requireAdmin";
import { getSupabase } from "@/lib/supabaseclient";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const denied = await assertAdmin();
  if (denied) return denied;

  try {
    const { id } = await context.params;
    const body = await request.json();
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("site_links")
      .update({
        label: body.label,
        href: body.href,
        group_name: body.group_name,
        sort_order: Number(body.sort_order) || 0,
        is_active: body.is_active !== false,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, link: data });
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
    const { error } = await supabase.from("site_links").delete().eq("id", id);

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
