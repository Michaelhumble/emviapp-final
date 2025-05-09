
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { JobPricingOption } from '@/utils/posting/types';

interface PricingCardsProps {
  pricingOptions: JobPricingOption[];
  selectedPricing: string;
  onChange: (value: string) => void;
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

  return (
    <div className="space-y-6">
      <RadioGroup 
        value={selectedPricing} 
        onValueChange={onChange} 
        className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {pricingOptions.map((option) => (
          <div key={option.id} className="relative">
            <RadioGroupItem 
              value={option.id} 
              id={option.id} 
              className="sr-only" 
            />
            <label
              htmlFor={option.id}
              className="cursor-pointer block h-full"
            >
              <Card 
                className={`hover:border-primary transition-colors h-full ${
                  selectedPricing === option.id ? 'border-2 border-primary shadow-md' : 'border'
                }`}
              >
                <CardContent className="pt-6 h-full flex flex-col">
                  {option.popular && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-medium py-1 px-2 rounded-bl-md rounded-tr-md">
                      {t('POPULAR', 'PHỔ BIẾN')}
                    </div>
                  )}
                  
                  <div className="absolute top-3 left-3">
                    {selectedPricing === option.id && (
                      <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col h-full">
                    <h3 className="font-medium text-lg">{option.name}</h3>
                    
                    {option.tag && (
                      <span className="text-xs text-amber-600 font-medium">
                        {option.tag}
                      </span>
                    )}
                    
                    <div className="mt-3 flex items-baseline">
                      <span className="text-2xl font-bold">${option.price}</span>
                      {option.wasPrice && (
                        <span className="text-sm ml-2 line-through text-muted-foreground">
                          ${option.wasPrice}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-2">
                      {isVietnamese ? option.vietnameseDescription : option.description}
                    </p>
                    
                    <ul className="mt-4 space-y-2 flex-grow">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="text-sm flex gap-2 items-start">
                          <div className="h-4 w-4 mt-0.5 text-primary flex-shrink-0">
                            <Check className="h-4 w-4" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {option.note && (
                      <p className="text-xs text-muted-foreground mt-4 pt-2 border-t">
                        {option.note}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </label>
          </div>
        ))}
      </RadioGroup>
      
      {/* Duration selection */}
      <div className="border rounded-md p-4 bg-muted/10">
        <h4 className="font-medium mb-3">{t('Post Duration', 'Thời hạn đăng')}</h4>
        <RadioGroup 
          value={selectedDuration.toString()} 
          onValueChange={(value) => onDurationChange(parseInt(value, 10))}
          className="grid grid-cols-3 gap-2"
        >
          <label
            htmlFor="duration-1"
            className={`border rounded-md p-3 flex flex-col items-center text-center cursor-pointer transition-colors ${
              selectedDuration === 1 ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
            }`}
          >
            <RadioGroupItem value="1" id="duration-1" className="sr-only" />
            <span className="font-medium">{t('1 Month', '1 Tháng')}</span>
            <span className="text-xs text-muted-foreground">{t('Standard Price', 'Giá tiêu chuẩn')}</span>
          </label>
          
          <label
            htmlFor="duration-3"
            className={`border rounded-md p-3 flex flex-col items-center text-center cursor-pointer transition-colors ${
              selectedDuration === 3 ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
            }`}
          >
            <RadioGroupItem value="3" id="duration-3" className="sr-only" />
            <span className="font-medium">{t('3 Months', '3 Tháng')}</span>
            <span className="text-xs text-muted-foreground">{t('Save 15%', 'Tiết kiệm 15%')}</span>
          </label>
          
          <label
            htmlFor="duration-6"
            className={`border rounded-md p-3 flex flex-col items-center text-center cursor-pointer transition-colors ${
              selectedDuration === 6 ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
            }`}
          >
            <RadioGroupItem value="6" id="duration-6" className="sr-only" />
            <span className="font-medium">{t('6 Months', '6 Tháng')}</span>
            <span className="text-xs text-muted-foreground">{t('Save 25%', 'Tiết kiệm 25%')}</span>
          </label>
        </RadioGroup>
      </div>
    </div>
  );
};

export default PricingCards;
