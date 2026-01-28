"use client";
import Image from "next/image";

export default function Genaisub() {
    return (
        <section className="py-16 w-full bg-gray-100">
            <div className="lg:max-w-[75%] mx-auto flex flex-col md:flex-row items-start gap-6 p-6">
                <div className="rounded-lg overflow-hidden border-l-8 border-teal-400 w-full md:w-100 mx-auto lg:w-140">
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
                    {/* <h3 className="text-2xl font-thin text-gray-700">Join our AI Community</h3> */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                        
                        LLMs enable businesses to automate text-based tasks such as content creation, question answering, and language translation. Fine-tuned to industry-specific needs, they deliver accurate, context-aware results at scale.
                    </p>
                    <p className="text-teal-500 mt-2">
                        its all about accuracy
                    </p>
                    <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                        Generic LLM outputs rarely meet enterprise requirements. Byte Analytics helps businesses prepare and structure their data, fine-tuning AI solutions to deliver accurate, domain-specific results that integrate directly into existing operations.
                    </p>
                    
                </div>
            </div>
        </section>
    );
}
