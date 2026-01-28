"use client";

export default function EmpowerSection() {
  return (
    <section className="pt-16">
      <div className="lg:max-w-[75%] mx-auto text-center px-4">

        {/* Top Small Paragraph */}
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-12">
          At Byte Analytics we develop <span className="text-[#28C2A0] font-semibold">highly customizable GPT</span> solutions 
          that are based on your own <span className="text-[#28C2A0] font-semibold">proprietary data sources</span>. 
          This not only makes the tool much more applicable to your business domain but also decreases the 
          overall compute costs you need to extract information from the customised dataset.
        </p>

      </div>

      {/* Gray Background Section */}
      <div className="bg-[#f2f2f2] py-20">
        <div className="lg:max-w-[75%] mx-auto text-center px-4">

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-semibold text-[#28C2A0] mb-6">
            Ready to empower your business with AI?
          </h2>

          {/* Subtext */}
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-10 max-w-3xl mx-auto">
            Get in touch with us now to book your first Artificial Intelligence consultation 
            and discuss how Byte Analytics can help you develop your own custom GPT solution.
          </p>

          {/* Button */}
          <button className="bg-[#605BAD] text-white text-xs px-6 py-2 rounded-md shadow-sm 
                             hover:bg-[#4b4690] transition-all">
            BOOK AN APPOINTMENT
          </button>

        </div>
      </div>
    </section>
  );
}
