
import React, { useState } from 'react';
import { JobForm } from './JobForm';
import { JobFormValues } from './jobFormSchema';
import { Separator } from '@/components/ui/separator';
import PostHeader from '../PostHeader';
import MotivationalFooter from '../MotivationalFooter';
import UpsellSidebar from '../upsell/UpsellSidebar';
import BoostListingModal, { BoostOption } from '../upsell/BoostListingModal';
import PaymentConfirmationModal from '../PaymentConfirmationModal';
import { PricingOptions } from '@/types/job';
import { useTranslation } from '@/hooks/useTranslation';

interface EnhancedJobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
}

export const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting 
}) => {
  const { t } = useTranslation();
  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedBoost, setSelectedBoost] = useState<BoostOption>('none');
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 1,
    autoRenew: false
  });
  
  // Mock values for demonstration - in a real app these would come from props or context
  const baseAmount = 9.99;
  const basePlanName = t('Standard', 'Tiêu chuẩn');
  
  const handleBoostSelect = (boostOption: BoostOption) => {
    setSelectedBoost(boostOption);
    setIsBoostModalOpen(false);
    
    // After selecting a boost, show the payment confirmation modal
    setIsPaymentModalOpen(true);
  };
  
  const handleSubmitForm = (values: JobFormValues) => {
    // If it's a paid plan, show the boost modal first
    if (pricingOptions.selectedPricingTier !== 'free' && pricingOptions.selectedPricingTier !== 'basic') {
      // Make sure we show the boost modal first
      setIsBoostModalOpen(true);
    } else {
      // For free plans, submit directly
      onSubmit(values);
    }
  };
  
  const handleUpgrade = () => {
    setIsBoostModalOpen(true);
  };
  
  const handleConfirmPayment = () => {
    setIsPaymentModalOpen(false);
    // Process the payment with the selected boost
    // In a real implementation, you would pass the boost option to your payment processor
    onSubmit({} as JobFormValues); // This would be the actual form values in a real app
  };
  
  // Calculate amounts based on selections
  const getBoostAmount = () => {
    switch (selectedBoost) {
      case 'homepage': return 5;
      case 'premium': return 10;
      default: return 0;
    }
  };
  
  const getTotalAmount = () => baseAmount + getBoostAmount();

  return (
    <div className="space-y-8">
      <PostHeader 
        title="Find your next artist — the one who stays, thrives, and grows your salon."
        subtitle="Post smart. We'll guide you every step."
      />
      
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <JobForm 
              onSubmit={handleSubmitForm}
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
        
        <div className="hidden lg:block">
          <UpsellSidebar 
            onUpgrade={handleUpgrade}
            selectedPlan={pricingOptions.selectedPricingTier}
          />
        </div>
      </div>
      
      {/* Mobile upsell will appear here via floating button */}
      <MobileUpsellButton 
        showButton={pricingOptions.selectedPricingTier === 'basic' || pricingOptions.selectedPricingTier === 'standard'} 
        onUpgrade={handleUpgrade}
      />
      
      <div className="max-w-3xl mx-auto">
        <MotivationalFooter 
          icon="🫶"
          message="Artists check for new jobs every morning. Make yours the one they remember."
          subMessage="Post now — and let the best artists come to you."
        />
      </div>
      
      <p className="text-xs text-neutral-400 text-center mt-6">
        🌞 Inspired by Sunshine — we're here to help your salon grow, one great hire at a time.
      </p>
      
      {/* Boost Modal */}
      <BoostListingModal 
        open={isBoostModalOpen}
        onClose={() => setIsBoostModalOpen(false)}
        onConfirm={handleBoostSelect}
        baseAmount={baseAmount}
        basePlanName={basePlanName}
      />
      
      {/* Payment Confirmation Modal */}
      <PaymentConfirmationModal 
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirmPayment={handleConfirmPayment}
        amount={getTotalAmount()}
        options={pricingOptions}
        originalPrice={baseAmount}
        discountPercentage={0}
      />
    </div>
  );
};

// Create mobile floating upsell button component
const MobileUpsellButton = ({ showButton, onUpgrade }: { showButton: boolean, onUpgrade?: () => void }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const { t } = useTranslation();
  
  React.useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled 70% down the page
      const scrollPosition = window.scrollY;
      const pageHeight = document.body.scrollHeight - window.innerHeight;
      const scrollThreshold = pageHeight * 0.7;
      
      if (scrollPosition > scrollThreshold && showButton) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showButton]);

  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-4 w-full px-4 md:hidden z-50">
      <button 
        className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-3 rounded-lg shadow-xl"
        onClick={onUpgrade}
      >
        🔼 {t('Boost My Post (+$5)', 'Tăng cường bài đăng của tôi (+$5)')}
      </button>
    </div>
  );
};

export default EnhancedJobForm;
