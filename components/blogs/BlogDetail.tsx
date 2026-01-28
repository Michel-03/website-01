import { blogs } from "@/data/blogs";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import RelatedBlogs from "./RelatedBlogs";
import BlogShare from "./BlogShare";



interface Props {
  slug: string;
}

export default function BlogDetail({ slug }: Props) {
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
        <BlogShare title={blog.title} slug={blog.slug} />

      {/* Meta */}
      <p className="text-sm text-gray-500 mb-2">
        {blog.category} • {blog.readTime}
      </p>

      {/* Title */}
      <h1 className="text-4xl font-light mb-4">
        {blog.title}
      </h1>

      {/* Author */}
      <p className="text-sm text-gray-500 mb-8">
        By {blog.author} • {blog.publishedAt}
      </p>

      {/* Cover Image */}
      <img
        src={blog.coverImage}
        alt={blog.title}
        className="rounded-lg mb-8 w-full"
      />

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>
            {blog.content.replace(/^\s+/gm, "").trim()}
        </ReactMarkdown>


      </div>

      {/* CTA */}
      <div className="mt-14 p-6 bg-gray-100 rounded-lg">
        <RelatedBlogs
        category={blog.category}
        currentSlug={blog.slug}
        />
        <h3 className="text-xl font-semibold">
          Talk to Our Experts
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          Want to implement AI or data solutions in your business?
        </p>
      </div>
      

    </article>
  );
}
