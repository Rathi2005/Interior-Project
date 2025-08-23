import React from "react";
import kitchen from "../assets/images/kitchen.jpg";
import bedroom from "../assets/images/bedroom.jpg";
import office from "../assets/images/office.jpg";

const Gallery = () => {
  const images = [kitchen, bedroom, office];

  return (
    <section className="py-16 px-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div key={idx} className="overflow-hidden rounded-xl shadow-lg hover:scale-105 transition">
            <img src={img} alt="Interior Design" className="w-full h-80 object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
