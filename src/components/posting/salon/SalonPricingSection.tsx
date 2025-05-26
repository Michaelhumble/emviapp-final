
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Zap, Shield, ArrowRight } from 'lucide-react';
import { SalonPricingOptions, calculateSalonPostPrice } from '@/utils/posting/salonPricing';

interface SalonPricingSectionProps {
  onProceedToPayment: (options: SalonPricingOptions) => void;
}

const SalonPricingSection = ({ onProceedToPayment }: SalonPricingSectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<1 | 6 | 12>(1);
  const [featuredBoost, setFeaturedBoost] = useState(false);

  const plans = [
    {
      duration: 1 as const,
      label: '1 Month',
      price: 24.99,
      description: 'Live instantly, cancel anytime',
      badge: null
    },
    {
      duration: 6 as const,
      label: '6 Months',
      price: 120,
      originalPrice: 149.94,
      description: 'Save 20%, best for most sellers',
      badge: 'Popular',
      savings: '20%'
    },
    {
      duration: 12 as const,
      label: '12 Months',
      price: 250,
      originalPrice: 299.88,
      description: 'Best value, patient sellers',
      badge: 'Best Value',
      savings: '17%'
    }
  ];

  const selectedPlanData = plans.find(p => p.duration === selectedPlan)!;
  
  const pricingOptions: SalonPricingOptions = {
    selectedPricingTier: 'standard',
    durationMonths: selectedPlan,
    featuredBoost,
    autoRenew: false,
    isNationwide: false,
    isFirstPost: false,
    showAtTop: false,
    fastSalePackage: false,
    jobPostBundle: false,
    bundleWithJobPost: false,
    isRenewal: false,
    hasReferrals: false
  };

  const totalPrice = calculateSalonPostPrice(pricingOptions);

  const handleProceed = () => {
    onProceedToPayment(pricingOptions);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-playfair font-bold text-gray-900">
          Sell Your Salon, Stress-Free
        </h2>
        <p className="text-lg text-gray-600 italic">
          No commissions. No contracts. Just peace of mind and real buyers.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.duration}
            className={`relative cursor-pointer transition-all duration-200 ${
              selectedPlan === plan.duration 
                ? 'ring-2 ring-purple-500 shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedPlan(plan.duration)}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className={`
                  ${plan.badge === 'Popular' ? 'bg-blue-500' : 'bg-green-500'}
                  text-white px-3 py-1
                `}>
                  {plan.badge}
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">{plan.label}</CardTitle>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900">
                  ${plan.price}
                </div>
                {plan.originalPrice && (
                  <div className="text-sm text-gray-500">
                    <span className="line-through">${plan.originalPrice}</span>
                    <span className="ml-2 text-green-600 font-medium">
                      Save {plan.savings}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-center justify-center">
                <div className={`
                  w-4 h-4 rounded-full border-2 flex items-center justify-center
                  ${selectedPlan === plan.duration 
                    ? 'border-purple-500 bg-purple-500' 
                    : 'border-gray-300'
                  }
                `}>
                  {selectedPlan === plan.duration && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Boost */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="featuredBoost"
              checked={featuredBoost}
              onCheckedChange={(checked) => setFeaturedBoost(checked === true)}
            />
            <div className="flex-1">
              <Label htmlFor="featuredBoost" className="text-lg font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                Featured Boost
                <Badge variant="secondary">+$25</Badge>
              </Label>
              <p className="text-gray-600 mt-1">
                <strong>Need extra visibility?</strong> Upgrade to a Featured Listing for just{' '}
                <strong>$25 more</strong> — available on any plan.
              </p>
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  Boosted visibility, sell faster
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  Featured listings appear at the top
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  Sent to our private buyers list
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonial */}
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <div className="flex justify-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <blockquote className="text-lg italic text-gray-700">
          "I listed and sold my salon in 3 weeks. The process was safe and easy."
        </blockquote>
        <cite className="text-sm text-gray-500 mt-2 block">— Mai, San Jose</cite>
      </div>

      {/* Why Choose EmviApp */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Why Choose EmviApp</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>No agent commissions (keep all your sale proceeds!)</span>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>Verified buyers only—no spam, no time wasters</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>List in 2 minutes, pause/cancel anytime</span>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>Optional featured boost: reach 2x more buyers instantly</span>
          </div>
        </CardContent>
      </Card>

      {/* Comparison */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">How does this compare?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-blue-800">
          <div>
            • Salon agents typically charge <strong>10% of your sale price</strong> ($10,000 on a $100k sale)
          </div>
          <div>
            • With EmviApp: Just $24.99/month, no hidden fees, and you stay in control
          </div>
          <div className="font-semibold text-green-700">
            <strong>No brainer:</strong> Save thousands, sell with confidence!
          </div>
        </CardContent>
      </Card>

      {/* Total Price & CTA */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-600">Total Price</div>
              <div className="text-3xl font-bold text-purple-600">
                ${totalPrice.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                {selectedPlanData.label} • {featuredBoost ? 'With' : 'No'} Featured Boost
              </div>
            </div>
            <Button 
              onClick={handleProceed}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
            >
              {featuredBoost ? 'Feature My Listing & Sell Faster' : 'Get Started & List My Salon'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fine Print */}
      <div className="text-center space-y-2 text-sm text-gray-500">
        <p>
          <em>Most salons sell within 1–2 months. Pause or cancel your listing anytime — no risk, no stress.</em>
        </p>
        <p>
          <em>Featured listings appear at the top and get sent to our private buyers list.</em>
        </p>
        <p>
          <em>We never share your exact address or personal details without your approval.</em>
        </p>
      </div>

      {/* Support */}
      <div className="text-center">
        <p className="text-gray-600">
          Need help or have questions?{' '}
          <a href="#" className="text-purple-600 hover:underline font-medium">
            Contact our team
          </a>{' '}
          — We're here for you every step of the way.
        </p>
      </div>
    </div>
  );
};

export default SalonPricingSection;
