"use client";
import Image from "next/image";

export default function Join() {
    return (
        <section className="py-16 w-full">
            <div className="lg:max-w-[75%] mx-auto flex flex-col md:flex-row items-start gap-6 p-6">
                <div className="rounded-lg overflow-hidden border-l-8 border-teal-400 w-full md:w-100 mx-auto">
                    <Image
                        src="/images/gen.jpg"
                        alt="Inhouse AI Platform Illustration"
                        width={800}
                        height={600}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover rounded-r-lg"
                    />
                </div>

                <div className="flex-1 min-w-0 md:w-1/2 md:pl-6">
                    <h3 className="text-2xl font-thin text-gray-700">Join our AI Community</h3>
                    <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                        Be a part of an expert Artificial Intelligence and Machine Learning network. Tackle the biggest challenges in AI and connect with fellow data scientists.
                    </p>
                    
                    <button className="px-5 py-2 mt-4 bg-[#605BAD] text-white text-xs rounded-md hover:bg-violet-900 shadow">
                        APPLY NOW
                    </button>
                </div>
            </div>
        </section>
    );
}
