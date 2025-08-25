import React from "react";

const DesignPhilosophy = () => {
  return (
    <section className="py-20 px-8 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4">Our Design Philosophy</h2>
          <div className="w-16 h-0.5 bg-[#b08a44] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide every space we create
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Philosophy 1 */}
          <div className="text-center p-6 group transition-all duration-500 rounded-lg">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#f9f5f0] flex items-center justify-center group-hover:bg-[#b08a44] group-hover:text-white transition-colors duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-6 0H5m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold mb-4">Intentional Spaces</h3>
            <p className="text-gray-600">
              Every element serves a purpose, creating environments that are both beautiful and functional.
            </p>
          </div>

          {/* Philosophy 2 */}
          <div className="text-center p-6 group transition-all duration-500 rounded-lg">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#f9f5f0] flex items-center justify-center group-hover:bg-[#b08a44] group-hover:text-white transition-colors duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold mb-4">Timeless Elegance</h3>
            <p className="text-gray-600">
              We create designs that transcend trends, ensuring your space remains sophisticated for years to come.
            </p>
          </div>

          {/* Philosophy 3 */}
          <div className="text-center p-6 group transition-all duration-500 rounded-lg">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#f9f5f0] flex items-center justify-center group-hover:bg-[#b08a44] group-hover:text-white transition-colors duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold mb-4">Client Collaboration</h3>
            <p className="text-gray-600">
              Your vision is at the heart of our process. We listen, interpret, and bring your dreams to life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignPhilosophy;