"use client";

import {
  Target,
  Lightbulb,
  ClipboardList,
  Tent,
  Rocket,
} from "lucide-react";

export default function AiMlProcess() {
  const steps = [
    { icon: <Target size={52} strokeWidth={1.5} />, title: "Define objectives" },
    { icon: <Target size={52} strokeWidth={1.5} />, title: "Scope" },
    { icon: <Lightbulb size={52} strokeWidth={1.5} />, title: "Proof of concept" },
    { icon: <ClipboardList size={52} strokeWidth={1.5} />, title: "Evaluate" },
    { icon: <Tent size={52} strokeWidth={1.5} />, title: "Minimum viable product" },
    { icon: <Rocket size={52} strokeWidth={1.5} />, title: "Scale the solution" },
  ];

  return (
    <section className="w-full flex justify-center py-20 px-6 bg-white">
      <div className="lg:max-w-[75%] w-full">

        {/* TITLE */}
        <h2 className="text-3xl font-light text-gray-800">
          Byte Analytics’s approach to successful AI and ML product development
        </h2>

        <p className="text-gray-600 mt-4 text-sm leading-relaxed">
         Byte Analytics applies a lean and agile product development approach to reduce risk, confirm feasibility, and speed up delivery across development phases.
        </p>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 mt-12">

          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-start gap-4 border-l pl-6 hover:border-teal-500 transition"
            >
              <div className="text-teal-600">{step.icon}</div>

              <h3 className="font-medium text-gray-800 text-lg leading-snug">
                {step.title}
              </h3>
            </div>
          ))}

        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-sm leading-relaxed mt-12">
          Our approach moves from strategy to validation with a PoC, then to an MVP designed for user feedback and real-world alignment. With human–AI collaboration at the core, we scale proven solutions to support enterprise-wide adoption.
        </p>

      </div>
    </section>
  );
}
