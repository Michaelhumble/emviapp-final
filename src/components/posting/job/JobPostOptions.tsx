import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { jobPricingOptions, durationOptions } from '@/utils/posting/jobPricing';
import { PricingOptions } from '@/utils/posting/types';
import DurationSelector from '../DurationSelector';
import { useNavigate } from 'react-router-dom';
import { generatePromotionalText } from '@/utils/posting/promotionalText';
import { CheckCircle, Globe, Zap } from 'lucide-react';
import { showAtTop } from '@/utils/posting/upsellOptions';
import NationwideOption from '../smart-ad-options/NationwideOption';
import ShowAtTopOption from '../smart-ad-options/ShowAtTopOption';
import BundleWithJobOption from '../smart-ad-options/BundleWithJobOption';
import PricingDisplay from '../PricingDisplay';

interface JobPostOptionsProps {
  options: PricingOptions;
  onOptionsChange: (options: PricingOptions) => void;
  isFirstPost?: boolean;
  hasReferrals?: boolean;
}

const JobPostOptions: React.FC<JobPostOptionsProps> = ({
  options,
  onOptionsChange,
  isFirstPost = false,
  hasReferrals = false
}) => {
  const [selectedTier, setSelectedTier] = useState<string>(options.selectedPricingTier || 'standard');
  const [durationMonths, setDurationMonths] = useState<number>(options.durationMonths || 1);
  const [autoRenew, setAutoRenew] = useState<boolean>(options.autoRenew || false);
  const [isNationwide, setIsNationwide] = useState<boolean>(options.isNationwide || false);
  const [showAtTopOption, setShowAtTopOption] = useState<boolean>(options.showAtTop || false);
  const [bundleWithSalon, setBundleWithSalon] = useState<boolean>(options.bundleWithSalonPost || false);
  
  const navigate = useNavigate();
  
  // Get the selected pricing option
  const selectedPricingOption = jobPricingOptions.find(option => option.id === selectedTier);
  const basePrice = selectedPricingOption ? selectedPricingOption.price : 0;
  
  // Calculate original price (before any discounts)
  const originalPrice = basePrice * durationMonths;
  
  // Define discount percentage based on duration
  let discountPercentage = 0;
  
  if (durationMonths === 3) {
    discountPercentage = 5; // 5% discount for 3-month duration
  } else if (durationMonths === 6) {
    discountPercentage = 10; // 10% discount for 6-month duration
  } else if (durationMonths >= 12) {
    discountPercentage = 20; // 20% discount for 12-month or longer duration
  }
  
  // Add first post discount if applicable
  if (isFirstPost) {
    discountPercentage += 5; // Additional 5% discount for first-time posters
  }
  
  // Calculate the final price
  const discount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discount;
  
  // Update parent component when options change
  useEffect(() => {
    onOptionsChange({
      ...options,
      selectedPricingTier: selectedTier,
      durationMonths,
      autoRenew,
      isNationwide,
      showAtTop: showAtTopOption,
      bundleWithSalonPost: bundleWithSalon,
      isFirstPost
    });
  }, [selectedTier, durationMonths, autoRenew, isNationwide, showAtTopOption, bundleWithSalon]);
  
  // Handle tier selection
  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId);
  };
  
  // Handle duration change
  const handleDurationChange = (months: number) => {
    setDurationMonths(months);
  };
  
  // Handle auto-renew toggle
  const handleAutoRenewChange = (checked: boolean) => {
    setAutoRenew(checked);
  };
  
  // Handle nationwide toggle
  const handleNationwideChange = (checked: boolean) => {
    setIsNationwide(checked);
  };
  
  // Handle show at top toggle
  const handleShowAtTopChange = (checked: boolean) => {
    setShowAtTopOption(checked);
  };
  
  // Handle bundle with salon toggle
  const handleBundleWithSalonChange = (checked: boolean) => {
    setBundleWithSalon(checked);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {jobPricingOptions
          .filter(option => !option.hidden)
          .map((option) => (
            <Card 
              key={option.id}
              className={`cursor-pointer transition-all ${
                selectedTier === option.id 
                  ? 'border-2 border-blue-500 shadow-md' 
                  : 'border border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => handleTierSelect(option.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{option.name}</h3>
                  {selectedTier === option.id && (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                
                <div className="flex items-baseline mb-2">
                  <span className="text-2xl font-bold">${option.price}</span>
                  {option.wasPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${option.wasPrice}
                    </span>
                  )}
                  <span className="ml-1 text-sm text-gray-500">/mo</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {option.description}
                </p>
                
                {option.tag && (
                  <div className="text-xs bg-blue-50 text-blue-700 p-1.5 rounded-md">
                    {option.tag}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
      </div>
      
      {selectedTier !== 'free' && (
        <>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Listing Duration</h3>
            <DurationSelector 
              options={durationOptions}
              selectedMonths={durationMonths}
              onChange={handleDurationChange}
            />
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auto-renew"
                  checked={autoRenew}
                  onCheckedChange={handleAutoRenewChange}
                />
                <label 
                  htmlFor="auto-renew" 
                  className="text-sm cursor-pointer"
                >
                  Auto-renew when expired
                </label>
              </div>
              <span className="text-xs text-green-600 font-medium">
                Save 5%
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Boost Options</h3>
            
            <NationwideOption 
              onChange={handleNationwideChange}
              defaultChecked={isNationwide}
              postType="job"
            />
            
            <ShowAtTopOption 
              onChange={handleShowAtTopChange}
              defaultChecked={showAtTopOption}
            />
            
            <BundleWithJobOption 
              onChange={handleBundleWithSalonChange}
              postType="booth"
              defaultChecked={bundleWithSalon}
            />
          </div>
        </>
      )}
      
      <div className="mt-6">
        <PricingDisplay
          pricingId={selectedTier}
          basePrice={basePrice}
          duration={durationMonths}
          autoRenew={autoRenew}
          originalPrice={originalPrice}
          finalPrice={finalPrice}
          discountPercentage={discountPercentage}
        />
      </div>
      
      {hasReferrals && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium text-green-800">You have referral credits!</h3>
              <p className="text-sm text-green-700">
                Your credits will be applied at checkout
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostOptions;
