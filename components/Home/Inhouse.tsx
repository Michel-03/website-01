"use client";
import Image from "next/image";

export default function Inhouse() {
    return (
        <section className="py-15 bg-white">
            <div className="max-w-[75%] mx-auto px-6 text-left">
                <h2 className="text-2xl font-thin text-gray-900 mb-4">
                    Your in-House Artificial <span className="text-teal-400 font-bold text-3xl">Intelligence Platform</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mb-12">
                    Your Data, Your Content, Your IP - Fully Secure and Private
                </p>
            </div>
            <div className="relative max-w-[75%] mx-auto px-4">
                <Image
                    src="/images/inhouse.jpg"
                    alt="Inhouse AI Platform Illustration"
                    width={800}
                    height={500}
                    className="rounded-lg mx-auto"
                />
            </div>
        </section>
    )
}