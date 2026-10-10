import BlogList from "@/components/blogs/BlogList";
import { getPublishedBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();
  return <BlogList blogs={blogs} />;
}
