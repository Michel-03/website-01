"use client";

import { Lightbulb, Hourglass, Package } from "lucide-react";

export default function WhyAISection() {
  const items = [
    {
      title: "Insights",
      icon: <Lightbulb size={26} className="text-[#605BAD]" />,
      desc: "AI can analyse vast quantities of data to identify patterns and make predictions that inform business decisions",
    },
    {
      title: "Process",
      icon: <Hourglass size={26} className="text-[#605BAD]" />,
      desc: "AI-optimised workflows make business processes faster, better, cheaper and deliverable at scale.",
    },
    {
      title: "Products",
      icon: <Package size={26} className="text-[#605BAD]" />,
      desc: "Products and services embedded with AI can create intuitive products that overcome usage barriers.",
    },
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="lg:max-w-[75%] mx-auto px-4 flex flex-col lg:flex-row gap-12 items-start">
        
        {/* LEFT SIDE LIST */}
        <div className="space-y-4 w-full lg:w-[45%]">
          {items.map((item) => (
            <div
              key={item.title}
              className="border border-l-10 border-[#605BAD] rounded-lg p-3 flex gap-4 items-start hover:shadow-sm transition"
            >
              <div className="mt-1">{item.icon}</div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="w-full lg:w-[50%]">
          <h2 className="text-3xl font-light leading-snug mb-4">
            Why should businesses <span className="text-[#31C3A6] font-semibold">adopt AI?</span>
          </h2>

          <p className="text-gray-400 leading-relaxed mb-4">
            AI enables organisations to operate more efficiently—working smarter, faster, and with less.
          </p>

          <p className="text-gray-400 leading-relaxed mb-4">
            AI delivers the greatest impact when applied to genuine business challenges, driving new products, transforming operations and strategy, and unlocking new customer value.
          </p>

          <p className="text-gray-400 leading-relaxed mb-6">
            Explore real-world AI use cases across industries.
          </p>

          <button className="bg-[#605BAD] text-white text-xs px-5 py-2 rounded-md hover:bg-violet-900 transition shadow-sm">
            <a href="#contact">CONTACT US</a>
          </button>
        </div>
      </div>
    </section>
  );
}
