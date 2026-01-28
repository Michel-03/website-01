"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Artificial Intelligence",
    description:
      "Transform your business with AI-driven automation and insights. Our solutions enhance efficiency, reduce costs, and enable smarter decisions through seamless system integration.",
    image: "/images/gen.jpg",
  },
  {
    title: "Data Science",
    description:
      "Unlock the power of your data with intelligent analysis and forecasting. We help businesses optimize performance, reduce risk, and grow with confidence..",
    image: "/images/genone.jpg",
  },
  {
    title: "Data Engineering",
    description:
      "Power your analytics with robust data infrastructure. Our solutions enable faster insights, better data quality, and seamless scalability.",
    image: "/images/gentwo.jpg",
  },
  {
    title: "Lakeflow & Data Warehousing",
    description:
      "Ingest, transform, and orchestrate with a unified data engineering solution by using Databricks.",
    image: "/images/gen.jpg",
  },
  {
    title: "Cloud Services",
    description:
      "Accelerate your digital transformation with reliable cloud infrastructure built for flexibility, security, and growth.",
    image: "/images/genthree.jpg",
  },
  {
    title: "Automation & Integration",
    description:
      "Enhance operational efficiency using UiPath-based RPA automation combined with MuleSoft system integration, reducing manual effort while ensuring consistent and smooth data flow across platforms.",
    image: "/images/gentwo.jpg",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="lg:max-w-[75%] mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Our <span className="text-brand-accent">AI Services</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Empower your business with intelligent, scalable, and responsible AI solutions tailored to your needs.
        </p>

        {/* Service Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  {service.description}
                </p>

                <button className="text-sm self-start bg-green-500 text-white font-medium px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-600 transition-all cursor-pointer" onClick={(() => { alert('Service details coming soon!'); })}>
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
