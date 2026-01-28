"use client";

import Image from "next/image";
import Link from "next/link";

export default function PartnerLogos() {
  const logos = [
    { src: "/next.svg", alt: "Business", link: "https://business.com" },
    { src: "/next.svg", alt: "Telegraph", link: "https://telegraph.co.uk" },
    { src: "/next.svg", alt: "Forbes", link: "https://forbes.com" },
    { src: "/next.svg", alt: "Bloomberg", link: "https://bloomberg.com" },
    { src: "/next.svg", alt: "AI Logo", link: "https://example.com" },
  ];

  return (
    <section className="w-full py-10 overflow-hidden">
      <div className="lg:max-w-[75%] mx-auto text-center">
        <p className="text-gray-700 mb-10 font-medium">We work with</p>

        {/* Marquee container */}
        <div className="relative w-full overflow-hidden">
          {/* Continuous scroll content */}
          <div className="flex gap-20 animate-marquee">
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <Link
                href={logo.link}
                key={index}
                target="_blank"
                className="flex-shrink-0 transition-transform hover:scale-110"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={40}
                  className="rounded-md"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
