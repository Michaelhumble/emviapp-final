import React, { useState, useEffect } from 'react';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import { calculateJobPostPrice, jobPricingOptions } from '@/utils/posting/jobPricing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import PricingDisplay from '@/components/posting/PricingDisplay';
import PaymentSummary from '@/components/posting/PaymentSummary';
import { SummaryTotals } from '@/components/posting/pricing/SummaryTotals';
import { DurationSelector } from '@/components/posting/pricing/DurationSelector';
import { useStripe } from '@/hooks/useStripe';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [showFreePostDialog, setShowFreePostDialog] = useState(false);
  const [showDiamondDialog, setShowDiamondDialog] = useState(false);
  const { isLoading } = useStripe();

  // Set default values if not already set
  useEffect(() => {
    if (!pricingOptions.selectedPricingTier) {
      setPricingOptions(prev => ({
        ...prev, 
        selectedPricingTier: 'premium',
        durationMonths: 1,
        autoRenew: true
      }));
    }
  }, [pricingOptions, setPricingOptions]);

  const handlePricingTierChange = (tier: string) => {
    // For Diamond tier, show special dialog
    if (tier === 'diamond') {
      setShowDiamondDialog(true);
      return;
    }

    // Otherwise update pricing tier normally
    setPricingOptions(prev => ({
      ...prev,
      selectedPricingTier: tier as any
    }));
    
    // For free tier, show reminder dialog
    if (tier === 'free') {
      setShowFreePostDialog(true);
    }
  };

  const handleDurationChange = (months: number) => {
    setPricingOptions(prev => ({
      ...prev,
      durationMonths: months
    }));
  };

  const handleAutoRenewChange = (autoRenew: boolean) => {
    setPricingOptions(prev => ({
      ...prev,
      autoRenew
    }));
  };

  const handleSubmitPayment = () => {
    // If this is a free post, show the dialog
    if (pricingOptions.selectedPricingTier === 'free') {
      setShowFreePostDialog(true);
    } else {
      onSubmit();
    }
  };

  const confirmFreePost = () => {
    setShowFreePostDialog(false);
    onSubmit();
  };

  const cancelFreePost = () => {
    setShowFreePostDialog(false);
  };

  const closeDiamondDialog = () => {
    setShowDiamondDialog(false);
  };

  // Calculate the pricing
  const pricing = calculateJobPostPrice(pricingOptions);
  const isFreePlan = pricingOptions.selectedPricingTier === 'free';
  const isDiamondPlan = pricingOptions.selectedPricingTier === 'diamond';
  const pricingTier = jobPricingOptions.find(tier => tier.id === pricingOptions.selectedPricingTier);
  const basePrice = pricingTier?.price || 0;

  // Safety check - form data validation
  if (!formData) {
    return <div>No form data available. Please go back and complete the form.</div>;
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 pl-0 hover:bg-transparent hover:text-purple-700"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Form
      </Button>
      
      <h2 className="text-2xl font-bold">Review & Payment</h2>
      <p className="text-gray-600">Review your post details and select your pricing plan</p>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Job Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Title */}
          <div>
            <h3 className="font-medium">Title</h3>
            <p className="text-gray-700">{formData.title}</p>
          </div>
          
          {/* Description */}
          {formData.description && (
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{formData.description}</p>
            </div>
          )}
          
          {/* Vietnamese Description */}
          {formData.vietnameseDescription && (
            <div>
              <h3 className="font-medium">Vietnamese Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{formData.vietnameseDescription}</p>
            </div>
          )}
          
          {/* Location */}
          <div>
            <h3 className="font-medium">Location</h3>
            <p className="text-gray-700">{formData.location}</p>
          </div>
          
          {/* Employment Type */}
          {formData.jobType && (
            <div>
              <h3 className="font-medium">Employment Type</h3>
              <p className="text-gray-700">{formData.jobType}</p>
            </div>
          )}
          
          {/* Requirements */}
          {Array.isArray(formData.requirements) && formData.requirements.length > 0 && (
            <div>
              <h3 className="font-medium">Requirements</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {formData.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Specialties */}
          {Array.isArray(formData.specialties) && formData.specialties.length > 0 && (
            <div>
              <h3 className="font-medium">Specialties</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.specialties.map((specialty, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Compensation */}
          {formData.salary_range && (
            <div>
              <h3 className="font-medium">Salary Range</h3>
              <p className="text-gray-700">{formData.salary_range}</p>
            </div>
          )}
          
          {/* Contact Information */}
          <div>
            <h3 className="font-medium">Contact Information</h3>
            <p className="text-gray-700">{formData.contactName}</p>
            <p className="text-gray-700">{formData.contactEmail}</p>
            {formData.contactPhone && <p className="text-gray-700">{formData.contactPhone}</p>}
          </div>
          
          {/* Photos */}
          {photoUploads.length > 0 && (
            <div>
              <h3 className="font-medium">Photos</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {photoUploads.map((photo, index) => (
                  <div key={index} className="relative h-20 w-20 rounded-md overflow-hidden border">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Upload ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Choose Your Plan</CardTitle>
          <CardDescription>
            Select the best plan to reach qualified candidates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pricing Tier Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Pricing Tier</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {jobPricingOptions
                .filter(option => !option.hidden)
                .map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handlePricingTierChange(option.id)}
                    className={`
                      border rounded-xl p-4 cursor-pointer transition-all relative
                      ${pricingOptions.selectedPricingTier === option.id
                        ? 'border-purple-500 ring-2 ring-purple-200'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                      ${option.popular ? 'bg-purple-50' : 'bg-white'}
                    `}
                  >
                    {option.popular && (
                      <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                    )}
                    {option.tag && (
                      <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                        {option.tag}
                      </span>
                    )}
                    {option.limitedSpots && (
                      <span className="absolute -top-3 right-2 bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs font-medium">
                        {option.limitedSpots}
                      </span>
                    )}
                    <div className="font-medium text-lg mb-1">{option.name}</div>
                    <div className="flex items-baseline mb-2">
                      <span className="text-2xl font-bold">${option.price.toFixed(2)}</span>
                      <span className="text-gray-500 ml-1">/month</span>
                      {option.wasPrice && option.wasPrice > option.price && (
                        <span className="line-through text-gray-400 ml-2 text-sm">
                          ${option.wasPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                    <ul className="space-y-1 mt-auto">
                      {option.features?.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center">
                          <span className="text-green-500 mr-1">✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                    {option.primaryBenefit && (
                      <p className="mt-2 text-xs text-purple-700 font-medium">{option.primaryBenefit}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
          
          {/* Duration Selection */}
          <DurationSelector
            durationMonths={pricingOptions.durationMonths}
            onDurationChange={handleDurationChange}
            selectedPricingTier={pricingOptions.selectedPricingTier}
            isDiamondPlan={isDiamondPlan}
          />
          
          {/* Summary Totals */}
          <SummaryTotals
            originalPrice={pricing.originalPrice}
            finalPrice={pricing.finalPrice}
            discountPercentage={pricing.discountPercentage}
            durationMonths={pricingOptions.durationMonths}
            autoRenew={pricingOptions.autoRenew || false}
            onAutoRenewChange={!isDiamondPlan ? handleAutoRenewChange : undefined}
          />
          
          <PricingDisplay
            basePrice={basePrice}
            duration={pricingOptions.durationMonths}
            pricingId={pricingOptions.selectedPricingTier}
            autoRenew={pricingOptions.autoRenew || false}
            originalPrice={pricing.originalPrice}
            finalPrice={pricing.finalPrice}
            discountPercentage={pricing.discountPercentage}
          />
        </CardContent>
        <CardFooter>
          <PaymentSummary
            basePrice={basePrice}
            duration={pricingOptions.durationMonths}
            autoRenew={pricingOptions.autoRenew || false}
            originalPrice={pricing.originalPrice}
            finalPrice={pricing.finalPrice}
            discountPercentage={pricing.discountPercentage}
            onProceedToPayment={handleSubmitPayment}
            isFreePlan={isFreePlan}
            isSubmitting={isSubmitting || isLoading}
          />
        </CardFooter>
      </Card>
      
      {/* Free Plan Reminder Dialog */}
      <AlertDialog open={showFreePostDialog} onOpenChange={setShowFreePostDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              One-Time Free Offer
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-2">This is a one-time free trial offer for new users. Your job post will be active for {pricingOptions.durationMonths} {pricingOptions.durationMonths > 1 ? 'months' : 'month'}.</p>
              <p className="font-medium">Credit card details are required to verify your account and prevent abuse of our platform.</p>
              <p className="mt-2 text-amber-600">After your free trial ends, your listing will expire unless you upgrade to a paid plan.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelFreePost}>Go Back</AlertDialogCancel>
            <AlertDialogAction onClick={confirmFreePost} className="bg-purple-600 hover:bg-purple-700">
              Continue with Free Trial
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Diamond Plan Dialog */}
      <AlertDialog open={showDiamondDialog} onOpenChange={setShowDiamondDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <span className="text-xl">💎</span>
              Diamond Plan - Exclusive Access
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-2">Our Diamond Plan is reserved for elite businesses with the highest visibility needs.</p>
              <p className="font-medium text-purple-700">Only 3 total spots available - contact our team to apply.</p>
              <p className="mt-2">Benefits include:</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>Guaranteed #1 positioning</li>
                <li>Custom design and branding</li>
                <li>Dedicated account manager</li>
                <li>VIP candidate matching</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeDiamondDialog} className="bg-purple-600 hover:bg-purple-700 w-full">
              Contact Sales Team
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
