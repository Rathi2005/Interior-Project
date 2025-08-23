// src/pages/Contact.jsx
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../components/navbar";

export default function Contact() {
  return (
    <div>
        {/* navbar */}
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-[#fdfdfc] to-[#f8f5f1] flex flex-col items-center justify-center px-6 py-16">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-light tracking-wide text-gray-800 mb-8 uppercase">
            Contact the Designer
        </h1>

        {/* Contact Card */}
        <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-10 max-w-3xl w-full">
            <p className="text-gray-600 mb-8 text-center text-lg leading-relaxed">
            Let’s bring your vision to life. Reach out for collaborations, luxury design consultations, or bespoke projects.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Contact Details */}
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-gray-700" />
                <span className="text-gray-700 text-lg">designer@email.com</span>
                </div>
                <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-gray-700" />
                <span className="text-gray-700 text-lg">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-gray-700" />
                <span className="text-gray-700 text-lg">Mumbai, India</span>
                </div>
            </div>

            {/* Right: Contact Form */}
            <form className="space-y-5">
                <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
                ></textarea>
                <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 tracking-wide"
                >
                Send Message
                </button>
            </form>
            </div>
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-gray-500 text-sm tracking-wide">
            © 2025 Luxury Design Studio. All Rights Reserved.
        </p>
        </div>
    </div>
  );
}
