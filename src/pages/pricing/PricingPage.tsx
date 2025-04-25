
import React from 'react';
import { motion } from 'framer-motion';
import LanguageToggle from '@/components/ui/LanguageToggle';
import FoundingMemberOffer from '@/components/pricing/FoundingMemberOffer';
import DepositOptions from '@/components/pricing/DepositOptions';
import ReferralRewards from '@/components/pricing/ReferralRewards';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import FinalCTA from '@/components/pricing/FinalCTA';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle minimal={true} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        <FoundingMemberOffer />
        <DepositOptions />
        <ReferralRewards />
        <PricingFAQ />
        <FinalCTA />
      </div>
    </div>
  );
};

export default PricingPage;
