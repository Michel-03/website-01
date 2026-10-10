import { NextResponse } from "next/server";
import { assertAdmin, isAdminRequest } from "@/lib/requireAdmin";
import { getSupabase } from "@/lib/supabaseclient";
import { defaultSiteLinks } from "@/lib/siteLinks";

export async function GET() {
  try {
    const admin = await isAdminRequest();
    const supabase = getSupabase();
    let query = supabase
      .from("site_links")
      .select("id, label, href, group_name, sort_order, is_active")
      .order("sort_order", { ascending: true });

    if (!admin) query = query.eq("is_active", true);

    const { data, error } = await query;

    if (error || (!admin && !data?.length)) {
      return NextResponse.json({
        success: true,
        source: "fallback",
        links: defaultSiteLinks,
        warning: error?.message ?? null,
      });
    }

    return NextResponse.json({ success: true, source: "database", links: data ?? [] });
  } catch (error) {
    return NextResponse.json({
      success: true,
      source: "fallback",
      links: defaultSiteLinks,
      warning: error instanceof Error ? error.message : "Database unavailable",
    });
  }
}

export async function POST(request: Request) {
  const denied = await assertAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const supabase = getSupabase();

    if (body.seed) {
      const existing = await supabase
        .from("site_links")
        .select("id", { count: "exact", head: true });

      if (existing.error) {
        return NextResponse.json({ success: false, error: existing.error.message }, { status: 500 });
      }

      if ((existing.count ?? 0) > 0) {
        return NextResponse.json(
          { success: false, error: "Web links are already saved. Add or remove them individually." },
          { status: 409 }
        );
      }

      const rows = defaultSiteLinks.map((link) => ({
        label: link.label,
        href: link.href,
        group_name: link.group_name,
        sort_order: link.sort_order,
        is_active: true,
      }));
      const { data, error } = await supabase.from("site_links").insert(rows).select();

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, links: data });
    }

    const label = String(body.label ?? "").trim();
    const href = String(body.href ?? "").trim();

    if (!label || !href) {
      return NextResponse.json(
        { success: false, error: "Label and web link are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("site_links")
      .insert([
        {
          label,
          href,
          group_name: String(body.group_name ?? "Company").trim() || "Company",
          sort_order: Number(body.sort_order) || 0,
          is_active: body.is_active !== false,
        },
      ])
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
