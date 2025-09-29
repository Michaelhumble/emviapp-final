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

      <div className="min-h-screen bg-background">
        {/* Hero Section with Premium Gradient */}
        <section className="bg-gradient-to-br from-white via-purple-50 to-pink-50 py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-pink-100/20" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              What's Your Salon Worth?
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 font-medium">
              Instant estimate based on real salon sales, location, and reputation signals.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-purple-100">
              <span className="font-semibold text-purple-900">Powered by:</span>
              <span className="text-foreground/70">EmviApp Market Data</span>
              <span className="text-purple-400">•</span>
              <span className="text-foreground/70">Google Reviews</span>
              <span className="text-purple-400">•</span>
              <span className="text-foreground/70">Industry Benchmarks</span>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12">

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

          {/* FAQ Section */}
          <FAQSection />

          {/* Trust Metrics Bar */}
          <section className="mt-16 py-16 px-4 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 border-y border-purple-100 -mx-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    10,000+
                  </div>
                  <div className="text-foreground/70 font-medium">Beauty Professionals</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
                    4.9★
                  </div>
                  <div className="text-foreground/70 font-medium">Average Rating</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                    100,000+
                  </div>
                  <div className="text-foreground/70 font-medium">Happy Customers</div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="py-8 text-center text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              Inspired by Sunshine 
              <span className="inline-block text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">☀️</span>
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonWorth;
