"use client";

import { LineChart, Atom, Cog, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

const team = [
  { icon: LineChart, title: "AI Project Manager" },
  { icon: Atom, title: "Data Scientist" },
  { icon: Cog, title: "Data Engineer" },
  { icon: RefreshCw, title: "DevOps Specialist" },
];

export default function PocTeamSection() {
  const router = useRouter();
  return (
    <section className="py-14 bg-white">
      <div className="lg:max-w-[75%] mx-auto px-4">

        {/* TOP PARAGRAPH SECTION */}
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          Many organizations attempt to validate AI initiatives with a single data scientist. However, effective PoCs demand a broader skill set, including engineering and DevOps, which typically requires multiple specialists or significant hiring investment.
        </p>

        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-10">
          Instead of hiring one data scientist, Byte Analytics provides a full PoC delivery team—covering data science, engineering, DevOps, and domain expertise—at a similar cost. Our PoC development team typically includes.
        </p>

        {/* GRID OF ROLES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {team.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div key={idx} className="flex flex-col items-center text-center relative">

                {/* Vertical divider for large screens */}
                {idx !== 0 && (
                  <div className="hidden lg:block absolute left-0 top-4 bottom-4 w-[1px] bg-gray-300" />
                )}

                {/* Purple Icon */}
                <div className="w-20 h-20 rounded-full bg-[#605BAD] flex items-center justify-center mb-3">
                  <Icon size={38} strokeWidth={1.7} className="text-white" />
                </div>

                {/* Title */}
                <p className="text-gray-800 text-sm font-medium">{item.title}</p>
              </div>
            );
          })}
        </div>

        {/* BOTTOM TEXT */}
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-10 mb-6">
          Across industries, Byte Analytics has supported organizations in building PoCs and validating AI concepts. Validate your solution first and reduce risk before committing to internal hiring.
        </p>

        {/* CONTACT BUTTON */}
        <button className="bg-[#605BAD] text-white text-xs px-5 py-2 rounded-md hover:bg-violet-900 transition shadow"
        onClick={() => {
              router.push("/contact");
            }}>
          CONTACT US
        </button>

      </div>
    </section>
  );
}
