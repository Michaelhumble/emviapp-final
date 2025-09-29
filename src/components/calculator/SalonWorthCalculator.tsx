import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateSalonValuation, formatCurrency, type ValuationInputs } from '@/lib/valuation';
import { Building2, DollarSign, MapPin, Calendar, Star, HelpCircle, Mail, Loader2, TrendingUp, AlertCircle } from 'lucide-react';
import { ConfidenceMeter } from './ConfidenceMeter';
import { StickyResultBar } from './StickyResultBar';
import { ValuationChart } from './ValuationChart';
import { MarketComparison } from './MarketComparison';
import { SalesTimeline } from './SalesTimeline';
import { AnimatedValuationResult } from './AnimatedValuationResult';
import { UrgencyTimer } from './UrgencyTimer';
import { ComparisonSlider } from './ComparisonSlider';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const SalonWorthCalculator: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<ReturnType<typeof calculateSalonValuation> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [inputs, setInputs] = useState<ValuationInputs>({
    monthlyRevenue: 0,
    numberOfStations: 0,
    zipCode: '',
    leaseLength: 'long-term',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsCalculating(true);
    
    // Simulate calculation time for better UX
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const calculationResult = calculateSalonValuation(inputs);
    setResult(calculationResult);
    setShowEmailCapture(true);
    setIsCalculating(false);
    
    // Show sticky bar on mobile after a moment
    setTimeout(() => setShowStickyBar(true), 500);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.from('valuation_leads').insert({
        email,
        monthly_revenue: inputs.monthlyRevenue,
        number_of_stations: inputs.numberOfStations,
        zip_code: inputs.zipCode,
        lease_length: inputs.leaseLength,
        google_rating: inputs.googleRating,
        google_review_count: inputs.googleReviewCount,
        calculated_value_low: result?.low,
        calculated_value_high: result?.high,
        calculation_breakdown: result?.breakdown,
        user_id: user?.id,
      });
      
      toast.success('PDF Report Sent!', {
        description: 'Check your email for your detailed salon valuation report.',
      });
      
      setShowEmailCapture(false);
    } catch (error) {
      toast.error('Error', {
        description: 'Failed to send report. Please try again.',
      });
    }
  };

  const getConfidenceLevel = (): 'low' | 'medium' | 'high' => {
    let score = 2; // base score
    if (inputs.googleRating && inputs.googleReviewCount) score += 2;
    if (inputs.leaseLength) score += 1;
    
    if (score >= 4) return 'high';
    if (score >= 3) return 'medium';
    return 'low';
  };

  if (isCalculating) {
    return (
      <Card className="border-2 max-w-4xl mx-auto">
        <CardContent className="py-16">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-xl font-semibold">Calculating Your Salon's Worth...</p>
            <p className="text-muted-foreground">Analyzing market data and location factors</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-100 p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm font-semibold text-purple-900 mb-6 shadow-sm">
              Step 1 of 2
            </div>
            <h2 className="text-3xl font-bold mb-2">Calculate Your Salon's Value</h2>
            <p className="text-muted-foreground">
              Enter your salon details below to get an instant market valuation
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
              {/* Monthly Revenue */}
              <div className="space-y-2">
                <Label htmlFor="revenue" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Average Monthly Revenue
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Enter your average monthly revenue from the last 3 months</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="50000"
                  value={inputs.monthlyRevenue || ''}
                  onChange={(e) => setInputs({ ...inputs, monthlyRevenue: Number(e.target.value) })}
                  required
                  aria-label="Average monthly revenue"
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Typical range: $30K-$80K/month
                </p>
              </div>

              {/* Number of Stations */}
              <div className="space-y-2">
                <Label htmlFor="stations" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Number of Nail Stations
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Total number of nail stations/chairs in your salon</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="stations"
                  type="number"
                  placeholder="10"
                  value={inputs.numberOfStations || ''}
                  onChange={(e) => setInputs({ ...inputs, numberOfStations: Number(e.target.value) })}
                  required
                  aria-label="Number of nail stations"
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Each station adds ~$15K to value
                </p>
              </div>

              {/* Zip Code */}
              <div className="space-y-2">
                <Label htmlFor="zipCode" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Zip Code
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Location affects valuation—high-demand areas get a premium</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="zipCode"
                  type="text"
                  placeholder="92704"
                  value={inputs.zipCode}
                  onChange={(e) => setInputs({ ...inputs, zipCode: e.target.value })}
                  required
                  maxLength={5}
                  aria-label="Zip code"
                />
              </div>

              {/* Lease Length */}
              <div className="space-y-2">
                <Label htmlFor="lease" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Remaining Lease Term
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Longer lease terms increase salon value</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Select
                  value={inputs.leaseLength}
                  onValueChange={(value: 'short-term' | 'long-term') => 
                    setInputs({ ...inputs, leaseLength: value })
                  }
                >
                  <SelectTrigger id="lease">
                    <SelectValue placeholder="Select lease length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short-term">Short-term (less than 2 years)</SelectItem>
                    <SelectItem value="long-term">Long-term (2+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Google Reviews (Optional) */}
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-dashed">
                <div className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Optional: Google Reviews</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Providing this improves accuracy by 15-20%
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating" className="text-sm">Average Rating</Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      placeholder="4.8"
                      value={inputs.googleRating || ''}
                      onChange={(e) => setInputs({ ...inputs, googleRating: Number(e.target.value) })}
                      aria-label="Google average rating"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reviewCount" className="text-sm">Total Reviews</Label>
                    <Input
                      id="reviewCount"
                      type="number"
                      placeholder="250"
                      value={inputs.googleReviewCount || ''}
                      onChange={(e) => setInputs({ ...inputs, googleReviewCount: Number(e.target.value) })}
                      aria-label="Google review count"
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
              >
                Calculate My Salon's Worth
              </Button>
            </form>

            {/* Results */}
            {result && (
              <div className="mt-8 space-y-6 animate-fade-in">
                {/* Confidence Meter */}
                <ConfidenceMeter level={getConfidenceLevel()} />

                {/* Animated Main Result */}
                <AnimatedValuationResult 
                  low={result.low} 
                  high={result.high} 
                  base={result.base}
                />

                {/* Comparison Slider */}
                <ComparisonSlider userValue={result.base} />

                {/* Visual Breakdown & Market Comparison */}
                <div className="grid md:grid-cols-2 gap-6">
                  <ValuationChart breakdown={result.breakdown} />
                  <MarketComparison valuationBase={result.base} />
                </div>

                {/* How We Calculated */}
                <Card className="p-8 md:p-10 bg-gradient-to-br from-purple-50/50 to-pink-50/50 border border-purple-100">
                  <h4 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">How We Calculated It</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-white/80 shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 text-white text-xl">
                        💰
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-lg mb-1">Revenue Multiple</div>
                        <div className="text-sm text-muted-foreground mb-2">2.5× average monthly revenue</div>
                        <div className="text-xl font-bold text-purple-600">{formatCurrency(result.breakdown.revenueMultiple)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-white/80 shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 text-white text-xl">
                        🪑
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-lg mb-1">Assets & Stations</div>
                        <div className="text-sm text-muted-foreground mb-2">$15k per station</div>
                        <div className="text-xl font-bold text-purple-600">{formatCurrency(result.breakdown.stationValue)}</div>
                      </div>
                    </div>
                    
                    {result.breakdown.locationAdjustment !== 0 && (
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-green-50 border-2 border-green-200 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 text-white text-xl">
                          📍
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg mb-1 text-green-900">Location Premium</div>
                          <div className="text-sm text-green-700 mb-2">High-demand area boost</div>
                          <div className="text-xl font-bold text-green-600">
                            +{formatCurrency(result.breakdown.locationAdjustment)}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {result.breakdown.reviewsAdjustment !== 0 && (
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-green-50 border-2 border-green-200 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 text-white text-xl">
                          ⭐
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg mb-1 text-green-900">Reputation Value</div>
                          <div className="text-sm text-green-700 mb-2">Strong online presence</div>
                          <div className="text-xl font-bold text-green-600">
                            +{formatCurrency(result.breakdown.reviewsAdjustment)}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {result.breakdown.leaseAdjustment !== 0 && (
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border-2 border-red-200 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center flex-shrink-0 text-white text-xl">
                          📋
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg mb-1 text-red-900">Lease Adjustment</div>
                          <div className="text-sm text-red-700 mb-2">Short remaining term</div>
                          <div className="text-xl font-bold text-red-600">
                            {formatCurrency(result.breakdown.leaseAdjustment)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Sales Timeline */}
                <SalesTimeline />

                {/* CTAs */}
                <div className="space-y-4 pt-4">
                  {/* Urgency Timer */}
                  <UrgencyTimer />
                  
                  <Button 
                    onClick={() => window.location.href = 'https://emviapp-final.lovable.app/post-job?industry=nails'}
                    size="lg" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg animate-pulse"
                  >
                    🚀 List My Salon Free (12 Months Premium)
                  </Button>
                  
                  {showEmailCapture ? (
                    <form onSubmit={handleEmailSubmit} className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 h-12"
                        aria-label="Email address for PDF report"
                      />
                      <Button type="submit" variant="outline" className="whitespace-nowrap border-2 border-purple-300 hover:bg-purple-50 font-semibold h-12">
                        <Mail className="w-4 h-4 mr-2" />
                        Email PDF Report
                      </Button>
                    </form>
                  ) : (
                    <Button 
                      onClick={() => setShowEmailCapture(true)}
                      variant="outline" 
                      size="lg"
                      className="w-full border-2 border-purple-300 hover:bg-purple-50 font-semibold py-6 rounded-xl text-lg"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email Me My PDF Report
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

        {/* Sticky Mobile Bar */}
        <StickyResultBar 
          low={result?.low || 0} 
          high={result?.high || 0} 
          show={showStickyBar && result !== null}
        />
      </div>
    </TooltipProvider>
  );
};
