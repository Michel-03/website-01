"use client";

import Image from "next/image";
export default function AiExperts() {
    return (
        <section className="py-15 bg-gray-100 w-full">
            <div className="lg:max-w-[75%] mx-auto flex flex-col md:flex-row items-start gap-6 p-6">
                <div className="rounded-lg overflow-hidden border-r-8 border-teal-400 w-full mx-auto md:w-100 lg:w-140 order-1 md:order-2">
                    <Image
                        src="/images/genone.jpg"
                        alt="Inhouse AI Platform Illustration"
                        width={320}
                        height={200}
                        className="w-full object-cover"
                    />
                </div>

                <div className="flex-1 md:ml-10 order-2 md:order-1">
                    <h3 className="text-2xl font-thin text-gray-500">
                        Our AI Expert  <span className="text-teal-500 text-3xl">Network</span>
                    </h3>
                    {/* <h3 className="text-teal-500 font-bold text-2xl mt-1">Stay in control of your AI</h3> */}
                    <p className="text-gray-600 text-sm mt-4 w-full md:w-3/4">
                        We work with a global network of 500+ AI and Machine Learning experts who help us deliver custom AI solutions at scale.
                    </p>    
                    <p className="mt-2 text-sm text-gray-600">
                        Our team brings together AI researchers, engineers, and DevOps experts, with each project resourced precisely to meet its technical needs.
                    </p>
                    
                    <button className="px-5 py-2 mt-4 bg-[#605BAD] text-white text-xs rounded-md hover:bg-violet-900 shadow">
                        <a href="#contact">CONTACT US</a>
                    </button>
                </div>
            </div>
        </section>
    )
}
