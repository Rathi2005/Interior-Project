import React from "react";

const Trending = () => {
  const articles = [
    { title: "Minimalist Living Room Ideas", img: "https://i.pinimg.com/564x/a1.jpg" },
    { title: "2025 Color Trends for Interiors", img: "https://i.pinimg.com/564x/b2.jpg" },
    { title: "Work From Home Setup Inspiration", img: "https://i.pinimg.com/564x/c3.jpg" },
  ];

  return (
    <section className="py-16 px-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">Trending Now</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {articles.map((a, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <img src={a.img} alt={a.title} className="h-60 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{a.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
