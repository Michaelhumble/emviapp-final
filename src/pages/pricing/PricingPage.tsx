
import React from 'react';
import LanguageToggle from '@/components/ui/LanguageToggle';
import HeroSection from '@/components/pricing/HeroSection';
import FoundingMemberOffer from '@/components/pricing/FoundingMemberOffer';
import ReferralRewards from '@/components/pricing/ReferralRewards';
import ClientManagementSection from '@/components/pricing/ClientManagementSection';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import FinalCTA from '@/components/pricing/FinalCTA';
import FoundersGetMore from '@/components/pricing/FoundersGetMore';
import EmotionalClosing from '@/components/pricing/EmotionalClosing';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-purple-50/10">
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle minimal={true} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-24">
        <HeroSection />
        <FoundingMemberOffer />
        <FoundersGetMore />
        <ClientManagementSection />
        <ReferralRewards />
        <EmotionalClosing />
        <PricingFAQ />
        <FinalCTA />
      </div>
    </div>
  );
};

export default PricingPage;
