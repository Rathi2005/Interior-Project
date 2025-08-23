import React from "react";
import Navbar from "../components/navbar";
import HeroSection from "../components/heroSection";
import Gallery from "../components/gallery";
import Trending from "../components/trending";
import Newsletter from "../components/newsLetter";
import Footer from "../components/footer";
import Services from "../components/service";  // ✅ new import

const Home = () => {
  return (
    <div className="bg-white text-gray-900">
      <Navbar />
      <HeroSection />
      <Services />   {/* ✅ new section added here */}
      <Gallery />
      <Trending />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
