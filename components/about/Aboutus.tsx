"use client";
import Image from "next/image";

export default function AboutUs() {
    return (
        <section className="py-16 w-full">
            <div className="lg:max-w-[75%] mx-auto flex flex-col md:flex-row items-start gap-6 p-6">
                <div className="rounded-lg overflow-hidden border-l-8 border-teal-400 w-full md:w-100 mx-auto lg:w-140">
                    <Image
                        src="/images/gen.jpg"
                        alt="Inhouse AI Platform Illustration"
                        width={800}
                        height={600}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="w-full object-cover"
                    />
                </div>

                <div className="flex-1 min-w-0 md:w-1/2 md:pl-6">
                    <h3 className="text-2xl font-thin text-gray-700">ABOUT US</h3>
                    <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                        Byte Analytics Pvt Ltd is an AI services company delivering custom, scalable, and secure AI solutions for businesses. Our team of AI engineers and data specialists combines advanced research with real-world execution to build practical, future-ready, and vendor-agnostic AI systems that drive measurable impact.
                    </p>
                    <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                        Byte Analytics Pvt Ltd is a trusted AI services partner delivering secure, vendor-agnostic, and scalable AI solutions designed for real business outcomes.
                    </p>
                    <button className="px-5 py-2 mt-4 bg-[#605BAD] text-white text-xs rounded-md hover:bg-violet-900 shadow">
                        <a href="#contact">CONTACT US</a>
                    </button>
                </div>
            </div>
        </section>
    );
}
