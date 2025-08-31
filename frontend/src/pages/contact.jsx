// src/pages/Contact.jsx
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../components/navbar";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: localStorage.getItem("email"),
    phone: "",
    category: "",
    address: "",
    projectDescription: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_URL = import.meta.env.VITE_APP_API_URL;
      const response = await fetch(`${API_URL}/api/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({
          fullName: "",
          email: localStorage.getItem("email"),
          phone: "",
          category: "",
          address: "",
          projectDescription: "",
        });
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      {/* navbar */}
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#fdfdfc] to-[#f8f5f1] flex flex-col items-center justify-center px-6 py-16">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-serif font-light tracking-wide text-gray-800 mb-4">
          Reach Out To Us
        </h1>

        <p className="text-gray-600 mb-10 text-center text-lg max-w-2xl">
          Let's discuss your project and bring your vision to life with our
          expert design services.
        </p>

        {/* Contact Card */}
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl w-full">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Left: Contact Details */}
            <div className="space-y-8">
              <h2 className="text-2xl font-serif font-light text-gray-800 mb-6">
                Get In Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f9f5f0] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#b08a44]" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <span className="text-gray-800">designer@email.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f9f5f0] flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#b08a44]" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Phone</p>
                    <span className="text-gray-800">+91 98765 43210</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f9f5f0] flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#b08a44]" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Address</p>
                    <span className="text-gray-800">Mumbai, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Full Name*
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b08a44] focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={localStorage.getItem("email")}
                    readOnly
                    className="w-full border text-sm border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b08a44] focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Phone No*
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b08a44] focus:border-transparent"
                    placeholder="+91 12345 67890"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Select category*
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b08a44] focus:border-transparent bg-white"
                >
                  <option value="">Select a category</option>
                  <option value="residential">Residential Design</option>
                  <option value="commercial">Commercial Design</option>
                  <option value="hospitality">Hospitality Design</option>
                  <option value="consultation">Design Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Address*
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b08a44] focus:border-transparent"
                  placeholder="Your complete address"
                />
              </div>

              <div className="pt-2">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Brief description of your Project
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b08a44] focus:border-transparent"
                  placeholder="Tell us about your project requirements, preferences, and any specific ideas you have in mind..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#b08a44] text-white py-3 rounded-lg hover:bg-[#9a7740] transition-all duration-300 font-medium mt-4"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-gray-500 text-sm">
          © 2025 InterioSpace. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
