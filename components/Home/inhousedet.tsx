"use client";

import Image from "next/image";
export default function Inhousedet() {
    return (
        <section className="py-15 bg-gray-100">
            <div className="lg:max-w-[75%] mx-auto flex flex-col md:flex-row items-start gap-20 p-6">
                <div className="rounded-lg overflow-hidden border-l-8 border-teal-400 md:w-100 mx-auto w-full">
                    <div className="relative w-full h-60 lg:h-80">
                        <Image
                            src="/images/genone.jpg"
                            alt="Inhouse AI Platform Illustration"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="flex-1 ml-3">
                    <h3 className="text-2xl font-thin text-gray-500">
                        Open & Scalable AI Infrastructure
                    </h3>
                    <h3 className="text-teal-500 font-bold text-2xl mt-1">Keep Complete Ownership of Your AI</h3>
                    <p className="text-gray-600 text-xs mt-4">
                        In today’s rapidly evolving AI landscape, flexibility and adaptability are critical for long-term success. Agnostic AI empowers businesses to retain full control over their AI capabilities instead of relying on a single off-the-shelf SaaS provider. This approach reduces vendor lock-in, enables faster adaptation to emerging technologies, and helps organizations build a sustainable competitive advantage. Learn more about Agnostic AI here..
                    </p>
                    <button className="px-5 py-2 mt-4 bg-[#605BAD] text-white text-xs rounded-md hover:bg-violet-900 shadow">
                        READ MORE
                    </button>
                </div>
            </div>
        </section>
    )
}
