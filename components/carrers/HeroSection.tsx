"use client";

import Link from "next/link";
import Scene3D from "../visual/Scene3D";

export default function HeroSection() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="lg:max-w-[75%] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16">

        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-light text-gray-400 leading-snug">
            Join our 
            <span className="text-teal-600 font-bold ml-4">
               team
            </span>
          </h1>
            <h2 className="text-lg text-gray-500 font-bold mt-2">We are hiring !</h2>
            <p className="text-sm text-gray-500 font-thin mt-2">Be part of the Team that transforms industries with AI.</p>
          

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#open-roles" className="px-5 py-2 bg-[#605BAD] text-white rounded-md hover:bg-[#4e49a0] transition text-xs">
              VIEW OPEN ROLES
            </a>

            <Link href="/contact" className="px-6 py-2 border border-[#605BAD] text-[#605BAD] rounded-md hover:bg-[#f4f0ff] transition text-xs">
              TALK TO TALENT
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE BLOCK */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-72 h-72 md:w-[300px] md:h-[300px] rounded-full hidden md:flex items-center justify-center bg-teal-400">

            {/* OUTER CIRCLE BORDER */}
            <div className="absolute inset-0 rounded-full border-[18px] border-teal-300"></div>

            {/* IMAGE */}
            <Scene3D className="absolute inset-6 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
