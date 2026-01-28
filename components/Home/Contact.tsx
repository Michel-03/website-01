"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      phone: `${formData.countryCode}${formData.phone}`,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      const displayName = `${formData.firstName} ${formData.lastName}`.trim();
      setSuccess(
        `Thank you${displayName ? `, ${displayName}` : ""}! Our team will contact you soon.`
      );

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "+91",
        phone: "",
        message: "",
      });
    } else {
      setSuccess("Something went wrong. Try again.");
    }
  };

  return (
    <section id="contact" className="w-full bg-gray-100">
      <div className="lg:max-w-[75%] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-3xl font-light leading-snug">
            Speak to Byte Analytics’s{" "}
            <span className="text-[#31C3A6] font-semibold">AI experts</span>
          </h2>

          <p className="text-gray-600 mt-4 text-sm leading-relaxed">
            Since 2019, we've been proving AI works in practice with help from our
            global network of 500+ top-level AI experts.
          </p>

          <p className="text-gray-600 mt-4 text-sm leading-relaxed">
            Fill out the form and our team will get back to you within 24 hours.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* FIRST NAME */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              First Name*
            </label>
            <input
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-2"
            />
          </div>

          {/* LAST NAME */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Last Name*
            </label>
            <input
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-2"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Work Email*
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-2"
            />
          </div>

          {/* PHONE WITH COUNTRY CODE */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Phone Number*
            </label>

            <div className="flex gap-2 mt-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="border rounded-md p-2 bg-white"
                required
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+81">🇯🇵 +81</option>
              </select>

              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>

          {/* MESSAGE */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-600">
              Message*
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-md p-3 mt-2"
            />
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#605BAD] text-white px-6 py-2 rounded-md text-sm hover:bg-violet-900 transition"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

          {success && (
            <p className="text-sm text-green-600 mt-4 md:col-span-2">
              {success}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
