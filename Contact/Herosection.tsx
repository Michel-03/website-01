"use client";

import Image from "next/image";

export default function Herosection() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="lg:max-w-[75%] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16">

        {/* LEFT SIDE CONTENT */}
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-3xl font-light text-gray-600 mb-6">
            Contact Us
          </h1>

          {/* Hyd BLOCK */}
          <div className="mb-8">
            <h2 className="text-teal-600 text-xl font-semibold">HYD</h2>
            <p className="text-gray-500 mt-2">
              <span className="font-semibold text-teal-400">Byte Analytics Private Ltd</span> <br />
              Awfis Space Solutions Pvt. Ltd, <br />
              1st-4th Floor, Loven Tiara, <br/>
              Kothaguda Junction, Kondapur,  <br/>
              Hyderabad, Telangana-500084
            </p>
          </div>

          {/* CANADA BLOCK */}
          {/* <div className="mb-8">
            <h2 className="text-teal-600 text-xl font-semibold">Canada</h2>
            <p className="text-gray-500 mt-2">
              777, Dunsmuir Street<br />
              Vancouver<br />
              British Columbia, V7Y 1K4
            </p>
          </div> */}

          {/* EMAIL */}
          <div className="mt-6">
            <p className="text-gray-600 font-semibold">Email us</p>
            <p className="text-gray-500 text-sm mt-1">✉ info@byteanalytics.co.in</p>
          </div>

          {/* BUSINESS HOURS */}
          <div className="mt-6">
            <p className="text-gray-600 font-semibold">Business Hours</p>
            <p className="text-gray-500 mt-1 text-sm">Mon - Fri: 2:00pm - 11:00pm</p>
          </div>
        </div>

        {/* RIGHT IMAGE BLOCK */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-72 h-72 md:w-[300px] md:h-[300px] rounded-full hidden md:flex items-center justify-center">

            {/* OUTER CIRCLE BORDER */}
            <div className="absolute inset-0 rounded-full border-[20px] border-teal-400"></div>

            {/* INNER CIRCLE BORDER */}
            <div className="absolute inset-4 rounded-full border-[14px] border-teal-300"></div>

            {/* IMAGE */}
            <Image
              src="/images/gen.jpg"  
              alt="Contact Image"
              fill
              className="rounded-full object-cover p-10"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
