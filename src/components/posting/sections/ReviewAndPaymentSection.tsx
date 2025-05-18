
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Clock, Zap, Crown, Check, Shield } from 'lucide-react';
import PricingTierSelector from '@/components/posting/pricing/PricingTierSelector';
import { JobPostPreview } from '@/components/posting/job/JobPostPreview';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { calculateJobPostPrice } from '@/utils/posting/jobPricing';

interface ReviewAndPaymentSectionProps {
  formData: JobFormValues | null;
  photoUploads?: File[];
  onBack: () => void;
  onSubmit: (pricingOptions: PricingOptions) => Promise<void>;
  isSubmitting: boolean;
  pricingOptions: PricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<PricingOptions>>;
}

export const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  formData,
  photoUploads = [],
  onBack,
  onSubmit,
  isSubmitting,
  pricingOptions,
  setPricingOptions,
}) => {
  // Ensure formData.requirements and formData.specialties are arrays
  if (formData) {
    formData.requirements = Array.isArray(formData.requirements) ? formData.requirements : [];
    formData.specialties = Array.isArray(formData.specialties) ? formData.specialties : [];
  }

  // Fixed type: Use JobPricingTier instead of string
  const [selectedPricingTier, setSelectedPricingTier] = useState<JobPricingTier>(
    pricingOptions.selectedPricingTier || 'premium'
  );
  
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [autoRenew, setAutoRenew] = useState<boolean>(true);
  
  // Duration options with discount info
  const durationOptions = [
    { value: 1, label: '1 month', discount: 0 },
    { value: 3, label: '3 months', discount: 10 },
    { value: 6, label: '6 months', discount: 20 },
    { value: 12, label: '12 months', discount: 35 }
  ];

  // Fixed handler to properly use JobPricingTier type
  const handlePricingTierSelect = (tier: JobPricingTier) => {
    setSelectedPricingTier(tier);
    setPricingOptions(prev => ({ 
      ...prev, 
      selectedPricingTier: tier 
    }));
  };
  
  // Handle duration change
  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
    setPricingOptions(prev => ({ 
      ...prev, 
      durationMonths: duration 
    }));
  };
  
  // Handle auto-renew toggle
  const handleAutoRenewToggle = (checked: boolean) => {
    setAutoRenew(checked);
    setPricingOptions(prev => ({ 
      ...prev, 
      autoRenew: checked 
    }));
  };

  const handleSubmit = async () => {
    // Update final pricing options
    const updatedOptions = {
      ...pricingOptions,
      selectedPricingTier,
      durationMonths: selectedDuration,
      autoRenew
    };
    
    setPricingOptions(updatedOptions);
    await onSubmit(updatedOptions);
  };

  const calculatePrice = () => {
    // Calculate price based on tier, duration and auto-renew
    const { finalPrice } = calculateJobPostPrice({
      selectedPricingTier: selectedPricingTier,
      durationMonths: selectedDuration,
      isFirstPost: pricingOptions.isFirstPost
    });
    
    // Apply 5% discount for auto-renew
    return autoRenew ? finalPrice * 0.95 : finalPrice;
  };
  
  // Get original price before all discounts
  const getOriginalPrice = () => {
    const option = jobPricingOptions.find(opt => opt.tier === selectedPricingTier);
    return option?.wasPrice ? option.wasPrice * selectedDuration : 0;
  };
  
  // Calculate savings percentage
  const calculateSavings = () => {
    const original = getOriginalPrice();
    const final = calculatePrice();
    
    if (original === 0) return 0;
    return Math.round(((original - final) / original) * 100);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-playfair font-medium">Review & Payment</h2>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Edit
        </Button>
      </div>
      
      {/* Limited time offer banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100 shadow-sm">
        <div className="flex items-center gap-2 text-amber-800 font-medium">
          <Clock className="h-5 w-5 text-amber-600" />
          <span>50% OFF Launch Special – Today Only!</span>
        </div>
        <p className="text-sm text-amber-700 mt-1">
          Our regular prices will be twice as high after the launch period. Lock in your forever rate today!
        </p>
      </div>
      
      {/* Job Post Preview Card */}
      <div className="mb-8">
        <h3 className="text-xl font-playfair mb-4">Preview Your Post Before Payment</h3>
        <JobPostPreview 
          jobData={formData} 
          photoUploads={photoUploads} 
          onBack={onBack}
        />
      </div>
      
      <Separator className="my-6" />
      
      {/* Pricing Tiers */}
      <PricingTierSelector 
        selectedTier={pricingOptions.selectedPricingTier} 
        onTierSelect={handlePricingTierSelect} 
        pricingOptions={pricingOptions}
        isFirstPost={pricingOptions.isFirstPost}
      />
      
      {/* Duration selection */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-3">Choose Your Duration & Save More</h3>
        <RadioGroup 
          value={selectedDuration.toString()} 
          onValueChange={(value) => handleDurationChange(parseInt(value))}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {durationOptions.map(option => (
            <div key={option.value} className="relative">
              <RadioGroupItem
                value={option.value.toString()}
                id={`duration-${option.value}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`duration-${option.value}`}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="font-medium">{option.label}</span>
                {option.discount > 0 && (
                  <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-200">Save {option.discount}%</Badge>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      {/* Auto renew toggle */}
      <Card className="border-amber-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Plan Options & Savings</CardTitle>
          <CardDescription>Configure additional options for your listing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-renew" className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-amber-500" />
                  Auto-renew Monthly
                </Label>
                <p className="text-xs text-muted-foreground">
                  Never lose your spot or special rate
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100">Save 5%</Badge>
                <Switch
                  id="auto-renew"
                  checked={autoRenew}
                  onCheckedChange={handleAutoRenewToggle}
                />
              </div>
            </div>
            
            {/* Nationwide add-on */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="nationwide"
                checked={pricingOptions.isNationwide}
                onCheckedChange={(checked) => 
                  setPricingOptions(prev => ({ ...prev, isNationwide: !!checked }))
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="nationwide" className="text-sm flex items-center">
                  <Zap className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                  Nationwide Reach
                </Label>
                <p className="text-sm text-muted-foreground">
                  Show to candidates across the country (+$5.00)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Payment summary card */}
      <Card className="border-indigo-100 bg-gradient-to-br from-slate-50 to-indigo-50">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center">
            <span>Payment Summary</span>
            {calculateSavings() > 0 && (
              <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200">
                You save {calculateSavings()}%
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {getOriginalPrice() > 0 && (
              <div className="flex justify-between text-sm">
                <span>Regular price:</span>
                <span className="line-through text-muted-foreground">${getOriginalPrice().toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-sm">
              <span>Base price ({selectedDuration} {selectedDuration === 1 ? 'month' : 'months'}):</span>
              <span>${calculateJobPostPrice({
                selectedPricingTier: selectedPricingTier,
                durationMonths: selectedDuration
              }).finalPrice.toFixed(2)}</span>
            </div>
            
            {autoRenew && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Auto-renew discount:</span>
                <span>-5%</span>
              </div>
            )}
            
            {pricingOptions.isNationwide && (
              <div className="flex justify-between text-sm">
                <span>Nationwide reach:</span>
                <span>+$5.00</span>
              </div>
            )}
            
            <div className="pt-2 border-t border-indigo-100 mt-2">
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>${(calculatePrice() + (pricingOptions.isNationwide ? 5 : 0)).toFixed(2)}</span>
              </div>
              
              {autoRenew && (
                <div className="text-xs text-gray-500 mt-1">
                  Billed {selectedDuration === 1 ? 'monthly' : `every ${selectedDuration} months`}. Cancel anytime.
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4">
            <Button 
              type="button" 
              variant="default" 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
            >
              {isSubmitting ? 'Processing...' : 'Continue to Payment'}
            </Button>
            
            <div className="flex justify-center gap-1.5 items-center mt-2 text-xs text-gray-500">
              <Shield className="h-3.5 w-3.5" />
              <span>Secure payment • All plans require credit card</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1"
        >
          Back to Edit
        </Button>
      </div>
    </div>
  );
};
