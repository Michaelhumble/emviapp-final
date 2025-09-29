import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculateSalonValuation, formatCurrency, ValuationInputs, ValuationResult } from '@/lib/valuation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TrendingUp, MapPin, Star, Calendar, DollarSign } from 'lucide-react';

export const SalonWorthCalculator = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'input' | 'lead' | 'result'>('input');
  const [inputs, setInputs] = useState<ValuationInputs>({
    monthlyRevenue: 0,
    numberOfStations: 0,
    zipCode: '',
    leaseLength: 'long-term',
    googleRating: undefined,
    googleReviewCount: undefined
  });
  const [leadData, setLeadData] = useState({ email: '', phone: '' });
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCalculate = () => {
    if (!inputs.monthlyRevenue || !inputs.numberOfStations || !inputs.zipCode) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const valuation = calculateSalonValuation(inputs);
    setResult(valuation);
    setStep('lead');
  };

  const handleLeadSubmit = async () => {
    if (!leadData.email) {
      toast.error('Please enter your email');
      return;
    }

    if (!result) return;

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from('valuation_leads').insert({
        email: leadData.email,
        phone: leadData.phone,
        monthly_revenue: inputs.monthlyRevenue,
        number_of_stations: inputs.numberOfStations,
        zip_code: inputs.zipCode,
        lease_length: inputs.leaseLength,
        google_rating: inputs.googleRating,
        google_review_count: inputs.googleReviewCount,
        calculated_value_low: result.low,
        calculated_value_high: result.high,
        calculation_breakdown: result.breakdown,
        user_id: user?.id
      });

      if (error) throw error;

      setStep('result');
      toast.success('Valuation calculated successfully!');
    } catch (error) {
      console.error('Error saving lead:', error);
      toast.error('Failed to save your information');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'result' && result) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Your Salon is Worth
            </h2>
            <div className="text-5xl md:text-6xl font-bold text-primary">
              {formatCurrency(result.low)} – {formatCurrency(result.high)}
            </div>
            <p className="text-muted-foreground text-lg">
              Based on current market conditions and your salon's characteristics
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-2xl font-semibold mb-6">Valuation Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="font-medium">Revenue Multiple (2.5×)</span>
              </div>
              <span className="font-semibold">{formatCurrency(result.breakdown.revenueMultiple)}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-medium">Station Value</span>
              </div>
              <span className="font-semibold">{formatCurrency(result.breakdown.stationValue)}</span>
            </div>

            {result.breakdown.locationAdjustment !== 0 && (
              <div className="flex justify-between items-center py-3 border-b">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Location Premium</span>
                </div>
                <span className="font-semibold text-green-600">
                  +{formatCurrency(result.breakdown.locationAdjustment)}
                </span>
              </div>
            )}

            {result.breakdown.reviewsAdjustment !== 0 && (
              <div className="flex justify-between items-center py-3 border-b">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">Reviews Bonus</span>
                </div>
                <span className="font-semibold text-green-600">
                  +{formatCurrency(result.breakdown.reviewsAdjustment)}
                </span>
              </div>
            )}

            {result.breakdown.leaseAdjustment !== 0 && (
              <div className="flex justify-between items-center py-3 border-b">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">Short-term Lease Adjustment</span>
                </div>
                <span className="font-semibold text-orange-600">
                  {formatCurrency(result.breakdown.leaseAdjustment)}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center py-4 pt-6 border-t-2">
              <span className="text-xl font-bold">Estimated Value</span>
              <span className="text-2xl font-bold text-primary">{formatCurrency(result.base)}</span>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-primary/5 border-primary/20 text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to List Your Salon?</h3>
          <p className="text-muted-foreground mb-6">
            Reach thousands of qualified buyers on EmviApp's marketplace
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/salons/post')}
            className="w-full md:w-auto"
          >
            List Your Salon on EmviApp Today
          </Button>
        </Card>
      </div>
    );
  }

  if (step === 'lead') {
    return (
      <Card className="max-w-md mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">Get Your Free Valuation Report</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={leadData.email}
              onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={leadData.phone}
              onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
            />
          </div>
          <Button 
            onClick={handleLeadSubmit} 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Calculating...' : 'View My Valuation'}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            We'll email you a detailed report with your salon's estimated worth
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Calculate Your Salon's Worth</h2>
      <div className="space-y-6">
        <div>
          <Label htmlFor="revenue">Monthly Revenue *</Label>
          <Select
            value={inputs.monthlyRevenue.toString()}
            onValueChange={(value) => setInputs({ ...inputs, monthlyRevenue: parseInt(value) })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select monthly revenue range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10000">$10,000 - $15,000</SelectItem>
              <SelectItem value="20000">$15,000 - $25,000</SelectItem>
              <SelectItem value="30000">$25,000 - $35,000</SelectItem>
              <SelectItem value="45000">$35,000 - $50,000</SelectItem>
              <SelectItem value="60000">$50,000 - $75,000</SelectItem>
              <SelectItem value="87500">$75,000 - $100,000</SelectItem>
              <SelectItem value="125000">$100,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="stations">Number of Nail Stations *</Label>
          <Input
            id="stations"
            type="number"
            min="1"
            max="50"
            placeholder="e.g., 8"
            value={inputs.numberOfStations || ''}
            onChange={(e) => setInputs({ ...inputs, numberOfStations: parseInt(e.target.value) || 0 })}
          />
        </div>

        <div>
          <Label htmlFor="zipCode">Zip Code *</Label>
          <Input
            id="zipCode"
            type="text"
            maxLength={5}
            placeholder="e.g., 92704"
            value={inputs.zipCode}
            onChange={(e) => setInputs({ ...inputs, zipCode: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="lease">Lease Length *</Label>
          <Select
            value={inputs.leaseLength}
            onValueChange={(value: 'short-term' | 'long-term') => setInputs({ ...inputs, leaseLength: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="long-term">Long-term (3+ years)</SelectItem>
              <SelectItem value="short-term">Short-term (Less than 3 years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rating">Google Rating (Optional)</Label>
            <Input
              id="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="4.5"
              value={inputs.googleRating || ''}
              onChange={(e) => setInputs({ ...inputs, googleRating: parseFloat(e.target.value) || undefined })}
            />
          </div>
          <div>
            <Label htmlFor="reviews">Review Count (Optional)</Label>
            <Input
              id="reviews"
              type="number"
              min="0"
              placeholder="250"
              value={inputs.googleReviewCount || ''}
              onChange={(e) => setInputs({ ...inputs, googleReviewCount: parseInt(e.target.value) || undefined })}
            />
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full" size="lg">
          Calculate My Salon's Worth
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          * Required fields. All calculations are estimates based on market data.
        </p>
      </div>
    </Card>
  );
};
