import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";

const steps = [
  { title: "Apply online", text: "Choose a role on the careers page and send your resume with a few details about your experience." },
  { title: "Introductory call", text: "A short conversation about your experience, what you want next, and the role." },
  { title: "Technical conversation", text: "Work through a realistic problem with the people you would work alongside." },
  { title: "Meet the team", text: "Ask the questions that matter to you about projects, ways of working, and growth." },
  { title: "Offer", text: "We share a clear written offer and give you time to decide." },
];

const values = [
  { title: "Proof over promises", text: "We earn trust by showing AI working on real data, not slides." },
  { title: "Senior attention", text: "Experienced practitioners stay close to every engagement." },
  { title: "Fair and inclusive hiring", text: "We assess talent, skills, and ambition, regardless of background." },
  { title: "Keep learning", text: "AI moves quickly. Our people get time to explore what comes next." },
];

export default function LifeAtBytePage() {
  return (
    <>
      <PageHero
        eyebrow="Life at Byte Analytics"
        title="Work on AI that actually ships."
        description="We bring together in-house talent and a global network of AI experts to solve real business problems. Here is what working with us looks like."
        primary={{ label: "See open roles", href: "/careers#open-roles" }}
        secondary={{ label: "Contact the talent team", href: "/contact" }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight text-[#221c4a]">What we value</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-semibold text-[#221c4a]">{value.title}</h3>
              <p className="mt-2 text-gray-600">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f7f6fb] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-[#221c4a]">Our hiring process</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-5">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-3xl bg-white p-6 shadow-sm">
                <span className="text-sm font-semibold text-teal-700">Step {index + 1}</span>
                <h3 className="mt-2 font-semibold text-[#221c4a]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="pt-16">
        <CtaBand title="Didn't find your role?" description="Send us a note about the work you want to do. We keep strong profiles in mind for future openings." />
      </div>
    </>
  );
}
