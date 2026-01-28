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
    title: "AI Strategy Proposal",
    desc: "",
    icon: Binary,
  },
  {
    title: "Roadmap & Deliverables",
    desc: "Deliverables",
    icon: Server,
  },
  {
    title: "Project Resources",
    desc: "",
    icon: BrainCircuit,
  },
  {
    title: "Data and Cloud Infrastructure",
    desc: "",
    icon: Workflow,
  },
  {
    title: "Feasibility & Risk Assessment",
    desc: "Outcomes",
    icon: Users,
  },
  {
    title: "Integration & Sclaing requirements",
    desc: "",
    icon: Users,
  },
];

export default function Deliverables() {
  return (
    <div className="lg:max-w-[75%] mx-auto px-4 py-12">

      {/* Heading */}
      <h2 className="text-3xl font-light">
        Scoping Programme{" "}
        <span className="text-[#31C3A6] font-semibold">Key Outputs</span>
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 mt-4 mb-10 text-sm md:text-base leading-relaxed">
        The scoping programme concludes with a clear, step-by-step AI strategy designed to achieve your business goals.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
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
