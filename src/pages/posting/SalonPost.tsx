
import React, { useState } from 'react';
import { SalonPostForm } from '@/components/posting/salon/SalonPostForm';
import { SalonFormValues } from '@/components/posting/salon/salonFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import SalonPostOptions from '@/components/posting/salon/SalonPostOptions';
import { calculateSalonPostPrice } from '@/utils/posting/salonPricing';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { MobileButton } from '@/components/ui/mobile-button';
import { useTranslation } from '@/hooks/useTranslation';

const SalonPost: React.FC = () => {
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 1,
    isFirstPost: true,
    autoRenew: true
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Handle form submission
  const handleFormSubmit = (values: SalonFormValues) => {
    // Check if photos were uploaded
    if (photoUploads.length === 0) {
      toast.error(t({
        english: "Please upload at least one photo of your salon",
        vietnamese: "Vui lòng tải lên ít nhất một hình ảnh về salon của bạn"
      }));
      return;
    }

    // Calculate price
    const price = calculateSalonPostPrice(pricingOptions);

    // TODO: Upload photos to storage

    // TODO: Create salon post in database

    // If price is greater than 0, proceed to payment
    if (price > 0) {
      // Navigate to payment page with salon data
      navigate('/payment', { 
        state: { 
          type: 'salon',
          data: values,
          options: pricingOptions,
          price
        } 
      });
    } else {
      // For free listings, skip payment and go directly to success
      toast.success(t({
        english: "Your salon listing has been posted!",
        vietnamese: "Tin đăng salon của bạn đã được đăng!"
      }));
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
        {t({
          english: "Create a detailed listing to attract potential buyers for your salon",
          vietnamese: "Tạo tin chi tiết để thu hút người mua tiềm năng cho salon của bạn"
        })}
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
              <h2 className="text-xl font-medium mb-4">{t({
                english: "Listing Summary", 
                vietnamese: "Tóm tắt tin đăng"
              })}</h2>
              <SalonPostOptions
                options={pricingOptions}
                onOptionsChange={handleOptionsChange}
                isFirstPost={true}
              />
              
              <MobileButton 
                onClick={() => document.querySelector('form')?.requestSubmit()}
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                {t({
                  english: "Continue to Payment",
                  vietnamese: "Tiếp tục đến thanh toán"
                })}
              </MobileButton>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                {t({
                  english: "By proceeding, you agree to our Terms of Service and listing policies",
                  vietnamese: "Bằng cách tiếp tục, bạn đồng ý với Điều khoản dịch vụ và chính sách đăng tin của chúng tôi"
                })}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonPost;
