import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import {
  AffiliateHero,
  ValuePropsSection,
  EarningsCalculator,
  HowItWorksSection,
  SocialProofSection,
  FAQSection,
  FinalCTASection
} from '@/components/affiliates';

const AffiliatesLanding = () => {
  useEffect(() => {
    // Light GA4 event dispatch (guarded)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'affiliate_lp_view', {
        event_category: 'affiliate',
        page_title: 'Affiliates Landing Page'
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>EmviApp Affiliate Program — Earn Monthly Payouts Growing Beauty Community</title>
        <meta name="description" content="Join 500+ creators earning 30% recurring commissions promoting EmviApp. Transparent tracking, Stripe Connect payouts, 90-day attribution. Start earning today." />
        <link rel="canonical" href="https://www.emvi.app/affiliates" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* OpenGraph */}
        <meta property="og:title" content="EmviApp Affiliate Program — Earn Monthly Payouts" />
        <meta property="og:description" content="Join 500+ creators earning 30% recurring commissions promoting EmviApp. Transparent tracking, Stripe Connect payouts, 90-day attribution." />
        <meta property="og:url" content="https://www.emvi.app/affiliates" />
        <meta property="og:image" content="https://www.emvi.app/og-affiliate-program.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EmviApp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EmviApp Affiliate Program — Earn Monthly Payouts" />
        <meta name="twitter:description" content="Join 500+ creators earning 30% recurring commissions promoting EmviApp. Transparent tracking, Stripe Connect payouts, 90-day attribution." />
        <meta name="twitter:image" content="https://www.emvi.app/og-affiliate-program.jpg" />
        
        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "EmviApp Affiliate Program",
            "description": "Join 500+ creators earning 30% recurring commissions promoting EmviApp. Transparent tracking, Stripe Connect payouts, 90-day attribution.",
            "url": "https://www.emvi.app/affiliates",
            "mainEntity": {
              "@type": "Service",
              "name": "EmviApp Affiliate Program",
              "provider": {
                "@type": "Organization",
                "name": "EmviApp",
                "url": "https://www.emvi.app"
              },
              "description": "Earn 30% recurring commissions promoting the beauty industry's fastest-growing job platform",
              "offers": {
                "@type": "Offer",
                "name": "Affiliate Partnership",
                "description": "30% recurring commission, 90-day attribution, monthly Stripe Connect payouts"
              }
            }
          })}
        </script>
      </Helmet>
      
      <Layout>
        <AffiliateHero />
        <ValuePropsSection />
        <EarningsCalculator />
        <HowItWorksSection />
        <SocialProofSection />
        <FAQSection />
        <FinalCTASection />
      </Layout>
    </>
  );
};

export default AffiliatesLanding;