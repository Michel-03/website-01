"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function ApplyJobPage() {
  const { slug } = useParams() as { slug: string };

  // Convert slug → Capitalized Job Title
  const jobTitle = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState<File | null>(null);

  const [form, setForm] = useState({
    applicant_name: "",
    applicant_email: "",
    applicant_phone: "",
    current_role_name: "",
    total_experience: "",
    skills: "",
    expected_salary: "",
    cover_letter: "",
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleResumeChange(e: any) {
    const file = e.target.files?.[0] || null;
    setResume(file);
  }

  function removeResume() {
    setResume(null);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("slug", slug);
    formData.append("job_title", jobTitle);
    formData.append("resume", resume);

    for (const key in form) {
      formData.append(key, form[key as keyof typeof form]);
    }

    const res = await fetch("/api/applications", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      window.location.href = `/careers/${slug}/apply/success`;
    } else {
      alert("Error: " + data.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-2">Apply for this position</h1>
      <p className="text-gray-600 mb-8">
        Fill in the details below. Our HR team will reach out soon.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* JOB TITLE */}
        <div>
          <label className="block mb-1 font-medium">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* GRID 2 COL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Full Name"
            name="applicant_name"
            value={form.applicant_name}
            onChange={handleChange}
            required
          />

          <InputField
            label="Email Address"
            name="applicant_email"
            type="email"
            value={form.applicant_email}
            onChange={handleChange}
            required
          />

          <InputField
            label="Phone Number"
            name="applicant_phone"
            value={form.applicant_phone}
            onChange={handleChange}
            required
          />

          <InputField
            label="Current Role"
            name="current_role_name"
            value={form.current_role_name}
            onChange={handleChange}
          />

          <InputField
            label="Total Experience (Years)"
            name="total_experience"
            value={form.total_experience}
            onChange={handleChange}
          />

          <InputField
            label="Expected Salary"
            name="expected_salary"
            value={form.expected_salary}
            onChange={handleChange}
          />
        </div>

        <TextAreaField
          label="Skills"
          name="skills"
          rows={3}
          value={form.skills}
          onChange={handleChange}
        />

        <TextAreaField
          label="Cover Letter"
          name="cover_letter"
          rows={5}
          value={form.cover_letter}
          onChange={handleChange}
        />

        {/* RESUME UPLOAD */}
        <div>
          <label className="block mb-2 font-medium">Upload Resume (PDF)</label>

          {!resume ? (
            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeChange}
              className="w-full bg-white border border-gray-300 p-3 rounded-lg"
            />
          ) : (
            <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg border border-gray-300">
              <span className="text-sm">{resume.name}</span>

              <button
                type="button"
                onClick={removeResume}
                className="text-red-500 font-bold text-lg"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#605BAD] text-white w-full py-3 rounded-lg hover:bg-[#4c47a5] text-lg"
        >
          {loading ? "Submitting Application..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

/* COMPONENTS */

function InputField({ label, name, type = "text", value, onChange, required }: any) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
    </div>
  );
}

function TextAreaField({ label, name, rows, value, onChange }: any) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
    </div>
  );
}



// "use client";

// import { useState } from "react";

// export default function ApplyJobPage({ params }: any) {
//   const slug = params.slug;

//   const [loading, setLoading] = useState(false);
//   const [resume, setResume] = useState<File | null>(null);

//   const [form, setForm] = useState({
//     applicant_name: "",
//     applicant_email: "",
//     applicant_phone: "",
//     current_role_name: "",
//     total_experience: "",
//     skills: "",
//     expected_salary: "",
//     cover_letter: "",
//   });

//   function handleChange(e: any) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   function handleResumeChange(e: any) {
//     const file = e.target.files?.[0] || null;
//     setResume(file);
//   }

//   function removeResume() {
//     setResume(null);
//   }

//   async function handleSubmit(e: any) {
//     e.preventDefault();

//     if (!resume) {
//       alert("Please upload your resume.");
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     formData.append("slug", slug);
//     formData.append("resume", resume);

//     for (const key in form) {
//       formData.append(key, form[key as keyof typeof form]);
//     }

//     const res = await fetch("/api/applications", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (data.success) {
//       window.location.href = `/careers/${slug}/apply/success`;
//     } else {
//       alert("Error: " + data.message);
//     }
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-10">
//       <h1 className="text-4xl font-bold mb-2">Apply for this position</h1>
//       <p className="text-gray-600 mb-8">
//         Fill in the details below. Our HR team will reach out soon.
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-6">

//         {/* GRID 2 COL */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <InputField
//             label="Full Name"
//             name="applicant_name"
//             value={form.applicant_name}
//             onChange={handleChange}
//             required
//           />

//           <InputField
//             label="Email Address"
//             name="applicant_email"
//             type="email"
//             value={form.applicant_email}
//             onChange={handleChange}
//             required
//           />

//           <InputField
//             label="Phone Number"
//             name="applicant_phone"
//             value={form.applicant_phone}
//             onChange={handleChange}
//             required
//           />

//           <InputField
//             label="Current Role"
//             name="current_role_name"
//             value={form.current_role_name}
//             onChange={handleChange}
//           />

//           <InputField
//             label="Total Experience (Years)"
//             name="total_experience"
//             value={form.total_experience}
//             onChange={handleChange}
//           />

//           <InputField
//             label="Expected Salary"
//             name="expected_salary"
//             value={form.expected_salary}
//             onChange={handleChange}
//           />
//         </div>

//         <TextAreaField
//           label="Skills"
//           name="skills"
//           rows={3}
//           value={form.skills}
//           onChange={handleChange}
//         />

//         <TextAreaField
//           label="Cover Letter"
//           name="cover_letter"
//           rows={5}
//           value={form.cover_letter}
//           onChange={handleChange}
//         />

//         {/* RESUME UPLOAD + REMOVE BUTTON */}
//         <div>
//           <label className="block mb-2 font-medium">Upload Resume (PDF)</label>

//           {!resume ? (
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={handleResumeChange}
//               className="w-full bg-white border border-gray-300 p-3 rounded-lg"
//             />
//           ) : (
//             <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg border border-gray-300">
//               <span className="text-sm">{resume.name}</span>

//               <button
//                 type="button"
//                 onClick={removeResume}
//                 className="text-red-500 font-bold text-lg"
//               >
//                 ✕
//               </button>
//             </div>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-[#605BAD] text-white w-full py-3 rounded-lg hover:bg-[#4c47a5] text-lg"
//         >
//           {loading ? "Submitting Application..." : "Submit Application"}
//         </button>
//       </form>
//     </div>
//   );
// }

// /* COMPONENTS */

// function InputField({ label, name, type = "text", value, onChange, required }: any) {
//   return (
//     <div>
//       <label className="block mb-1 font-medium">{label}</label>
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         required={required}
//         className="w-full p-3 border border-gray-300 rounded-lg"
//       />
//     </div>
//   );
// }

// function TextAreaField({ label, name, rows, value, onChange }: any) {
//   return (
//     <div>
//       <label className="block mb-1 font-medium">{label}</label>
//       <textarea
//         name={name}
//         rows={rows}
//         value={value}
//         onChange={onChange}
//         className="w-full p-3 border border-gray-300 rounded-lg"
//       />
//     </div>
//   );
// }
