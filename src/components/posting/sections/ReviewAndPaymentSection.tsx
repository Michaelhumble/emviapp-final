
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MapPin, Building, Calendar, Mail, Phone, User, Clock, Award, CheckCircle } from 'lucide-react';
import { PricingTierSelector } from '@/components/posting/pricing/PricingTierSelector';
import PaymentSummary from '@/components/posting/PaymentSummary';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface ReviewAndPaymentSectionProps {
  formData: JobFormValues | null;
  photoUploads: File[];
  onBack: () => void;
  onSubmit: (pricingOptions: PricingOptions) => void;
  isSubmitting: boolean;
  pricingOptions: PricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<PricingOptions>>;
}

const getJobTypeLabel = (jobType: string): string => {
  const jobTypeMap: Record<string, string> = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    'contract': 'Contract',
    'temporary': 'Temporary',
    'commission': 'Commission',
  };
  
  return jobTypeMap[jobType] || jobType;
};

const getExperienceLevelLabel = (level: string): string => {
  const levelMap: Record<string, string> = {
    'entry': 'Entry Level',
    'intermediate': 'Intermediate',
    'experienced': 'Experienced',
    'senior': 'Senior Level',
  };
  
  return levelMap[level] || level;
};

export const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  formData,
  photoUploads,
  onBack,
  onSubmit,
  isSubmitting,
  pricingOptions,
  setPricingOptions,
}) => {
  const { t } = useTranslation();
  
  const [autoRenew, setAutoRenew] = useState(true);
  
  const handlePricingOptionsChange = (options: Partial<PricingOptions>) => {
    setPricingOptions(prev => ({
      ...prev,
      ...options,
    }));
  };
  
  const calculatePricing = () => {
    // Base pricing by tier
    const basePrices: Record<string, number> = {
      'free': 0,
      'standard': 29,
      'premium': 49,
      'gold': 89,
      'diamond': 129,
    };
    
    // Discounts for longer durations
    const durationMultipliers = {
      1: 1, // no discount
      3: 2.7, // 10% discount
      6: 4.8, // 20% discount
      12: 8.4, // 30% discount
    };
    
    // Get base price
    const basePrice = basePrices[pricingOptions.selectedPricingTier] || basePrices.standard;
    
    // Calculate original price without discounts
    const originalMonthlyPrice = basePrice;
    const originalPrice = originalMonthlyPrice * pricingOptions.durationMonths;
    
    // Apply first post discount if applicable (20%)
    const firstPostDiscount = pricingOptions.isFirstPost && basePrice > 0 ? 0.2 : 0;
    
    // Calculate final price with all discounts
    let discountedPrice = basePrice;
    
    if (firstPostDiscount > 0) {
      discountedPrice = basePrice * (1 - firstPostDiscount);
    }
    
    // Apply duration discount
    const durationMultiplier = durationMultipliers[pricingOptions.durationMonths as 1 | 3 | 6 | 12] || pricingOptions.durationMonths;
    const finalPrice = discountedPrice * durationMultiplier;
    
    // Calculate discount percentage
    const totalDiscount = pricingOptions.selectedPricingTier === 'free' 
      ? 0 
      : Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
    
    return {
      basePrice,
      originalPrice,
      finalPrice,
      discountPercentage: totalDiscount,
    };
  };
  
  const pricing = calculatePricing();
  
  const handleProceedToPayment = () => {
    onSubmit(pricingOptions);
  };
  
  const isFreePlan = pricingOptions.selectedPricingTier === 'free';
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-playfair font-medium mb-4">
          {t({
            english: "Review Job Details",
            vietnamese: "Xem Lại Chi Tiết Công Việc"
          })}
        </h2>
        
        <Card className="overflow-hidden border-gray-200">
          <CardContent className="p-6">
            {/* Job detail preview */}
            <div className="space-y-6">
              {/* Header with title and location */}
              <div>
                <h3 className="text-2xl font-playfair font-medium">{formData?.title || 'Job Title'}</h3>
                <div className="flex items-center mt-1 text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{formData?.location || 'Location'}</span>
                </div>
              </div>
              
              {/* Job photo (if uploaded) */}
              {photoUploads.length > 0 && (
                <div className="mb-6">
                  <div className="aspect-video rounded-lg overflow-hidden border border-gray-200">
                    <img 
                      src={URL.createObjectURL(photoUploads[0])}
                      alt={formData?.title || "Job environment"} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* If no photo uploaded, show placeholder */}
              {photoUploads.length === 0 && (
                <div className="mb-6">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Building className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No workplace photo provided</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Job details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {/* Job type and experience level */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData?.jobType && (
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {getJobTypeLabel(formData.jobType)}
                      </Badge>
                    )}
                    {formData?.experience_level && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {getExperienceLevelLabel(formData.experience_level)}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">
                        {t({
                          english: "Description",
                          vietnamese: "Mô Tả"
                        })}
                      </h4>
                      <div className="text-gray-700 whitespace-pre-line">
                        {formData?.description || 'No description provided'}
                      </div>
                    </div>
                    
                    {formData?.vietnameseDescription && (
                      <div>
                        <h4 className="font-medium mb-2">
                          {t({
                            english: "Vietnamese Description",
                            vietnamese: "Mô Tả Tiếng Việt"
                          })}
                        </h4>
                        <div className="text-gray-700 whitespace-pre-line">
                          {formData.vietnameseDescription}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {/* Compensation */}
                  <div className="space-y-4">
                    <h4 className="font-medium">
                      {t({
                        english: "Compensation",
                        vietnamese: "Thù Lao"
                      })}
                    </h4>
                    
                    {formData?.salary_range && (
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                        <div>
                          <p className="font-medium text-sm">Salary Range</p>
                          <p className="text-gray-700">{formData.salary_range}</p>
                        </div>
                      </div>
                    )}
                    
                    {formData?.compensation_details && (
                      <div className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-gray-500 mt-1" />
                        <div>
                          <p className="font-medium text-sm">Additional Details</p>
                          <p className="text-gray-700">{formData.compensation_details}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {/* Requirements and specialties */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Specialties */}
                    {formData?.specialties && formData.specialties.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">
                          {t({
                            english: "Specialties",
                            vietnamese: "Chuyên Môn"
                          })}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {formData.specialties.map((specialty, index) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              className="bg-gray-50 text-gray-700"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Requirements */}
                    {formData?.requirements && formData.requirements.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">
                          {t({
                            english: "Requirements",
                            vietnamese: "Yêu Cầu"
                          })}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {formData.requirements.map((requirement, index) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              className="bg-gray-50 text-gray-700"
                            >
                              {requirement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  {/* Contact Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-4">
                      {t({
                        english: "Contact Information",
                        vietnamese: "Thông Tin Liên Hệ"
                      })}
                    </h4>
                    
                    <div className="space-y-3">
                      {formData?.contactName && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-700">{formData.contactName}</span>
                        </div>
                      )}
                      
                      {formData?.contactEmail && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-700">{formData.contactEmail}</span>
                        </div>
                      )}
                      
                      {formData?.contactPhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-700">{formData.contactPhone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-2xl font-playfair font-medium mb-4">
          {t({
            english: "Select Premium Options",
            vietnamese: "Chọn Các Tùy Chọn Cao Cấp"
          })}
        </h2>
        
        <PricingTierSelector
          options={pricingOptions}
          onChange={handlePricingOptionsChange}
          postType="job"
        />
        
        <PaymentSummary 
          basePrice={pricing.basePrice}
          duration={pricingOptions.durationMonths}
          autoRenew={autoRenew}
          originalPrice={pricing.originalPrice}
          finalPrice={pricing.finalPrice}
          discountPercentage={pricing.discountPercentage}
          onProceedToPayment={handleProceedToPayment}
          isFreePlan={isFreePlan}
          isSubmitting={isSubmitting}
        />
      </div>
      
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          disabled={isSubmitting}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t({
            english: "Back to Edit",
            vietnamese: "Quay lại chỉnh sửa"
          })}
        </Button>
      </div>
    </div>
  );
};
