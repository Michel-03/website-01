export default function ClientsVisionSection() {
  return (
    <section className="w-full bg-gray-100 py-20">
      <div className="lg:max-w-[75%] mx-auto px-6">

        {/* Top Title + Contact Button */}
        {/* <div className="flex justify-between items-start flex-col md:flex-row mb-16">
          <h2 className="text-2xl md:text-2xl font-light leading-snug text-gray-400 max-w-3xl">
            AI-powered automation gives our clients an unparalleled{" "}
            <span className="text-teal-400 font-bold">
              advantage over competition
            </span>
          </h2>

          <button className="bg-[#605BAD] text-white px-5 py-2 rounded-md hover:bg-violet-900 shadow transition-all mt-6 md:mt-0 text-xs">
            CONTACT US
          </button>
        </div> */}

        {/* Divider */}
        <hr className="border-gray-200 mb-10" />

        {/* OUR CLIENTS */}
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <h3 className="text-2xl font-semibold text-[#605BAD]">
            AI Strategy
          </h3>

          <p className="text-gray-600 leading-relaxed text-md">
            We work with mid-market platform businesses on developing custom AI 
            capabilities that seamlessly integrate into their existing products. 
            Retaining control over your AI is what distinguishes the industry 
            disruptors from the disrupted.
          </p>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-10" />

        {/* OUR VISION */}
        <div className="grid md:grid-cols-2 gap-10">
          <h3 className="text-2xl font-semibold text-[#605BAD]">
            AI Scoping program
          </h3>

          <p className="text-gray-600 leading-relaxed text-lg">
            Our vision for the future of AI is a partnership between Artificial 
            Intelligence and Humans. AI solutions designed to free humans from manual, 
            repetitive and time-consuming tasks to allow people to focus on things 
            that matter.
          </p>
        </div>
      </div>
    </section>
  );
}
