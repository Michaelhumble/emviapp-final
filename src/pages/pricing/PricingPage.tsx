
import React from 'react';
import { motion } from 'framer-motion';
import LanguageToggle from '@/components/layout/LanguageToggle';
import HeroSection from '@/components/pricing/HeroSection';
import PricingSection from '@/components/pricing/PricingSection';
import PricingComparison from '@/components/pricing/PricingComparison';

const PricingPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-purple-50/10"
    >
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle minimal={true} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
        <HeroSection />
        <PricingSection />
        <PricingComparison />
      </div>
    </motion.div>
  );
};

export default PricingPage;
