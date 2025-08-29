import React, { useState, useEffect } from "react";
import livingRoom from "../assets/images/living-room1.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animations after component mounts
    setLoaded(true);
    
    // Preload the background image
    const img = new Image();
    img.src = livingRoom;
    img.onload = () => setImageLoaded(true);
  }, []);

  const handleExploreClick = () => {
    navigate('/gallery');
  };

  const handleConsultationClick = () => {
    navigate('/contact');
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          imageLoaded ? 'opacity-85 scale-100' : 'opacity-0 scale-110'
        }`}
        style={{ backgroundImage: `url(${livingRoom})` }}
      >
        {/* Gradient Overlay - Enhanced for mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 md:bg-gradient-to-r md:from-black/70 md:via-transparent md:to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
        <div className={`transform transition-all duration-1000 delay-300 ${
          loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif font-light mb-4 sm:mb-6 leading-tight">
            Design Your <span className="font-bold" style={{ color: '#b08a44' }}>Dream Space</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl font-light mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            Modern interiors curated for unparalleled comfort & timeless elegance
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center items-center">
            <button 
              className="px-6 py-3 sm:px-8 sm:py-4 text-black font-semibold rounded-sm shadow-lg transform transition-all duration-300 hover:scale-105 group relative overflow-hidden min-w-[180px] xs:min-w-[200px] text-base sm:text-lg"
              style={{ backgroundColor: '#b08a44' }}
              onClick={handleExploreClick}
            >
              <span className="relative z-10">Explore Portfolio</span>
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button 
              className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-white text-white font-semibold rounded-sm hover:bg-white/10 transform transition-all duration-300 hover:scale-105 min-w-[180px] xs:min-w-[200px] text-base sm:text-lg"
              onClick={handleConsultationClick}
            >
              Book Consultation
            </button>
          </div>

          
        </div>
      </div>

      {/* Mobile scroll indicator */}
      <div className="sm:hidden absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;