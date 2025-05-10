
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PostWizardLayout from '@/components/posting/PostWizardLayout';
import AuthPostGuard from '@/components/posting/AuthPostGuard';
import { Salon } from '@/types/salon';
import { PricingOptions } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';
import PaymentConfirmationModal from '@/components/posting/PaymentConfirmationModal';
import ReviewAndPaymentSection from '@/components/posting/sections/ReviewAndPaymentSection';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';

// Mock sections that would normally be imported
const SalonDetailsSection = ({ details, onChange }: any) => (
  <div>Salon Details Section (Mock)</div>
);

const AmenitiesSection = ({ amenities, onChange }: any) => (
  <div>Amenities Section (Mock)</div>
);

const GallerySection = ({ gallery, onChange }: any) => (
  <div>Gallery Section (Mock)</div>
);

const ContactInformationSection = ({ contactInfo, onChange }: any) => (
  <div>Contact Information Section (Mock)</div>
);

const SalonPost = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { initiatePayment, isLoading } = usePostPayment();

  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [salonDetails, setSalonDetails] = useState<Partial<Salon>>({
    name: '',
    description: '',
    amenities: [],
    contact_info: {
      owner_name: '',
      phone: '',
      email: ''
    },
    gallery: [] // This is now valid since we added it to the Salon interface
  });
  
  // Pricing options state
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    isFirstPost: true,
    isNationwide: false,
    fastSalePackage: false,
    showAtTop: false,
    bundleWithJobPost: false,
    hasReferrals: false,
    isHotListing: false,
    isUrgent: false,
    bundleWithSalonPost: false,
    boostVisibility: false,
    featuredListing: false,
    extendedDuration: false,
    selectedPricingTier: 'standard', // Default pricing tier
    autoRenew: false
  });
  
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSalonDetailChange = (details: Partial<Salon>) => {
    setSalonDetails({ ...salonDetails, ...details });
  };
  
  const handlePricingChange = (pricingTier: string) => {
    setPricingOptions({ ...pricingOptions, selectedPricingTier: pricingTier });
  };
  
  const handleUpdatePricing = (options: Partial<PricingOptions>) => {
    setPricingOptions({ ...pricingOptions, ...options });
  };
  
  const handleSubmit = async () => {
    try {
      // Show loading state
      toast.loading(
        t("Processing your submission...", "Đang xử lý đơn của bạn..."),
        { id: "salon-submission" }
      );
      
      // Pass both salon details and pricing options to the payment hook
      const result = await initiatePayment('salon', salonDetails, pricingOptions);
      
      // Clear loading state
      toast.dismiss("salon-submission");

      if (result.success) {
        if (result.redirect) {
          // For free posts, navigate to success page
          if (result.redirect === '/post-success') {
            navigate('/post-success', { 
              state: { 
                postType: 'salon',
                postDetails: salonDetails,
                pricingDetails: pricingOptions,
                postData: result.data
              } 
            });
          } else {
            // For paid posts, redirect to Stripe
            window.location.href = result.redirect;
          }
        }
      } else {
        toast.error(
          t("There was a problem with your submission", "Có vấn đề với việc gửi đơn của bạn"),
          { description: t("Please try again or contact support", "Vui lòng thử lại hoặc liên hệ hỗ trợ") }
        );
      }
    } catch (error) {
      console.error("Salon post submission error:", error);
      toast.error(
        t("Submission error", "Lỗi khi gửi đơn"),
        { description: t("Please check your details and try again", "Vui lòng kiểm tra thông tin của bạn và thử lại") }
      );
    }
  };
  
  const handleAmenitiesChange = (amenities: string[]) => {
    setSalonDetails({ ...salonDetails, amenities: amenities });
  };

  const handleGalleryChange = (gallery: any[]) => {
    setSalonDetails(prev => ({ ...prev, gallery })); // Now this is valid
  };

  const handleContactChange = (contactInfo: Salon['contact_info']) => {
    setSalonDetails({ ...salonDetails, contact_info: contactInfo });
  };

  return (
    <AuthPostGuard>
      <div className="container mx-auto px-4">
        <Link to="/" className="text-sm text-gray-500 hover:text-purple-600 underline mt-4 block">
          {t('← Back to Home', '← Trở về Trang chủ')}
        </Link>
      </div>
      <PostWizardLayout 
        currentStep={currentStep} 
        totalSteps={5} 
        title={t("Post Your Salon", "Đăng Tin Salon")}
        onNext={() => setCurrentStep(prev => prev + 1)}
        onPrev={() => setCurrentStep(prev => prev - 1)}
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      >
        {currentStep === 1 && (
          <SalonDetailsSection
            details={salonDetails}
            onChange={handleSalonDetailChange}
          />
        )}
        {currentStep === 2 && (
          <AmenitiesSection
            amenities={salonDetails.amenities}
            onChange={handleAmenitiesChange}
          />
        )}
        {currentStep === 3 && (
          <GallerySection
            gallery={salonDetails.gallery || []}
            onChange={handleGalleryChange}
          />
        )}
        {currentStep === 4 && (
          <ContactInformationSection
            contactInfo={salonDetails.contact_info}
            onChange={handleContactChange}
          />
        )}
        {currentStep === 5 && (
          <ReviewAndPaymentSection
            postType="salon"
            pricingOptions={pricingOptions}
            onPricingChange={handlePricingChange}
            onUpdatePricing={handleUpdatePricing}
            onNextStep={nextStep}
            onPrevStep={prevStep}
            isFirstPost={pricingOptions.isFirstPost}
            isSubmitting={isLoading}
          />
        )}
      </PostWizardLayout>
      
      <PaymentConfirmationModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onOpenChange={setShowPaymentModal}
        onConfirmPayment={handleSubmit}
        amount={100} // Replace with actual calculated price
        options={pricingOptions}
        originalPrice={150} // Replace with actual original price
        discountPercentage={10} // Replace with actual discount percentage
      />
    </AuthPostGuard>
  );
};

export default SalonPost;
