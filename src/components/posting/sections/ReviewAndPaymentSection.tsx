import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jobPostingTranslations } from '@/translations/jobPostingForm';
import { JobPricingOption } from '@/utils/posting/types';
import PricingCard from '@/components/pricing/PricingCard';

interface PricingCardProps {
  pricing: JobPricingOption;
  isSelected: boolean;
  onSelect: () => void;
  durationMonths: number;
}

interface ReviewAndPaymentSectionProps {
  formData: any;
  pricingOptions: any;
  isSubmitting: boolean;
  onPricingChange: (pricingId: string) => void;
  onDurationChange: (months: number) => void;
  onSubmit: () => void;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  formData,
  pricingOptions,
  isSubmitting,
  onPricingChange,
  onDurationChange,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const translations = jobPostingTranslations.review;
  const [agreesToTerms, setAgreesToTerms] = React.useState(false);
  const [termsError, setTermsError] = React.useState(false);
  
  // Find selected pricing option
  const selectedPricing = pricingOptions.selectedPricingTier || 'standard';
  const selectedDuration = pricingOptions.durationMonths || 1;
  
  const handleSubmit = () => {
    if (!agreesToTerms) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    onSubmit();
  };
  
  // Simplified pricing display component
  const PricingDisplay = ({ price, originalPrice, finalPrice, discountPercentage }: { 
    price: number, 
    originalPrice?: number, 
    finalPrice?: number, 
    discountPercentage?: number 
  }) => {
    if (originalPrice && finalPrice && discountPercentage) {
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">${finalPrice}</span>
            <span className="text-sm line-through text-gray-500">${originalPrice}</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
              Save {discountPercentage}%
            </Badge>
          </div>
        </div>
      );
    }
    
    return (
      <div className="text-2xl font-bold text-gray-900">
        ${price}
      </div>
    );
  };
  
  const PricingOptions = () => {
    const jobPricingOptions = formData.pricingOptions;
    
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Duration</h3>
              <Select
                value={String(selectedDuration)} 
                onValueChange={(value) => onDurationChange(parseInt(value))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Month</SelectItem>
                  <SelectItem value="3">3 Months (10% off)</SelectItem>
                  <SelectItem value="6">6 Months (20% off)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Price</h3>
              {/* Replace with correct price calculation */}
              <PricingDisplay 
                price={jobPricingOptions?.price || 49} 
              />
              <p className="text-sm text-gray-600 mt-1">
                For {selectedDuration} month{selectedDuration > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t(translations.sectionTitle)}</h2>
      <p className="text-muted-foreground">{t(translations.sectionDescription)}</p>
      
      {/* Job details summary card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">{t(translations.jobDetails)}</h3>
          <div className="space-y-2">
            <p><strong>{t(translations.jobDetails)}:</strong> {formData.title}</p>
            <p><strong>{t(translations.compensation)}:</strong> {formData.salary_range}</p>
            <p><strong>{t(translations.contactInfo)}:</strong> {formData.contactEmail}</p>
          </div>
          <Button variant="link" className="mt-4">{t(translations.edit)}</Button>
        </CardContent>
      </Card>
      
      {/* Pricing section */}
      <h3 className="text-lg font-medium mt-8 mb-4">{t(translations.pricing)}</h3>
      
      <div className="grid gap-6">
        {/* Pricing options */}
        <PricingOptions />
        
        {/* Terms and conditions */}
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="terms" 
            checked={agreesToTerms}
            onCheckedChange={(checked) => {
              setAgreesToTerms(checked as boolean);
              if (checked) setTermsError(false);
            }}
          />
          <div className="space-y-1 leading-none">
            <Label
              htmlFor="terms"
              className={`text-sm font-normal ${termsError ? 'text-red-500' : ''}`}
            >
              {t(translations.termsLabel)}
            </Label>
            {termsError && (
              <p className="text-red-500 text-xs">{t(translations.termsError)}</p>
            )}
          </div>
        </div>
        
        {/* Submit button */}
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="w-full md:w-auto md:min-w-[200px]"
        >
          {isSubmitting ? 
            t(translations.processingPayment) : 
            t(translations.submitButton)
          }
        </Button>
      </div>
    </div>
  );
};

export default ReviewAndPaymentSection;
