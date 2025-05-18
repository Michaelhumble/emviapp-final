
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { PricingOptions } from '@/utils/posting/types';
import { calculateJobPostPrice } from '@/utils/posting/jobPricing';
import { JobFormValues } from '../job/jobFormSchema';
import { usePostPayment } from '@/hooks/usePostPayment';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import PaymentSummary from '../PaymentSummary';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ReviewAndPaymentSectionProps {
  formData: JobFormValues;
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
  setPricingOptions
}) => {
  const [showVietnamese, setShowVietnamese] = useState(!!formData.vietnameseDescription);
  const { initiatePayment } = usePostPayment();
  
  // Calculate job price using the existing pricing logic
  const priceCalculation = calculateJobPostPrice(pricingOptions);
  
  const handleProceedToPayment = () => {
    onSubmit(pricingOptions);
  };
  
  const formatJobType = (type: string): string => {
    switch (type) {
      case 'full-time': return 'Full-Time';
      case 'part-time': return 'Part-Time';
      case 'contract': return 'Contract';
      case 'temporary': return 'Temporary';
      case 'commission': return 'Commission';
      default: return type;
    }
  };
  
  const formatExperienceLevel = (level: string): string => {
    switch (level) {
      case 'entry': return 'Entry Level';
      case 'intermediate': return 'Intermediate';
      case 'experienced': return 'Experienced';
      case 'senior': return 'Senior';
      default: return level;
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-6 space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="font-playfair text-2xl font-bold text-gray-900">Review & Submit</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Summary Section */}
        <div className="space-y-6">
          <Card className="border border-[#e8e1d5] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#fcfaf5] to-[#f8f3e9] opacity-40" />
            <div className="relative px-6 py-5 border-b border-[#e8e1d5]">
              <h3 className="font-playfair text-xl font-bold text-gray-900">Job Summary</h3>
            </div>
            <CardContent className="relative p-6 space-y-6">
              <div className="space-y-4">
                <h1 className="font-playfair text-2xl font-bold text-gray-900">{formData.title}</h1>
                
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                    {formatJobType(formData.jobType)}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                    {formatExperienceLevel(formData.experience_level)}
                  </span>
                  {formData.location && (
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                      {formData.location}
                    </span>
                  )}
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Description (English)</h4>
                  <p className="text-gray-700 mt-1 whitespace-pre-wrap">{formData.description}</p>
                </div>
                
                {formData.vietnameseDescription && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">Vietnamese Description</h4>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="show-vietnamese" 
                          checked={showVietnamese} 
                          onCheckedChange={setShowVietnamese} 
                          className="data-[state=checked]:bg-gray-900"
                        />
                        <Label htmlFor="show-vietnamese" className="text-sm text-gray-600">
                          {showVietnamese ? 'Hide' : 'Show'}
                        </Label>
                      </div>
                    </div>
                    {showVietnamese && (
                      <p className="text-gray-700 whitespace-pre-wrap">{formData.vietnameseDescription}</p>
                    )}
                  </div>
                )}
                
                {formData.salary_range && (
                  <div>
                    <h4 className="font-semibold text-gray-900">Salary Range</h4>
                    <p className="text-gray-700 mt-1">{formData.salary_range}</p>
                  </div>
                )}
                
                {formData.compensation_details && (
                  <div>
                    <h4 className="font-semibold text-gray-900">Compensation Details</h4>
                    <p className="text-gray-700 mt-1">{formData.compensation_details}</p>
                  </div>
                )}

                {/* Contact Information */}
                <div className="py-2 border-t border-gray-100">
                  <h3 className="font-playfair text-lg font-semibold mb-3">Contact Information</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contact Email:</span>
                      <span className="font-medium text-gray-900">{formData.contactEmail || 'Not provided'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contact Name:</span>
                      <span className="font-medium text-gray-900">{formData.contactName || 'Not provided'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contact Phone:</span>
                      <span className="font-medium text-gray-900">{formData.contactPhone || 'Not provided'}</span>
                    </div>
                  </div>
                </div>
                
                {photoUploads.length > 0 && (
                  <div className="py-3">
                    <h4 className="font-semibold text-gray-900">Photos</h4>
                    <div className="flex mt-2 gap-2 overflow-x-auto pb-2">
                      {photoUploads.map((file, index) => (
                        <div 
                          key={index}
                          className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border border-gray-200"
                        >
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {formData.requirements && formData.requirements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900">Requirements</h4>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-700">
                      {formData.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="text-xs italic text-right text-gray-400">
                EmviApp
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Pricing & Payment Section */}
        <div className="space-y-6">
          <Card className={cn(
            "overflow-hidden border",
            pricingOptions.selectedPricingTier === 'premium' ? "border-[#e8dfe3]" :
            pricingOptions.selectedPricingTier === 'gold' ? "border-[#e8e1d5]" :
            pricingOptions.selectedPricingTier === 'diamond' ? "border-[#dfd8cf]" :
            "border-gray-200"
          )}>
            <div className={cn(
              "absolute inset-0 opacity-40",
              pricingOptions.selectedPricingTier === 'premium' ? "bg-gradient-to-br from-[#faf4f6] to-[#f5e9ec]" :
              pricingOptions.selectedPricingTier === 'gold' ? "bg-gradient-to-br from-[#f9f6f0] to-[#f3efe0]" :
              pricingOptions.selectedPricingTier === 'diamond' ? "bg-gradient-to-br from-[#f7f5f3] to-[#efe8e1]" :
              "bg-gradient-to-br from-[#f7f8f8] to-[#eef0f0]"
            )} />
            <div className="relative px-6 py-5 border-b border-gray-100">
              <h3 className="font-playfair text-xl font-bold text-gray-900">Payment Details</h3>
            </div>
            
            <CardContent className="relative p-6 space-y-5">
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <span className="text-lg font-semibold text-gray-900">
                    {pricingOptions.selectedPricingTier.charAt(0).toUpperCase() + pricingOptions.selectedPricingTier.slice(1)} Plan
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    ${priceCalculation.finalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {pricingOptions.durationMonths} month{pricingOptions.durationMonths > 1 ? 's' : ''}
                </div>
              </div>
              
              {/* Display pricing options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Duration</h4>
                    <p className="text-xs text-gray-600">How long your job will be posted</p>
                  </div>
                  <div className="flex space-x-2">
                    {[1, 3, 6].map((months) => (
                      <button
                        key={months}
                        className={cn(
                          "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                          pricingOptions.durationMonths === months
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        )}
                        onClick={() => setPricingOptions({
                          ...pricingOptions,
                          durationMonths: months
                        })}
                      >
                        {months} {months === 1 ? "month" : "months"}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Auto-renew</h4>
                    <p className="text-xs text-gray-600">Automatically renew when expired</p>
                  </div>
                  <Switch
                    checked={!!pricingOptions.autoRenew}
                    onCheckedChange={(checked) => setPricingOptions({
                      ...pricingOptions,
                      autoRenew: checked
                    })}
                    className="data-[state=checked]:bg-gray-900"
                  />
                </div>
              </div>

              <PaymentSummary
                basePrice={priceCalculation.originalPrice / pricingOptions.durationMonths}
                duration={pricingOptions.durationMonths}
                autoRenew={!!pricingOptions.autoRenew}
                originalPrice={priceCalculation.originalPrice}
                finalPrice={priceCalculation.finalPrice}
                discountPercentage={priceCalculation.discountPercentage}
                onProceedToPayment={handleProceedToPayment}
                isFreePlan={pricingOptions.selectedPricingTier === 'free'}
                isSubmitting={isSubmitting}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};
