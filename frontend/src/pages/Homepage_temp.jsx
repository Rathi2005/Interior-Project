import React, { useState } from "react";

// COMPONENT IMPORTS
import Hero from "../components/Hero/Hero";
import Spacer from "../components/Common/Spacer";
import ParallaxSection1 from "../components/Common/ParallaxSection1";
import ParallaxSection2 from "../components/Common/ParallaxSection2";
import Portfolio from "../components/Portfolio/Portfolio";
import Services from "../components/Services/Services";
import Footer from "../components/Footer/Footer";

const Homepage = () => {
  // State
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Icon Components (passed to Hero)
  const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
      stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );

  const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
      stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const ArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );

  // Portfolio Data
  const portfolioItems = [
    {
      id: 1,
      title: "Urban Penthouse",
      category: "Residential",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Boutique Hotel",
      category: "Hospitality",
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Corporate Office",
      category: "Commercial",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Services Data
  const services = [
    "Residential Design",
    "Commercial Spaces",
    "Hospitality Design",
    "Custom Furniture",
    "Project Management",
  ];

  return (
    <>
      {/* HERO SECTION WITH VIDEO */}
      <Hero
        MenuIcon={MenuIcon}
        CloseIcon={CloseIcon}
        ArrowRight={ArrowRight}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        videoLoaded={videoLoaded}
        setVideoLoaded={setVideoLoaded}
      />

      {/* SPACER */}
      <Spacer />

      {/* PARALLAX SECTIONS */}
      <ParallaxSection2 />

      {/* PORTFOLIO SECTION */}
      <Portfolio portfolioItems={portfolioItems} />

      {/* PARALLAX SECTIONS */}
      <ParallaxSection1 />

      {/* SERVICES SECTION */}
      <Services services={services} />

      {/* FOOTER SECTION */}
      <Footer />

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center">
          <div className="text-center space-y-6">
            <a className="block text-xl text-white/80 hover:text-white">Portfolio</a>
            <a className="block text-xl text-white/80 hover:text-white">Services</a>
            <a className="block text-xl text-white/80 hover:text-white">About</a>
            <a className="block text-xl text-white/80 hover:text-white">Contact</a>
          </div>

          <button className="absolute top-8 right-8 text-white"
            onClick={() => setMenuOpen(false)}>
            {<CloseIcon />}
          </button>
        </div>
      )}

      {/* Global CSS */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        video {
          opacity: ${videoLoaded ? "1" : "0"};
          transition: opacity 0.8s ease-in-out;
        }
        video {
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </>
  );
};

export default Homepage;
