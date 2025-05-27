
import React, { useState } from 'react';
import { SalonFormValues } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { SalonPostForm } from './SalonPostForm';
import { SalonPricingSection } from './SalonPricingSection';
import { SalonReviewSection } from './SalonReviewSection';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, options: SalonPricingOptions) => void;
}

type WizardStep = 'form' | 'pricing' | 'review' | 'payment' | 'processing';

const SalonListingWizard: React.FC<SalonListingWizardProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<WizardStep>('form');
  const [formData, setFormData] = useState<SalonFormValues | null>(null);
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions | null>(null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isNationwide, setIsNationwide] = useState(false);
  const [fastSalePackage, setFastSalePackage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);

  const handleFormSubmit = (data: SalonFormValues) => {
    console.log('Form submitted with data:', data);
    setFormData(data);
    setCurrentStep('pricing');
  };

  const handlePricingSubmit = (options: SalonPricingOptions) => {
    console.log('Pricing submitted with options:', options);
    setPricingOptions(options);
    setCurrentStep('review');
  };

  const handleReviewConfirm = async (termsAccepted: boolean) => {
    if (!termsAccepted) {
      toast.error(t({ 
        english: "You must accept the terms and conditions to continue",
        vietnamese: "Bạn phải chấp nhận các điều khoản và điều kiện để tiếp tục"
      }));
      return;
    }

    if (!formData || !pricingOptions) {
      toast.error(t({ 
        english: "Missing form data or pricing options",
        vietnamese: "Thiếu dữ liệu biểu mẫu hoặc tùy chọn giá"
      }));
      return;
    }

    setCurrentStep('payment');
    await initiateStripePayment();
  };

  const initiateStripePayment = async () => {
    if (!user || !formData || !pricingOptions) {
      toast.error(t({ 
        english: "Please log in and complete all required information",
        vietnamese: "Vui lòng đăng nhập và hoàn thành tất cả thông tin bắt buộc"
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      // Create Stripe checkout session for salon listing
      const { data, error } = await supabase.functions.invoke('create-salon-checkout', {
        body: {
          salonData: formData,
          pricingOptions: pricingOptions,
          photoCount: photoUploads.length
        }
      });

      if (error) {
        console.error('Stripe checkout error:', error);
        toast.error(t({ 
          english: "Failed to create payment session",
          vietnamese: "Không thể tạo phiên thanh toán"
        }));
        setIsSubmitting(false);
        return;
      }

      if (data?.url) {
        // Redirect to Stripe checkout - listing will only be created after successful payment
        window.location.href = data.url;
      } else {
        toast.error(t({ 
          english: "No checkout URL received",
          vietnamese: "Không nhận được URL thanh toán"
        }));
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(t({ 
        english: "Payment processing failed",
        vietnamese: "Xử lý thanh toán thất bại"
      }));
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'form':
        return (
          <SalonPostForm
            onSubmit={handleFormSubmit}
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            onNationwideChange={setIsNationwide}
            onFastSaleChange={setFastSalePackage}
          />
        );

      case 'pricing':
        return (
          <SalonPricingSection
            onSubmit={handlePricingSubmit}
            onBack={() => setCurrentStep('form')}
            isNationwide={isNationwide}
            fastSalePackage={fastSalePackage}
          />
        );

      case 'review':
        if (!formData || !pricingOptions) {
          setCurrentStep('form');
          return null;
        }
        return (
          <SalonReviewSection
            formData={formData}
            pricingOptions={pricingOptions}
            photoUploads={photoUploads}
            onConfirm={handleReviewConfirm}
            isSubmitting={isSubmitting}
          />
        );

      case 'payment':
      case 'processing':
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center">
            <div className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl max-w-md">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium mb-2">
                {t({ 
                  english: "Redirecting to secure payment...",
                  vietnamese: "Đang chuyển hướng đến thanh toán bảo mật..."
                })}
              </p>
              <p className="text-sm text-gray-500">
                {t({ 
                  english: "Your listing will be published after successful payment",
                  vietnamese: "Tin đăng của bạn sẽ được đăng sau khi thanh toán thành công"
                })}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentStep()}
    </div>
  );
};

export default SalonListingWizard;
