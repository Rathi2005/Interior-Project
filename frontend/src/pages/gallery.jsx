// src/pages/Gallery.jsx
import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import GalleryCard from "../components/galleryCard";

// Import your images
import img1 from "../assets/gallery/img1.jpg";
import img2 from "../assets/gallery/img2.jpg";
import img3 from "../assets/gallery/img3.jpg";
// Add more images as needed

const galleryItems = [
  { image: img1, title: "Luxury Living Room" },
  { image: img2, title: "Modern Kitchen Design" },
  { image: img3, title: "Elegant Bedroom" },
  // Add more
];

const Gallery = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <section className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          Our Portfolio
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Explore our curated collection of luxurious interiors designed with elegance and sophistication.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <GalleryCard key={index} image={item.image} title={item.title} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
