"use client";

import { useState } from "react";
import { blogs } from "@/data/blogs";
import Link from "next/link";

/* simple inline helper */
function timeAgo(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor(
    (now.getTime() - past.getTime()) / 1000
  );

  const days = Math.floor(diff / 86400);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;

  return "Recently published";
}

export default function FeaturedBlogs() {
  const featuredBlogs = blogs.filter((b) => b.featured);
  const [current, setCurrent] = useState(0);

  if (featuredBlogs.length === 0) return null;

  const blog = featuredBlogs[current];

  const next = () =>
    setCurrent((prev) => (prev + 1) % featuredBlogs.length);

  const prev = () =>
    setCurrent(
      (prev) =>
        (prev - 1 + featuredBlogs.length) % featuredBlogs.length
    );

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-light">
          Featured Insights
        </h2>

        {featuredBlogs.length > 1 && (
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="border px-3 py-1 rounded"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="border px-3 py-1 rounded"
            >
              ›
            </button>
          </div>
        )}
      </div>

      <Link href={`/blog/${blog.slug}`}>
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-xl overflow-hidden border hover:shadow-lg transition cursor-pointer">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="h-72 w-full object-cover"
          />

          <div className="p-8 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-wide text-gray-500">
              {blog.category} • Featured • {timeAgo(blog.publishedAt)}
            </span>

            <h3 className="text-2xl font-semibold mt-3">
              {blog.title}
            </h3>

            <p className="text-gray-600 mt-4">
              {blog.excerpt}
            </p>

            <p className="text-sm text-gray-500 mt-6">
              {blog.readTime}
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
}
