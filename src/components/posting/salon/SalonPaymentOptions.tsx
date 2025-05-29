
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from './salonFormSchema';
import SalonPaymentFeatures from './SalonPaymentFeatures';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ArrowLeft } from 'lucide-react';

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
  const formData = form.getValues();

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
      <div className="space-y-6">
        <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl text-yellow-700">
              <Star className="h-6 w-6 fill-yellow-500 text-yellow-500" />
              Feature Your Listing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">⭐ Feature your listing for just $10 more!</h3>
              <p className="text-gray-600 text-lg">Get 5x more views and inquiries</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-400">👁️</div>
                <p className="text-sm text-gray-500">Standard Views</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">👁️👁️👁️👁️👁️</div>
                <p className="text-sm text-yellow-600 font-semibold">5x More Views!</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button 
                onClick={handleAddFeature}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 text-lg font-semibold"
              >
                Add Feature (+$10)
              </Button>
              <Button 
                variant="outline" 
                onClick={handleNoThanks}
                className="px-8 py-3 text-lg"
              >
                No Thanks
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Plan Selection
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <SalonPaymentFeatures
      formData={formData}
      selectedOptions={currentOptions}
      onPayment={onPayment}
      onBack={onBack}
    />
  );
};

export default SalonPaymentOptions;
