import React, { useState, useEffect, useRef } from "react";
import bgServices from "../../public/images/homepage/bg-servies.jpg";

const Services = () => {
  const services = [
    {
      title: "INTERIOR CONSULTANCY",
      subtitle: "DESIGN & PMC",
    },
    {
      title: "ARCHITECTECTURAL CONSULTANCY",
      subtitle: "DESIGN & PMC",
    },
    {
      title: "COMPLETE BUILD SOLUTION",
      subtitle: "END-TO-END EXECUTION",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-24 text-center overflow-hidden relative"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={bgServices}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white bg-opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading with fade-in animation */}
        <h2
          className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-light mb-6 sm:mb-8 max-w-4xl lg:max-w-6xl mx-auto leading-relaxed transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          A space is more than walls and furniture. It is a reflection of the
          lives within it and at
          <span className="font-bold text-[#b08a44]"> InterioSpace</span>
          , that belief is woven into every space we create.
        </h2>

        {/* Service Cards with staggered animations */}
        <div className="flex flex-col md:flex-row justify-center gap-6 sm:gap-8 mt-8 sm:mt-10 md:mt-12 relative z-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`w-full sm:w-80 md:w-60 lg:w-72 h-60 sm:h-64 md:h-72 border border-gray-300 rounded-t-full flex flex-col items-center justify-center shadow-md bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-3 mx-auto md:mx-0 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 200}ms` : "0ms",
                background: "linear-gradient(to bottom, white 80%, #f9f5f0 100%)",
              }}
            >
              <h3 className="text-base sm:text-lg font-serif font-semibold m-2 mt-6 sm:mt-8 px-4 text-gray-800 text-center">
                {service.title}
              </h3>
              <p className="text-sm sm:text-md text-[#b08a44] font-medium m-1 mt-3 sm:mt-4 text-center">
                {service.subtitle}
              </p>

              {/* Hidden hover element */}
              <div className="mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-[#b08a44] text-white rounded-full">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-16 flex justify-center space-x-2">
          {services.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#b08a44] transition-all duration-500 ${
                isVisible ? "opacity-100" : "opacity-30"
              }`}
              style={{
                animation: isVisible
                  ? `pulse 2s infinite ${index * 0.3}s`
                  : "none",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Add custom animation keyframes */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </section>
  );
};

export default Services;