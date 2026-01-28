"use client";

import Image from "next/image";

const products = [
  {
    name: "Daisy",
    img: "/images/gen.jpg",
    sections: [
      {
        q: "What is Daisy?",
        a: "DAISY is a fully automated construction design system powered by Artificial Intelligence. The first application of DAISY was built to find optimal I-joist floor design layouts.",
      },
      {
        q: "What can Daisy do?",
        a: "DAISY finds the most cost-effective floor design in less than 10 minutes. These efficiencies save manufacturers 5% - 10% of construction costs. In the future, we will be able to optimise towards reducing material wastage and improving environmental sustainability.",
      },
    ],
  },
  {
    name: "Forstack",
    img: "/images/gen.jpg",
    sections: [
      {
        q: "What is Forstack?",
        a: "Forstack is an item-level forecasting tool that uses data to help you get better at predicting which items will be in demand.",
      },
      {
        q: "What can Forstack do?",
        a: "Brainloop’s team of PhD-level Artificial Intelligence experts developed a system that incorporates various publicly available data sources to increase the accuracy of your item-level sales predictions.",
      },
    ],
  },
  {
    name: "Tunedd",
    img: "/images/gen.jpg",
    sections: [
      {
        q: "What is Tunedd?",
        a: "Tunedd is the first AI-powered technical due diligence platform assessing the quality of AI products in minutes.",
      },
      {
        q: "What can Tunedd do?",
        a: "The platform provides high-quality technical due diligence assessment, giving Venture Capitalists an understanding of the value of the technology as well as any risks they should be aware of before making an investment in an AI product.",
      },
    ],
  },
];

export default function ProductsDetailsSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="lg:max-w-[75%] mx-auto px-4 space-y-20">
        {products.map((p) => (
          <div
            key={p.name}
            className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10"
          >
            {/* LEFT TEXT */}
            <div className="lg:w-[60%] space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">{p.name}</h2>

              {p.sections.map((s, i) => (
                <div key={i} className="space-y-1">
                  <h4 className="font-thin text-gray-600">{s.q}</h4>
                  <p className="text-gray-400 leading-relaxed text-xs">{s.a}</p>
                </div>
              ))}
            </div>

            {/* RIGHT CIRCLE LOGO */}
            <div className="lg:w-[35%] flex justify-center">
              <div className="w-40 h-40 rounded-full border-[3px] border-[#605BAD] flex items-center justify-center overflow-hidden relative">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
