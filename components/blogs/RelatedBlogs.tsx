import { blogs } from "@/data/blogs";
import BlogCard from "./BlogCard";

interface Props {
  category: string;
  currentSlug: string;
}

export default function RelatedBlogs({ category, currentSlug }: Props) {
  const relatedBlogs = blogs
    .filter(
      (blog) =>
        blog.category === category && blog.slug !== currentSlug
    )
    .slice(0, 3); // limit to 3

  if (relatedBlogs.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold mb-6">
        Related Articles
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
