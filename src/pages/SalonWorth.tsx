import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FAQSection } from '@/components/calculator/FAQSection';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BottomSheet } from '@/components/calculator/BottomSheet';
import { ValuationResultSheet } from '@/components/calculator/ValuationResultSheet';
import { MiniSummaryBar } from '@/components/calculator/MiniSummaryBar';
import { calculateSalonValuation, type ValuationInputs, type ValuationResult } from '@/lib/valuation';
import { toast } from 'sonner';

const SalonWorth = () => {
  const navigate = useNavigate();
  const [cityInput, setCityInput] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [showMiniBar, setShowMiniBar] = useState(false);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [inputs, setInputs] = useState<ValuationInputs | null>(null);

  // Check for saved valuation on mount
  useEffect(() => {
    const saved = localStorage.getItem('lastValuation');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        // Show if less than 7 days old
        if (Date.now() - data.timestamp < 7 * 24 * 60 * 60 * 1000) {
          setShowMiniBar(true);
          // Reconstruct result object for mini bar
          setResult({ low: data.low, high: data.high } as ValuationResult);
        }
      } catch (e) {
        // Invalid data, ignore
      }
    }
  }, []);

  // Geolocation
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported by your browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Reverse geocode to get ZIP (simplified - in production use a geocoding API)
          setCityInput('Location detected');
          toast.success('Location detected!');
        } catch (error) {
          toast.error('Could not detect location');
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        toast.error('Location access denied');
        setIsLocating(false);
      }
    );
  };

  // Calculate (mock flow - opens sheet immediately)
  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo, use mock inputs
    const mockInputs: ValuationInputs = {
      monthlyRevenue: 50000,
      numberOfStations: 10,
      zipCode: cityInput || '92704',
      leaseLength: 'long-term',
      googleRating: 4.8,
      googleReviewCount: 250
    };

    const calculationResult = calculateSalonValuation(mockInputs);
    setResult(calculationResult);
    setInputs(mockInputs);
    setShowSheet(true);
    setShowMiniBar(true);
    
    // Store in localStorage
    localStorage.setItem('lastValuation', JSON.stringify({
      low: calculationResult.low,
      high: calculationResult.high,
      timestamp: Date.now()
    }));
  };

  const handleListClick = () => {
    navigate('/sell-salon');
  };

  const handleSaveClick = () => {
    setShowSheet(true);
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
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-white via-purple-50 to-pink-50 py-32 md:py-40 px-4 relative overflow-hidden min-h-[80vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-pink-100/20" />
          
          <div className="max-w-3xl mx-auto text-center relative z-10 w-full">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-tight">
              💰 Test Your Salon's Worth Instantly
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-12 font-medium">
              Find out how much your salon could sell for — free and takes 10 seconds.
            </p>
            
            {/* Hero Search Form */}
            <form onSubmit={handleCalculate} className="max-w-2xl mx-auto">
              <div className="relative">
                <label htmlFor="city-search" className="sr-only">Enter ZIP code or city</label>
                <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-2xl border-2 border-purple-100">
                  <div className="relative flex-1">
                    <Input
                      id="city-search"
                      type="search"
                      placeholder="Enter ZIP or City"
                      value={cityInput}
                      onChange={(e) => setCityInput(e.target.value)}
                      className="border-0 focus-visible:ring-0 text-lg h-16 bg-transparent pr-12"
                      aria-label="Enter your city or ZIP code"
                      disabled={isLocating}
                    />
                    <button
                      type="button"
                      onClick={handleUseLocation}
                      disabled={isLocating}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-full transition-colors"
                      aria-label="Use my current location"
                      title="Use my location"
                    >
                      {isLocating ? (
                        <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                      ) : (
                        <MapPin className="w-5 h-5 text-muted-foreground hover:text-purple-600" />
                      )}
                    </button>
                  </div>
                  <Button 
                    type="submit"
                    size="lg"
                    disabled={isLocating}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-10 h-16 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap text-lg"
                  >
                    Calculate
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                No signup • No card • ~10s
              </p>
            </form>
          </div>
        </section>

        {/* FAQ Section - Hidden until scroll */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <FAQSection />

        </div>

        {/* Bottom Sheet */}
        {result && inputs && (
          <BottomSheet isOpen={showSheet} onClose={() => setShowSheet(false)}>
            <ValuationResultSheet 
              result={result}
              inputs={inputs}
              onListClick={handleListClick}
            />
          </BottomSheet>
        )}

        {/* Mini Summary Bar */}
        {result && (
          <MiniSummaryBar
            low={result.low}
            high={result.high}
            status="Great Position"
            onListClick={handleListClick}
            onSaveClick={handleSaveClick}
            show={showMiniBar && !showSheet}
          />
        )}
      </div>
    </>
  );
};

export default SalonWorth;
