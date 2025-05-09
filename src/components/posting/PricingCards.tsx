
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, HelpCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { JobPricingOption } from '@/utils/posting/types';
import { DurationOption } from '@/types/pricing';
import { useTranslation } from '@/hooks/useTranslation';

interface PricingCardsProps {
  pricingOptions: JobPricingOption[];
  selectedPricing: string;
  onChange: (id: string) => void;
  selectedDuration: number;
  onDurationChange: (months: number) => void;
}

const billingDurations: DurationOption[] = [
  { months: 1, label: "1 Month", vietnameseLabel: "1 Tháng", discount: 0 },
  { months: 3, label: "3 Months", vietnameseLabel: "3 Tháng", discount: 15 },
  { months: 6, label: "6 Months", vietnameseLabel: "6 Tháng", discount: 25 },
  { months: 12, label: "12 Months", vietnameseLabel: "12 Tháng", discount: 40 },
];

const PricingCards: React.FC<PricingCardsProps> = ({
  pricingOptions,
  selectedPricing,
  onChange,
  selectedDuration,
  onDurationChange,
}) => {
  const { t, isVietnamese } = useTranslation();
  const [autoRenew, setAutoRenew] = useState(false);
  
  // Filter options for top row (Free, Standard, Gold)
  const topRowOptions = pricingOptions.filter(option => 
    option.id === 'free' || option.id === 'standard' || option.id === 'gold'
  );
  
  // Filter options for bottom row (Premium, Diamond)
  const bottomRowOptions = pricingOptions.filter(option => 
    option.id === 'premium' || option.id === 'diamond'
  );
  
  const handleAutoRenewChange = (checked: boolean) => {
    setAutoRenew(checked);
  };
  
  const renderPricingCard = (option: JobPricingOption) => {
    const isSelected = selectedPricing === option.id;
    const isFree = option.price === 0;
    const monthlyPrice = option.price;
    
    // Apply discount based on duration and auto-renew
    let totalDiscount = 0;
    const durationOption = billingDurations.find(d => d.months === selectedDuration);
    
    if (durationOption) {
      totalDiscount += durationOption.discount;
    }
    
    if (autoRenew && !isFree) {
      totalDiscount += 20;
    }
    
    // Calculate discounted price
    const discountedPrice = monthlyPrice * (1 - totalDiscount / 100);
    const totalPrice = discountedPrice * selectedDuration;
    
    return (
      <Card 
        key={option.id}
        className={`relative h-full transition-all duration-200 ${
          isSelected 
            ? 'border-2 border-primary shadow-md' 
            : 'border border-gray-200 hover:border-gray-300'
        }`}
      >
        {option.tag && (
          <div className="absolute -top-3 left-0 right-0 flex justify-center">
            <span className={`text-xs font-medium px-3 py-1 rounded-full 
              ${option.id === 'gold' ? 'bg-amber-100 text-amber-800' :
                option.id === 'premium' ? 'bg-orange-100 text-orange-800' :
                option.id === 'diamond' ? 'bg-red-100 text-red-800' :
                option.id === 'standard' ? 'bg-green-100 text-green-800' :
                'bg-blue-100 text-blue-800'}`
            }>
              {option.tag}
            </span>
          </div>
        )}
        
        <CardContent className="p-6 pt-8">
          <div className="mb-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              {option.name}
              {option.popular && <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">Popular</span>}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isVietnamese ? option.vietnameseDescription : option.description}
            </p>
          </div>
          
          <div className="mb-4">
            {option.wasPrice && option.wasPrice > option.price && (
              <span className="line-through text-red-500 text-sm mr-2">${option.wasPrice.toFixed(2)}</span>
            )}
            <span className="text-2xl font-bold">${isFree ? '0' : totalPrice.toFixed(2)}</span>
            {!isFree && selectedDuration > 1 && (
              <span className="text-sm text-muted-foreground ml-1">
                (${discountedPrice.toFixed(2)}/mo)
              </span>
            )}
          </div>
          
          {!isFree && (
            <div className="mb-4">
              <Label htmlFor={`duration-${option.id}`} className="text-sm mb-1 block">
                {t("Billing Options", "Tùy chọn thanh toán")}:
              </Label>
              <Select 
                value={selectedDuration.toString()} 
                onValueChange={(value) => onDurationChange(parseInt(value))}
              >
                <SelectTrigger id={`duration-${option.id}`} className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {billingDurations.map((duration) => (
                    <SelectItem key={duration.months} value={duration.months.toString()}>
                      {isVietnamese ? duration.vietnameseLabel : duration.label}
                      {duration.discount > 0 && (
                        <span className="ml-1 text-green-600">
                          (Save {duration.discount}%)
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <ul className="space-y-2 mb-6">
            {option.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 shrink-0">{feature.split(' ')[0]}</span> {/* Emoji */}
                <span className="text-sm">{feature.split(' ').slice(1).join(' ')}</span> {/* Text without emoji */}
              </li>
            ))}
          </ul>
          
          <RadioGroup value={selectedPricing} className="mt-auto">
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value={option.id} 
                id={`pricing-${option.id}`}
                onClick={() => onChange(option.id)} 
              />
              <Label htmlFor={`pricing-${option.id}`} className="font-medium">
                {isSelected ? 'Selected' : 'Select'}
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Top row: Free, Standard, Gold */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topRowOptions.map(renderPricingCard)}
      </div>
      
      {/* Bottom row: Premium, Diamond */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bottomRowOptions.map(renderPricingCard)}
      </div>
      
      {/* Auto-renew option */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch 
              id="auto-renew" 
              checked={autoRenew}
              onCheckedChange={handleAutoRenewChange}
            />
            <div>
              <div className="flex items-center">
                <Label htmlFor="auto-renew" className="font-medium">
                  {t("Enable Auto-Renew and Save 20%", "Bật tự động gia hạn và tiết kiệm 20%")}
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">{t(
                        "You can cancel anytime. We'll remind you before billing.", 
                        "Bạn có thể hủy bất cứ lúc nào. Chúng tôi sẽ nhắc bạn trước khi thanh toán."
                      )}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Never worry about your listing expiring", 
                  "Không lo về việc tin đăng hết hạn"
                )}
              </p>
            </div>
          </div>
          
          {autoRenew && (
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {t("Saving 20%", "Tiết kiệm 20%")}
            </div>
          )}
        </div>
      </div>
      
      {/* Banner for all cards */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center text-sm text-blue-800">
        {t(
          "All listings expire after 30 days. Auto-renew saves you up to 40%.", 
          "Tất cả tin đăng sẽ hết hạn sau 30 ngày. Tự động gia hạn giúp bạn tiết kiệm đến 40%."
        )}
      </div>
    </div>
  );
};

export default PricingCards;
