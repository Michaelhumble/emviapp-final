
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from './salonFormSchema';
import SalonPaymentFeatures from './SalonPaymentFeatures';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Diamond, Flame } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-0 shadow-2xl bg-white/95 backdrop-blur-sm relative overflow-hidden">
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-transparent to-purple-50/50 pointer-events-none" />
          
          <CardHeader className="text-center pb-6 pt-8 relative">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 flex items-center justify-center mb-6 shadow-2xl animate-pulse relative">
              <Diamond className="h-12 w-12 text-white drop-shadow-lg" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-red-500 opacity-20 animate-ping" />
            </div>
            
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              💎 VIP Feature Upgrade
            </CardTitle>
            
            <p className="text-lg text-gray-700 font-medium">
              Stand Out Instantly. Get Noticed First.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8 text-center pb-8 relative">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Get 5X More Views for Only $10
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                Premium placement that puts your salon at the top of every search
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="text-center p-6 bg-gray-50 rounded-2xl border">
                <div className="text-5xl mb-4">👥</div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Standard Listing</p>
                <p className="text-lg font-semibold text-gray-700">Regular Views</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-2xl border-2 border-amber-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-red-100/30" />
                <div className="text-5xl mb-4 relative">🔥</div>
                <p className="text-sm font-medium text-amber-700 uppercase tracking-wide relative">VIP Featured</p>
                <p className="text-xl font-bold text-red-700 relative">5X More Views!</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 p-8 rounded-2xl border-2 border-amber-200 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 to-red-100/20 rounded-2xl" />
              <div className="flex items-center justify-center gap-3 mb-6 relative">
                <Flame className="h-6 w-6 text-red-600 animate-pulse" />
                <span className="font-bold text-xl text-red-800">Exclusive VIP Benefits:</span>
                <Flame className="h-6 w-6 text-red-600 animate-pulse" />
              </div>
              <ul className="text-lg text-red-700 space-y-3 font-medium relative">
                <li>• 🥇 Top placement in all search results</li>
                <li>• 💎 Premium badge that commands attention</li>
                <li>• ⚡ Priority visibility to serious buyers</li>
                <li>• 🎯 Enhanced listing with luxury styling</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                onClick={handleAddFeature}
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white px-10 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Diamond className="mr-3 h-6 w-6 animate-pulse" />
                Add VIP Feature (+$10)
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleNoThanks}
                className="px-10 py-6 text-xl border-2 hover:bg-gray-50 transition-all duration-200"
              >
                Continue Standard
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
