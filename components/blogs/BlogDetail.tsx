import ReactMarkdown from "react-markdown";
import type { BlogPost } from "@/lib/blogs";
import RelatedBlogs from "./RelatedBlogs";
import BlogShare from "./BlogShare";

export default function BlogDetail({ blog, related }: { blog: BlogPost; related: BlogPost[] }) {
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

      {blog.sourceUrl && (
        <p className="mb-8 rounded-xl border border-[#605BAD]/20 bg-[#f4f3fb] px-4 py-3 text-sm text-[#221c4a]">
          Originally published on LinkedIn.{" "}
          <a href={blog.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#605BAD]">
            Read the original
          </a>
        </p>
      )}

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
        <RelatedBlogs blogs={related} />
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
