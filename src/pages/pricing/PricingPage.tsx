
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import LuxuryHero from '@/components/pricing/LuxuryHero';
import PricingCards from '@/components/pricing/PricingCards';
import ScarcityBanner from '@/components/pricing/ScarcityBanner';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import FinalCTA from '@/components/pricing/FinalCTA';
import FOMOElements from '@/components/pricing/FOMOElements';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useStripe } from '@/hooks/useStripe';
import { toast } from 'sonner';

const PricingPage = () => {
  // Diamond spot logic - max 3 public spots available
  const maxDiamondSpots = 3;
  const diamondSpotsLeft = 1; // Currently 1 spot left out of 3 public spots
  const location = useLocation();
  const debug = new URLSearchParams(location.search).get('debug') === '1';
  const { initiateSalonCheckout, isLoading } = useStripe();
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            {debug && (
              <div className="mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    const origin = window.location.origin;
                    const ok = await initiateSalonCheckout({
                      test: true,
                      successUrl: `${origin}/post-success?kind=salon`,
                      cancelUrl: `${origin}/pricing?cancel=1`,
                    });
                    if (!ok) {
                      toast.error('Debug checkout failed');
                    }
                  }}
                >
                  {isLoading ? 'Testing…' : 'Test Salon Checkout'}
                </Button>
              </div>
            )}
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
