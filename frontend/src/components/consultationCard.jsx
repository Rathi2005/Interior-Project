import React from "react";

export default function ConsultationCard({ consultation }) {
  // Function to format date if available
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to get status badge styling
  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Pending Review' },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'In Progress' },
      'completed': { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
      'approved': { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Approved' },
      'default': { bg: 'bg-gray-100', text: 'text-gray-800', label: status || 'Submitted' }
    };
    
    return statusConfig[consultation.status?.toLowerCase()] || statusConfig.default;
  };

  const status = getStatusBadge(consultation.status);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Card Header with Luxury Accent */}
      <div className="bg-gradient-to-r from-[#f7efe7] to-[#f7eada] border-b border-gray-100 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-1">
              {consultation.fullName}
            </h2>
            <p className="text-sm text-gray-500">Consultation Request</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
            {status.label}
          </div>
        </div>
        
        {/* Project Category */}
        <div className="flex items-center text-[#b08a44]">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">{consultation.category}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Project Description */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Project Overview
          </h3>
          <p className="text-gray-700 leading-relaxed italic">
            "{consultation.projectDescription}"
          </p>
        </div>

        {/* Address */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Location
          </h3>
          <p className="text-gray-600">{consultation.address}</p>
        </div>

        {/* Meta Information */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-500 block mb-1">Submitted</span>
            <span className="text-sm text-gray-700 font-medium">
              {formatDate(consultation.createdAt || consultation.submissionDate)}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block mb-1">Reference ID</span>
            <span className="text-sm text-gray-700 font-mono">
              #{consultation._id ? consultation._id.slice(-8).toUpperCase() : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="bg-[#faf9f7] px-6 py-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Last updated: {formatDate(consultation.updatedAt)}
          </span>
          <button className="text-[#b08a44] hover:text-[#9a7740] text-sm font-medium transition-colors duration-200">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}