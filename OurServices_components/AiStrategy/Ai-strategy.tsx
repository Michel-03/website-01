"use client";

import {
  Binary,
  Server,
  BrainCircuit,
  Workflow,
  Users,
} from "lucide-react";

const items = [
  {
    title: "Data & Process",
    desc: "Understand the business process and assess available data relevant to the business problem.",
    icon: Binary,
  },
  {
    title: "Systems & Infrastructure",
    desc: "Understand existing processes and systems. Evaluate infrastructure requirements for new tech.",
    icon: Server,
  },
  {
    title: "Problem Embedding",
    desc: "Translate commercial objectives into technical problem(s) that technology can address.",
    icon: BrainCircuit,
  },
  {
    title: "AI/ML Solution Domains",
    desc: "Identify relevant solution domain(s). Evaluate Open Source models vs Building bespoke.",
    icon: Workflow,
  },
  {
    title: "Resourcing & Planning",
    desc: "Define solution architecture and integration. Develop a roadmap and assess timeline and resources.",
    icon: Users,
  },
];

export default function AIStrategyDevelopment() {
  return (
    <div className="lg:max-w-[75%] mx-auto px-4 py-12">

      {/* Heading */}
      <h2 className="text-3xl font-light">
        Building Practical {" "}
        <span className="text-[#31C3A6] font-semibold">AI Strategies</span>
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 mt-4 mb-10 text-sm md:text-base leading-relaxed">
        Our scoping programme reviews the full AI solution to guarantee seamless adoption within your existing operations.
      </p>

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

              {/* Description */}
              <p className="text-gray-600 text-xs mt-3">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
