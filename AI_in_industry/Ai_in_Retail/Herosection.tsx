"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="lg:max-w-[75%] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16">

        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-light text-gray-400 leading-snug">
            Artificial Intelligence in <span className="text-teal-600 text-2xl font-bold">Retail</span> 
            {/* <h2 className="text-lg text-gray-500 font-bold mt-2">Artificial Intelligence Applied in the Construction Industry</h2> */}
            <p className="text-sm text-gray-500 mt-2">Today’s dynamic retail industry is built on a new covenant of data-driven retail experiences and heightened consumer expectations. But delivering a personalized shopping experience at scale is no easy feat for retailers.</p>
            <p className="text-sm text-gray-500 font-thin mt-2">By incorporating AI solutions into a retail or e-commerce organisation, storefronts of all shapes and sizes can deliver the right products to consumers with improved speed, accuracy and satisfaction. Not only can AI help boost a retail organisation’s bottom line, but customers can also enjoy highly personalised and frictionless shopping experiences that can lead to higher brand loyalty and improved customer satisfaction thanks to the possibility of discovering new products and services.

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
