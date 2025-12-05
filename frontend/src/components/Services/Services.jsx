import React from "react";

const Services = ({ services }) => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Comprehensive <br /> Design Services
            </h2>

            <p className="text-gray-600 font-light text-lg mb-10">
              From concept to completion, we provide end-to-end interior design solutions.
            </p>

            <div className="space-y-6">
              {services.map((service, index) => (
                <div key={index} className="flex items-center group cursor-pointer">
                  <div className="w-1 h-6 bg-amber-500 mr-4 group-hover:w-3 transition-all duration-300"></div>
                  <span className="font-light text-gray-800 text-lg group-hover:text-amber-600 transition-colors">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-gray-50 border border-gray-200 p-8 md:p-10">
              <h3 className="text-2xl font-light text-gray-900 mb-6">Begin Your Design Journey</h3>

              <p className="text-gray-600 mb-8">Schedule a consultation to discuss your project vision.</p>

              <form className="space-y-6">
                <input className="w-full bg-white border p-3" placeholder="Your Name" />
                <input className="w-full bg-white border p-3" placeholder="Email Address" />
                <textarea rows="4" className="w-full bg-white border p-3" placeholder="Tell us about your project…" />

                <button className="w-full py-3 bg-amber-600 text-white hover:bg-amber-700 transition-colors">
                  Request Consultation
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
