import React from "react";

const ParallaxSection1 = () => {
  return (
    <>
      {/* Parallax Section 2 */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Design That Inspires</h2>
            <p className="text-white/80 font-light text-lg">Every detail matters in creating unforgettable spaces</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParallaxSection1;
