import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/login"); // redirect to login
  };

  const handleProfileClick = () => {
    navigate("/profile"); // redirect to profile page
    setIsDropdownOpen(false); // close dropdown
  };

  const handleConsults = () => {
    navigate("/consultations"); // redirect to consultations page
    setIsDropdownOpen(false); // close dropdown
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white top-0 z-50 relative">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold tracking-wide">InterioSpace</h1>
      </div>

      {/* Center: Absolute true center */}
      <ul className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6 text-gray-700 font-medium">
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

      {/* Right: Profile Section */}
      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        <p className="text-gray-700 text-sm">
          {localStorage
            .getItem("email")
            .slice(0, localStorage.getItem("email").length - 10)}
        </p>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition"
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
          <div className="absolute right-0 mt-44 w-56 py-2 bg-white rounded-md shadow-lg border border-gray-100 z-50">
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
    </nav>
  );
};

export default Navbar;
