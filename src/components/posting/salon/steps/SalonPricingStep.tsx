
import React from "react";
import { type SalonPricingTier, SalonPricingOptions } from "@/utils/posting/salonPricing";
import SalonPlanSelectionWithoutPrices from "../SalonPlanSelectionWithoutPrices";
import SalonPostOptions from "../SalonPostOptions";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { useTranslation } from "@/hooks/useTranslation";
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

interface SalonPricingStepProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPricingStep = ({ selectedOptions, onOptionsChange, form }: SalonPricingStepProps) => {
  const { t } = useTranslation();
  
  const handlePricingSelect = (tier: SalonPricingTier, finalPrice: number) => {
    const updatedOptions = {
      ...selectedOptions,
      selectedPricingTier: tier
    };
    onOptionsChange(updatedOptions);
    form.setValue('autoRenew', updatedOptions.autoRenew || false);
  };

  const handleOptionsChange = (options: SalonPricingOptions) => {
    onOptionsChange(options);
    form.setValue('autoRenew', options.autoRenew || false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t({
            english: 'Pricing Plan',
            vietnamese: 'Chọn Gói Đăng Tin'
          })}
        </h2>
        <p className="text-gray-600 mt-2">
          {t({
            english: 'Choose the plan and duration that fits your needs',
            vietnamese: 'Chọn gói và thời hạn đăng tin phù hợp với nhu cầu của bạn'
          })}
        </p>
      </div>
      
      <SalonPlanSelectionWithoutPrices
        onPricingSelect={handlePricingSelect}
        selectedTier={selectedOptions.selectedPricingTier}
      />

      <div className="border-t pt-8 mt-8">
        <SalonPostOptions
          options={selectedOptions}
          onOptionsChange={handleOptionsChange}
          isFirstPost={false}
        />
      </div>

      <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 mt-6">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
          <div className="text-green-800 text-sm">
            <h4 className="font-medium mb-1">
              {t({
                english: 'Our Promise to You',
                vietnamese: 'Cam Kết Của Chúng Tôi'
              })}
            </h4>
            <p>
              {t({
                english: 'Your salon listing will be visible to thousands of qualified buyers looking for businesses just like yours. We verify all buyers to ensure your time is spent with serious prospects only.',
                vietnamese: 'Tin đăng salon của bạn sẽ hiển thị với hàng nghìn người mua có tiềm năng đang tìm kiếm cơ sở kinh doanh giống như của bạn. Chúng tôi xác minh tất cả người mua để đảm bảo thời gian của bạn chỉ dành cho những khách hàng nghiêm túc.'
              })}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
