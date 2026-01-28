"use client";
import Image from "next/image";

export default function Chatgptsub() {
    return (
        <section className="py-16 w-full bg-gray-100">
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
                    {/* <h3 className="text-2xl font-thin text-gray-700">Join our AI Community</h3> */}
                    <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                        
                        One of the main drawbacks of ChatGPT is that it may sometimes generate responses that are factually incorrect or misleading, particularly if it encounters a question or topic that it has not been trained on.
                    </p>
                    <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                        Additionally, ChatGPT requires a significant amount of computational resources to operate at peak performance. This means that it may not be feasible for smaller businesses or organizations with limited computing power to use the model effectively. That’s why it’s important to customize your GPT model to your business requirements.
                    </p>
                    
                </div>
            </div>
        </section>
    );
}
