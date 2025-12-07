import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateSalonValuation, validateValuationInputs, formatCurrency, getMultipleExplanation, type ValuationInputs, type ProfitMarginChoice } from '@/lib/valuation';
import { Building2, DollarSign, MapPin, Calendar, Star, HelpCircle, Mail, Loader2, TrendingUp, Users } from 'lucide-react';
import { ConfidenceMeter } from './ConfidenceMeter';
import { AnimatedValuationResult } from './AnimatedValuationResult';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const SalonWorthCalculator: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<ReturnType<typeof calculateSalonValuation> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  
  const [inputs, setInputs] = useState<Partial<ValuationInputs>>({
    monthlyRevenue: undefined,
    yearsInBusiness: undefined,
    hasLoyalClientBase: false,
    location: '',
    profitMode: 'estimate',
    profitMarginChoice: 'NORMAL',
    googleRating: undefined,
    googleReviewCount: undefined,
    numberOfStations: undefined,
  });

  const updateInput = (field: keyof ValuationInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateValuationInputs(inputs);
    if (!validation.valid) {
      setErrors(validation.errors);
      toast.error('Please fix the errors');
      return;
    }
    
    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const completeInputs: ValuationInputs = {
      monthlyRevenue: inputs.monthlyRevenue!,
      yearsInBusiness: inputs.yearsInBusiness!,
      hasLoyalClientBase: inputs.hasLoyalClientBase!,
      location: inputs.location || '',
      profitMode: inputs.profitMode || 'estimate',
      profitMarginChoice: inputs.profitMarginChoice,
      googleRating: inputs.googleRating,
      googleReviewCount: inputs.googleReviewCount,
      numberOfStations: inputs.numberOfStations,
    };
    
    const calculationResult = calculateSalonValuation(completeInputs);
    setResult(calculationResult);
    setShowEmailCapture(true);
    setIsCalculating(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from('valuation_leads').insert({
        email,
        monthly_revenue: inputs.monthlyRevenue || 0,
        number_of_stations: inputs.numberOfStations || 0,
        zip_code: inputs.location || '',
        lease_length: 'long-term',
        google_rating: inputs.googleRating,
        google_review_count: inputs.googleReviewCount,
        calculated_value_low: result?.low,
        calculated_value_high: result?.high,
        calculation_breakdown: result?.breakdown as any,
        user_id: user?.id,
      });
      toast.success('PDF Report Sent!');
      setShowEmailCapture(false);
    } catch (error) {
      toast.error('Failed to send report');
    }
  };

  const getConfidenceLevel = (): 'low' | 'medium' | 'high' => {
    let score = 2;
    if (inputs.googleRating && inputs.googleReviewCount) score += 2;
    if (inputs.yearsInBusiness && inputs.yearsInBusiness >= 3) score += 1;
    if (score >= 4) return 'high';
    if (score >= 3) return 'medium';
    return 'low';
  };

  if (isCalculating) {
    return (
      <div className="border-2 max-w-4xl mx-auto rounded-2xl bg-card p-16">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-xl font-semibold">Calculating Your Salon's Worth...</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-100 p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Calculate Your Salon's Value</h2>
            <p className="text-muted-foreground">Using SDE methodology for accurate estimates</p>
          </div>
          
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <ul className="list-disc list-inside text-sm text-red-700">
                {errors.map((error, i) => <li key={i}>{error}</li>)}
              </ul>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="revenue" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Monthly Revenue *
                </Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="50000"
                  value={inputs.monthlyRevenue || ''}
                  onChange={(e) => updateInput('monthlyRevenue', e.target.value ? Number(e.target.value) : undefined)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Profit Level *
                </Label>
                <Select
                  value={inputs.profitMarginChoice || 'NORMAL'}
                  onValueChange={(v: ProfitMarginChoice) => updateInput('profitMarginChoice', v)}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low (≈18%)</SelectItem>
                    <SelectItem value="NORMAL">Normal (≈28%)</SelectItem>
                    <SelectItem value="HIGH">High (≈38%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> City or ZIP *
                </Label>
                <Input
                  id="location"
                  placeholder="90210"
                  value={inputs.location || ''}
                  onChange={(e) => updateInput('location', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Years in Business *
                </Label>
                <Select
                  value={inputs.yearsInBusiness?.toString() || ''}
                  onValueChange={(v) => updateInput('yearsInBusiness', Number(v))}
                >
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Less than 1 year</SelectItem>
                    <SelectItem value="2">1-3 years</SelectItem>
                    <SelectItem value="5">3-7 years</SelectItem>
                    <SelectItem value="10">7+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> Loyal Client Base *
                </Label>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Repeat customers?</span>
                  <Switch
                    checked={inputs.hasLoyalClientBase || false}
                    onCheckedChange={(c) => updateInput('hasLoyalClientBase', c)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stations" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Stations
                </Label>
                <Input
                  id="stations"
                  type="number"
                  placeholder="8"
                  value={inputs.numberOfStations || ''}
                  onChange={(e) => updateInput('numberOfStations', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="rating" className="text-sm flex items-center gap-1">
                  <Star className="w-3 h-3" /> Google Rating
                </Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="4.8"
                  value={inputs.googleRating || ''}
                  onChange={(e) => updateInput('googleRating', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="reviews" className="text-sm">Reviews</Label>
                <Input
                  id="reviews"
                  type="number"
                  placeholder="250"
                  value={inputs.googleReviewCount || ''}
                  onChange={(e) => updateInput('googleReviewCount', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 text-lg">
              Calculate My Salon's Worth
            </Button>
          </form>

          {result && (
            <div className="mt-8 space-y-6 animate-fade-in">
              <ConfidenceMeter level={getConfidenceLevel()} />
              <AnimatedValuationResult low={result.low} high={result.high} base={result.base} />
              
              <div className="p-6 bg-purple-50 rounded-xl">
                <h4 className="font-bold mb-3">Calculation Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Annual SDE</span><span className="font-bold">{formatCurrency(result.breakdown.annualSDE)}</span></div>
                  <div className="flex justify-between"><span>Final Multiple</span><span className="font-bold">{result.breakdown.finalMultiple}×</span></div>
                  <div className="flex justify-between"><span>Location</span><span>{result.breakdown.locationAreaName} (Tier {result.breakdown.locationTier})</span></div>
                  {result.breakdown.assetsAdded > 0 && (
                    <div className="flex justify-between"><span>Assets</span><span className="font-bold text-green-600">+{formatCurrency(result.breakdown.assetsAdded)}</span></div>
                  )}
                </div>
              </div>

              <Button onClick={() => navigate('/sell-salon')} size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-6 text-lg">
                🚀 List My Salon Free
              </Button>
              
              {showEmailCapture && (
                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                  <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-1" />
                  <Button type="submit" variant="outline"><Mail className="w-4 h-4 mr-2" />Email PDF</Button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};
