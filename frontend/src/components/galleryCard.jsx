// src/components/GalleryCard.jsx
import React from "react";

const GalleryCard = ({ image, title }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <h3 className="text-white text-xl font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default GalleryCard;
