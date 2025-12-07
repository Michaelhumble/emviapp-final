import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FAQSection } from '@/components/calculator/FAQSection';
import { MapPin, Loader2, DollarSign, Calendar, Users, Star, Building2, TrendingUp, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BottomSheet } from '@/components/calculator/BottomSheet';
import { ValuationResultSheet } from '@/components/calculator/ValuationResultSheet';
import { MiniSummaryBar } from '@/components/calculator/MiniSummaryBar';
import { calculateSalonValuation, validateValuationInputs, type ValuationInputs, type ValuationResult, type ProfitMarginChoice } from '@/lib/valuation';
import { toast } from 'sonner';

const SalonWorth = () => {
  const navigate = useNavigate();
  const [isLocating, setIsLocating] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [showMiniBar, setShowMiniBar] = useState(false);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  
  // Form state with all required fields
  const [inputs, setInputs] = useState<Partial<ValuationInputs>>({
    monthlyRevenue: undefined,
    yearsInBusiness: undefined,
    hasLoyalClientBase: false,
    location: '',
    profitMode: 'estimate',
    profitMarginChoice: 'NORMAL',
    monthlyProfit: undefined,
    googleRating: undefined,
    googleReviewCount: undefined,
    leaseYearsRemaining: undefined,
    numberOfStations: undefined,
  });

  // Check for saved valuation on mount
  useEffect(() => {
    const saved = localStorage.getItem('lastValuation');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (Date.now() - data.timestamp < 7 * 24 * 60 * 60 * 1000) {
          setShowMiniBar(true);
          setResult({ low: data.low, high: data.high, base: data.base } as ValuationResult);
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
          setInputs(prev => ({ ...prev, location: 'Location detected' }));
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

  // Handle input changes
  const updateInput = (field: keyof ValuationInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setErrors([]); // Clear errors on input change
  };

  // Calculate valuation
  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const validation = validateValuationInputs(inputs);
    if (!validation.valid) {
      setErrors(validation.errors);
      toast.error('Please fix the errors below');
      return;
    }
    
    // Build complete inputs object
    const completeInputs: ValuationInputs = {
      monthlyRevenue: inputs.monthlyRevenue!,
      yearsInBusiness: inputs.yearsInBusiness!,
      hasLoyalClientBase: inputs.hasLoyalClientBase!,
      location: inputs.location || '',
      profitMode: inputs.profitMode || 'estimate',
      profitMarginChoice: inputs.profitMarginChoice,
      monthlyProfit: inputs.monthlyProfit,
      googleRating: inputs.googleRating,
      googleReviewCount: inputs.googleReviewCount,
      leaseYearsRemaining: inputs.leaseYearsRemaining,
      numberOfStations: inputs.numberOfStations,
    };

    const calculationResult = calculateSalonValuation(completeInputs);
    setResult(calculationResult);
    setShowSheet(true);
    setShowMiniBar(true);
    
    // Store in localStorage
    localStorage.setItem('lastValuation', JSON.stringify({
      low: calculationResult.low,
      high: calculationResult.high,
      base: calculationResult.base,
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
    <TooltipProvider>
      <Helmet>
        <title>Free Salon Worth Calculator | Value Your Nail Salon Business | EmviApp</title>
        <meta 
          name="description" 
          content="Calculate your salon's market value using industry-standard SDE methodology. Get a free professional valuation based on profit, location, reviews, and market data."
        />
        <meta name="keywords" content="salon valuation, nail salon worth, business calculator, salon for sale, beauty business value, SDE valuation" />
        <link rel="canonical" href="https://www.emvi.app/salon-worth" />
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How does the salon valuation calculator work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our calculator uses SDE (Seller's Discretionary Earnings) methodology, the industry standard for valuing small businesses. We apply a multiple to your annual profit based on location, business age, reputation, and lease security."
                }
              },
              {
                "@type": "Question",
                "name": "Is this valuation legally binding?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, this is an estimate based on market data and industry standards. Actual sale prices vary based on negotiation, landlord approval, and market timing. For a formal appraisal, consult a licensed business broker."
                }
              },
              {
                "@type": "Question",
                "name": "What factors affect my salon's value?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Key factors include: monthly profit (not just revenue), location tier, years in business, loyal client base, Google reviews, and remaining lease term. Premium locations like NYC or LA can increase value by 40%."
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
        <section className="bg-gradient-to-br from-white via-purple-50 to-pink-50 py-16 md:py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-pink-100/20" />
          
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-tight">
                💰 Calculate Your Salon's Worth
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 font-medium max-w-2xl mx-auto">
                Get a realistic estimate using industry-standard SDE methodology. Based on profit, not just revenue.
              </p>
            </div>
            
            {/* Calculator Form */}
            <form onSubmit={handleCalculate} className="bg-white rounded-2xl shadow-2xl border-2 border-purple-100 p-6 md:p-8 space-y-6">
              
              {/* Error Display */}
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-semibold text-red-800 mb-2">Please fix the following:</p>
                  <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                    {errors.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Row 1: Revenue & Profit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Monthly Revenue */}
                <div className="space-y-2">
                  <Label htmlFor="revenue" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-purple-600" />
                    Monthly Revenue *
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Average gross revenue per month</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="revenue"
                      type="number"
                      placeholder="50,000"
                      value={inputs.monthlyRevenue || ''}
                      onChange={(e) => updateInput('monthlyRevenue', e.target.value ? Number(e.target.value) : undefined)}
                      className="pl-8"
                      min={0}
                      max={1000000}
                      required
                    />
                  </div>
                </div>

                {/* Profit Mode Selection */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    Profit Estimate *
                  </Label>
                  <Select
                    value={inputs.profitMarginChoice || 'NORMAL'}
                    onValueChange={(value: ProfitMarginChoice) => updateInput('profitMarginChoice', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select profit level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low (≈18% margin)</SelectItem>
                      <SelectItem value="NORMAL">Normal (≈28% margin)</SelectItem>
                      <SelectItem value="HIGH">High (≈38% margin)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Profit after rent, payroll, supplies</p>
                </div>
              </div>

              {/* Row 2: Location & Years */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    City or ZIP Code *
                  </Label>
                  <div className="relative">
                    <Input
                      id="location"
                      type="text"
                      placeholder="e.g. 90210 or Los Angeles"
                      value={inputs.location || ''}
                      onChange={(e) => updateInput('location', e.target.value)}
                      className="pr-12"
                      required
                      disabled={isLocating}
                    />
                    <button
                      type="button"
                      onClick={handleUseLocation}
                      disabled={isLocating}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-full transition-colors"
                      aria-label="Use my location"
                    >
                      {isLocating ? (
                        <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                      ) : (
                        <MapPin className="w-4 h-4 text-muted-foreground hover:text-purple-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Years in Business */}
                <div className="space-y-2">
                  <Label htmlFor="years" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    Years in Business *
                  </Label>
                  <Select
                    value={inputs.yearsInBusiness?.toString() || ''}
                    onValueChange={(value) => updateInput('yearsInBusiness', Number(value))}
                  >
                    <SelectTrigger id="years">
                      <SelectValue placeholder="Select years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Less than 1 year</SelectItem>
                      <SelectItem value="1">1-2 years</SelectItem>
                      <SelectItem value="3">3-5 years</SelectItem>
                      <SelectItem value="6">6-9 years</SelectItem>
                      <SelectItem value="10">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 3: Loyal Clients & Stations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Loyal Client Base */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-pink-600" />
                    Loyal Client Base *
                  </Label>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                    <span className="text-sm">Do you have repeat customers?</span>
                    <Switch
                      checked={inputs.hasLoyalClientBase || false}
                      onCheckedChange={(checked) => updateInput('hasLoyalClientBase', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Regular clients who book monthly+</p>
                </div>

                {/* Number of Stations */}
                <div className="space-y-2">
                  <Label htmlFor="stations" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-600" />
                    Number of Stations
                  </Label>
                  <Input
                    id="stations"
                    type="number"
                    placeholder="e.g. 8"
                    value={inputs.numberOfStations || ''}
                    onChange={(e) => updateInput('numberOfStations', e.target.value ? Number(e.target.value) : undefined)}
                    min={0}
                    max={50}
                  />
                </div>
              </div>

              {/* Row 4: Optional - Google Reviews */}
              <div className="space-y-3 p-4 bg-purple-50/50 rounded-lg border border-purple-100">
                <div className="flex items-center gap-2 text-sm font-medium text-purple-800">
                  <Star className="w-4 h-4" />
                  Optional: Google Reviews (improves accuracy)
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="rating" className="text-xs">Rating (0-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      placeholder="4.8"
                      value={inputs.googleRating || ''}
                      onChange={(e) => updateInput('googleRating', e.target.value ? Number(e.target.value) : undefined)}
                      min={0}
                      max={5}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="reviews" className="text-xs">Total Reviews</Label>
                    <Input
                      id="reviews"
                      type="number"
                      placeholder="250"
                      value={inputs.googleReviewCount || ''}
                      onChange={(e) => updateInput('googleReviewCount', e.target.value ? Number(e.target.value) : undefined)}
                      min={0}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                size="lg"
                disabled={isLocating}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
              >
                Calculate My Salon's Worth
              </Button>
              
              <p className="text-center text-sm text-muted-foreground">
                No signup required • Free instant estimate • Based on SDE methodology
              </p>
            </form>

            {/* Methodology Note */}
            <div className="mt-6 p-4 bg-white/80 rounded-lg border text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">How We Calculate</p>
              <p>
                We use <strong>SDE (Seller's Discretionary Earnings)</strong> methodology, the industry standard for valuing small businesses. 
                Your annual profit is multiplied by a factor (typically 1.2–3.5×) based on location tier, business maturity, 
                client loyalty, online reputation, and lease security. Actual sale prices may vary based on negotiation and market timing.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <FAQSection />
        </div>

        {/* Bottom Sheet */}
        {result && (
          <BottomSheet isOpen={showSheet} onClose={() => setShowSheet(false)}>
            <ValuationResultSheet 
              result={result}
              inputs={inputs as ValuationInputs}
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
    </TooltipProvider>
  );
};

export default SalonWorth;
