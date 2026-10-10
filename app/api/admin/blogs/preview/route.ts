import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/requireAdmin";
import { fetchLinkedInArticle } from "@/lib/linkedinArticle";

export async function POST(request: Request) {
  const denied = await assertAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const article = await fetchLinkedInArticle(String(body.url ?? ""));
    return NextResponse.json({ success: true, article });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The article could not be fetched.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
