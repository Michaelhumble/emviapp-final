
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import LuxuryHero from '@/components/pricing/LuxuryHero';
import PricingCards from '@/components/pricing/PricingCards';
import ScarcityBanner from '@/components/pricing/ScarcityBanner';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import FinalCTA from '@/components/pricing/FinalCTA';
import FOMOElements from '@/components/pricing/FOMOElements';

const PricingPage = () => {
  // Diamond spot logic - max 3 public spots available
  const maxDiamondSpots = 3;
  const diamondSpotsLeft = 1; // Currently 1 spot left out of 3 public spots
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <LuxuryHero />
          </div>
        </section>

        {/* Scarcity Banner */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <ScarcityBanner 
              diamondSpotsLeft={diamondSpotsLeft} 
              maxDiamondSpots={maxDiamondSpots}
            />
          </div>
        </section>

        {/* FOMO Elements */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <FOMOElements />
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <PricingCards 
              diamondSpotsLeft={diamondSpotsLeft}
              maxDiamondSpots={maxDiamondSpots}
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <PricingFAQ />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <FinalCTA />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PricingPage;
