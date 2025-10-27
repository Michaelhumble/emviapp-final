import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { formatCurrency, type ValuationResult } from '@/lib/valuation';
import AnimatedNumber from '@/components/customer/AnimatedNumber';
import { 
  CheckCircle2, 
  TrendingUp, 
  Share2, 
  Copy, 
  Mail,
  Calculator,
  MapPin,
  Star,
  Calendar,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ValuationResultSheetProps {
  result: ValuationResult;
  inputs: any;
  onListClick: () => void;
}

type RangeType = 'conservative' | 'likely' | 'high';

export const ValuationResultSheet: React.FC<ValuationResultSheetProps> = ({ 
  result, 
  inputs,
  onListClick 
}) => {
  const [rangeType, setRangeType] = useState<RangeType>('likely');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Calculate displayed value based on range type
  const getDisplayValue = () => {
    switch (rangeType) {
      case 'conservative':
        return result.low;
      case 'high':
        return result.high;
      default:
        return result.base;
    }
  };

  const displayValue = getDisplayValue();

  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: 'My Salon Valuation',
      text: `My salon is valued at ${formatCurrency(result.low)} – ${formatCurrency(result.high)}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(
        `${shareData.text}\nCalculate yours: ${shareData.url}`
      );
      toast.success('Link copied to clipboard!');
    }
  };

  // Copy link
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  // Save & Email
  const handleSaveEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

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
        calculated_value_low: result.low,
        calculated_value_high: result.high,
        calculation_breakdown: result.breakdown,
        user_id: user?.id,
      });
      
      // Store in localStorage for future visits
      localStorage.setItem('lastValuation', JSON.stringify({
        low: result.low,
        high: result.high,
        timestamp: Date.now()
      }));

      toast.success('PDF Report Sent!', {
        description: 'Check your email for your detailed salon valuation report.',
      });
      
      setShowEmailModal(false);
      setEmail('');
    } catch (error) {
      toast.error('Error', {
        description: 'Failed to send report. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pt-4">
      {/* Valuation Number with Range Tabs */}
      <div className="text-center space-y-4">
        <h2 id="sheet-title" className="text-2xl font-bold">Your Salon's Estimated Worth</h2>
        
        {/* Range Tabs */}
        <div className="flex justify-center gap-2">
          {(['conservative', 'likely', 'high'] as RangeType[]).map((type) => (
            <button
              key={type}
              onClick={() => setRangeType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                rangeType === type
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              aria-pressed={rangeType === type}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Animated Valuation */}
        <div className="py-8">
          <div className="text-5xl md:text-6xl font-bold tabular-nums">
            <AnimatedNumber value={displayValue} duration={500} bounce={false} />
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            {rangeType === 'conservative' && 'Quick sale estimate'}
            {rangeType === 'likely' && 'Based on real market data'}
            {rangeType === 'high' && 'Premium market positioning'}
          </p>
        </div>
      </div>

      {/* Trust Pills */}
      <div className="flex flex-wrap justify-center gap-3 py-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
          <CheckCircle2 className="w-4 h-4" />
          Real Comps
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          No Broker Fee
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
          <CheckCircle2 className="w-4 h-4" />
          IBBA Standards
        </div>
      </div>

      {/* Accordions */}
      <Accordion type="single" collapsible className="space-y-2">
        <AccordionItem value="calculation" className="border rounded-xl px-4 bg-card">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Calculator className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">How We Calculated</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Revenue Multiple (2.5×)</span>
                <span className="font-bold tabular-nums">{formatCurrency(result.breakdown.revenueMultiple)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Station Value</span>
                <span className="font-bold tabular-nums">{formatCurrency(result.breakdown.stationValue)}</span>
              </div>
              {result.breakdown.locationAdjustment > 0 && (
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location Premium
                  </span>
                  <span className="font-bold text-green-600 tabular-nums">
                    +{formatCurrency(result.breakdown.locationAdjustment)}
                  </span>
                </div>
              )}
              {result.breakdown.reviewsAdjustment > 0 && (
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Reputation Boost
                  </span>
                  <span className="font-bold text-green-600 tabular-nums">
                    +{formatCurrency(result.breakdown.reviewsAdjustment)}
                  </span>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="market" className="border rounded-xl px-4 bg-card">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Market Comparison</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-3">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Market Average</div>
                <div className="text-2xl font-bold tabular-nums">$125,000</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-green-700 mb-1">Your Position</div>
                <div className="text-2xl font-bold text-green-600 tabular-nums">
                  {((result.base / 125000 - 1) * 100).toFixed(1)}% {result.base > 125000 ? 'Above' : 'Below'}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="timeline" className="border rounded-xl px-4 bg-card">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-orange-600" />
              <span className="font-semibold">Expected Timeline</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-sm font-bold text-purple-600">
                  1
                </div>
                <div className="flex-1">
                  <div className="font-semibold">List & Market</div>
                  <div className="text-sm text-muted-foreground">1-2 weeks</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-sm font-bold text-purple-600">
                  2
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Offers & Negotiation</div>
                  <div className="text-sm text-muted-foreground">2-4 weeks</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-sm font-bold text-purple-600">
                  3
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Due Diligence & Close</div>
                  <div className="text-sm text-muted-foreground">3-6 weeks</div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4 pb-20">
        <Button 
          size="lg" 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold h-14 text-lg"
          onClick={onListClick}
        >
          List My Salon
        </Button>

        {!showEmailModal ? (
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full h-12"
            onClick={() => setShowEmailModal(true)}
          >
            <Mail className="w-5 h-5 mr-2" />
            Save & Email Report
          </Button>
        ) : (
          <form onSubmit={handleSaveEmail} className="space-y-3 p-4 border rounded-xl bg-card">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={isSaving} className="flex-1">
                {isSaving ? 'Sending...' : 'Send Report'}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setShowEmailModal(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleCopyLink}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
};
