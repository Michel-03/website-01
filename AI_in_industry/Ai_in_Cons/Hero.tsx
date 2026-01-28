"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="lg:max-w-[75%] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16">

        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-light text-gray-400 leading-snug">
            <span className="text-teal-600 text-2xl font-bold">Automate</span> your Manual Construction Processes and Accelerate Growth
            
          </h1>
           <h2 className="text-lg text-gray-500 font-bold mt-2">Artificial Intelligence Applied in the Construction Industry</h2>
            <p className="text-sm text-gray-500 mt-2">Byte Analytics is proud to be recognised as the world’s leading AI services providers in the construction sector. We have been building custom AI solutions in construction since 2018.</p>
            <p className="text-sm text-gray-500 font-thin mt-2">AI and Machine Learning presents new and exciting opportunities for automation and optimisation of your key workflows to support you during the times of workforce shortage. From construction design, through to planning, management and development. Byte Analytics is already a pioneer in revolutionising the timber design industry with Genetic Programming (see daisy.ai) and we are helping construction companies adapt to the fast changing industry.

            </p>



          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button className="px-5 py-2 bg-[#605BAD] text-white rounded-md hover:bg-[#4e49a0] transition text-xs">
              CONTACT US
            </button>
            <button className="px-5 py-2 border border-gray-300 rounded-md hover:bg-[#4e49a0] transition text-xs cursor-pointer hover:text-white">
              BOOK AI CONSULTION
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE BLOCK */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-72 h-72 md:w-[300px] md:h-[300px] rounded-full hidden md:flex items-center justify-center bg-teal-400">

            {/* OUTER CIRCLE BORDER */}
            <div className="absolute inset-0 rounded-full border-[18px] border-teal-300"></div>

            {/* IMAGE */}
            <Image
              src="/images/gen.jpg" // change to your image
              alt="AI Illustration"
              fill
              className="rounded-full object-cover p-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
