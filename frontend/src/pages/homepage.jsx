import React from "react";
import Navbar from "../components/navbar";
import HeroSection from "../components/heroSection";
import Gallery from "../components/gallery";
import Trending from "../components/trending";
import Philosophy from "../components/philosophy";
import Footer from "../components/footer";
import Services from "../components/service";

const Home = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <Services />
        <Gallery />
        {/* <Trending /> */}
        <Philosophy />
      </main>
      <Footer />
    </div>
  );
};

export default Home;