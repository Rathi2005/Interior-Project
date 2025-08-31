import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/images/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleConsults = () => {
    navigate("/consultations");
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get user email safely
  const userEmail = localStorage.getItem("email") || "";
  const displayEmail = userEmail ? userEmail.slice(0, userEmail.length - 10) : "User";

  return (
    <nav className="flex items-center justify-between px-4 py-4 shadow-md bg-white top-0 z-50 md:px-8">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2 z-10">
        <img src={logo} alt="Logo" className="h-8 w-8 md:h-10 md:w-10" />
        <h1 className="text-xl font-bold tracking-wide">InterioSpace</h1>
      </div>

      {/* Mobile menu button (hidden on desktop) */}
      <button 
        className="p-2 rounded-md md:hidden mobile-menu-button z-10"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Center: Navigation links (hidden on mobile, visible on desktop) */}
      <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 text-gray-700 font-medium">
        <li>
          <Link
            to="/"
            className="hover:text-black transition-colors duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/gallery"
            className="hover:text-black transition-colors duration-200"
          >
            Gallery
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="hover:text-black transition-colors duration-200"
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Right: Profile Section (hidden on mobile, visible on desktop) */}
      <div className="hidden md:flex items-center gap-3 relative" ref={dropdownRef}>
        <p className="text-gray-700 text-sm">
          {displayEmail}
        </p>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          aria-label="User menu"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-12 mt-2 w-56 py-2 bg-white rounded-md shadow-lg border border-gray-100 z-50">
            {/* My Profile */}
            <button
              onClick={handleProfileClick}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              <svg
                className="w-4 h-4 mr-3 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              My Profile
            </button>

            {/* My Consultations */}
            <button
              onClick={handleConsults}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              <svg
                className="w-4 h-4 mr-3 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-2h6v2m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0V7a2 2 0 012-2h2a2 2 0 012 2v10"
                />
              </svg>
              My Consultations
            </button>

            <hr className="my-1" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 transition"
            >
              <svg
                className="w-4 h-4 mr-3 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile menu (visible on mobile) */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="fixed inset-0 bg-white z-40 md:hidden pt-20 px-6">
          <div className="flex flex-col space-y-6">
            {/* Navigation links */}
            <Link
              to="/"
              className="text-lg font-medium text-gray-800 py-2 border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/gallery"
              className="text-lg font-medium text-gray-800 py-2 border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              className="text-lg font-medium text-gray-800 py-2 border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* User section */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-gray-600 mb-4">Logged in as: {displayEmail}</p>
              
              <button
                onClick={handleProfileClick}
                className="flex items-center w-full py-3 text-gray-800"
              >
                <svg
                  className="w-5 h-5 mr-3 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                My Profile
              </button>
              
              <button
                onClick={handleConsults}
                className="flex items-center w-full py-3 text-gray-800"
              >
                <svg
                  className="w-5 h-5 mr-3 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17v-2h6v2m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0V7a2 2 0 012-2h2a2 2 0 012 2v10"
                  />
                </svg>
                My Consultations
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center w-full py-3 text-red-600 mt-4"
              >
                <svg
                  className="w-5 h-5 mr-3 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;