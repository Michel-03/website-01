import Link from "next/link";

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

export default function BlogCard({ blog }: any) {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer bg-white">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="h-48 w-full object-cover"
        />

        <div className="p-4">
          <p className="text-xs text-gray-500">
            {blog.category} • {timeAgo(blog.publishedAt)}
          </p>

          <h2 className="text-lg font-semibold mt-2">
            {blog.title}
          </h2>

          <p className="text-sm text-gray-600 mt-2">
            {blog.excerpt}
          </p>

          <p className="text-xs text-gray-400 mt-4">
            {blog.readTime}
          </p>
        </div>
      </div>
    </Link>
  );
}
