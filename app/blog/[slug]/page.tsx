import BlogDetail from "@/components/blogs/BlogDetail";
import { getPublishedBlog, getPublishedBlogs } from "@/lib/blogs";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getPublishedBlog(slug);

  if (!blog) {
    return { title: "Blog Not Found | Byte Analytics" };
  }

  return {
    title: blog.seoTitle || `${blog.title} | Byte Analytics`,
    description: blog.seoDescription || blog.excerpt,
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.excerpt,
      images: blog.coverImage ? [{ url: blog.coverImage, alt: blog.title }] : undefined,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [blog, blogs] = await Promise.all([getPublishedBlog(slug), getPublishedBlogs()]);
  if (!blog) notFound();

  const others = blogs.filter((item) => item.slug !== blog.slug);
  const related = [
    ...others.filter((item) => item.category === blog.category),
    ...others.filter((item) => item.category !== blog.category),
  ].slice(0, 3);

  return <BlogDetail blog={blog} related={related} />;
}
