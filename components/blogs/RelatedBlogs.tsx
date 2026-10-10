import type { BlogPost } from "@/lib/blogs";
import BlogCard from "./BlogCard";

export default function RelatedBlogs({ blogs }: { blogs: BlogPost[] }) {
  if (blogs.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold mb-6">
        Related Articles
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
