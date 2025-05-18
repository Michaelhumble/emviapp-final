
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, ChevronLeft, Lock, ShieldCheck, Clock, CreditCard, AlertCircle } from 'lucide-react';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { SummaryTotals } from '../pricing/SummaryTotals';
import { jobPricingOptions, calculateJobPostPrice } from '@/utils/posting/jobPricing';
import { PricingOptions } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';
import PricingDisplay from '../PricingDisplay';
import PaymentSummary from '../PaymentSummary';
import { DurationSelector } from '../pricing/DurationSelector';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

interface ReviewAndPaymentSectionProps {
  formData: JobFormValues | null;
  photoUploads: File[];
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  pricingOptions: PricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<PricingOptions>>;
}

export function ReviewAndPaymentSection({
  formData,
  photoUploads,
  onBack,
  onSubmit,
  isSubmitting,
  pricingOptions,
  setPricingOptions
}: ReviewAndPaymentSectionProps) {
  const { t } = useTranslation();
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [countdown, setCountdown] = useState(900); // 15-minute countdown (in seconds)

  // Find the selected pricing tier
  const selectedPricing = jobPricingOptions.find(
    option => option.id === pricingOptions.selectedPricingTier
  );

  // Check if it's the diamond plan
  const isDiamondPlan = selectedPricing?.id === 'diamond';
  
  // Calculate prices based on the current options
  const { originalPrice, finalPrice, discountPercentage } = calculateJobPostPrice(pricingOptions);
  const isFreePlan = finalPrice === 0 || pricingOptions.selectedPricingTier === 'free';
  
  // Convert file objects to object URLs for preview
  useEffect(() => {
    const urls = photoUploads.map(file => URL.createObjectURL(file));
    setPhotoUrls(urls);
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [photoUploads]);
  
  // Set up countdown timer for FOMO effect
  useEffect(() => {
    if (countdown <= 0) return;
    
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [countdown]);
  
  // Format the countdown time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Handle duration change
  const handleDurationChange = (months: number) => {
    setPricingOptions(prev => ({ ...prev, durationMonths: months }));
  };
  
  // Handle auto-renew toggle
  const handleAutoRenewChange = (autoRenew: boolean) => {
    setPricingOptions(prev => ({ ...prev, autoRenew }));
  };

  const handleRequestDiamondInvitation = () => {
    toast.info("Request submitted", {
      description: "Our team will contact you shortly about the Diamond plan.",
      duration: 5000
    });
  };

  return (
    <div className="space-y-6">
      <CardHeader className="px-0 md:px-2">
        <div className="flex items-center space-x-2 mb-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          
          {discountPercentage > 0 && (
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
              <Clock className="h-3 w-3 mr-1" />
              <span>Special Offer: {discountPercentage}% OFF • <b>{formatTime(countdown)}</b></span>
            </Badge>
          )}
        </div>
        <CardTitle>Review & Post Your Job</CardTitle>
        <CardDescription>
          Review your job listing and complete payment to publish.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-0 md:px-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Job Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Summary Card */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg">Job Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {formData && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">{formData.title}</h3>
                      <p className="text-gray-500 text-sm">{formData.location}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Description</h4>
                      <p className="text-sm whitespace-pre-line">{formData.description}</p>
                    </div>
                    
                    {formData.vietnameseDescription && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Vietnamese Description</h4>
                        <p className="text-sm whitespace-pre-line">{formData.vietnameseDescription}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium">Job Type</h4>
                        <p>{formData.jobType}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Experience</h4>
                        <p>{formData.experience_level}</p>
                      </div>
                    </div>
                    
                    {formData.requirements && formData.requirements.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Requirements</h4>
                        <ul className="list-disc pl-5 text-sm">
                          {formData.requirements.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Photos Preview */}
            {photoUrls.length > 0 && (
              <Card>
                <CardHeader className="bg-gray-50">
                  <CardTitle className="text-lg">Photos ({photoUrls.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {photoUrls.map((url, index) => (
                      <div 
                        key={index} 
                        className="aspect-square rounded-md overflow-hidden border bg-gray-100"
                      >
                        <img 
                          src={url} 
                          alt={`Job photo ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Duration Selector */}
            <Card>
              <CardContent className="p-4">
                <DurationSelector
                  durationMonths={pricingOptions.durationMonths}
                  onDurationChange={handleDurationChange}
                  isDiamondPlan={isDiamondPlan}
                />
              </CardContent>
            </Card>
            
            {/* Pricing Summary */}
            <Card>
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg">Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {selectedPricing && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{selectedPricing.name} Plan</h3>
                        <p className="text-sm text-gray-500">{selectedPricing.description}</p>
                      </div>
                      {selectedPricing.tag && (
                        <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                          {selectedPricing.tag}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Price Display */}
                    <PricingDisplay
                      basePrice={selectedPricing.price}
                      duration={pricingOptions.durationMonths}
                      pricingId={selectedPricing.id}
                      autoRenew={pricingOptions.autoRenew || false}
                      originalPrice={originalPrice}
                      finalPrice={finalPrice}
                      discountPercentage={discountPercentage}
                    />
                    
                    {/* Total and Auto-Renew Settings */}
                    <SummaryTotals
                      originalPrice={originalPrice}
                      finalPrice={finalPrice}
                      discountPercentage={discountPercentage}
                      durationMonths={pricingOptions.durationMonths}
                      autoRenew={pricingOptions.autoRenew || false}
                      onAutoRenewChange={handleAutoRenewChange}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right column: Payment Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-4">
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader>
                  <CardTitle>Post Summary</CardTitle>
                  <CardDescription>
                    Your job will go live immediately after payment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Job Title & Photos Count */}
                    <div>
                      <h3 className="font-medium truncate">{formData?.title || "Your Job Post"}</h3>
                      <p className="text-sm text-gray-500">
                        {formData?.jobType || "Job"} • {photoUrls.length} photo{photoUrls.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    
                    {/* Credit Card Required Notice - Always show */}
                    {isFreePlan && (
                      <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800">
                        <div className="flex items-start gap-2">
                          <CreditCard className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">Credit card required for free trial</p>
                            <p className="text-xs mt-0.5">
                              Your card will only be charged after your 30-day free trial if you don't cancel.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Payment Summary & Action Button */}
                    {isDiamondPlan ? (
                      <div className="mt-6">
                        <Button 
                          onClick={handleRequestDiamondInvitation} 
                          className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            "Request Diamond Plan Invitation"
                          )}
                        </Button>
                        
                        <p className="text-xs text-center mt-2 text-gray-500">
                          Our team will contact you to discuss premium placement options
                        </p>
                      </div>
                    ) : (
                      <PaymentSummary
                        basePrice={selectedPricing?.price || 0}
                        duration={pricingOptions.durationMonths}
                        autoRenew={pricingOptions.autoRenew || false}
                        originalPrice={originalPrice}
                        finalPrice={finalPrice}
                        discountPercentage={discountPercentage}
                        onProceedToPayment={onSubmit}
                        isFreePlan={isFreePlan}
                        isSubmitting={isSubmitting}
                      />
                    )}
                    
                    {/* FOMO and Offer Countdown */}
                    {discountPercentage > 0 && !isDiamondPlan && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500">This offer expires in</p>
                        <p className="text-sm font-bold text-amber-600">{formatTime(countdown)}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
