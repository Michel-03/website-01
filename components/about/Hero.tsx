import Image from "next/image";
import Link from "next/link";

export default function OverviewPage() {
  return (
    <section className="bg-gray-50 min-h-screen py-20 w-full">
      <div className="lg:max-w-[75%] mx-auto px-6">
        {/* Breadcrumb */}
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Company <span className="text-brand-accent">Overview</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            We’re an AI consultancy focused on building intelligent,
            customizable, and future-ready solutions that help businesses unlock
            the full potential of artificial intelligence.
          </p>
        </div>

        {/* Overview Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900">
              Empowering Organizations with Responsible AI
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Since our founding, we’ve helped enterprises, startups, and public
              institutions navigate the evolving landscape of AI technologies.
              Our mission is to democratize access to ethical and scalable AI
              tools that enhance productivity, decision-making, and innovation.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Whether you're looking to integrate generative AI, deploy custom
              LLMs, or optimize your data workflows, our team of AI consultants,
              engineers, and data scientists ensures your solutions remain
              aligned with your goals — not bound by vendor lock-ins.
            </p>

            <ul className="list-disc pl-5 text-gray-700 font-medium space-y-2">
              <li>Custom-built AI tools tailored to your organization</li>
              <li>Full data ownership and security at every stage</li>
              <li>Expert guidance from concept to deployment</li>
              <li>Scalable infrastructure designed for long-term growth</li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/gen.jpg"
              alt="AI Overview"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Transform Your Business with AI?
          </h3>
          <Link
            href="/contact"
            className="inline-block bg-brand-primary text-white px-6 py-3 rounded-full font-medium hover:bg-brand-accent transition-all shadow-md"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
