import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SalonWorthCalculator } from '@/components/calculator/SalonWorthCalculator';
import { TestimonialBlock } from '@/components/calculator/TestimonialBlock';
import { FAQSection } from '@/components/calculator/FAQSection';
import { SocialProofBadge } from '@/components/calculator/SocialProofBadge';
import { LiveValuationTicker } from '@/components/calculator/LiveValuationTicker';
import { IndustryPartners } from '@/components/calculator/IndustryPartners';
import { AdditionalTestimonials } from '@/components/calculator/AdditionalTestimonials';
import { ListingBenefitsTable } from '@/components/calculator/ListingBenefitsTable';
import { SecurityBadges } from '@/components/calculator/SecurityBadges';
import { TestimonialCarousel } from '@/components/calculator/TestimonialCarousel';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SalonWorth = () => {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const [cityInput, setCityInput] = useState('');

  const handleCalculateClick = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Smooth scroll to calculator
    calculatorRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
    
    // Auto-focus revenue field after scroll
    setTimeout(() => {
      const revenueField = document.getElementById('revenue') as HTMLInputElement;
      if (revenueField) {
        revenueField.focus();
      }
    }, 800);
  };
  return (
    <>
      <Helmet>
        <title>Free Salon Worth Calculator | Value Your Nail Salon Business | EmviApp</title>
        <meta 
          name="description" 
          content="Calculate your salon's market value in minutes. Get a free professional valuation based on revenue, location, reviews, and market data. List your salon for sale today."
        />
        <meta name="keywords" content="salon valuation, nail salon worth, business calculator, salon for sale, beauty business value" />
        <link rel="canonical" href="https://www.emvi.app/salon-worth" />
        
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

        {/* SoftwareApplication Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "EmviApp Salon Worth Calculator",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "url": "https://www.emvi.app/salon-worth",
            "publisher": {
              "@type": "Organization",
              "name": "EmviApp"
            },
            "image": "https://www.emvi.app/icons/emvi-master-512.png"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Simplified Hero Section */}
        <section className="bg-gradient-to-br from-white via-purple-50 to-pink-50 py-24 md:py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-pink-100/20" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              💰 Test Your Salon's Worth Instantly.
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-10 font-medium">
              Find out how much your salon could sell for — free and takes 10 seconds.
            </p>
            
            {/* Hero Search Form */}
            <form onSubmit={handleCalculateClick} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-2xl border-2 border-purple-100">
                <Input
                  type="text"
                  placeholder="Enter your city or ZIP code"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  className="flex-1 border-0 focus-visible:ring-0 text-base h-14 bg-transparent"
                />
                <Button 
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
                >
                  Calculate My Worth <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                ✨ No credit card • No signup • Instant results
              </p>
            </form>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Calculator Component */}
          <div ref={calculatorRef}>
            <SalonWorthCalculator />
          </div>

          {/* Testimonial Carousel */}
          <TestimonialCarousel />

          {/* Testimonial */}
          <TestimonialBlock />

          {/* Additional Testimonials */}
          <AdditionalTestimonials />

          {/* Listing Benefits Table */}
          <div className="max-w-4xl mx-auto my-16">
            <ListingBenefitsTable />
          </div>

          {/* Industry Partners */}
          <div className="max-w-4xl mx-auto my-16">
            <IndustryPartners />
          </div>

          {/* Security Badges */}
          <div className="max-w-4xl mx-auto my-8">
            <SecurityBadges />
          </div>

          {/* FAQ Section */}
          <FAQSection />

          {/* Footer Note */}
          <div className="py-8 text-center text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              Inspired by Sunshine 
              <span className="inline-block text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">☀️</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalonWorth;
