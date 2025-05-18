
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';
import { PricingOptions } from '@/utils/posting/types';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import PaymentSummary from '../PaymentSummary';
import PaymentConfirmationModal from '../PaymentConfirmationModal';

interface ReviewAndPaymentSectionProps {
  formData: any;
  photoUploads: File[];
  onBack: () => void;
  onSubmit: (pricingOptions: PricingOptions) => void;
  isSubmitting: boolean;
  pricingOptions: PricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<PricingOptions>>;
}

export const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  formData,
  photoUploads,
  onBack,
  onSubmit,
  isSubmitting,
  pricingOptions,
  setPricingOptions,
}) => {
  const { t, isVietnamese } = useTranslation();
  const [showVietnamese, setShowVietnamese] = useState(!!formData.vietnameseDescription);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Calculate pricing based on tier, duration, etc.
  const basePrice = pricingOptions.selectedPricingTier === 'premium' ? 29.99 :
                   pricingOptions.selectedPricingTier === 'standard' ? 19.99 : 0;
  
  const originalPrice = basePrice * pricingOptions.durationMonths;
  let discountPercentage = 0;
  
  if (pricingOptions.isFirstPost) {
    discountPercentage = 15;
  } else if (pricingOptions.autoRenew) {
    discountPercentage = 5;
  }
  
  const finalPrice = originalPrice * (1 - discountPercentage / 100);
  const isFreePost = pricingOptions.selectedPricingTier === 'free';
  
  const handleProceedToPayment = () => {
    if (isFreePost) {
      onSubmit(pricingOptions);
    } else {
      setShowConfirmation(true);
    }
  };
  
  const handleConfirmPayment = () => {
    setShowConfirmation(false);
    onSubmit(pricingOptions);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-2 text-gray-900">
          {t({
            english: 'Review Your Job Listing',
            vietnamese: 'Xem Lại Thông Tin Công Việc'
          })}
        </h2>
        <p className="text-gray-600 mb-6">
          {t({
            english: 'Please review your job posting before publishing',
            vietnamese: 'Vui lòng kiểm tra thông tin trước khi đăng'
          })}
        </p>
      </div>
      
      {/* Job Preview Card */}
      <Card className="overflow-hidden bg-white border border-gray-100 shadow-md rounded-xl">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Job Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-playfair text-2xl font-bold text-gray-900">{formData.title}</h3>
                <p className="text-lg text-gray-700 mt-1">{formData.location}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                  {formData.jobType === 'full-time' ? t({
                    english: 'Full Time',
                    vietnamese: 'Toàn Thời Gian'
                  }) : 
                  formData.jobType === 'part-time' ? t({
                    english: 'Part Time',
                    vietnamese: 'Bán Thời Gian'
                  }) : 
                  formData.jobType === 'contract' ? t({
                    english: 'Contract',
                    vietnamese: 'Hợp Đồng'
                  }) :
                  formData.jobType === 'temporary' ? t({
                    english: 'Temporary',
                    vietnamese: 'Tạm Thời'
                  }) : t({
                    english: 'Commission',
                    vietnamese: 'Hoa Hồng'
                  })}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                  {formData.experience_level === 'entry' ? t({
                    english: 'Entry Level',
                    vietnamese: 'Mới Bắt Đầu'
                  }) : 
                  formData.experience_level === 'intermediate' ? t({
                    english: 'Intermediate',
                    vietnamese: 'Trung Cấp'
                  }) : 
                  formData.experience_level === 'experienced' ? t({
                    english: 'Experienced',
                    vietnamese: 'Có Kinh Nghiệm'
                  }) : t({
                    english: 'Senior',
                    vietnamese: 'Cao Cấp'
                  })}
                </span>
                {formData.salary_range && (
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                    {formData.salary_range}
                  </span>
                )}
              </div>
              
              <div className="space-y-2 mt-6">
                <h4 className="font-bold text-gray-800">{t({
                  english: 'Job Description',
                  vietnamese: 'Mô Tả Công Việc'
                })}</h4>
                <p className="text-gray-700 whitespace-pre-line">{formData.description}</p>
              </div>
              
              {/* Toggle Vietnamese Description */}
              <div className="flex items-center space-x-2 pt-4">
                <Switch
                  checked={showVietnamese}
                  onCheckedChange={setShowVietnamese}
                  id="vietnamese-preview-mode"
                  disabled={!formData.vietnameseDescription}
                />
                <label
                  htmlFor="vietnamese-preview-mode"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {t({
                    english: 'Show Vietnamese Description',
                    vietnamese: 'Hiển Thị Mô Tả Tiếng Việt'
                  })}
                </label>
              </div>
              
              {showVietnamese && formData.vietnameseDescription && (
                <div className="space-y-2 mt-4">
                  <h4 className="font-bold text-gray-800">
                    {t({
                      english: 'Vietnamese Description',
                      vietnamese: 'Mô Tả Tiếng Việt'
                    })}
                  </h4>
                  <p className="text-gray-700 whitespace-pre-line">{formData.vietnameseDescription}</p>
                </div>
              )}
            </div>
            
            {/* Contact Information Card */}
            <div className="bg-gray-50 p-5 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-3">{t({
                english: 'Contact Information',
                vietnamese: 'Thông Tin Liên Hệ'
              })}</h4>
              
              <div className="grid gap-3">
                {formData.contactName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t({
                      english: 'Contact Name',
                      vietnamese: 'Tên Liên Hệ'
                    })}</span>
                    <span className="font-medium text-gray-800">{formData.contactName}</span>
                  </div>
                )}
                
                {formData.contactPhone && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t({
                      english: 'Phone Number',
                      vietnamese: 'Số Điện Thoại'
                    })}</span>
                    <span className="font-medium text-gray-800">{formData.contactPhone}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">{t({
                    english: 'Email Address',
                    vietnamese: 'Địa Chỉ Email'
                  })}</span>
                  <span className="font-medium text-gray-800">{formData.contactEmail}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">{t({
                    english: 'Location',
                    vietnamese: 'Địa Điểm'
                  })}</span>
                  <span className="font-medium text-gray-800">{formData.location}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Options */}
      <div className="space-y-6">
        <h3 className="font-playfair text-xl font-bold text-gray-900">{t({
          english: 'Choose Your Listing Package',
          vietnamese: 'Chọn Gói Đăng Tin'
        })}</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card 
            className={`cursor-pointer overflow-hidden transition-all duration-200 ${
              pricingOptions.selectedPricingTier === 'standard' 
                ? 'border-2 border-blue-400 shadow-md' 
                : 'border border-gray-200'
            }`}
            onClick={() => setPricingOptions({...pricingOptions, selectedPricingTier: 'standard'})}
          >
            <CardContent className="p-5">
              <h4 className="font-bold text-lg text-gray-900">
                {t({
                  english: 'Standard',
                  vietnamese: 'Tiêu Chuẩn'
                })}
              </h4>
              <div className="mt-2">
                <span className="text-2xl font-bold">$19.99</span>
                <span className="text-gray-500 text-sm ml-1">/ {t({
                  english: 'month',
                  vietnamese: 'tháng'
                })}</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">✓</span>
                  {t({
                    english: 'Standard listing visibility',
                    vietnamese: 'Hiển thị tiêu chuẩn'
                  })}
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">✓</span>
                  {t({
                    english: '30 days active',
                    vietnamese: 'Hiển thị 30 ngày'
                  })}
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer overflow-hidden transition-all duration-200 ${
              pricingOptions.selectedPricingTier === 'premium' 
                ? 'border-2 border-purple-500 shadow-md' 
                : 'border border-gray-200'
            }`}
            onClick={() => setPricingOptions({...pricingOptions, selectedPricingTier: 'premium'})}
          >
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 py-1.5 text-center text-white text-sm font-medium">
              {t({
                english: 'RECOMMENDED',
                vietnamese: 'ĐỀ XUẤT'
              })}
            </div>
            <CardContent className="p-5">
              <h4 className="font-bold text-lg text-gray-900">
                {t({
                  english: 'Premium',
                  vietnamese: 'Cao Cấp'
                })}
              </h4>
              <div className="mt-2">
                <span className="text-2xl font-bold">$29.99</span>
                <span className="text-gray-500 text-sm ml-1">/ {t({
                  english: 'month',
                  vietnamese: 'tháng'
                })}</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">✓</span>
                  {t({
                    english: 'Featured listing placement',
                    vietnamese: 'Vị trí nổi bật'
                  })}
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">✓</span>
                  {t({
                    english: 'Priority in search results',
                    vietnamese: 'Ưu tiên trong kết quả tìm kiếm'
                  })}
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">✓</span>
                  {t({
                    english: '30 days active',
                    vietnamese: 'Hiển thị 30 ngày'
                  })}
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer overflow-hidden transition-all duration-200 ${
              pricingOptions.selectedPricingTier === 'free' 
                ? 'border-2 border-gray-400 shadow-md' 
                : 'border border-gray-200'
            }`}
            onClick={() => setPricingOptions({...pricingOptions, selectedPricingTier: 'free'})}
          >
            <CardContent className="p-5">
              <h4 className="font-bold text-lg text-gray-900">
                {t({
                  english: 'Free',
                  vietnamese: 'Miễn Phí'
                })}
              </h4>
              <div className="mt-2">
                <span className="text-2xl font-bold">$0</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">✓</span>
                  {t({
                    english: 'Basic listing',
                    vietnamese: 'Đăng tin cơ bản'
                  })}
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">✓</span>
                  {t({
                    english: '7 days active',
                    vietnamese: 'Hiển thị 7 ngày'
                  })}
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">✓</span>
                  {t({
                    english: 'Limited visibility',
                    vietnamese: 'Hiển thị giới hạn'
                  })}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Duration Selection */}
        {pricingOptions.selectedPricingTier !== 'free' && (
          <div className="space-y-4 mt-6">
            <h4 className="font-medium text-gray-900">{t({
              english: 'Duration',
              vietnamese: 'Thời Hạn'
            })}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[1, 3, 6].map((months) => (
                <button 
                  key={months}
                  type="button"
                  onClick={() => setPricingOptions({...pricingOptions, durationMonths: months})}
                  className={`px-4 py-3 rounded-lg border text-center transition-all ${
                    pricingOptions.durationMonths === months 
                      ? 'border-purple-500 bg-purple-50 text-purple-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">
                    {months} {t({
                      english: months === 1 ? 'Month' : 'Months',
                      vietnamese: 'Tháng'
                    })}
                  </div>
                  {months > 1 && (
                    <div className="text-xs mt-1 text-green-600">
                      {months === 3 ? '-10%' : '-15%'}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Auto-renew Option */}
        {pricingOptions.selectedPricingTier !== 'free' && (
          <div className="flex items-center space-x-2">
            <Switch
              checked={pricingOptions.autoRenew}
              onCheckedChange={(checked) => setPricingOptions({...pricingOptions, autoRenew: checked})}
              id="auto-renew"
            />
            <div>
              <label 
                htmlFor="auto-renew" 
                className="text-sm font-medium leading-none cursor-pointer"
              >
                {t({
                  english: 'Auto-renew (5% discount)',
                  vietnamese: 'Tự động gia hạn (giảm giá 5%)'
                })}
              </label>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <p className="text-xs text-gray-500 mt-0.5 cursor-help">
                    {t({
                      english: 'Cancel anytime',
                      vietnamese: 'Có thể hủy bất cứ lúc nào'
                    })}
                  </p>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="text-sm">
                    {t({
                      english: 'Your listing will automatically renew at the end of the period. You can cancel auto-renewal at any time from your dashboard.',
                      vietnamese: 'Tin đăng của bạn sẽ tự động gia hạn vào cuối kỳ. Bạn có thể hủy tự động gia hạn bất cứ lúc nào từ bảng điều khiển.'
                    })}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        )}
      </div>
      
      {/* Payment Summary & Action Buttons */}
      <PaymentSummary 
        basePrice={basePrice}
        duration={pricingOptions.durationMonths}
        autoRenew={pricingOptions.autoRenew}
        originalPrice={originalPrice}
        finalPrice={finalPrice}
        discountPercentage={discountPercentage}
        onProceedToPayment={handleProceedToPayment}
        isFreePlan={isFreePost}
        isSubmitting={isSubmitting}
      />
      
      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
        >
          {t({
            english: 'Back',
            vietnamese: 'Quay Lại'
          })}
        </Button>
      </div>

      {/* Payment Confirmation Modal */}
      <PaymentConfirmationModal
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirmPayment={handleConfirmPayment}
        amount={finalPrice}
        options={pricingOptions}
        originalPrice={originalPrice}
        discountPercentage={discountPercentage}
      />

      <div className="text-center pt-6 pb-2">
        <p className="text-sm italic text-gray-500">
          Inspired by Sunshine ☀️
        </p>
      </div>
    </div>
  );
};
