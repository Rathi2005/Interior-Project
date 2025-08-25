import React, { useEffect, useState } from "react";
import ConsultationCard from "../components/consultationCard";
import Navbar from "../components/navbar"; // Your existing Navbar component

export default function Consultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        
        const API_URL = "http://localhost:5000";
        const response = await fetch(`${API_URL}/api/consultations`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setConsultations(data);
        
      } catch (err) {
        console.error("Error fetching consultations:", err);
        setError("Failed to load consultations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] to-[#f5f2ee]">
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 "> {/* Added pt-24 for navbar spacing */}
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <h1 className="text-4xl md:text-5xl font-serif font-light text-gray-800 mb-4">
              My Consultations
            </h1>
            <div className="w-16 h-1 bg-[#b08a44] mx-auto"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review your design consultation requests and track their progress
          </p>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#b08a44] mb-6"></div>
            <p className="text-gray-600">Loading your consultations...</p>
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Consultations</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#b08a44] text-white rounded-lg hover:bg-[#9a7740] transition-colors duration-300 font-medium"
            >
              Try Again
            </button>
          </div>
        ) : consultations.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-24 h-24 bg-[#f9f5f0] rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-[#b08a44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-light text-gray-800 mb-4">No Consultations Yet</h3>
            <p className="text-gray-600 mb-8">
              You haven't submitted any consultation requests. Start your design journey by requesting a consultation.
            </p>
            <button
              onClick={() => window.location.href = '/contact'}
              className="px-8 py-3 bg-[#b08a44] text-white rounded-lg hover:bg-[#9a7740] transition-colors duration-300 font-medium"
            >
              Request Consultation
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif font-light text-gray-800">
                Your Consultation Requests
              </h2>
              <button
                onClick={() => window.location.href = '/contact'}
                className="px-6 py-2 border border-[#b08a44] text-[#b08a44] rounded-lg hover:bg-[#b08a44] hover:text-white transition-colors duration-300"
              >
                + New Request
              </button>
            </div>
            
            <div className="grid gap-6">
              {consultations.map((consultation, index) => (
                <ConsultationCard
                  key={consultation._id || consultation.id || index}
                  consultation={consultation}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Interior Maata Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}