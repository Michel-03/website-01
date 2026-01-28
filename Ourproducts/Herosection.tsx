"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="lg:max-w-[75%] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16">

        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-light text-gray-400 leading-snug">
            <span className="text-teal-500 font-bold">We build products </span>that transform industries.
            {/* <h2 className="text-lg text-gray-500 font-bold mt-2">We are hiring !</h2> */}
          </h1>
          <h2 className="font-bold mt-6 text-xl text-gray-400">Innovative ideas. Powerful products.</h2>

          {/* BUTTONS */}
          {/* <div className="flex flex-wrap gap-4 mt-8">
            <button className="px-5 py-2 bg-[#605BAD] text-white rounded-md hover:bg-[#4e49a0] transition text-xs">
              CONTACT US
            </button>
          </div> */}
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
