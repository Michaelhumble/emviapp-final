
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { JobPricingOption } from '@/utils/posting/types';
import { calculatePriceWithDuration } from '@/utils/posting/jobPricing';
import { useTranslation } from '@/hooks/useTranslation';
import { DurationOption } from '@/types/pricing';

interface PricingCardsProps {
  pricingOptions: JobPricingOption[];
  selectedPricing: string;
  onChange: (pricingId: string) => void;
  selectedDuration: number;
  onDurationChange: (months: number) => void;
}

const PricingCards: React.FC<PricingCardsProps> = ({
  pricingOptions,
  selectedPricing,
  onChange,
  selectedDuration,
  onDurationChange
}) => {
  const { t, isVietnamese } = useTranslation();
  const [autoRenew, setAutoRenew] = useState(false);

  const durationOptions: DurationOption[] = [
    { months: 1, label: '1 Month', vietnameseLabel: '1 Tháng', discount: 0 },
    { months: 3, label: '3 Months', vietnameseLabel: '3 Tháng', discount: 15 },
    { months: 6, label: '6 Months', vietnameseLabel: '6 Tháng', discount: 25 },
    { months: 12, label: '12 Months', vietnameseLabel: '12 Tháng', discount: 40 },
  ];

  const standardTiers = pricingOptions.filter(option => option.id !== 'diamond');
  const premiumTiers = pricingOptions.filter(option => option.id === 'premium' || option.id === 'diamond');

  const handleDurationSelect = (value: string) => {
    onDurationChange(parseInt(value, 10));
  };
  
  const displayDiscount = (basePrice: number, displayPrice: number, tierName?: string) => {
    if (basePrice <= 0 || displayPrice >= basePrice) return null;
    
    const savingsAmount = basePrice - displayPrice;
    const discountPercentage = Math.round((savingsAmount / basePrice) * 100);
    
    return (
      <div className="text-green-600 text-xs font-medium mt-1">
        {t(`Save ${discountPercentage}%`, `Tiết kiệm ${discountPercentage}%`)}
      </div>
    );
  };
  
  const getPrice = (option: JobPricingOption) => {
    if (option.price === 0) return { monthly: 0, total: 0, discount: 0 };
    
    const calc = calculatePriceWithDuration(
      option.price,
      selectedDuration,
      autoRenew
    );
    
    return {
      monthly: calc.monthlyPrice,
      total: calc.totalPrice,
      discount: calc.discountPercentage
    };
  };

  return (
    <div className="space-y-6">
      <RadioGroup value={selectedPricing} onValueChange={onChange} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {standardTiers.filter(tier => tier.id !== 'premium').map(option => {
            const pricing = getPrice(option);
            return (
              <Card key={option.id} className={`relative transition-all duration-300 ${option.popular ? 'border-yellow-400 border-2' : 'border'} ${selectedPricing === option.id ? 'ring-2 ring-primary' : ''}`}>
                {option.tag && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-secondary to-primary text-white text-xs py-1 px-3 text-center transform -translate-y-1/2 rounded-t-md">
                    {option.tag}
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-md font-medium flex items-center gap-1">
                        {option.name}
                        {option.popular && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded ml-1">Popular</span>}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isVietnamese ? option.vietnameseDescription : option.description}
                      </p>
                    </div>
                    <div className="rounded-full h-5 w-5 border-2 border-primary flex items-center justify-center">
                      {selectedPricing === option.id && <div className="rounded-full h-2 w-2 bg-primary"></div>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="mb-3">
                    {option.price > 0 && (
                      <>
                        <div className="mt-1">
                          <Select value={selectedDuration.toString()} onValueChange={handleDurationSelect}>
                            <SelectTrigger className="w-full h-8 text-xs">
                              <SelectValue placeholder={t("Select billing duration", "Chọn thời hạn thanh toán")} />
                            </SelectTrigger>
                            <SelectContent>
                              {durationOptions.map((option) => (
                                <SelectItem key={option.months} value={option.months.toString()}>
                                  {isVietnamese ? option.vietnameseLabel : option.label}
                                  {option.discount > 0 && ` (${t(`Save ${option.discount}%`, `Tiết kiệm ${option.discount}%`)})`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                    <div className="mt-3">
                      {option.wasPrice > option.price && (
                        <span className="line-through text-red-500 text-sm mr-2">${option.wasPrice.toFixed(2)}</span>
                      )}
                      <span className="font-bold text-xl">${pricing.monthly.toFixed(2)}</span>
                      {option.price > 0 && <span className="text-sm text-gray-500 ml-1">{t('/mo', '/tháng')}</span>}
                      {displayDiscount(option.wasPrice, pricing.monthly)}
                    </div>
                  </div>
                  
                  <ul className="space-y-1">
                    {option.features?.map((feature, idx) => (
                      <li key={idx} className="text-sm flex items-start">
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pricingOptions.filter(tier => tier.id === 'premium' || tier.id === 'diamond').map(option => {
            const pricing = getPrice(option);
            return (
              <Card key={option.id} className={`relative transition-all duration-300 ${option.id === 'diamond' ? 'border-indigo-400 border-2' : 'border'} ${selectedPricing === option.id ? 'ring-2 ring-primary' : ''}`}>
                {option.tag && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-secondary to-primary text-white text-xs py-1 px-3 text-center transform -translate-y-1/2 rounded-t-md">
                    {option.tag}
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-md font-medium flex items-center gap-1">
                        {option.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isVietnamese ? option.vietnameseDescription : option.description}
                      </p>
                    </div>
                    <div className="rounded-full h-5 w-5 border-2 border-primary flex items-center justify-center">
                      {selectedPricing === option.id && <div className="rounded-full h-2 w-2 bg-primary"></div>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="mb-3">
                    {option.price > 0 && (
                      <>
                        <div className="mt-1">
                          <Select value={selectedDuration.toString()} onValueChange={handleDurationSelect}>
                            <SelectTrigger className="w-full h-8 text-xs">
                              <SelectValue placeholder={t("Select billing duration", "Chọn thời hạn thanh toán")} />
                            </SelectTrigger>
                            <SelectContent>
                              {durationOptions.map((option) => (
                                <SelectItem key={option.months} value={option.months.toString()}>
                                  {isVietnamese ? option.vietnameseLabel : option.label}
                                  {option.discount > 0 && ` (${t(`Save ${option.discount}%`, `Tiết kiệm ${option.discount}%`)})`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                    <div className="mt-3">
                      {option.wasPrice > option.price && (
                        <span className="line-through text-red-500 text-sm mr-2">${option.wasPrice.toFixed(2)}</span>
                      )}
                      <span className="font-bold text-xl">${pricing.monthly.toFixed(2)}</span>
                      {option.price > 0 && <span className="text-sm text-gray-500 ml-1">{t('/mo', '/tháng')}</span>}
                      {displayDiscount(option.wasPrice, pricing.monthly)}
                    </div>
                  </div>
                  
                  <ul className="space-y-1">
                    {option.features?.map((feature, idx) => (
                      <li key={idx} className="text-sm flex items-start">
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </RadioGroup>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center space-x-2">
          <Switch id="auto-renew" 
            checked={autoRenew} 
            onCheckedChange={(checked) => setAutoRenew(checked)}
          />
          <div className="flex items-center gap-1">
            <Label htmlFor="auto-renew" className="text-sm">
              {t("Enable Auto-Renew and Save 20%", "Bật Tự động gia hạn và Tiết kiệm 20%")}
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={14} className="text-gray-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-64 text-xs">
                    {t("You can cancel anytime. We'll remind you before billing.", "Bạn có thể hủy bất cứ lúc nào. Chúng tôi sẽ nhắc bạn trước khi thanh toán.")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <Alert variant="default" className="bg-gray-50 border-gray-200">
        <AlertDescription className="text-xs text-center">
          {t("All listings expire after 30 days. Auto-renew saves you up to 20%.", "Tất cả bài đăng hết hạn sau 30 ngày. Tự động gia hạn giúp bạn tiết kiệm tới 20%.")}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PricingCards;
