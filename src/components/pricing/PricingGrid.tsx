
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';
import { PRICING_PLANS, DURATION_OPTIONS, calculateTotalPrice, DEFAULT_AUTO_RENEW } from '@/utils/posting/pricingConfig';
import { formatCurrency } from '@/lib/utils';
import { JobPricingTier } from '@/utils/posting/types';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface PricingGridProps {
  onSelectPlan: (tier: string, duration: number, autoRenew: boolean) => void;
  initialDuration?: number;
  initialAutoRenew?: boolean;
}

export const PricingGrid: React.FC<PricingGridProps> = ({
  onSelectPlan,
  initialDuration = 1,
  initialAutoRenew = DEFAULT_AUTO_RENEW
}) => {
  const { t } = useTranslation();
  const [durationMonths, setDurationMonths] = useState<number>(initialDuration);
  const [autoRenew, setAutoRenew] = useState<boolean>(initialAutoRenew);
  
  // Filter out hidden plans (Diamond)
  const visiblePlans = PRICING_PLANS.filter(plan => !plan.hidden);
  
  return (
    <div className="space-y-6">
      {/* Duration & Auto-Renew Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="w-full md:w-auto">
          <h3 className="text-sm font-medium mb-2">
            {t({
              english: "Select Duration",
              vietnamese: "Chọn Thời Hạn"
            })}
          </h3>
          <Tabs 
            defaultValue={String(durationMonths)} 
            onValueChange={(val) => setDurationMonths(Number(val))}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 w-full">
              {DURATION_OPTIONS.map(option => (
                <TabsTrigger 
                  key={option.months} 
                  value={String(option.months)}
                  className="text-xs md:text-sm"
                >
                  {t({
                    english: option.label,
                    vietnamese: option.vietnameseLabel
                  })}
                  {option.discount > 0 && (
                    <span className="ml-1 text-green-600 text-xs">-{option.discount}%</span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Switch
            id="auto-renew"
            checked={autoRenew}
            onCheckedChange={setAutoRenew}
          />
          <div>
            <Label htmlFor="auto-renew" className="font-medium">
              {t({
                english: "Auto-Renew",
                vietnamese: "Tự Động Gia Hạn"
              })}
            </Label>
            <p className="text-xs text-muted-foreground">
              {t({
                english: "Save 5% with auto-renewal",
                vietnamese: "Tiết kiệm 5% với tự động gia hạn"
              })}
            </p>
          </div>
        </div>
      </div>
      
      {/* Pricing grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {visiblePlans.map((plan) => {
          const { originalPrice, finalPrice, discountPercentage } = 
            calculateTotalPrice(plan.tier, durationMonths, autoRenew);
            
          const pricePerMonth = finalPrice / durationMonths;
          const isRecommended = plan.recommended;
          
          return (
            <Card key={plan.id} className={cn(
              "flex flex-col overflow-hidden transition-all",
              isRecommended && "border-purple-500 shadow-md"
            )}>
              {isRecommended && (
                <div className="bg-purple-500 text-white text-xs font-medium py-1 px-3 text-center">
                  {t({
                    english: "RECOMMENDED",
                    vietnamese: "KHUYẾN NGHỊ"
                  })}
                </div>
              )}
              
              <CardHeader className={cn(
                "pb-2",
                isRecommended ? "pt-4" : "pt-6"
              )}>
                <CardTitle className="flex justify-between items-start">
                  <div>
                    <span className="text-lg font-bold">{plan.name}</span>
                    {plan.tier === 'premium' && (
                      <span className="ml-2 inline-flex items-center text-amber-500">
                        <Sparkles className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                  {finalPrice > 0 ? (
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {formatCurrency(finalPrice)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {discountPercentage > 0 && (
                          <span className="line-through mr-1">
                            {formatCurrency(originalPrice)}
                          </span>
                        )}
                        <span>
                          {t({
                            english: "for",
                            vietnamese: "cho"
                          })} {durationMonths} {t({
                            english: durationMonths > 1 ? "months" : "month",
                            vietnamese: "tháng"
                          })}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatCurrency(pricePerMonth)}/mo
                      </div>
                    </div>
                  ) : (
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {t({
                          english: "Free",
                          vietnamese: "Miễn phí"
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t({
                          english: "Limited features",
                          vietnamese: "Tính năng giới hạn"
                        })}
                      </div>
                    </div>
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {t({
                    english: plan.description,
                    vietnamese: plan.vietnameseDescription || plan.description
                  })}
                </p>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <ul className="space-y-2 pt-4">
                  {plan.features?.map((feature, i) => (
                    <li key={i} className="flex text-sm">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-2 pb-6">
                <Button 
                  className={cn(
                    "w-full",
                    isRecommended ? "bg-purple-600 hover:bg-purple-700" : undefined
                  )} 
                  onClick={() => onSelectPlan(plan.tier, durationMonths, autoRenew)}
                >
                  {plan.tier === 'free' ? (
                    t({
                      english: "Select Free Plan",
                      vietnamese: "Chọn Gói Miễn Phí"
                    })
                  ) : (
                    t({
                      english: "Select Plan",
                      vietnamese: "Chọn Gói"
                    })
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PricingGrid;
