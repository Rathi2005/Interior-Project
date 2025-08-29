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
    <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden border border-gray-200 sm:border-gray-300 hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0 sm:hover:-translate-y-1">
      {/* Card Header with Luxury Accent */}
      <div className="bg-gradient-to-r from-[#f7efe7] to-[#f7eada] border-b border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4">
          <div className="mb-2 sm:mb-0">
            <h2 className="text-xl sm:text-2xl font-serif font-light text-gray-800 mb-1">
              {consultation.fullName}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">Consultation Request</p>
          </div>
          <div className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${status.bg} ${status.text} self-start sm:self-auto`}>
            {status.label}
          </div>
        </div>
        
        {/* Project Category */}
        <div className="flex items-center text-[#b08a44]">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-sm sm:text-base">{consultation.category}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-6">
        {/* Project Description */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Project Overview
          </h3>
          <p className="text-gray-700 leading-relaxed italic text-sm sm:text-base">
            "{consultation.projectDescription}"
          </p>
        </div>

        {/* Address */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Location
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">{consultation.address}</p>
        </div>

        {/* Meta Information */}
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-500 block mb-1">Submitted</span>
            <span className="text-sm text-gray-700 font-medium">
              {formatDate(consultation.createdAt || consultation.submissionDate)}
            </span>
          </div>
          
        </div>
      </div>

      {/* Card Footer */}
      <div className="bg-[#faf9f7] px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100">
        <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2 xs:gap-0">
          <span className="text-xs text-gray-500">
            Last updated: {formatDate(consultation.updatedAt)}
          </span>
          <button className="text-[#b08a44] hover:text-[#9a7740] text-sm font-medium transition-colors duration-200 flex items-center self-start xs:self-auto">
            View Details 
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}