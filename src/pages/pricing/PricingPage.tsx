
import React from 'react';
import LanguageToggle from '@/components/layout/LanguageToggle';
import HeroSection from '@/components/pricing/HeroSection';
import PricingSection from '@/components/pricing/PricingSection';
import PricingComparison from '@/components/pricing/PricingComparison';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-purple-50/10">
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle minimal={true} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
        <HeroSection />
        <PricingSection />
        <PricingComparison />
      </div>
    </div>
  );
};

export default PricingPage;
