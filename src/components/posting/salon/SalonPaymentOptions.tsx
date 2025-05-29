
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from './salonFormSchema';
import SalonPaymentFeatures from './SalonPaymentFeatures';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ArrowLeft, Zap } from 'lucide-react';

interface SalonPaymentOptionsProps {
  form: UseFormReturn<SalonFormValues>;
  selectedOptions: SalonPricingOptions;
  onPayment: () => void;
  onBack: () => void;
}

const SalonPaymentOptions: React.FC<SalonPaymentOptionsProps> = ({
  form,
  selectedOptions,
  onPayment,
  onBack
}) => {
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<SalonPricingOptions>(selectedOptions);

  // Show feature add-on modal if user just selected a plan and hasn't seen the modal yet
  React.useEffect(() => {
    if (selectedOptions.selectedPricingTier && !selectedOptions.featuredAddon && !showFeatureModal) {
      setShowFeatureModal(true);
    }
  }, [selectedOptions.selectedPricingTier, selectedOptions.featuredAddon, showFeatureModal]);

  const handleAddFeature = () => {
    const updatedOptions = { ...currentOptions, featuredAddon: true };
    setCurrentOptions(updatedOptions);
    setShowFeatureModal(false);
  };

  const handleNoThanks = () => {
    const updatedOptions = { ...currentOptions, featuredAddon: false };
    setCurrentOptions(updatedOptions);
    setShowFeatureModal(false);
  };

  if (showFeatureModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6 pt-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mb-6 shadow-lg animate-pulse">
              <Star className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              ⭐ Feature Your Listing
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8 text-center pb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Get 5x More Views for Just $10!
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Stand out from the competition with premium placement and enhanced visibility
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-3">👁️</div>
                <p className="text-sm font-medium text-gray-500">Standard Listing</p>
                <p className="text-lg font-semibold text-gray-700">Regular Views</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                <div className="text-4xl mb-3">🔥</div>
                <p className="text-sm font-medium text-yellow-600">Featured Listing</p>
                <p className="text-lg font-bold text-yellow-700">5x More Views!</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Featured Benefits:</span>
              </div>
              <ul className="text-sm text-yellow-700 space-y-2">
                <li>• Top placement in search results</li>
                <li>• Highlighted with premium badge</li>
                <li>• Priority visibility to buyers</li>
                <li>• Enhanced listing appearance</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={handleAddFeature}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                ⭐ Add Feature (+$10)
              </Button>
              <Button 
                variant="outline" 
                onClick={handleNoThanks}
                className="px-8 py-4 text-lg border-2 hover:bg-gray-50"
              >
                Continue Without Feature
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="fixed bottom-4 left-4">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-4 h-4" />
            Back to Plans
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <SalonPaymentFeatures
      formData={form.getValues()}
      selectedOptions={currentOptions}
      onPayment={onPayment}
      onBack={onBack}
    />
  );
};

export default SalonPaymentOptions;
