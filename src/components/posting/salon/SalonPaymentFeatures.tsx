
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, Shield, Clock, CheckCircle } from 'lucide-react';
import { SalonFormValues } from './salonFormSchema';
import { SalonPricingOptions, calculateSalonPostPrice, getSalonPostPricingSummary } from '@/utils/posting/salonPricing';

interface SalonPaymentFeaturesProps {
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  onPayment: () => void;
  onBack: () => void;
}

const SalonPaymentFeatures: React.FC<SalonPaymentFeaturesProps> = ({
  formData,
  selectedOptions,
  onPayment,
  onBack
}) => {
  const totalPrice = calculateSalonPostPrice(selectedOptions);
  const pricingSummary = getSalonPostPricingSummary(selectedOptions);
  
  const getPlanName = () => {
    const duration = selectedOptions.durationMonths || 1;
    if (duration === 1) return 'Standard Listing';
    if (duration === 6) return '6 Month Package';
    if (duration === 12) return '12 Month Package';
    return 'Standard Listing';
  };

  const getIncludedFeatures = () => {
    const features = [];
    
    if (selectedOptions.isNationwide) {
      features.push(`Nationwide Visibility (+$${pricingSummary.addOns.nationwide.toFixed(2)})`);
    }
    
    if (selectedOptions.fastSalePackage || selectedOptions.featuredBoost) {
      features.push(`Premium Promotion (+$${pricingSummary.addOns.fastSale.toFixed(2)})`);
    }
    
    if (selectedOptions.showAtTop) {
      features.push(`Featured Placement (+$${pricingSummary.addOns.showAtTop.toFixed(2)})`);
    }
    
    if (selectedOptions.bundleWithJobPost) {
      features.push(`Bundle with Job Post (+$${pricingSummary.addOns.bundleWithJobPost.toFixed(2)})`);
    }
    
    return features;
  };

  return (
    <div className="space-y-6">
      {/* Listing Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Listing Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg">{formData.salonName}</h3>
              <p className="text-gray-600">{formData.city}, {formData.state}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Asking Price:</span>
                <p className="font-medium">${formData.askingPrice}</p>
              </div>
              <div>
                <span className="text-gray-500">Monthly Rent:</span>
                <p className="font-medium">${formData.monthlyRent}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            Selected Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{getPlanName()}</h3>
                <p className="text-sm text-gray-600">
                  Active for {selectedOptions.durationMonths || 1} month{(selectedOptions.durationMonths || 1) > 1 ? 's' : ''}
                </p>
              </div>
              <Badge variant="outline" className="text-purple-600">
                ${totalPrice.toFixed(2)}
              </Badge>
            </div>
            
            {getIncludedFeatures().length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Add-ons Included:</h4>
                <ul className="space-y-1">
                  {getIncludedFeatures().map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <CreditCard className="h-5 w-5" />
            Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span className="text-purple-600">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure payment powered by Stripe</span>
              </div>
              <p>Your listing will be active immediately after payment confirmation.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Plan Selection
        </Button>
        
        <Button 
          onClick={onPayment}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold"
        >
          Pay ${totalPrice.toFixed(2)} & Publish Listing
        </Button>
      </div>
    </div>
  );
};

export default SalonPaymentFeatures;
