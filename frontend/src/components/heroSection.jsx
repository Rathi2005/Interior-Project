import React, { useState, useEffect } from "react";
import livingRoom from "../assets/images/living-room1.jpg";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setLoaded(true);
    
    // Preload the background image
    const img = new Image();
    img.src = livingRoom;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          imageLoaded ? 'opacity-85 scale-100' : 'opacity-0 scale-110'
        }`}
        style={{ backgroundImage: `url(${livingRoom})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl px-4">
        <div className={`transform transition-all duration-1000 delay-300 ${
          loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-6xl font-serif font-light mb-6 leading-tight">
            Design Your <span className="font-bold" style={{ color: '#b08a44' }}>Dream Space</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto leading-relaxed">
            Modern interiors curated for unparalleled comfort & timeless elegance
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              className="px-8 py-4 text-black font-semibold rounded-sm shadow-lg transform transition-all duration-300 hover:scale-105 group relative overflow-hidden"
              style={{ backgroundColor: '#b08a44' }}
              onMouseOut={(e) => e.target.style.backgroundColor = '#b08a44'}
            >
              <span className="relative z-10">Explore Portfolio</span>
            </button>
            
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-sm hover:bg-gray-900/10 hover:border-gray-600 transform transition-all duration-300 hover:scale-105">
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;