
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTranslation } from '@/hooks/useTranslation';
import { Flame, Star, Diamond } from 'lucide-react';
import { cn } from '@/lib/utils';
import { jobPricingOptions } from '@/utils/posting/jobPricing';

interface PricingTierSelectorProps {
  selectedTier: string;
  onTierChange: (tier: string) => void;
  isFirstPost?: boolean;
}

const PricingTierSelector: React.FC<PricingTierSelectorProps> = ({
  selectedTier,
  onTierChange,
  isFirstPost = false
}) => {
  const { t } = useTranslation();
  
  // Filter out the hidden Diamond tier
  const visibleOptions = jobPricingOptions.filter(option => !option.hidden);
  
  const getTierIcon = (tierId: string) => {
    switch (tierId) {
      case 'standard':
        return <Flame size={20} className="text-blue-500" />;
      case 'premium':
        return <Diamond size={20} className="text-purple-500" />;
      case 'gold':
        return <Star size={20} className="text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg mb-2">
        {t("Select Pricing Tier", "Chọn gói giá")}
      </h3>
      
      <RadioGroup 
        value={selectedTier} 
        onValueChange={onTierChange}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {visibleOptions.map((option) => (
          <div 
            key={option.id}
            className={cn(
              "relative p-4 border rounded-lg cursor-pointer transition-all",
              selectedTier === option.id 
                ? "border-primary bg-primary/5 shadow-sm" 
                : "border-border hover:border-primary/50"
            )}
            onClick={() => onTierChange(option.id)}
          >
            <RadioGroupItem 
              value={option.id} 
              id={`tier-${option.id}`} 
              className="absolute right-4 top-4"
            />
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 rounded-full bg-primary/10">
                {getTierIcon(option.id)}
              </div>
              <div>
                <Label htmlFor={`tier-${option.id}`} className="text-base font-medium block">
                  {option.name}
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  {t(option.description, option.vietnameseDescription || option.description)}
                </p>
                
                <div className="mt-3">
                  <div className="flex items-end gap-1">
                    <span className="text-lg font-bold">${option.price}</span>
                    {option.wasPrice && (
                      <span className="text-sm text-gray-500 line-through">${option.wasPrice}</span>
                    )}
                  </div>
                  {option.tag && (
                    <div className="mt-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {option.tag}
                      </span>
                    </div>
                  )}
                  {option.id === 'free' && (
                    <div className="mt-2 text-xs text-amber-600">
                      {t("Limited visibility, 30-day duration only", "Hiển thị hạn chế, chỉ 30 ngày")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PricingTierSelector;
