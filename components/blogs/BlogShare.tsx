"use client";

import { siteConfig } from "../../data/site";

interface Props {
  title: string;
  slug: string;
}

export default function BlogShare({ title, slug }: Props) {
  const url = `${siteConfig.url}/blog/${slug}`;

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
  };

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed right-6 top-1/3 flex flex-col gap-4 z-40">
      <button
        onClick={scrollToTop}
        className="w-12 h-12 rounded-full border bg-white shadow flex items-center justify-center"
        title="Back to top"
      >
        ↑
      </button>

      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on LinkedIn"
        className="w-12 h-12 rounded-full border bg-white shadow flex items-center justify-center"
      >
        in
      </a>

      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on Twitter"
        className="w-12 h-12 rounded-full border bg-white shadow flex items-center justify-center"
      >
        𝕏
      </a>

      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on Facebook"
        className="w-12 h-12 rounded-full border bg-white shadow flex items-center justify-center"
      >
        f
      </a>
    </div>
  );
}
