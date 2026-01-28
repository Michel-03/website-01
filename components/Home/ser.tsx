// "use client";
// import Image from "next/image";
// import { ArrowRight } from "lucide-react";

// const services = [
//   {
//     title: "AI Agents",
//     description:
//       "Imagine a teammate that works tirelessly, learns continuously, and adapts to your needs. That’s the promise of AI agents—autonomous, intelligent, and always evolving.",
//     image: "/images/gen.jpg",
//   },
//   {
//     title: "Generative AI",
//     description:
//       "Leverage Generative AI to unlock creativity, automate content creation, and transform ideas into impactful, data-driven results with precision.",
//     image: "/images/genai.jpg",
//   },
//   {
//     title: "Responsible AI",
//     description:
//       "We design AI solutions that are ethical, transparent, and aligned with your organizational values—ensuring trust and accountability at every step.",
//     image: "/images/genai1.jpg",
//   },
//   {
//     title: "Data Preparation",
//     description:
//       "Imagine a teammate that works tirelessly, learns continuously, and adapts to your needs. That’s the promise of AI agents—autonomous, intelligent, and always evolving.",
//     image: "/images/gen.jpg",
//   },
//   {
//     title: "ML Development",
//     description:
//       "Leverage Generative AI to unlock creativity, automate content creation, and transform ideas into impactful, data-driven results with precision.",
//     image: "/images/genai.jpg",
//   },
//   {
//     title: "UI Path",
//     description:
//       "We design AI solutions that are ethical, transparent, and aligned with your organizational values—ensuring trust and accountability at every step.",
//     image: "/images/genai1.jpg",
//   },
// ];

// export default function Ser() {
//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         <h2 className="text-4xl font-bold text-gray-900 mb-4">
//           Our <span className="text-teal-400">AI Services</span>
//         </h2>
//         <p className="text-gray-600 max-w-2xl mx-auto mb-12">
//           Empower your business with intelligent, scalable, and responsible AI solutions tailored to your needs.
//         </p>

