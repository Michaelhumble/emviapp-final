import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateSalonValuation, formatCurrency, type ValuationInputs } from '@/lib/valuation';
import { Building2, DollarSign, MapPin, Calendar, Star, HelpCircle, Mail, Loader2 } from 'lucide-react';
import { ConfidenceMeter } from './ConfidenceMeter';
import { StickyResultBar } from './StickyResultBar';
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
      <div className="max-w-4xl mx-auto">
        <Card className="border-2">
          <CardHeader>
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-2">
              Step 1 of 2
            </div>
            <CardTitle className="text-2xl">Calculate Your Salon's Value</CardTitle>
            <CardDescription>
              Enter your salon details below to get an instant market valuation
            </CardDescription>
          </CardHeader>
          <CardContent>
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

              <Button type="submit" size="lg" className="w-full">
                Calculate My Salon's Worth
              </Button>
            </form>

            {/* Results */}
            {result && (
              <div className="mt-8 space-y-6 animate-fade-in">
                {/* Confidence Meter */}
                <ConfidenceMeter level={getConfidenceLevel()} />

                {/* Main Result */}
                <div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border-2 border-primary/20 text-center">
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                    Step 2 of 2: Your Estimate
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Your Salon is Worth</h3>
                  <p className="text-5xl font-bold text-primary mb-2">
                    {formatCurrency(result.low)} – {formatCurrency(result.high)}
                  </p>
                  <p className="text-muted-foreground">
                    Mid-point estimate: {formatCurrency(result.base)}
                  </p>
                </div>

                {/* How We Calculated */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">How We Calculated It</h4>
                  
                  <div className="grid gap-3">
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">Revenue Multiple</div>
                        <div className="text-sm text-muted-foreground">2.5× average monthly revenue</div>
                      </div>
                      <span className="font-bold text-lg">{formatCurrency(result.breakdown.revenueMultiple)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">Assets & Stations</div>
                        <div className="text-sm text-muted-foreground">$15k per station</div>
                      </div>
                      <span className="font-bold text-lg">{formatCurrency(result.breakdown.stationValue)}</span>
                    </div>
                    
                    {result.breakdown.locationAdjustment !== 0 && (
                      <div className="flex justify-between items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div>
                          <div className="font-medium text-green-900">Location Premium</div>
                          <div className="text-sm text-green-700">High-demand area boost</div>
                        </div>
                        <span className="font-bold text-lg text-green-600">
                          +{formatCurrency(result.breakdown.locationAdjustment)}
                        </span>
                      </div>
                    )}
                    
                    {result.breakdown.reviewsAdjustment !== 0 && (
                      <div className="flex justify-between items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div>
                          <div className="font-medium text-green-900">Reputation Value</div>
                          <div className="text-sm text-green-700">Strong online presence</div>
                        </div>
                        <span className="font-bold text-lg text-green-600">
                          +{formatCurrency(result.breakdown.reviewsAdjustment)}
                        </span>
                      </div>
                    )}
                    
                    {result.breakdown.leaseAdjustment !== 0 && (
                      <div className="flex justify-between items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div>
                          <div className="font-medium text-red-900">Lease Adjustment</div>
                          <div className="text-sm text-red-700">Short remaining term</div>
                        </div>
                        <span className="font-bold text-lg text-red-600">
                          {formatCurrency(result.breakdown.leaseAdjustment)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-4 pt-4">
                  <Button 
                    onClick={() => navigate('/salons/post')}
                    size="lg" 
                    className="w-full text-lg h-14"
                  >
                    List My Salon (Free for 12 Months)
                  </Button>
                  
                  {showEmailCapture ? (
                    <form onSubmit={handleEmailSubmit} className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1"
                        aria-label="Email address for PDF report"
                      />
                      <Button type="submit" variant="outline" className="whitespace-nowrap">
                        <Mail className="w-4 h-4 mr-2" />
                        Email PDF Report
                      </Button>
                    </form>
                  ) : (
                    <Button 
                      onClick={() => setShowEmailCapture(true)}
                      variant="outline" 
                      size="lg"
                      className="w-full"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email Me My PDF Report
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

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
