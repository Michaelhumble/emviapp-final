
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Users, TrendingUp } from 'lucide-react';
import { SalonPricingOptions, calculateSalonPostPrice, getSalonPostPricingSummary } from '@/utils/posting/salonPricing';

interface SalonPricingSectionProps {
  options: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  isNationwide: boolean;
  fastSalePackage: boolean;
}

const SalonPricingSection: React.FC<SalonPricingSectionProps> = ({
  options,
  onOptionsChange,
  isNationwide,
  fastSalePackage
}) => {
  const handleOptionChange = (option: keyof SalonPricingOptions, value: boolean) => {
    const updatedOptions = {
      ...options,
      [option]: value
    };
    onOptionsChange(updatedOptions);
  };

  const pricingSummary = getSalonPostPricingSummary(options);
  
  const additionalFeatures = [
    {
      id: 'isNationwide' as keyof SalonPricingOptions,
      title: 'Nationwide Visibility',
      description: 'Reach buyers across all states, not just your local area',
      price: 15,
      icon: <Users className="w-5 h-5 text-blue-600" />,
      enabled: options.isNationwide
    },
    {
      id: 'autoRenew' as keyof SalonPricingOptions,
      title: 'Auto-Renewal',
      description: 'Automatically renew your listing for continuous visibility',
      price: 0,
      discount: '5% off total',
      icon: <TrendingUp className="w-5 h-5 text-green-600" />,
      enabled: options.autoRenew
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Enhance Your Listing</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Add these premium features to maximize your salon's visibility and sell faster.
        </p>
      </div>

      {/* Selected Plan Summary */}
      <Card className="border-2 border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Selected Plan</span>
            <Badge className="bg-purple-600 text-white">
              {options.durationMonths === 1 ? 'Standard' : 
               options.durationMonths === 6 ? '6 Months' : 
               '12 Months'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-700">
                {options.durationMonths === 1 ? '30-day listing' : 
                 options.durationMonths === 6 ? '6-month listing with extended visibility' : 
                 '12-month premium listing with maximum exposure'}
              </p>
              {options.featuredBoost && (
                <p className="text-purple-700 font-medium mt-1">+ Featured Boost included</p>
              )}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ${pricingSummary.finalPrice}
              </div>
              {pricingSummary.discountAmount > 0 && (
                <div className="text-sm text-green-600">
                  Save ${pricingSummary.discountAmount}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Features */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Optional Add-ons</h3>
        
        {additionalFeatures.map((feature) => (
          <Card 
            key={feature.id}
            className={`cursor-pointer transition-all duration-200 ${
              feature.enabled ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
            }`}
            onClick={() => handleOptionChange(feature.id, !feature.enabled)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">{feature.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={feature.enabled}
                        onCheckedChange={(checked) => handleOptionChange(feature.id, checked === true)}
                      />
                      <Label className="text-lg font-medium cursor-pointer">
                        {feature.title}
                      </Label>
                      {feature.price > 0 && (
                        <Badge variant="outline">+${feature.price}</Badge>
                      )}
                      {feature.discount && (
                        <Badge className="bg-green-100 text-green-800">{feature.discount}</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mt-2 ml-6">{feature.description}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust and Security */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Shield className="w-8 h-8 text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Trusted by the Vietnamese Salon Community
              </h3>
              <p className="text-gray-700 mb-3">
                Over 10,000+ successful salon sales facilitated through our platform. Your listing will be seen 
                by serious buyers who understand the value of established nail salon businesses.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <span>Average sale in 45 days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Qualified buyer network</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Price Summary */}
      <Card className="border-2 border-gray-800 bg-gray-50">
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Base Plan ({options.durationMonths} month{options.durationMonths > 1 ? 's' : ''})</span>
              <span>${pricingSummary.basePrice * options.durationMonths}</span>
            </div>
            
            {options.featuredBoost && (
              <div className="flex justify-between text-gray-700">
                <span>Featured Boost</span>
                <span>+$25</span>
              </div>
            )}
            
            {options.isNationwide && (
              <div className="flex justify-between text-gray-700">
                <span>Nationwide Visibility</span>
                <span>+$15</span>
              </div>
            )}
            
            {pricingSummary.autoRenewDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Auto-Renewal Discount (5%)</span>
                <span>-${pricingSummary.autoRenewDiscount}</span>
              </div>
            )}
            
            {pricingSummary.discountAmount > 0 && pricingSummary.autoRenewDiscount === 0 && (
              <div className="flex justify-between text-green-600">
                <span>Duration Savings</span>
                <span>-${pricingSummary.discountAmount}</span>
              </div>
            )}
            
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  ${pricingSummary.finalPrice}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment CTA */}
      <div className="text-center space-y-4">
        <Button 
          size="lg" 
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold"
        >
          Pay ${pricingSummary.finalPrice} & Publish Listing
        </Button>
        <p className="text-sm text-gray-500">
          Secure payment processing • 30-day money-back guarantee
        </p>
      </div>
    </div>
  );
};

export default SalonPricingSection;