//         {/* Service Cards */}
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {services.map((service, index) => (
//             <div
//               key={index}
//               className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
//             >
//               {/* Image */}
//               <div className="relative w-full h-48">
//                 <Image
//                   src={service.image}
//                   alt={service.title}
//                   fill
//                   className="object-cover group-hover:scale-110 transition-transform duration-300"
//                 />
//               </div>

//               {/* Content */}
//               <div className="p-6 flex flex-col flex-grow text-left">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   {service.title}
//                 </h3>
//                 <p className="text-gray-600 mb-6 flex-grow">
//                   {service.description}
//                 </p>

//                 <button className="self-start bg-green-500 text-white font-medium px-5 py-2 rounded-full flex items-center gap-2 hover:bg-green-600 transition-all">
//                   Learn More
//                   <ArrowRight size={18} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



// "use client";
// import { useRef } from "react";
// import Image from "next/image";
// import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// const services = [
//   {
//     title: "AI Agents",
//     description:
//       "Imagine a teammate that works tirelessly, learns continuously, and adapts to your needs. That’s the promise of AI agents—autonomous, intelligent, and always evolving.",
//     image: "/images/gen.jpg",
//   },
//   {
//     title: "Generative AI",
//     description:
//       "Leverage Generative AI to unlock creativity, automate content creation, and transform ideas into impactful, data-driven results.",
//     image: "/images/gen.jpg",
//   },
//   {
//     title: "Responsible AI",
//     description:
//       "We design AI solutions that are ethical, transparent, and aligned with your organizational values—ensuring trust and accountability.",
//     image: "/images/gen.jpg",
//   },
//   {
//     title: "AI Strategy",
//     description:
//       "Build a roadmap for integrating AI into your business model with confidence, sustainability, and measurable results.",
//     image: "/images/gen.jpg",
//   },
//   {
//     title: "Data Engineering",
//     description:
//       "Empower your AI systems with clean, structured, and optimized data pipelines to ensure performance and scalability.",
//     image: "/images/gen.jpg",
//   },
// ];

// export default function ServicesSection() {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (scrollRef.current) {
//       const { scrollLeft, clientWidth } = scrollRef.current;
//       const scrollAmount = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
//       scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   return (
//     <section className="relative py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-4xl font-bold text-gray-900">
//             Our <span className="text-brand-accent">AI Services</span>
//           </h2>

//           {/* Arrows */}
//           <div className="flex gap-3">
//             <button
//               onClick={() => scroll("left")}
//               className="p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-100 shadow-sm"
//             >
//               <ChevronLeft className="w-5 h-5 text-gray-700" />
//             </button>
//             <button
//               onClick={() => scroll("right")}
//               className="p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-100 shadow-sm"
//             >
//               <ChevronRight className="w-5 h-5 text-gray-700" />
//             </button>
//           </div>
//         </div>

//         {/* Scrollable container */}
//         <div
//           ref={scrollRef}
//           className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
//         >
//           {services.map((service, i) => (
//             <div
//               key={i}
//               className="min-w-[340px] max-w-[340px] flex-shrink-0 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group snap-start"
//             >
//               <div className="relative w-full h-48">
//                 <Image
//                   src={service.image}
//                   alt={service.title}
//                   fill
//                   className="object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>

//               <div className="p-6 flex flex-col h-[250px] justify-between">
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
//                   <p className="text-gray-600 text-sm line-clamp-4">{service.description}</p>
//                 </div>

//                 <button className="self-start mt-4 bg-green-500 text-white text-sm font-semibold px-5 py-2 rounded-full flex items-center gap-2 hover:bg-green-600 transition-all">
//                   Learn More
//                   <ArrowRight size={16} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  {
    title: "AI Agents",
    description:
      "Imagine a teammate that works tirelessly, learns continuously, and adapts to your needs. That’s the promise of AI agents—autonomous, intelligent, and always evolving.",
    image: "/images/ai-agents.jpg",
  },
  {
    title: "Generative AI",
    description:
      "Leverage Generative AI to unlock creativity, automate content creation, and transform ideas into impactful, data-driven results.",
    image: "/images/generative-ai.jpg",
  },
  {
    title: "Responsible AI",
    description:
      "We design AI solutions that are ethical, transparent, and aligned with your organizational values—ensuring trust and accountability.",
    image: "/images/responsible-ai.jpg",
  },
  {
    title: "AI Strategy",
    description:
      "Build a roadmap for integrating AI into your business model with confidence, sustainability, and measurable results.",
    image: "/images/ai-strategy.jpg",
  },
  {
    title: "Data Engineering",
    description:
      "Empower your AI systems with clean, structured, and optimized data pipelines to ensure performance and scalability.",
    image: "/images/data-engineering.jpg",
  },
];

export default function ServicesSection() {
  const [index, setIndex] = useState(0);
  const visibleCount = 3; // Number of visible cards

  const slideLeft = () => {
    if (index > 0) setIndex(index - 1);
  };

  const slideRight = () => {
    if (index < services.length - visibleCount) setIndex(index + 1);
  };

  return (
    <section className="relative py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Our <span className="text-brand-accent">AI Services</span>
        </h2>

        {/* Carousel Wrapper */}
        <div className="relative flex items-center justify-center">
          {/* Left Button */}
          <button
            onClick={slideLeft}
            disabled={index === 0}
            className={`absolute -left-6 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-100 transition ${
              index === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden w-full">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${index * (100 / visibleCount)}%)`,
                width: `${(services.length / visibleCount) * 100}%`,
              }}
            >
              {services.map((service, i) => (
                <div
                  key={i}
                  className="w-1/5 flex-shrink-0 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative w-full h-48">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col h-[250px] justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-4">
                        {service.description}
                      </p>
                    </div>

                    <button className="self-start mt-4 bg-green-500 text-white text-sm font-semibold px-5 py-2 rounded-full flex items-center gap-2 hover:bg-green-600 transition-all">
                      Learn More
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={slideRight}
            disabled={index >= services.length - visibleCount}
            className={`absolute -right-6 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-100 transition ${
              index >= services.length - visibleCount
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
}
