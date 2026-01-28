export default function SuccessPage() {
  return (
    <div className="max-w-xl mx-auto text-center py-28">
      <h1 className="text-4xl font-bold text-[#605BAD] mb-4">
        Application Submitted 🎉
      </h1>
      <p className="text-gray-600 text-lg">
        Thank you for applying! Our HR team will review your profile and contact
        you if you are shortlisted.
      </p>

      <a
        href="/careers"
        className="mt-10 inline-block bg-[#605BAD] text-white px-6 py-3 rounded-lg hover:bg-[#4c47a5]"
      >
        Back to Careers
      </a>
    </div>
  );
}
