
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { Dispatch, SetStateAction } from 'react';
import { Check, Star, Shield, Heart } from 'lucide-react';

interface SalonPricingSectionProps {
  options: SalonPricingOptions;
  onOptionsChange: Dispatch<SetStateAction<SalonPricingOptions>>;
  isNationwide: boolean;
  fastSalePackage: boolean;
}

const SalonPricingSection: React.FC<SalonPricingSectionProps> = ({
  options,
  onOptionsChange,
  isNationwide,
  fastSalePackage
}) => {
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [featuredBoost, setFeaturedBoost] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const pricingPlans = [
    { 
      months: 1, 
      price: 24.99, 
      originalPrice: 24.99, 
      savings: 0,
      popular: false 
    },
    { 
      months: 6, 
      price: 120, 
      originalPrice: 149.94, 
      savings: 30,
      popular: true 
    },
    { 
      months: 12, 
      price: 249.99, 
      originalPrice: 299.88, 
      savings: 50,
      popular: false 
    }
  ];

  const calculateTotal = () => {
    const selectedPlan = pricingPlans.find(plan => plan.months === selectedDuration);
    const basePrice = selectedPlan?.price || 24.99;
    const featuredCost = featuredBoost ? 25 : 0;
    return basePrice + featuredCost;
  };

  const handleDurationSelect = (months: number) => {
    setSelectedDuration(months);
    onOptionsChange(prev => ({ 
      ...prev, 
      durationMonths: months 
    }));
  };

  const handleFeaturedToggle = (checked: boolean) => {
    setFeaturedBoost(checked);
    onOptionsChange(prev => ({ 
      ...prev, 
      featuredBoost: checked 
    }));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Listing Plan</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join thousands of successful salon owners who trust EmviApp to connect with the Vietnamese community
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-emerald-600">
          <Shield className="w-4 h-4" />
          <span>Trusted by 10,000+ Vietnamese business owners</span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.months}
            className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedDuration === plan.months 
                ? 'ring-2 ring-purple-500 shadow-lg' 
                : 'border-gray-200'
            } ${plan.popular ? 'transform scale-105' : ''}`}
            onClick={() => handleDurationSelect(plan.months)}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl font-semibold">
                {plan.months} Month{plan.months > 1 ? 's' : ''}
              </CardTitle>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-purple-600">
                  ${plan.price}
                </div>
                {plan.savings > 0 && (
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 line-through">
                      ${plan.originalPrice}
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Save ${plan.savings}
                    </Badge>
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  ${(plan.price / plan.months).toFixed(2)}/month
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Premium listing visibility</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Vietnamese community reach</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Professional listing support</span>
                </li>
                {plan.months >= 6 && (
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Priority customer support</span>
                  </li>
                )}
                {plan.months >= 12 && (
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Free listing optimization</span>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Boost Upsell */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Featured Boost - Get Noticed Faster
              </h3>
              <p className="text-gray-700 mb-4">
                Sell your salon 3x faster with premium placement. Your listing appears at the top of search results, 
                giving you maximum exposure to serious buyers in the Vietnamese community.
              </p>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="featured-boost"
                  checked={featuredBoost}
                  onCheckedChange={(checked) => handleFeaturedToggle(checked === true)}
                />
                <label htmlFor="featured-boost" className="text-lg font-medium cursor-pointer">
                  Add Featured Boost for +$25
                </label>
                <Badge className="bg-amber-100 text-amber-800">
                  Recommended
                </Badge>
              </div>
              <div className="mt-2 text-sm text-gray-600 flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Loved by successful salon sellers</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust Building Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <div className="text-center space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Peace of Mind Guarantee
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Our platform has helped Vietnamese salon owners successfully sell their businesses for over 5 years. 
            We understand your needs and provide the support you deserve during this important transition.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600 pt-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Community trusted</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Proven results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Total */}
      <div className="space-y-6">
        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
          />
          <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
            I agree to the <a href="#" className="text-purple-600 hover:underline">Terms of Service</a> and 
            <a href="#" className="text-purple-600 hover:underline ml-1">Privacy Policy</a>. 
            I understand that my listing will be published immediately after payment and will remain active 
            for the selected duration.
          </label>
        </div>

        {/* Payment Summary & CTA */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-900">
                  Ready to Publish Your Listing?
                </h3>
                <p className="text-gray-600 mt-1">
                  Join the Vietnamese business community today
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  Total: ${calculateTotal().toFixed(2)}
                </div>
                <Button 
                  size="lg"
                  disabled={!termsAccepted}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold"
                >
                  Pay ${calculateTotal().toFixed(2)} & Publish Listing
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalonPricingSection;
