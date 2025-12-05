import React from "react";

const Hero = ({ MenuIcon, CloseIcon, ArrowRight, menuOpen, setMenuOpen, videoLoaded, setVideoLoaded }) => {
  return (
    <section className="relative h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>

        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute min-w-full min-h-full w-auto h-auto object-cover"
          onLoadedData={() => setVideoLoaded(true)}
          preload="auto"
        >
          <source src="/istockphoto-508499774-640_adpp_is.mp4" type="video/mp4" />

          {/* Fallback */}
          <img
            src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury Interior Design"
            className="w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 py-8 px-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-light tracking-widest text-white">DESIGN STUDIO</div>

          <div className="hidden md:flex space-x-10">
            <a className="text-white/90 hover:text-white">Portfolio</a>
            <a className="text-white/90 hover:text-white">Services</a>
            <a className="text-white/90 hover:text-white">About</a>
            <a className="text-white/90 hover:text-white">Contact</a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 h-[calc(100vh-80px)] flex items-center justify-center px-6">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white mb-8 tracking-tight">
            <span className="block">ELEVATING</span>
            <span className="block font-normal mt-4">LIVING SPACES</span>
          </h1>

          <p className="text-white/90 text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            Crafting timeless interiors that blend innovation with elegance.
          </p>

          <button className="px-10 py-4 bg-white/20 backdrop-blur-sm border border-white/40 text-white hover:bg-white/30 transition-all duration-500 font-light tracking-wider text-sm uppercase group">
            Explore Our Work
            <ArrowRight className="inline-block ml-3 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
