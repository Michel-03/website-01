"use client";

import Image from "next/image";
import Link from "next/link";

const industries = [
  {
    title: "Construction",
    img: "/images/gen.jpg",
    route: "/ai-in-construction",
  },
  {
    title: "Finance",
    img: "/images/gen.jpg",
    route: "/ai-in-finance",
  },
  {
    title: "Health Care",
    img: "/images/gen.jpg",
    route: "/ai-in-healthcare",
  },
  {
    title: "Natural Resource Management",
    img: "/images/gen.jpg",
    route: "/ai-in-natural-resources",
  },
  {
    title: "Real Estate",
    img: "/images/gen.jpg",
    route: "/ai-in-real-estate",
  },
  {
    title: "Retail",
    img: "/images/gen.jpg",
    route: "/ai-in-retail",
  },
  {
    title: "Marketing",
    img: "/images/gen.jpg",
    route: "/ai-in-marketing",
  },
];

export default function IndustryGrid() {
  return (
    <section className="w-full py-16">
      <div className="lg:max-w-[75%] mx-auto px-4">
        <h2 className="text-3xl font-light mb-10">AI in Industries</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((item) => (
            <Link
              key={item.title}
              href={item.route}
              className="border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Top purple bar */}
              <div className="h-2 w-full bg-[#605BAD]" />

              <div className="p-8 flex flex-col items-center text-center">
                {/* Circle image */}
                <div className="w-28 h-28 rounded-full border-2 border-[#31C3A6] overflow-hidden relative mb-6">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-sm font-semibold mb-2">{item.title}</h3>

                <span className="text-[#605BAD] text-xs font-medium hover:underline">
                  Know More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
