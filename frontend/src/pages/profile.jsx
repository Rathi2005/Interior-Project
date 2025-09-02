import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "" });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const API_URL = import.meta.env.VITE_APP_API_URL;
      const response = await fetch(`${API_URL}/api/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User profile not found");
        }
        throw new Error("Failed to fetch user profile");
      }

      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_APP_API_URL;

      const response = await fetch(`${API_URL}/api/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const data = await response.json();
      setUserData(data);
      setIsEditOpen(false);
      await fetchUserProfile();
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openEditModal = () => {
    setFormData({
      username: userData?.username || "",
      email: userData?.email || ""
    });
    setIsEditOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#b08a44] mx-auto"></div>
          <p className="mt-4 text-gray-600 font-light">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md border border-[#e5d6b8]">
          <svg
            className="w-16 h-16 text-[#b08a44] mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-serif font-semibold text-gray-800 mb-2">
            Profile Unavailable
          </h2>
          <p className="text-gray-600 mb-6 font-light">{error}</p>
          <button
            onClick={fetchUserProfile}
            className="bg-[#b08a44] hover:bg-[#9a7740] text-white px-6 py-2.5 rounded-lg transition-colors duration-300 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#faf9f7] py-4 px-4 sm:py-6 md:py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header with decorative elements */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-gray-800 mb-2">Design Profile</h1>
            <div className="w-16 sm:w-20 h-0.5 bg-[#b08a44] mx-auto"></div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-[#e5d6b8]">
            {/* Profile Header with Luxury Background */}
            <div className="relative bg-gradient-to-r from-[#f9f5f0] to-[#f8f4ef] p-4 sm:p-6 md:p-8 border-b border-[#e5d6b8]">
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 opacity-10">
                <svg viewBox="0 0 100 100" className="text-[#b08a44]">
                  <path d="M50,0 L100,50 L50,100 L0,50 Z" fill="currentColor"></path>
                </svg>
              </div>
              
              <div className="flex flex-col md:flex-row items-center relative z-10">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white p-1 rounded-full shadow-md mb-4 sm:mb-6 md:mb-0 md:mr-6 lg:mr-8">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-[#f9f5f0] to-[#f8f4ef] flex items-center justify-center border-2 border-[#e5d6b8]">
                    {userData?.avatar ? (
                      <img
                        src={userData.avatar}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#b08a44]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                
                <div className="text-center md:text-left">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-gray-800 mb-1">
                    {userData?.username || "Design Enthusiast"}
                  </h1>
                  <p className="text-[#b08a44] font-medium mb-1 sm:mb-2 text-sm sm:text-base">{userData?.email}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Member since {new Date(userData?.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Personal Information */}
                <div className="bg-[#faf9f7] p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-[#e5d6b8]">
                  <h2 className="text-base sm:text-lg font-serif font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#b08a44] flex items-center justify-center mr-2 sm:mr-3">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Personal Information
                  </h2>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="pb-2 sm:pb-3 border-b border-[#e5d6b8]">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Full Name</p>
                      <p className="font-medium text-gray-800 text-sm sm:text-base">
                        {userData?.username || "Not provided"}
                      </p>
                    </div>
                    
                    <div className="pb-2 sm:pb-3 border-b border-[#e5d6b8]">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email Address</p>
                      <p className="font-medium text-gray-800 text-sm sm:text-base">{userData?.email}</p>
                    </div>
                    
                    {/* <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Phone Number</p>
                      <p className="font-medium text-gray-800 text-sm sm:text-base">
                        {userData?.phone || "Not provided"}
                      </p>
                    </div> */}
                  </div>
                </div>

                {/* Account Information */}
                <div className="bg-[#faf9f7] p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-[#e5d6b8]">
                  <h2 className="text-base sm:text-lg font-serif font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#b08a44] flex items-center justify-center mr-2 sm:mr-3">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Account Information
                  </h2>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="pb-2 sm:pb-3 border-b border-[#e5d6b8]">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">User ID</p>
                      <p className="font-medium text-gray-800 text-xs sm:text-sm font-mono">
                        {userData?._id || "N/A"}
                      </p>
                    </div>
                    
                    <div className="pb-2 sm:pb-3 border-b border-[#e5d6b8]">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Account Status</p>
                      <p className="font-medium">
                        <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-[#e8f5e8] text-[#2e7d32]">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#2e7d32] rounded-full mr-1 sm:mr-2"></span>
                          Active
                        </span>
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Member Since</p>
                      <p className="font-medium text-gray-800 text-sm sm:text-base">
                        {new Date(userData?.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Stats */}
              {userData?.consultationStats && (
                <div className="mt-6 sm:mt-8 bg-[#faf9f7] p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-[#e5d6b8]">
                  <h2 className="text-base sm:text-lg font-serif font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#b08a44] flex items-center justify-center mr-2 sm:mr-3">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </span>
                    Design Consultation Statistics
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 sm:grid-cols-2 md:grid-cols-4">
                    <div className="bg-white p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-sm text-center border border-[#e5d6b8]">
                      <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-[#b08a44] mb-1">
                        {userData.consultationStats.total || 0}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">Total Consultations</p>
                    </div>
                    
                    <div className="bg-white p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-sm text-center border border-[#e5d6b8]">
                      <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-[#ffb300] mb-1">
                        {userData.consultationStats.pending || 0}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">Pending</p>
                    </div>
                    
                    <div className="bg-white p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-sm text-center border border-[#e5d6b8]">
                      <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-[#2e7d32] mb-1">
                        {userData.consultationStats.completed || 0}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">Completed</p>
                    </div>
                    
                    <div className="bg-white p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-sm text-center border border-[#e5d6b8]">
                      <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-[#1565c0] mb-1">
                        {userData.consultationStats.inProgress || 0}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">In Progress</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-3 sm:gap-4 justify-center">
                <button 
                  className="bg-white hover:bg-[#faf9f7] text-[#b08a44] px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg transition-all duration-300 flex items-center border border-[#b08a44] hover:shadow-md text-sm sm:text-base"
                  onClick={openEditModal}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-md border border-[#e5d6b8] shadow-lg">
            <h2 className="text-lg sm:text-xl font-serif font-semibold text-gray-800 mb-6">
              Edit Profile
            </h2>
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-2 font-medium">Full Name</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full border border-[#e5d6b8] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#b08a44] focus:border-transparent outline-none"
                  required
                />
              </div>
              {/* <div>
                <label className="block text-sm text-gray-600 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-[#e5d6b8] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#b08a44] focus:border-transparent outline-none"
                  required
                />
              </div> */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition text-gray-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#b08a44] hover:bg-[#9a7740] text-white transition font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-12 sm:mt-16 md:mt-20 py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} InterioSpace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;