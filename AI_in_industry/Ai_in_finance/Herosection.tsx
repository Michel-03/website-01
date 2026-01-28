"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="lg:max-w-[75%] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16">

        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-light text-gray-400 leading-snug">
            Artificial Intelligence in <span className="text-teal-600 text-2xl font-bold">Finance</span> 
            {/* <h2 className="text-lg text-gray-500 font-bold mt-2">Artificial Intelligence Applied in the Construction Industry</h2> */}
            <p className="text-sm text-gray-500 mt-2">The financial services industry is one of the leaders in adopting new AI and Machine learning technologies. The high volume of well organized, accurate, historical and quantitative nature of the data means the ‘raw material’ for tackling business challenges with AI is abundant and readily available. The industry is teeming with opportunities for improving operations, prediction accuracy and profitability..</p>
            <p className="text-sm text-gray-500 font-thin mt-2">Companies not already investing in AI solutions not only risk being left behind by competitors but also are likely to struggle through new upcoming rules and regulations regarding cybersecurity. AI-powered security systems will become a necessity to catch on with the exponentially growing complexity of the financial sector.

            </p>
          </h1>

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
