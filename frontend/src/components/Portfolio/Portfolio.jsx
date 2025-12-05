import React from "react";

const Portfolio = ({ portfolioItems }) => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Selected Projects</h2>
          <p className="text-gray-600 font-light text-lg max-w-2xl mx-auto">
            Our recent work showcasing design excellence and attention to detail
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden bg-white border border-gray-200 rounded-none shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              <div className="p-8">
                <div className="text-amber-600 text-sm font-light tracking-wider mb-2">{item.category}</div>
                <h3 className="text-2xl font-light text-gray-900 mb-3">{item.title}</h3>

                <button className="text-gray-700 border-b border-gray-300 pb-1 text-sm font-light tracking-wider hover:text-amber-600 hover:border-amber-600 transition-colors">
                  View Case Study →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
