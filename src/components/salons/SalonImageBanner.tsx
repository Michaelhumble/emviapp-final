
import React from 'react';

const SalonImageBanner: React.FC = () => {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gradient-to-r from-pink-100 to-purple-100">
      <img
        src="/salon-banner.png"
        alt="Salon Directory Banner"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white text-center">
          Find Your Dream Salon
        </h1>
      </div>
    </div>
  );
};

export default SalonImageBanner;
