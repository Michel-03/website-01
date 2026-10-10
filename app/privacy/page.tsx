export const metadata = { title: "Privacy notice | Byte Analytics" };

const sections = [
  {
    title: "What this website collects",
    body: "When you use the contact form we receive your name, work email, phone number, and message. When you apply for a role we receive the details you enter and the resume you upload.",
  },
  {
    title: "How it is used",
    body: "Inquiries are used to respond to you. Applications are used only to assess you for the role you applied to. We do not sell this information.",
  },
  {
    title: "How it is stored",
    body: "Submissions are stored in a managed database. Resumes are kept in private storage and are opened by authorized staff through short-lived links.",
  },
  {
    title: "Your choices",
    body: "You can ask us to correct or delete the information you submitted at any time by contacting us through the contact page.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#605BAD]">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#221c4a]">Privacy notice</h1>
      <p className="mt-4 text-gray-600">How Byte Analytics handles information submitted through this website.</p>
      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-semibold text-[#221c4a]">{section.title}</h2>
            <p className="mt-2 leading-7 text-gray-700">{section.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
