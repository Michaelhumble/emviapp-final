import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PaymentSummary from '../PaymentSummary';
import PricingCards from '../PricingCards';
import { PricingOptions } from '@/utils/posting/types';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { addDays, format } from 'date-fns';
import { JobPricingOption } from '@/utils/posting/types';
import { formatCurrency } from '@/lib/utils';
import PaymentConfirmationModal from '../PaymentConfirmationModal';
import { useTranslation } from '@/hooks/useTranslation';

// Import or define mock pricing options for different post types
const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free Post',
    tier: 'basic',
    price: 0,
    description: 'Basic job listing',
    features: ['Basic visibility', '7 days posting'],
    duration: 7
  },
  {
    id: 'standard',
    name: 'Standard',
    tier: 'basic',
    price: 29.99,
    description: 'Standard job listing with moderate visibility',
    features: ['Enhanced visibility', '30 days posting', 'Dashboard analytics'],
    duration: 30
  },
  {
    id: 'gold',
    name: 'Gold Featured',
    tier: 'premium',
    price: 59.99,
    wasPrice: 69.99,
    description: 'Premium job listing with high visibility',
    features: ['Featured in search results', '30 days posting', 'Highlighted listing', 'Dashboard analytics'],
    duration: 30,
    tag: 'Most Popular'
  },
  {
    id: 'premium',
    name: 'Premium',
    tier: 'premium',
    price: 99.99,
    description: 'Max visibility job listing',
    features: ['Top of search results', '60 days posting', 'Highlighted listing', 'Advanced analytics', 'Priority customer support'],
    duration: 60
  },
  {
    id: 'diamond',
    name: 'Diamond Featured',
    tier: 'featured',
    price: 299.99,
    description: 'Ultimate visibility package',
    features: [
      'Premium placement for 1 year',
      'Highlighted with custom badge',
      'Featured in newsletter',
      'Priority customer support',
      'Advanced analytics dashboard'
    ],
    duration: 365,
    tag: 'Best Value'
  }
];

const salonPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free Post',
    tier: 'basic',
    price: 0,
    description: 'Basic salon listing',
    features: ['Basic visibility', '7 days posting'],
    duration: 7
  },
  {
    id: 'standard',
    name: 'Standard',
    tier: 'basic',
    price: 19.99,
    description: 'Standard salon listing with moderate visibility',
    features: ['Enhanced visibility', '30 days posting', 'Dashboard analytics'],
    duration: 30
  },
  {
    id: 'gold',
    name: 'Gold Featured',
    tier: 'premium',
    price: 49.99,
    wasPrice: 59.99,
    description: 'Premium salon listing with high visibility',
    features: ['Featured in search results', '30 days posting', 'Highlighted listing', 'Dashboard analytics'],
    duration: 30,
    tag: 'Most Popular'
  },
  {
    id: 'premium',
    name: 'Premium',
    tier: 'premium',
    price: 79.99,
    description: 'Max visibility salon listing',
    features: ['Top of search results', '60 days posting', 'Highlighted listing', 'Advanced analytics', 'Priority customer support'],
    duration: 60
  },
  {
    id: 'diamond',
    name: 'Diamond Featured',
    tier: 'featured',
    price: 249.99,
    description: 'Ultimate visibility package',
    features: [
      'Premium placement for 1 year',
      'Highlighted with custom badge',
      'Featured in newsletter',
      'Priority customer support',
      'Advanced analytics dashboard'
    ],
    duration: 365,
    tag: 'Best Value'
  }
];

const boothPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free Post',
    tier: 'basic',
    price: 0,
    description: 'Basic booth listing',
    features: ['Basic visibility', '7 days posting'],
    duration: 7
  },
  {
    id: 'standard',
    name: 'Standard',
    tier: 'basic',
    price: 9.99,
    description: 'Standard booth listing with moderate visibility',
    features: ['Enhanced visibility', '30 days posting', 'Dashboard analytics'],
    duration: 30
  },
  {
    id: 'gold',
    name: 'Gold Featured',
    tier: 'premium',
    price: 29.99,
    wasPrice: 39.99,
    description: 'Premium booth listing with high visibility',
    features: ['Featured in search results', '30 days posting', 'Highlighted listing', 'Dashboard analytics'],
    duration: 30,
    tag: 'Most Popular'
  },
  {
    id: 'premium',
    name: 'Premium',
    tier: 'premium',
    price: 49.99,
    description: 'Max visibility booth listing',
    features: ['Top of search results', '60 days posting', 'Highlighted listing', 'Advanced analytics', 'Priority customer support'],
    duration: 60
  },
  {
    id: 'diamond',
    name: 'Diamond Featured',
    tier: 'featured',
    price: 149.99,
    description: 'Ultimate visibility package',
    features: [
      'Premium placement for 1 year',
      'Highlighted with custom badge',
      'Featured in newsletter',
      'Priority customer support',
      'Advanced analytics dashboard'
    ],
    duration: 365,
    tag: 'Best Value'
  }
];

// Add any additional pricing options for other post types if needed

