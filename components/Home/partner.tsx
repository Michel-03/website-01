"use client";

import Image from "next/image";
import Link from "next/link";

export default function PartnerLogo() {
  const logos = [
    { src: "/key_pixel.png", alt: "Business", link: "https://keypixelusa.com/index.php" },
    { src: "/clr_web.png", alt: "Telegraph", link: "https://www.clr.com/" },
    { src: "/databricks.png", alt: "Forbes", link: "https://www.databricks.com/" },
    // { src: "/next.svg", alt: "Bloomberg", link: "https://bloomberg.com" },
    // { src: "/next.svg", alt: "AI Logo", link: "https://example.com" },
  ];

  return (
    <section className="w-full  py-10 mt-1 overflow-hidden bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-700 mb-10 font-medium">Who we work with</p>

        {/* Marquee container */}
        <div className="relative w-full overflow-hidden">
          {/* Continuous scroll content */}
          <div className="flex gap-20 animate-marquee items-center">
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <Link
                href={logo.link}
                key={index}
                target="_blank"
                className="flex-shrink-0 transition-transform hover:scale-110 flex items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={40}
                  className="rounded-md object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
