import React from "react";

const Newsletter = () => {
  return (
    <section className="py-12 px-8 text-center bg-black text-white">
      <h2 className="text-2xl font-bold mb-4">Stay Inspired</h2>
      <p className="mb-6">Subscribe to our newsletter for weekly design ideas</p>
      <div className="flex justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 w-64 rounded-l-lg focus:outline-none text-black"
        />
        <button className="px-6 py-3 bg-white text-black font-semibold rounded-r-lg hover:bg-gray-200">
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default Newsletter;
