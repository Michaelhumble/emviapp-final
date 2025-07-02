
import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-orange-500">Emvi</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with top beauty professionals and discover amazing salon experiences in your area.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
