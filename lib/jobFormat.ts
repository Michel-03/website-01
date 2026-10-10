import { getSupabase } from "@/lib/supabaseclient";

export type PublicJob = {
  id: string;
  title: string;
  slug: string;
  location?: string | null;
  experience?: string | null;
  salary?: string | null;
  description?: string | null;
  skills?: string | null;
  created_at?: string | null;
};

export type DescriptionBlock = { type: "paragraph"; text: string } | { type: "list"; items: string[] };

const BULLET = /^\s*(?:[-*•▪◦]|\d+[.)])\s+/;

export function splitSkills(skills?: string | null) {
  return (skills ?? "")
    .split(/[,\n;]/)
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function sentences(text: string) {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function skillDisplay(skills?: string | null): { kind: "tags"; items: string[] } | { kind: "list"; items: string[] } {
  const tags = splitSkills(skills);
  if (tags.every((tag) => tag.length <= 32 && !/[.!?]$/.test(tag))) return { kind: "tags", items: tags };
  return { kind: "list", items: (skills ?? "").split(/\n+/).flatMap((line) => sentences(line.replace(BULLET, ""))) };
}

export function descriptionBlocks(description?: string | null): DescriptionBlock[] {
  const blocks: DescriptionBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push({ type: "list", items: list });
    list = [];
  };

  for (const rawLine of (description ?? "").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
    } else if (BULLET.test(line)) {
      flushParagraph();
      list.push(line.replace(BULLET, ""));
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushList();

  if (blocks.length === 1 && blocks[0].type === "paragraph") {
    const parts = sentences(blocks[0].text);
    if (parts.length >= 3 && parts.every((part) => part.length <= 180)) return [{ type: "list", items: parts }];
  }
  return blocks;
}

export function postedLabel(createdAt?: string | null) {
  if (!createdAt) return null;
  const days = Math.floor((Date.now() - new Date(createdAt).getTime()) / 86_400_000);
  if (Number.isNaN(days)) return null;
  if (days <= 0) return "Posted today";
  if (days === 1) return "Posted yesterday";
  if (days < 30) return `Posted ${days} days ago`;
  return `Posted ${new Date(createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`;
}

export async function getPublicJob(slug: string) {
  try {
    const { data } = await getSupabase()
      .from("job")
      .select("id, title, slug, location, experience, salary, description, skills, created_at")
      .eq("slug", slug)
      .maybeSingle();
    return (data as PublicJob | null) ?? null;
  } catch {
    return null;
  }
}

export async function getOtherJobs(slug: string, limit = 3) {
  try {
    const { data } = await getSupabase()
      .from("job")
      .select("id, title, slug, location, experience")
      .neq("slug", slug)
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data as PublicJob[] | null) ?? [];
  } catch {
    return [];
  }
}