interface ReviewAndPaymentSectionProps {
  postType: 'job' | 'salon' | 'booth'; // Add other post types as needed
  pricingOptions: PricingOptions;
  onPricingChange: (pricingTier: string) => void;
  onUpdatePricing: (options: Partial<PricingOptions>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  postType,
  pricingOptions,
  onPricingChange,
  onUpdatePricing,
  onNextStep,
  onPrevStep
}) => {
  const { t } = useTranslation();
  const [selectedPricingTier, setSelectedPricingTier] = useState(pricingOptions.selectedPricingTier || 'standard');
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [autoRenew, setAutoRenew] = useState(pricingOptions.autoRenew || false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  // Get the appropriate pricing options based on post type
  const getPricingOptionsForPostType = () => {
    switch (postType) {
      case 'job':
        return jobPricingOptions;
      case 'salon':
        return salonPricingOptions;
      case 'booth':
        return boothPricingOptions;
      default:
        return jobPricingOptions;
    }
  };
  
  const pricingOptionsForType = getPricingOptionsForPostType();
  
  // Get the selected plan details
  const getSelectedPlan = () => {
    return pricingOptionsForType.find(option => option.id === selectedPricingTier);
  };
  
  const selectedPlan = getSelectedPlan();
  
  // Calculate the final price based on all selected options
  useEffect(() => {
    if (!selectedPlan) return;
    
    // Base price from the selected tier
    let basePrice = selectedPlan.price;
    let original = basePrice * selectedDuration;
    
    // Apply duration discount
    let discount = 0;
    if (selectedDuration === 3) {
      discount = 10;
    } else if (selectedDuration === 6) {
      discount = 20;
    } else if (selectedDuration === 12) {
      discount = 30;
    }
    
    // Apply auto-renew discount if enabled
    if (autoRenew && selectedPlan.price > 0) {
      discount += 5;
    }
    
    // Calculate the final price with discounts
    const discountedPrice = original - (original * (discount / 100));
    
    // Special case for Diamond plan - fixed annual price
    if (selectedPricingTier === 'diamond') {
      setSelectedDuration(12); // Force 12 month duration for Diamond plan
    }
    
    // Update the state
    setCalculatedPrice(discountedPrice);
    setOriginalPrice(original);
    setDiscountPercentage(discount);
    
    // Update parent component's state
    onUpdatePricing({
      selectedPricingTier,
      autoRenew
    });
    
  }, [selectedPricingTier, selectedDuration, autoRenew, onUpdatePricing]);
  
  // Generate renewal date based on selected duration
  const getRenewalDate = () => {
    const days = selectedDuration === 1 ? 30 : 
                selectedDuration === 3 ? 90 : 
                selectedDuration === 6 ? 180 : 365;
    return addDays(new Date(), days);
  };
  
  const formattedRenewalDate = format(getRenewalDate(), 'MMMM d, yyyy');
  
  const getRenewalFrequencyText = () => {
    if (selectedDuration === 1) return "every 30 days";
    if (selectedDuration === 3) return "every 90 days";
    if (selectedDuration === 6) return "every 180 days";
    return "every 12 months";
  };
  
  // Handle proceeding to payment
  const handleProceedToPayment = () => {
    setShowPaymentModal(true);
  };
  
  // Handle confirming payment
  const handleConfirmPayment = () => {
    setShowPaymentModal(false);
    // Process payment...
    onNextStep(); // Move to the next step
  };
  
  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
  };
  
  const handlePricingSelection = (pricingId: string) => {
    setSelectedPricingTier(pricingId);
    onPricingChange(pricingId);
  };
  
  // Check if free plan is selected
  const isFreeSelected = selectedPlan?.price === 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {t('Select Your Plan', 'Chọn Gói Đăng Tin')}
        </h2>
        <PricingCards 
          pricingOptions={pricingOptionsForType}
          selectedPricing={selectedPricingTier}
          onChange={handlePricingSelection}
          selectedDuration={selectedDuration}
          onDurationChange={handleDurationChange}
        />
      </div>
      
      <div className="border-t pt-6 mt-8">
        <h3 className="text-lg font-semibold mb-4">
          {t('Payment Options', 'Tùy Chọn Thanh Toán')}
        </h3>
        
        {isFreeSelected ? (
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600">
              {t('This plan does not renew. First-time post only.', 'Gói này không tự động gia hạn. Chỉ dành cho lần đầu đăng tin.')}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-4">
            <div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auto-renew"
                  checked={autoRenew}
                  onCheckedChange={value => {
                    setAutoRenew(value);
                  }}
                  disabled={isFreeSelected}
                />
                <Label htmlFor="auto-renew">
                  {t('Enable Auto-Renew', 'Bật Tự Động Gia Hạn')}
                  {autoRenew && <span className="text-green-600 ml-2">(-5%)</span>}
                </Label>
              </div>
              {autoRenew && (
                <p className="text-sm text-gray-600 mt-1 ml-8">
                  {t(
                    `You'll be billed ${formatCurrency(calculatedPrice)} ${getRenewalFrequencyText()} starting ${formattedRenewalDate}.`,
                    `Bạn sẽ được tính phí ${formatCurrency(calculatedPrice)} ${getRenewalFrequencyText()} bắt đầu từ ${formattedRenewalDate}.`
                  )}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1 ml-8">
                {t('Keep this price locked in each year. Cancel anytime.', 'Giữ nguyên giá này mỗi năm. Hủy bất cứ lúc nào.')}
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold">
            {t('Selected Plan', 'Gói Đã Chọn')}:
          </h3>
          {selectedPlan && (
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-lg">{selectedPlan.name}</h4>
                  <p className="text-gray-600">{selectedPlan.description}</p>
                  <p className="mt-2">
                    <span className="text-gray-700">{t('Duration', 'Thời hạn')}: </span>
                    <span className="font-medium">
                      {selectedDuration === 1 ? '1 month' : 
                      `${selectedDuration} months`}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{formatCurrency(calculatedPrice)}</p>
                  {discountPercentage > 0 && (
                    <p className="text-sm line-through text-gray-500">{formatCurrency(originalPrice)}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <PaymentSummary 
          basePrice={selectedPlan?.price || 0}
          duration={selectedDuration}
          autoRenew={autoRenew}
          originalPrice={originalPrice}
          finalPrice={calculatedPrice}
          discountPercentage={discountPercentage}
          onProceedToPayment={handleProceedToPayment}
          isFreePlan={isFreeSelected}
        />
      </div>
      
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onPrevStep}>
          {t('Back', 'Quay lại')}
        </Button>
      </div>
      
      <PaymentConfirmationModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onOpenChange={setShowPaymentModal} 
        onConfirmPayment={handleConfirmPayment}
        amount={calculatedPrice}
        options={pricingOptions}
        originalPrice={originalPrice}
        discountPercentage={discountPercentage}
      />
    </div>
  );
};

export default ReviewAndPaymentSection;
