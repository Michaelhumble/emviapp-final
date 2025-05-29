
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SalonPricingOptions, getSalonPostPricingSummary } from '@/utils/posting/salonPricing';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { Loader2, CreditCard, Shield, Star } from 'lucide-react';
import SalonPaymentFeatures from './SalonPaymentFeatures';

interface SalonPaymentOptionsProps {
  pricingOptions: SalonPricingOptions;
  formData: any;
  onBack: () => void;
}

const SalonPaymentOptions: React.FC<SalonPaymentOptionsProps> = ({
  pricingOptions,
  formData,
  onBack
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [selectedFeatureAddon, setSelectedFeatureAddon] = useState(false);
  const { user } = useAuth();

  const pricingSummary = getSalonPostPricingSummary({
    ...pricingOptions,
    featuredAddon: selectedFeatureAddon
  });

  const handleProceedToPayment = async () => {
    if (!user) {
      toast.error('Please log in to continue');
      return;
    }

    setIsProcessing(true);

    try {
      console.log('Creating salon checkout session...', {
        pricingOptions: { ...pricingOptions, featuredAddon: selectedFeatureAddon },
        formData
      });

      // Call the edge function directly (following job post pattern)
      const { data, error } = await supabase.functions.invoke('create-salon-checkout', {
        body: {
          pricingOptions: { ...pricingOptions, featuredAddon: selectedFeatureAddon },
          formData
        }
      });

      if (error) {
        console.error('Stripe checkout error:', error);
        toast.error('Payment Error', {
          description: error.message || "Unable to process payment. Please try again."
        });
        setIsProcessing(false);
        return;
      }

      if (data?.url) {
        console.log('Redirecting to Stripe checkout:', data.url);
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error('No checkout URL received:', data);
        toast.error('Payment Error', {
          description: "No checkout URL received. Please try again."
        });
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment Error', {
        description: "Failed to initialize payment. Please try again."
      });
      setIsProcessing(false);
    }
  };

  const handleFeatureSelection = (addFeature: boolean) => {
    setSelectedFeatureAddon(addFeature);
    setShowFeatureModal(false);
    
    if (addFeature) {
      toast.success('VIP Feature added! Your listing will get 5x more visibility.');
    }
  };

  const handlePaymentClick = () => {
    // Show feature modal first, then proceed to payment
    setShowFeatureModal(true);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <Loader2 className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Redirecting to secure payment...</p>
          <p className="text-sm text-gray-500 mt-2">This will only take a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Complete Your Listing
        </h3>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Review your selection and proceed to secure payment
        </p>
      </div>

      {/* Payment Summary Card */}
      <Card className="max-w-2xl mx-auto border-2 border-purple-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Star className="h-6 w-6 text-purple-600" />
            Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <p className="font-semibold text-lg">{pricingSummary.planName} Plan</p>
                <p className="text-sm text-gray-600">{pricingSummary.duration} month{pricingSummary.duration > 1 ? 's' : ''} listing</p>
              </div>
              <p className="font-bold text-xl">${pricingSummary.basePrice}</p>
            </div>
            
            {selectedFeatureAddon && (
              <div className="flex justify-between items-center py-3 border-b bg-gradient-to-r from-purple-50 to-pink-50 -mx-6 px-6">
                <div>
                  <p className="font-semibold text-purple-700">VIP Featured Upgrade</p>
                  <p className="text-sm text-purple-600">5x more visibility & premium placement</p>
                </div>
                <p className="font-bold text-xl text-purple-700">+$10.00</p>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-4 border-t-2 border-purple-200">
              <div>
                <p className="font-bold text-2xl">Total</p>
                <p className="text-sm text-gray-600">One-time payment</p>
              </div>
              <p className="font-bold text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ${pricingSummary.total}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={onBack}
                className="h-12"
                disabled={isProcessing}
              >
                ← Back to Plans
              </Button>
              
              <Button
                onClick={handlePaymentClick}
                className="h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg"
                disabled={isProcessing}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                {isProcessing ? 'Processing...' : 'Secure Checkout'}
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="h-4 w-4" />
              Secured by Stripe • 256-bit SSL encryption
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Selection Modal */}
      <SalonPaymentFeatures
        isOpen={showFeatureModal}
        onClose={() => setShowFeatureModal(false)}
        onSelect={handleFeatureSelection}
        onProceedToPayment={handleProceedToPayment}
        currentPlan={pricingSummary.planName}
        basePrice={pricingSummary.basePrice}
      />
    </div>
  );
};

export default SalonPaymentOptions;
