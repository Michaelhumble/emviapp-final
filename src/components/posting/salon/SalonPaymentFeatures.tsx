
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, Shield, Clock, CheckCircle, Star } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Listing Summary */}
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Listing Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-xl text-gray-900">{formData.salonName}</h3>
                <p className="text-gray-600 text-lg">{formData.city}, {formData.state}</p>
              </div>
              <div className="grid grid-cols-2 gap-6 text-base">
                <div>
                  <span className="text-gray-500">Asking Price:</span>
                  <p className="font-semibold text-lg">${formData.askingPrice}</p>
                </div>
                <div>
                  <span className="text-gray-500">Monthly Rent:</span>
                  <p className="font-semibold text-lg">${formData.monthlyRent}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Details */}
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Clock className="h-6 w-6 text-purple-500" />
              Selected Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{pricingSummary.planName} Plan</h3>
                  <p className="text-gray-600">
                    Active for {pricingSummary.duration} month{pricingSummary.duration > 1 ? 's' : ''}
                  </p>
                </div>
                <Badge variant="outline" className="text-purple-600 text-lg px-3 py-1">
                  ${pricingSummary.basePrice.toFixed(2)}
                </Badge>
              </div>
              
              {selectedOptions.featuredAddon && (
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Featured Listing Add-on</h4>
                      <p className="text-sm text-yellow-600">5x more views and premium placement</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500 text-white text-lg px-3 py-1">
                    +$10.00
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-purple-700">
              <CreditCard className="h-6 w-6" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3 text-lg">
                <div className="flex justify-between">
                  <span>{pricingSummary.planName} Plan:</span>
                  <span className="font-semibold">${pricingSummary.basePrice.toFixed(2)}</span>
                </div>
                
                {selectedOptions.featuredAddon && (
                  <div className="flex justify-between text-yellow-700">
                    <span>Featured Add-on:</span>
                    <span className="font-semibold">+$10.00</span>
                  </div>
                )}
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-2xl font-bold text-purple-700">
                    <span>Total Amount:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 bg-white/70 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="font-semibold">Secure payment powered by Stripe</span>
                </div>
                <p>Your listing will be active immediately after payment confirmation.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 px-6 py-3">
            <ArrowLeft className="w-4 h-4" />
            Back to Plans
          </Button>
          
          <Button 
            onClick={onPayment}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Pay ${totalPrice.toFixed(2)} & Publish Listing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalonPaymentFeatures;
