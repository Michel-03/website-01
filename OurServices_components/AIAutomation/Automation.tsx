"use client";

import {
  Binary,
  Server,
  BrainCircuit,
  Workflow,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const items = [
  {
    title: "Design Automation",
    desc: "know more",
    icon: Binary,
  },
  {
    title: "Recommendation Systems",
    desc: "know more",
    icon: Server,
  },
  {
    title: "Data Structuring",
    desc: "know more",
    icon: BrainCircuit,
  },
  {
    title: "Predictive analysis",
    desc: "know more",
    icon: Workflow,
  },
  {
    title: "Backoffice automation",
    desc: "know more",
    icon: Users,
  },
];

export default function Deliverables() {
  const router = useRouter();

  // convert title → slug  e.g. "Design Automation" → "design-automation"
  const toSlug = (str: string) =>
    str.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="lg:max-w-[75%] mx-auto px-4 py-12">

      {/* Heading */}
      <h2 className="text-3xl font-light mb-10">
        Here are few automation examples{" "}
        <span className="text-[#31C3A6] font-semibold">delivered by Byte Analytics</span>
      </h2>

      {/* Subtitle */}
      {/* <p className="text-gray-600 mt-4 mb-10 text-sm md:text-base leading-relaxed">
        At the end of the scoping programme Byte Analytics AI expert delivers a 
        step-by-step AI Strategy to achieve your business objectives.
      </p> */}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {items.map((item, idx) => {
          const Icon = item.icon;

          return (
            <div
              key={idx}
              className="border rounded-lg shadow-sm text-center px-4 pb-8 pt-6 relative hover:shadow-md transition"
            >
              {/* Purple Top Border */}
              <div className="absolute top-0 left-0 w-full h-2 bg-[#605BAD] rounded-t-lg" />

              {/* Icon */}
              <div className="flex justify-center mt-4">
                <div className="w-28 h-28 rounded-full border-2 border-[#605BAD] flex items-center justify-center">
                  <Icon size={50} strokeWidth={1.5} className="text-purple-600" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold mt-6 text-sm">{item.title}</h3>

              {/* Know more button */}
              <button
                onClick={() => router.push(`/${toSlug(item.title)}`)}
                className="text-[#605BAD] text-xs mt-3 hover:text-violet-800 transition"
              >
                {item.desc}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
