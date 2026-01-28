"use client";

export default function ChatGPT() {
    return (
        <section className="py-16 bg-white">
            <div className="lg:max-w-[75%] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* LEFT COLUMN (moved to right on lg) */}
                <div className="lg:order-2 order-2">

                    <p className="text-gray-600 text-sm md:text-base mb-4">
                        
                        ChatGPT is a language model designed to understand and generate human-like text, allowing it to communicate with users in a natural, conversational manner. One of the key benefits of ChatGPT is its ability to automatically generate relevant responses to user queries. It achieves this by leveraging its massive corpus of training data, which includes billions of words from a wide range of sources, including books, websites, and other written material. It can be used in a wide range of applications, from customer service, research support to virtual assistants. Its natural language processing capabilities also make it well-suited for tasks such as language translation, summarization, and even creative writing.
                    </p>

                </div>

                {/* RIGHT COLUMN (moved to left on lg) */}
                <div className="lg:order-1">
                    <h2 className="text-[22px] md:text-[26px] text-gray-800 leading-snug mb-2">
                        Get in touch with <span className="text-[#28C2A0] font-semibold">Byte Analytics</span>
                    </h2>

                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        Learn how Large Language Models can help your 
                        business.
                    </p>
                </div>
            </div>
        </section>
    );
}



