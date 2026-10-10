"use client";

import { useState, useMemo } from "react";
import type { BlogPost } from "@/lib/blogs";
import BlogCard from "./BlogCard";
import FeaturedBlogs from "./FeaturedBlogs";

const BLOGS_PER_PAGE = 6;

export default function BlogList({ blogs }: { blogs: BlogPost[] }) {
  const featuredBlogs = useMemo(
    () => blogs.filter((b) => b.featured),
    [blogs]
  );

  const normalBlogs = useMemo(
    () => blogs.filter((b) => !b.featured),
    [blogs]
  );

  const totalPages = Math.ceil(
    normalBlogs.length / BLOGS_PER_PAGE
  );

  const [currentPage, setCurrentPage] = useState(1);

  // ✅ SINGLE SOURCE OF TRUTH
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    const end = start + BLOGS_PER_PAGE;
    return normalBlogs.slice(start, end);
  }, [currentPage, normalBlogs]);

  const goNext = () => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrev = () => {
    setCurrentPage((p) => Math.max(p - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* HERO */}
      <section className="h-[30vh] min-h-[260px] bg-gray-100 flex items-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-light">
            Byte Analytics{" "}
            <span className="font-semibold text-[#605BAD]">
              Blogs
            </span>
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* FEATURED (STATIC) */}
        {blogs.length === 0 && (
          <p className="rounded-2xl bg-white px-6 py-10 text-gray-600">
            New articles will appear here once they are published.
          </p>
        )}

        {featuredBlogs.length > 0 && (
          <div className="mb-20">
            <FeaturedBlogs blogs={featuredBlogs} />
          </div>
        )}

        {/* 🔒 PAGINATED GRID (KEYED BY PAGE) */}
        <div
          key={currentPage} // ⭐ THIS IS THE CRITICAL FIX
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {paginatedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6 mt-16">
            <button
              onClick={goPrev}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center border rounded-full disabled:opacity-40"
            >
              ←
            </button>

            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={goNext}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center border rounded-full disabled:opacity-40"
            >
              →
            </button>
          </div>
        )}
      </section>
    </>
  );
}
