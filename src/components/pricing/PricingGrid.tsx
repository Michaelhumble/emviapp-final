
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckIcon, XIcon } from 'lucide-react';
import { PRICING_PLANS, DURATION_OPTIONS } from '@/utils/posting/pricingConfig';
import { formatCurrency } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PricingGridProps {
  onSelectPlan: (tier: string, duration: number, autoRenew: boolean) => void;
}

export const PricingGrid: React.FC<PricingGridProps> = ({ onSelectPlan }) => {
  const { t } = useTranslation();
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [autoRenew, setAutoRenew] = useState<boolean>(true);
  
  // Filter out hidden plans (diamond tier)
  const visiblePlans = PRICING_PLANS.filter(plan => !plan.hidden);
  
  const handleSelectPlan = (tier: string) => {
    onSelectPlan(tier, selectedDuration, autoRenew);
  };
  
  return (
    <div className="space-y-6">
      {/* Duration and renewal options */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium mb-2">
            {t({
              english: "Posting Duration",
              vietnamese: "Thời Hạn Đăng Tin"
            })}
          </label>
          <Select 
            value={String(selectedDuration)} 
            onValueChange={(value) => setSelectedDuration(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {DURATION_OPTIONS.map((duration) => (
                <SelectItem key={duration.months} value={String(duration.months)}>
                  {t({
                    english: duration.label,
                    vietnamese: duration.vietnameseLabel
                  })}
                  {duration.discount > 0 && (
                    <span className="ml-2 text-green-600">(-{duration.discount}%)</span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Pricing cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visiblePlans.map((plan) => {
          const price = plan.priceMonthly || plan.price;
          
          return (
            <Card 
              key={plan.id}
              className={`border ${plan.recommended ? 'border-2 border-primary shadow-md relative' : ''}`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white hover:bg-primary/90">
                    {t({
                      english: "Recommended",
                      vietnamese: "Đề xuất"
                    })}
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{plan.name}</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold">${(price).toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {t({
                    english: plan.description,
                    vietnamese: plan.vietnameseDescription || plan.description
                  })}
                </p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {(plan.features || []).map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.recommended ? "default" : "outline"}
                  onClick={() => handleSelectPlan(plan.tier)}
                >
                  {t({
                    english: "Select Plan",
                    vietnamese: "Chọn Gói"
                  })}
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
