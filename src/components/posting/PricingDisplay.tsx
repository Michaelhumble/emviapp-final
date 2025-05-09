import { CheckCircle, DollarSign, AlertCircle } from "lucide-react";
import { PricingOptions, PostType } from "@/utils/posting/types";
import { useTranslation } from "@/hooks/useTranslation";

interface PricingDisplayProps {
  postType: PostType;
  price: number;
  options?: PricingOptions;
  promotionalText?: string;
  originalPrice?: number;
  discountPercentage?: number;
  duration?: number;
  pricingId?: string;
}

const PricingDisplay = ({ 
  postType, 
  price, 
  options,
  promotionalText, 
  originalPrice,
  discountPercentage,
  duration = 1,
  pricingId
}: PricingDisplayProps) => {
  const { t } = useTranslation();
  const isDiamondPlan = pricingId === 'diamond';
  
  const formattedPrice = price.toFixed(2);
  const formattedOriginalPrice = originalPrice ? originalPrice.toFixed(2) : undefined;
  
  // Calculate total price based on duration
  let actualPrice = price;
  if (!isDiamondPlan && discountPercentage && discountPercentage > 0) {
    actualPrice = price * (1 - discountPercentage/100) * duration;
  } else {
    // For Diamond, it's always a fixed yearly price
    actualPrice = isDiamondPlan ? price : price * duration;
  }
  
  const totalFormattedPrice = actualPrice.toFixed(2);
  
  // For Diamond plan, show special duration text
  const durationText = isDiamondPlan 
    ? `${t('Annual plan', 'Gói thường niên')}`
    : (duration > 1 ? `${t('for', 'trong')} ${duration} ${t('months', 'tháng')}` : '');
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500/5 to-purple-500/5 px-4 py-3 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{t('Total', 'Tổng cộng')}</h3>
          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-2">
              {formattedOriginalPrice && Number(formattedOriginalPrice) > Number(formattedPrice) && (
                <span className="text-sm line-through text-red-500">${formattedOriginalPrice}</span>
              )}
              <span className="text-xl font-bold">${totalFormattedPrice}</span>
            </div>
            {!isDiamondPlan && discountPercentage && discountPercentage > 0 && (
              <span className="text-xs text-green-600 font-medium">
                {t('Saving', 'Tiết kiệm')}: {discountPercentage}%
              </span>
            )}
          </div>
        </div>
        {durationText && (
          <div className="text-xs text-muted-foreground text-right mt-1">
            {durationText}
          </div>
        )}
      </div>
      
      <div className="p-4 bg-white">
        <div className="flex flex-col space-y-2 mb-3">
          <div className="flex items-start">
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-sm">
              {isDiamondPlan 
                ? t('365-day premium listing', 'Tin nổi bật 365 ngày')
                : postType === 'job' 
                  ? t('30-day job listing', 'Tin tuyển dụng 30 ngày') 
                  : postType === 'salon' 
                    ? t('Salon for sale listing (30 days)', 'Tin bán tiệm (30 ngày)')
                    : postType === 'booth' 
                      ? t('Booth rental listing (30 days)', 'Tin cho thuê booth (30 ngày)')
                      : t('Supply listing (30 days)', 'Tin bán thiết bị (30 ngày)')}
            </span>
          </div>
          
          {options?.isNationwide && (
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">{t('Nationwide visibility', 'Hiển thị toàn quốc')}</span>
            </div>
          )}
          
          {options?.fastSalePackage && (
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">{t('Featured placement + Fast Sale Package', 'Vị trí nổi bật + Gói bán nhanh')}</span>
            </div>
          )}
          
          {options?.showAtTop && (
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">{t('Top position in search results', 'Vị trí hàng đầu trong kết quả tìm kiếm')}</span>
            </div>
          )}
          
          {options?.isFirstPost && (
            <div className="flex items-start">
              <DollarSign className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm text-amber-700 font-medium">{t('First-time poster discount applied', 'Áp dụng giảm giá cho người đăng lần đầu')}</span>
            </div>
          )}
          
          {!isDiamondPlan && duration && duration > 1 && (
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">
                {duration}-{t('month subscription', 'tháng đăng ký')}
                {duration >= 3 ? ` ${t('with discount', 'với giảm giá')}` : ''}
              </span>
            </div>
          )}
          
          {isDiamondPlan && (
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">
                {t('Annual premium listing', 'Đăng tin đặc biệt thường niên')}
              </span>
            </div>
          )}
        </div>
        
        {promotionalText && (
          <div className="mt-3 py-2 px-3 bg-indigo-50 rounded-md text-sm text-indigo-700 border border-indigo-100">
            {promotionalText}
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingDisplay;
