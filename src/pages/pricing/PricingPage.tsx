
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LanguageToggle from '@/components/ui/LanguageToggle';
import LuxuryHero from '@/components/pricing/LuxuryHero';
import BillingToggle from '@/components/pricing/BillingToggle';
import PremiumPricingCard from '@/components/pricing/PremiumPricingCard';
import TestimonialsCarousel from '@/components/pricing/TestimonialsCarousel';
import ScarcityBanner from '@/components/pricing/ScarcityBanner';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import FinalCTA from '@/components/pricing/FinalCTA';

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free Listing',
      emotiveTitle: 'Shine',
      price: 0,
      isAnnual,
      features: [
        'Basic search visibility',
        '30-day duration',
        'Standard placement',
        'Secure posting',
        'Mobile-friendly display'
      ],
      buttonText: 'Start Free',
      buttonVariant: 'outline' as const
    },
    {
      id: 'gold',
      name: 'Gold Featured',
      emotiveTitle: 'Stand Out',
      price: isAnnual ? 191.92 : 19.99,
      originalPrice: isAnnual ? 239.88 : undefined,
      isAnnual,
      badge: 'POPULAR' as const,
      limitedSpots: '8/15 spots left',
      features: [
        'Featured placement above standard',
        'Gold badge highlight',
        'Enhanced visibility boost',
        'Basic analytics dashboard',
        'Priority support access'
      ],
      buttonText: 'Unlock Gold Now',
      buttonVariant: 'default' as const
    },
    {
      id: 'premium',
      name: 'Premium Listing',
      emotiveTitle: 'Go Pro',
      price: isAnnual ? 383.92 : 39.99,
      originalPrice: isAnnual ? 479.88 : undefined,
      isAnnual,
      badge: 'RECOMMENDED' as const,
      limitedSpots: '5/15 spots left',
      features: [
        'Premium placement above Gold',
        'Premium badge and styling',
        'Advanced analytics dashboard',
        'Priority support and consultation',
        'Targeted visibility boost'
      ],
      buttonText: 'Upgrade to Premium',
      buttonVariant: 'default' as const
    },
    {
      id: 'diamond',
      name: 'Diamond Exclusive',
      emotiveTitle: 'Diamond Elite',
      price: 999.99,
      isAnnual: true,
      badge: 'ANNUAL_ONLY' as const,
      limitedSpots: '2/5 spots left',
      features: [
        'Highest diamond placement',
        'Diamond badge and exclusive styling',
        'Personal account manager',
        'Premium analytics and insights',
        'Annual exclusive benefits'
      ],
      buttonText: 'Apply for Diamond',
      buttonVariant: 'default' as const
    }
  ];

  const handlePlanSelect = (planId: string) => {
    console.log('Selected plan:', planId);
    // Handle plan selection logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle minimal={true} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luxury Hero Section */}
        <LuxuryHero />

        {/* Billing Toggle */}
        <BillingToggle 
          isAnnual={isAnnual} 
          onToggle={setIsAnnual} 
        />

        {/* Scarcity and FOMO Elements */}
        <ScarcityBanner />

        {/* Pricing Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PremiumPricingCard
                plan={plan}
                onSelect={() => handlePlanSelect(plan.id)}
                isPopular={plan.badge === 'RECOMMENDED'}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <TestimonialsCarousel />

        {/* FAQ and Final CTA */}
        <div className="space-y-24 py-16">
          <PricingFAQ />
          <FinalCTA />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
