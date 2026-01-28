"use client";

import Image from "next/image";

const items = [
  {
    title: "Daisy",
    desc: "World’s first AI-powered timber design software.",
    link: "https://example.com/predictive",
    img: "/images/gen.jpg",
  },
  {
    title: "Forstack",
    desc: "Item-level demand forecasting tool.",
    link: "https://example.com/backoffice",
    img: "/images/gen.jpg",
  },
  {
    title: "Tunedd",
    desc: "Automated technical due diligence platform",
    link: "https://example.com/insights",
    img: "/images/gen.jpg",
  },
];

export default function Deliverables() {
  return (
    <div className="lg:max-w-[75%] mx-auto px-4 py-12">
      <h2 className="text-3xl font-light mb-10">
        Here are few automation examples{" "}
        <span className="text-[#31C3A6] font-semibold">
          delivered by Byte Analytics
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="border rounded-lg shadow-sm text-center pb-8 hover:shadow-md transition"
          >
            <div className="h-2 w-full bg-[#605BAD] rounded-t-lg" />

            <div className="flex justify-center mt-4">
              <div className="w-28 h-28 rounded-full border-2 border-[#605BAD] overflow-hidden relative mt-6 mb-6">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <h3 className="font-semibold mt-6 text-sm">{item.title}</h3>
            <p className="text-xs mt-1 text-gray-400">{item.desc}</p>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#605BAD] text-xs mt-3 inline-block hover:text-violet-800 transition"
            >
              Know more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
