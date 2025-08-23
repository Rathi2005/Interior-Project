import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/login"); // redirect to login
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold tracking-wide">InterioSpace</h1>
      </div>

      {/* Center: Navigation Links */}
      <ul className="flex space-x-6 text-gray-700 font-medium absolute left-1/2 transform -translate-x-1/2">
        <li>
          <Link to="/" className="hover:text-black">Home</Link>
        </li>
        <li>
          <Link to="/gallery" className="hover:text-black">Gallery</Link>
        </li>
        {/* <li>
          <Link to="/trends" className="hover:text-black">Trends</Link>
        </li> */}
        <li>
          <Link to="/contact" className="hover:text-black">Contact</Link>
        </li>
      </ul>

      {/* Right: Logout */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
