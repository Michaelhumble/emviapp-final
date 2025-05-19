
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, Star, Info } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { JobPricingOption, JobPricingTier } from '@/utils/posting/types';
import { usePricing } from '@/context/pricing/PricingProvider';

// Include a jobPricingOptions array if it doesn't exist elsewhere
const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Basic listing for first-time users',
    vietnameseDescription: 'Đăng tin cơ bản miễn phí cho người dùng lần đầu',
    tier: 'free',
    features: ['1 month visibility', 'Basic listing'],
    hidden: false,
    isFirstPost: true,
    tag: 'First Post Only'
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 20,
    description: 'Essential visibility for your job post',
    vietnameseDescription: 'Khả năng hiển thị cần thiết cho bài đăng việc làm của bạn',
    tier: 'standard',
    features: ['30-day listing', 'Email support', 'Appears in search results'],
    popular: false,
    hidden: false
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 30,
    wasPrice: 35,
    description: 'Stand out with premium placement and visibility',
    vietnameseDescription: 'Nổi bật với vị trí và khả năng hiển thị cao cấp',
    tier: 'premium',
    features: ['Featured in search results', 'Priority customer support', 'Analytics dashboard', 'Social media boost'],
    popular: true,
    hidden: false,
    tag: 'Most Popular',
    upsellText: 'Get up to 5× more applicants!',
    limitedSpots: '7 spots left today'
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 50,
    wasPrice: 60,
    description: 'Maximum visibility with premium placement',
    vietnameseDescription: 'Khả năng hiển thị tối đa với vị trí cao cấp',
    tier: 'gold',
    features: ['Top-of-page listing', 'Featured badge', 'Urgent hiring badge', 'SMS notifications', 'Dedicated account manager'],
    popular: false,
    hidden: false,
    tag: 'Best Value',
    upsellText: 'Preferred by top salons',
    limitedSpots: '3 spots left today'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 75,
    description: 'Elite placement for urgent hiring needs',
    vietnameseDescription: 'Vị trí ưu tiên cao nhất cho nhu cầu tuyển dụng khẩn cấp',
    tier: 'diamond',
    features: ['Premium design', 'Top of all listings', 'Highlighted listing', 'Social media promotion', 'Homepage feature'],
    popular: false,
    hidden: false,
    tag: 'Elite',
    upsellText: 'Guaranteed results'
  }
];

interface PricingTierSelectorProps {
  onSelected?: (tier: JobPricingTier) => void;
  showFree?: boolean;
  isFirstPost?: boolean;
}

const PricingTierSelector: React.FC<PricingTierSelectorProps> = ({ 
  onSelected, 
  showFree = true,
  isFirstPost = true
}) => {
  const { t } = useTranslation();
  const { pricingOptions, setPricingOptions } = usePricing();
  
  // Filter options based on the showFree prop and isFirstPost
  const displayOptions = jobPricingOptions.filter(option => {
    // Hide the free tier unless showFree is true AND isFirstPost is true
    if (option.tier === 'free') {
      return showFree && isFirstPost;
    }
    // Hide options that are marked as hidden
    return !option.hidden;
  });

  const handleOptionChange = (value: string) => {
    const selectedTier = value as JobPricingTier;
    setPricingOptions(prev => ({
      ...prev,
      selectedPricingTier: selectedTier
    }));
    
    if (onSelected) {
      onSelected(selectedTier);
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">
          {t({
            english: "Select Your Visibility Level",
            vietnamese: "Chọn Cấp Độ Hiển Thị Của Bạn"
          })}
        </h3>
        <p className="text-gray-600 text-sm">
          {t({
            english: "Choose how prominently your job listing will appear to potential candidates",
            vietnamese: "Chọn mức độ nổi bật của tin đăng việc làm của bạn đối với các ứng viên tiềm năng"
          })}
        </p>
      </div>
      
      <RadioGroup 
        value={pricingOptions.selectedPricingTier}
        onValueChange={handleOptionChange}
        className="space-y-3"
      >
        {displayOptions.map((option) => (
          <div key={option.id} className="relative">
            {option.tag && (
              <Badge className="absolute -top-2 right-4 z-10 bg-purple-100 text-purple-800 border-purple-200">
                {option.tag}
              </Badge>
            )}
            
            {option.limitedSpots && (
              <div className="absolute -bottom-2 right-4 z-10">
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px]">
                  <Star className="h-3 w-3 fill-amber-500 mr-1" /> {option.limitedSpots}
                </Badge>
              </div>
            )}
            
            <Card className={`
              border overflow-hidden transition-all duration-200 hover:shadow-md
              ${pricingOptions.selectedPricingTier === option.tier ? 'ring-2 ring-purple-500 bg-purple-50/30' : 'bg-white'}
              ${option.popular ? 'border-purple-200' : 'border-gray-200'}
            `}>
              <div className={`${option.popular ? 'bg-purple-500 text-white text-xs py-1 text-center' : 'hidden'}`}>
                {t({ english: "MOST POPULAR", vietnamese: "PHỔ BIẾN NHẤT" })}
              </div>
              <CardContent className={`p-0`}>
                <Label
                  htmlFor={option.id}
                  className={`flex cursor-pointer items-start p-4 gap-4 ${pricingOptions.selectedPricingTier === option.tier ? 'bg-purple-50/30' : 'hover:bg-gray-50'}`}
                >
                  <RadioGroupItem value={option.tier} id={option.id} className="mt-1" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-base">{option.name}</h3>
                      <div className="text-right">
                        {option.wasPrice && (
                          <span className="text-sm text-gray-500 line-through mr-2">${option.wasPrice}</span>
                        )}
                        <span className="font-bold text-lg">${option.price}</span>
                      </div>
                    </div>
                    
                    {/* Description with language support */}
                    <p className="text-sm text-gray-600 mb-3">
                      {t({ 
                        english: option.description,
                        vietnamese: option.vietnameseDescription || option.description
                      })}
                    </p>
                    
                    {/* Features list */}
                    <ul className="space-y-2">
                      {option.features?.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{t({ english: feature, vietnamese: feature })}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {option.upsellText && (
                      <div className="mt-3 text-sm text-purple-700 flex items-center">
                        <Info className="h-4 w-4 mr-1" />
                        {option.upsellText}
                      </div>
                    )}
                  </div>
                </Label>
              </CardContent>
            </Card>
          </div>
        ))}
      </RadioGroup>
      
      <TooltipProvider>
        <div className="mt-6 text-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs text-gray-500 cursor-help underline underline-offset-2">
                {t({
                  english: "How are visibility levels determined?",
                  vietnamese: "Làm thế nào các cấp độ hiển thị được xác định?"
                })}
              </span>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs">
              <p>
                {t({
                  english: "Visibility levels determine how prominently your listing appears in search results and browse pages. Higher visibility increases your chances of finding the right candidate quickly.",
                  vietnamese: "Cấp độ hiển thị xác định mức độ nổi bật của bài đăng của bạn trong kết quả tìm kiếm và trang duyệt. Khả năng hiển thị cao hơn sẽ tăng cơ hội tìm được ứng viên phù hợp nhanh chóng."
                })}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default PricingTierSelector;
