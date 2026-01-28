"use client";

import { useState } from "react";

export default function JobPosting() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salary: "",
    description: "",
    experience: "",
    skills: "",
    slug: "",
  });

  const [message, setMessage] = useState("");

  // Handle input updates
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit job
  async function handleSubmit(e: any) {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/admin/post-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    
    if (result.success) {
      setMessage("Job posted successfully!");
      setFormData({
        title: "",
        location: "",
        salary: "",
        description: "",
        experience: "",
        skills: "",
        slug: "",
      });
    } else {
      setMessage("Error posting job!");
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Post a New Job</h1>

      {message && (
        <p className="text-center text-green-600 font-semibold mb-4">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className="w-full border p-3 rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full border p-3 rounded"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          className="w-full border p-3 rounded"
          value={formData.salary}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          className="w-full border p-3 rounded h-28"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="experience"
          placeholder="Experience Required (e.g., 2+ years)"
          className="w-full border p-3 rounded"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          className="w-full border p-3 rounded"
          value={formData.skills}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="slug"
          placeholder="Slug (unique job URL string)"
          className="w-full border p-3 rounded"
          value={formData.slug}
          onChange={handleChange}
          required
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
