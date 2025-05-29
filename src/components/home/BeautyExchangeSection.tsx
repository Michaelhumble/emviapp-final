
import React from 'react';
import BarberListingsSection from './BarberListingsSection';
import SkincareListingsSection from './SkincareListingsSection';
import MakeupListingsSection from './MakeupListingsSection';
import TattooListingsSection from './TattooListingsSection';

const BeautyExchangeSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Emvi Beauty Connections™
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover opportunities across every beauty specialty
          </p>
        </div>
        
        {/* All listing sections */}
        <BarberListingsSection />
        <SkincareListingsSection />
        <MakeupListingsSection />
        <TattooListingsSection />
      </div>
    </section>
  );
};

export default BeautyExchangeSection;
