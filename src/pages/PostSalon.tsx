import React, { useState } from 'react';
import { SalonPostForm } from '@/components/posting/salon/SalonPostForm';
import { SalonFormValues } from '@/components/posting/salon/salonFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import SalonPostOptions from '@/components/posting/salon/SalonPostOptions';
import { calculateSalonPostPrice } from '@/utils/posting/salonPricing';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePostPayment } from '@/hooks/usePostPayment';

const SalonPost: React.FC = () => {
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard',
    isFirstPost: true
  });
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();

  // Handle form submission
  const handleFormSubmit = async (values: SalonFormValues) => {
    // Check if photos were uploaded
    if (photoUploads.length === 0) {
      toast.error("Please upload at least one photo of your salon");
      return;
    }

    // Calculate price
    const price = calculateSalonPostPrice(pricingOptions);

    // TODO: Upload photos to storage

    // TODO: Create salon post in database

    // If price is greater than 0, proceed to payment
    if (price > 0) {
      // Navigate to payment page with salon data
      try {
        const paymentResult = await initiatePayment('salon', values, pricingOptions);
        if (paymentResult?.success) {
          // Payment was initiated successfully, the user will be redirected
          // to Stripe's checkout page. No further action is needed here.
        } else {
          // Payment initiation failed, show an error message
          toast.error("Failed to initiate payment. Please try again.");
        }
      } catch (error) {
        console.error("Payment initiation error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } else {
      // For free listings, skip payment and go directly to success
      toast.success("Your salon listing has been posted!");
      navigate('/dashboard');
    }
  };

  // Handle changes to pricing options
  const handleOptionsChange = (options: PricingOptions) => {
    setPricingOptions(options);
  };

  // Update nationwide option from form
  const handleNationwideChange = (checked: boolean) => {
    setPricingOptions(prev => ({
      ...prev,
      isNationwide: checked
    }));
  };

  // Update fast sale option from form
  const handleFastSaleChange = (checked: boolean) => {
    setPricingOptions(prev => ({
      ...prev,
      fastSalePackage: checked
    }));
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-playfair font-semibold mb-2">List Your Salon For Sale</h1>
      <p className="text-gray-600 mb-8">
        Create a detailed listing to attract potential buyers for your salon
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SalonPostForm 
            onSubmit={handleFormSubmit}
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            onNationwideChange={handleNationwideChange}
            onFastSaleChange={handleFastSaleChange}
          />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Card className="p-6">
              <h2 className="text-xl font-medium mb-4">Listing Summary</h2>
              <SalonPostOptions
                options={pricingOptions}
                onOptionsChange={handleOptionsChange}
                isFirstPost={true}
              />
              
              <Button 
                onClick={() => document.querySelector('form')?.requestSubmit()}
                className="w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Continue to Payment"}
              </Button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                By proceeding, you agree to our Terms of Service and listing policies
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonPost;
