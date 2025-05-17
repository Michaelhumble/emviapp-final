
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PricingOptions } from '@/utils/posting/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { Switch } from '@/components/ui/switch';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JobPostOptionsProps {
  pricingOptions: PricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<PricingOptions>>;
}

const JobPostOptions: React.FC<JobPostOptionsProps> = ({ pricingOptions, setPricingOptions }) => {
  const { t, isVietnamese } = useTranslation();
  
  const handlePricingChange = (tier: string) => {
    setPricingOptions(prev => ({ ...prev, selectedPricingTier: tier }));
    
    // Turn off auto-renew for free tier
    if (tier === 'free') {
      setPricingOptions(prev => ({ ...prev, autoRenew: false }));
    }
  };
  
  const handleDurationChange = (months: number) => {
    setPricingOptions(prev => ({ ...prev, durationMonths: months }));
  };
  
  return (
    <Card className="mt-8 border-purple-200">
      <CardHeader>
        <CardTitle>{t({
          english: "Choose Your Posting Plan",
          vietnamese: "Chọn Gói Đăng Tin"
        })}</CardTitle>
        <CardDescription>{t({
          english: "Select the right plan for reaching quality candidates",
          vietnamese: "Lựa chọn gói phù hợp để tiếp cận ứng viên chất lượng"
        })}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={pricingOptions.selectedPricingTier}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {jobPricingOptions.map(option => (
            <Label
              key={option.id}
              className={cn(
                "cursor-pointer rounded-lg border-2 p-4 hover:bg-gray-50 transition-colors relative",
                pricingOptions.selectedPricingTier === option.id 
                  ? "border-purple-500 bg-purple-50" 
                  : "border-gray-200"
              )}
              htmlFor={`plan-${option.id}`}
            >
              <div className="flex justify-between">
                <div>
                  <RadioGroupItem 
                    value={option.id} 
                    id={`plan-${option.id}`} 
                    className="sr-only"
                    onClick={() => handlePricingChange(option.id)} 
                  />
                  <div className="font-bold text-lg">{option.name}</div>
                  <div className="text-gray-500 text-sm">
                    {isVietnamese ? option.vietnameseDescription : option.description}
                  </div>
                </div>
                <div className="font-bold text-lg">
                  {option.price === 0 
                    ? t({
                        english: "Free",
                        vietnamese: "Miễn phí"
                      })
                    : new Intl.NumberFormat('en-US', { 
                        style: 'currency', 
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                      }).format(option.price)
                  }
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {option.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-purple-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              {pricingOptions.selectedPricingTier === option.id && (
                <div className="absolute -top-2 -right-2 rounded-full bg-purple-500 text-white p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </Label>
          ))}
        </RadioGroup>
        
        <div className="mt-6">
          <h3 className="font-medium mb-3">{t({
            english: "Duration",
            vietnamese: "Thời hạn"
          })}</h3>
          <RadioGroup 
            value={pricingOptions.durationMonths.toString()}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[1, 3, 6, 12].map(months => {
              const discountLabel = months > 1 
                ? months === 3 ? '-10%' 
                : months === 6 ? '-15%' 
                : '-20%' 
                : null;
              
              return (
                <Label
                  key={months}
                  className={cn(
                    "cursor-pointer rounded-lg border-2 p-3 hover:bg-gray-50 transition-colors text-center relative",
                    pricingOptions.durationMonths === months 
                      ? "border-purple-500 bg-purple-50" 
                      : "border-gray-200"
                  )}
                  htmlFor={`duration-${months}`}
                >
                  <RadioGroupItem 
                    value={months.toString()} 
                    id={`duration-${months}`} 
                    className="sr-only"
                    onClick={() => handleDurationChange(months)} 
                  />
                  <div className="font-medium">
                    {months} {t({
                      english: months === 1 ? "Month" : "Months",
                      vietnamese: "Tháng"
                    })}
                  </div>
                  
                  {discountLabel && (
                    <div className="absolute -top-2 -right-2 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                      {discountLabel}
                    </div>
                  )}
                </Label>
              );
            })}
          </RadioGroup>
        </div>
        
        {pricingOptions.selectedPricingTier !== 'free' && (
          <div className="mt-6 flex items-center space-x-2">
            <Switch
              id="auto-renew"
              checked={pricingOptions.autoRenew}
              onCheckedChange={(checked) => 
                setPricingOptions(prev => ({ ...prev, autoRenew: checked }))
              }
            />
            <Label htmlFor="auto-renew">{t({
              english: "Auto-renew my posting when it expires (5% discount)",
              vietnamese: "Tự động gia hạn khi hết hạn (giảm 5%)"
            })}</Label>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobPostOptions;
