import { getSupabase } from "@/lib/supabaseclient";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  featured: boolean;
  content: string;
  sourceUrl?: string | null;
  seoTitle?: string;
  seoDescription?: string;
};

type BlogRow = {
  id: number | string;
  title: string;
  slug: string;
  excerpt?: string | null;
  category?: string | null;
  author?: string | null;
  published_at?: string | null;
  read_time?: string | null;
  cover_image?: string | null;
  content?: string | null;
  source_url?: string | null;
  featured?: boolean | null;
  created_at?: string | null;
};

function fromRow(row: BlogRow): BlogPost {
  return {
    id: String(row.id),
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || "",
    category: row.category || "LinkedIn",
    author: row.author || "Byte Analytics",
    publishedAt: (row.published_at || row.created_at || "").slice(0, 10),
    readTime: row.read_time || "",
    coverImage: row.cover_image || "/blogs/blog1.jpg",
    featured: Boolean(row.featured),
    content: row.content || "",
    sourceUrl: row.source_url,
  };
}

export async function getPublishedBlogs() {
  try {
    const { data, error } = await getSupabase()
      .from("blog_posts")
      .select("id, title, slug, excerpt, category, author, published_at, read_time, cover_image, content, source_url, featured, created_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    if (error || !data) return [];
    return (data as BlogRow[]).map(fromRow);
  } catch {
    return [];
  }
}

export async function getPublishedBlog(slug: string) {
  const blogs = await getPublishedBlogs();
  return blogs.find((blog) => blog.slug === slug) ?? null;
}
