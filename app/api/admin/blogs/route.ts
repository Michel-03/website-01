import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/requireAdmin";
import { assertLinkedInArticleUrl } from "@/lib/linkedinArticle";
import { getSupabase } from "@/lib/supabaseclient";

function slugFrom(sourceUrl: string, title: string) {
  const path = new URL(sourceUrl).pathname.split("/").filter(Boolean).pop() || "";
  const fromPath = path.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").slice(0, 90);
  if (fromPath.length > 3) return fromPath;
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || "linkedin-article";
}

function missingTable(message: string) {
  return /blog_posts|schema cache/i.test(message);
}

export async function GET() {
  const denied = await assertAdmin();
  if (denied) return denied;

  const { data, error } = await getSupabase()
    .from("blog_posts")
    .select("id, title, slug, author, published_at, source_url, featured, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        error: missingTable(error.message)
          ? "The blog table is not in the database yet. Run supabase/blog_posts.sql in the Supabase SQL editor."
          : error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, posts: data ?? [] });
}

export async function POST(request: Request) {
  const denied = await assertAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const sourceUrl = assertLinkedInArticleUrl(String(body.sourceUrl ?? "")).split("?")[0];
    const title = String(body.title ?? "").trim();
    const content = String(body.content ?? "").trim();
    if (!title || !content) {
      return NextResponse.json({ success: false, error: "Title and article text are required." }, { status: 400 });
    }

    const row = {
      title,
      slug: slugFrom(sourceUrl, title),
      excerpt: String(body.excerpt ?? "").trim().slice(0, 400),
      category: "LinkedIn",
      author: String(body.author ?? "").trim() || "Byte Analytics",
      published_at: String(body.publishedAt ?? "").slice(0, 10) || null,
      read_time: String(body.readTime ?? "").trim(),
      cover_image: String(body.coverImage ?? "").trim() || null,
      content: content.slice(0, 100_000),
      source_url: sourceUrl,
      featured: Boolean(body.featured),
      is_published: true,
    };

    const supabase = getSupabase();
    const existing = await supabase.from("blog_posts").select("id, slug").eq("source_url", sourceUrl).maybeSingle();
    if (existing.error && missingTable(existing.error.message)) {
      return NextResponse.json(
        { success: false, error: "The blog table is not in the database yet. Run supabase/blog_posts.sql in the Supabase SQL editor." },
        { status: 500 }
      );
    }

    if (existing.data) {
      const { error } = await supabase.from("blog_posts").update(row).eq("id", existing.data.id);
      if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      return NextResponse.json({ success: true, slug: existing.data.slug, updated: true });
    }

    const { data, error } = await supabase.from("blog_posts").insert(row).select("slug").single();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, slug: data.slug, updated: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The article could not be saved.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
