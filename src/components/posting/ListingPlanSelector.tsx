
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, Award, Diamond, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import PricingCards from '@/components/posting/PricingCards';
import { useTranslation } from '@/hooks/useTranslation';

export interface ListingPlan {
  id: string;
  name: string;
  tier: string;
  price: number;
  features: string[];
  description: string;
  duration: number;
  tag?: string;
  popular?: boolean;
  vietnameseDescription?: string;
  wasPrice?: number;
}

interface ListingPlanSelectorProps {
  onSelectPlan: (plan: ListingPlan) => void;
  selectedPlanId?: string | null;
}

const ListingPlanSelector: React.FC<ListingPlanSelectorProps> = ({
  onSelectPlan,
  selectedPlanId = null,
}) => {
  const { t } = useTranslation();
  const [selectedDuration, setSelectedDuration] = useState<number>(1); // Default to 1 month
  
  // Select a default plan if none is selected (the second option, which is standard)
  useEffect(() => {
    if (!selectedPlanId && jobPricingOptions.length > 1) {
      // Auto select the second plan (featured)
      const defaultPlan = jobPricingOptions[1];
      onSelectPlan({
        ...defaultPlan,
        duration: selectedDuration * 30 // Convert months to days
      });
    }
  }, [selectedPlanId, onSelectPlan, selectedDuration]);

  // Handle duration change
  const handleDurationChange = (months: number) => {
    setSelectedDuration(months);
    
    // If a plan is already selected, update it with the new duration
    if (selectedPlanId) {
      const currentPlan = jobPricingOptions.find(plan => plan.id === selectedPlanId);
      if (currentPlan) {
        onSelectPlan({
          ...currentPlan,
          duration: months * 30 // Convert months to days
        });
      }
    }
  };

  // Handle plan selection
  const handlePlanSelect = (planId: string) => {
    const selectedPlan = jobPricingOptions.find(plan => plan.id === planId);
    if (selectedPlan) {
      onSelectPlan({
        ...selectedPlan,
        duration: selectedDuration * 30 // Convert months to days
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-2">
          {t("Select Your Listing Plan", "Chọn Gói Đăng Tin")}
        </h2>
        <p className="text-gray-600">
          {t(
            "Choose the best plan for your needs", 
            "Chọn gói tốt nhất cho nhu cầu của bạn"
          )}
        </p>
      </div>

      <PricingCards 
        pricingOptions={jobPricingOptions}
        selectedPricing={selectedPlanId || ''}
        onChange={handlePlanSelect}
        selectedDuration={selectedDuration}
        onDurationChange={handleDurationChange}
      />

      <div className="bg-blue-50 p-4 rounded-lg text-center text-sm text-blue-800">
        {t(
          "All plans include premium customer support and help with your listing.", 
          "Tất cả các gói bao gồm hỗ trợ khách hàng cao cấp và giúp đỡ với tin đăng của bạn."
        )}
      </div>
    </div>
  );
};

export default ListingPlanSelector;
