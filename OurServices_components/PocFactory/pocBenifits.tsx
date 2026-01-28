"use client";

import { BarChart4, FileBadge, BadgeDollarSign, Lightbulb } from "lucide-react";

const items = [
  {
    icon: BarChart4,
    text: "Minimize development risk with upfront planning, strategic direction, and data-driven risk evaluation.",
  },
  {
    icon: FileBadge,
    text: "All intellectual property created remains fully owned by you.",
  },
  {
    icon: BadgeDollarSign,
    text: "Validate feasibility early to avoid unnecessary investment.",
  },
  {
    icon: Lightbulb,
    text: "Gain expert insight into the best approach for your challenge.",
  },
];

export default function PocBenefits() {
  return (
    <section className="bg-gray-100 py-6">
    <div className="lg:max-w-[75%] mx-auto px-4 py-16">

      {/* Top Description */}
      <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-10">
        A streamlined PoC approach reduces risk and increases the likelihood of AI success. A strong PoC helps you to:
      </p>

      {/* Row of Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {items.map((item, idx) => {
          const Icon = item.icon;

          return (
            <div key={idx} className="flex flex-col items-center text-center relative">

              {/* Vertical Divider (hide on mobile, show between items on large screens) */}
              {idx !== 0 && (
                <div className="hidden lg:block absolute left-0 top-2 bottom-2 w-[1px] bg-gray-300" />
              )}

              {/* Purple Circle Icon */}
              <div className="w-20 h-20 rounded-full bg-[#605BAD] flex items-center justify-center mb-4">
                <Icon size={36} strokeWidth={1.7} className="text-white" />
              </div>

              {/* Text */}
              <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
        </section>
  );
}
