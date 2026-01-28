export default function ClientsVisionSection() {
  return (
    <section className="w-full bg-gray-100 py-20">
      <div className="lg:max-w-[75%] mx-auto px-6">

        {/* Top Title + Contact Button */}
        <div className="flex justify-between items-start flex-col md:flex-row mb-16">
          <h2 className="text-2xl md:text-2xl font-light leading-snug text-gray-400 max-w-3xl">
            AI-enabled automation delivering unmatched{" "}
            <span className="text-teal-400 font-bold">
              competitive advantage
            </span>
          </h2>

          <button className="bg-[#605BAD] text-white px-5 py-2 rounded-md hover:bg-violet-900 shadow transition-all mt-6 md:mt-0 text-xs">
            <a href="#contact">CONTACT US</a>
          </button>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-10" />

        {/* OUR CLIENTS */}
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <h3 className="text-2xl font-semibold text-[#605BAD]">
            Our clients
          </h3>

          <p className="text-gray-600 leading-relaxed text-md">
            We help mid-market platforms embed custom AI directly into their products. Owning your AI is the difference between disrupting the market and being disrupted
          </p>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-10" />

        {/* OUR VISION */}
        <div className="grid md:grid-cols-2 gap-10">
          <h3 className="text-2xl font-semibold text-[#605BAD]">
            Our vision
          </h3>

          <p className="text-gray-600 leading-relaxed text-lg">
            We believe the future of AI is human-centric. Our AI solutions handle routine and time-consuming tasks, empowering people to focus on creativity, strategy, and impact.
          </p>
        </div>
      </div>
    </section>
  );
}
