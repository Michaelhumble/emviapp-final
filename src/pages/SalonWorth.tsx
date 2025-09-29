import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { SalonWorthCalculator } from '@/components/calculator/SalonWorthCalculator';
import { TestimonialBlock } from '@/components/calculator/TestimonialBlock';
import { FAQSection } from '@/components/calculator/FAQSection';
import { Calculator, TrendingUp, Shield, Zap } from 'lucide-react';

const SalonWorth = () => {
  return (
    <Layout>
      <Helmet>
        <title>Free Salon Worth Calculator | Value Your Nail Salon Business | EmviApp</title>
        <meta 
          name="description" 
          content="Calculate your salon's market value in minutes. Get a free professional valuation based on revenue, location, reviews, and market data. List your salon for sale today."
        />
        <meta name="keywords" content="salon valuation, nail salon worth, business calculator, salon for sale, beauty business value" />
        <link rel="canonical" href="https://emviapp.com/salon-worth" />
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is this valuation legally binding?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, this is an estimate based on market data and industry standards. For a formal appraisal, consult a licensed business broker or appraiser."
                }
              },
              {
                "@type": "Question",
                "name": "How accurate is the calculator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our algorithm uses actual salon sale data and industry multiples. Accuracy improves when you provide complete information, especially Google reviews and exact lease terms."
                }
              },
              {
                "@type": "Question",
                "name": "What happens after I get my estimate?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can list your salon for free on EmviApp (12 months free promotion), download a PDF report, or simply use the estimate for your planning. No obligation."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 space-y-4">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <Calculator className="w-12 h-12 text-primary" aria-hidden="true" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              What's Your Salon Worth?
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Instant estimate based on real salon sales, location, and reputation signals
            </p>
          </div>

          {/* Trust Row */}
          <div className="text-center mb-12 pb-8 border-b">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
              <span className="font-medium">Powered by:</span>
              <span>EmviApp Market Data</span>
              <span>•</span>
              <span>Google Reviews</span>
              <span>•</span>
              <span>Industry Benchmarks</span>
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="flex justify-center mb-3">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-sm text-muted-foreground">
                Get your valuation in under 2 minutes
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="flex justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Market Data</h3>
              <p className="text-sm text-muted-foreground">
                Based on actual salon sale prices
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="flex justify-center mb-3">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">100% Free</h3>
              <p className="text-sm text-muted-foreground">
                No hidden fees or obligations
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <SalonWorthCalculator />

          {/* Testimonial */}
          <TestimonialBlock />

          {/* Additional Info */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">How We Calculate Your Salon's Value</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our valuation algorithm considers multiple factors that professional business brokers use:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Revenue Multiple:</strong> Industry standard 2.5× monthly revenue</li>
                <li><strong>Physical Assets:</strong> $15,000 per nail station (equipment, furniture)</li>
                <li><strong>Location Premium:</strong> High-demand areas get a 20% boost</li>
                <li><strong>Reputation Value:</strong> Strong reviews (200+, 4.5+ rating) add 15%</li>
                <li><strong>Lease Terms:</strong> Short-term leases reduce value by 10%</li>
              </ul>
              <p className="text-sm italic">
                Note: This is an estimated range. Final sale price depends on negotiations, market conditions, 
                and buyer financing. For a detailed professional appraisal, consult a business broker.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <FAQSection />
        </div>
      </div>
    </Layout>
  );
};

export default SalonWorth;
