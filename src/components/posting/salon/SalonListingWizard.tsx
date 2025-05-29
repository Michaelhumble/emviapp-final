
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonPricingOptions, SalonPricingTier } from '@/utils/posting/salonPricing';
import SalonDetailsStep from './steps/SalonDetailsStep';
import LocationDetailsStep from './steps/LocationDetailsStep';
import FinancialDetailsStep from './steps/FinancialDetailsStep';
import PhotoUpload from '../PhotoUpload';
import FeaturesDetailsStep from './steps/FeaturesDetailsStep';
import SalonPricingStep from './steps/SalonPricingStep';
import SalonReviewStep from './steps/SalonReviewStep';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

const steps = [
  { id: 1, title: 'Salon Identity', titleVi: 'Danh tính salon', icon: '🏪' },
  { id: 2, title: 'Location Details', titleVi: 'Chi tiết vị trí', icon: '📍' },
  { id: 3, title: 'Business Details', titleVi: 'Chi tiết kinh doanh', icon: '💼' },
  { id: 4, title: 'Photos', titleVi: 'Ảnh salon', icon: '📸' },
  { id: 5, title: 'Features & Amenities', titleVi: 'Tính năng & Tiện ích', icon: '⭐' },
  { id: 6, title: 'Pricing', titleVi: 'Giá cả', icon: '💰' },
  { id: 7, title: 'Review', titleVi: 'Xem lại', icon: '✅' }
];

const SalonListingWizard = ({ onComplete }: SalonListingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard' as SalonPricingTier,
    durationMonths: 3,
    featuredAddOn: false,
    autoRenew: false,
    isFirstPost: true,
    isNationwide: false,
    fastSalePackage: false,
    showAtTop: false,
    bundleWithJobPost: false
  });

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      // Identity fields with defaults
      salonName: '',
      businessType: 'Salon',
      beautyIndustry: 'Nails',
      establishedYear: '',
      
      // Location fields with defaults
      address: '',
      city: '',
      state: '',
      zipCode: '',
      neighborhood: '',
      hideExactAddress: false,
      
      // Financial fields with defaults
      askingPrice: '',
      monthlyRent: '',
      monthlyProfit: '',
      monthlyRevenue: '',
      employeeCount: '',
      numberOfStaff: '',
      numberOfTables: '',
      numberOfChairs: '',
      squareFeet: '',
      revenue: '',
      yearlyRevenue: '',
      
      // Description fields
      vietnameseDescription: '',
      englishDescription: '',
      reasonForSelling: '',
      virtualTourUrl: '',
      
      // Features defaults
      willTrain: false,
      hasHousing: false,
      hasWaxRoom: false,
      hasDiningRoom: false,
      hasLaundry: false,
      hasParking: false,
      
      // Pricing options defaults
      isNationwide: false,
      fastSalePackage: false,
      autoRenew: false,
      
      // Terms acceptance
      termsAccepted: false
    },
    mode: 'onChange'
  });

  const progress = (currentStep / steps.length) * 100;

  const validateCurrentStep = async () => {
    const values = form.getValues();
    
    switch (currentStep) {
      case 1: // Salon Identity
        return !!(values.salonName && values.businessType);
      case 2: // Location Details
        return !!(values.address && values.city && values.state);
      case 3: // Business Details
        return !!(values.askingPrice && values.monthlyRent);
      case 4: // Photos
        return photoUploads.length > 0;
      case 5: // Features & Amenities
        return true; // Optional step
      case 6: // Pricing
        return !!(pricingOptions.selectedPricingTier && pricingOptions.durationMonths);
      case 7: // Review
        return values.termsAccepted;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const formData = form.getValues();
    onComplete(formData, photoUploads, pricingOptions);
  };

  const handlePricingOptionsChange = (options: SalonPricingOptions) => {
    setPricingOptions(options);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <SalonDetailsStep form={form} />;
      case 2:
        return <LocationDetailsStep form={form} />;
      case 3:
        return <FinancialDetailsStep form={form} />;
      case 4:
        return (
          <PhotoUpload 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            maxPhotos={8}
          />
        );
      case 5:
        return <FeaturesDetailsStep form={form} />;
      case 6:
        return (
          <SalonPricingStep 
            pricingOptions={pricingOptions}
            onPricingChange={handlePricingOptionsChange}
          />
        );
      case 7:
        return (
          <SalonReviewStep 
            formData={form.getValues()}
            photoUploads={photoUploads}
            pricingOptions={pricingOptions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormProvider {...form}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Sell Your Salon / Bán Salon Của Bạn
                </h1>
                <p className="text-gray-600">
                  Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title} / {steps[currentStep - 1]?.titleVi}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">
                  Progress / Tiến độ
                </div>
                <div className="text-lg font-semibold text-blue-600">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <Progress value={progress} className="h-3 mb-4" />
            
            {/* Step Navigation */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all ${
                    step.id < currentStep 
                      ? 'bg-green-500 text-white' 
                      : step.id === currentStep 
                        ? 'bg-blue-500 text-white ring-4 ring-blue-100' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.id < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-1 mx-2 transition-all ${
                      step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {renderCurrentStep()}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="bg-white border-t border-gray-200 sticky bottom-0">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back / Quay lại
              </Button>

              <div className="flex items-center gap-4">
                {currentStep === steps.length ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Submit Listing / Đăng tin
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 flex items-center gap-2"
                  >
                    Next / Tiếp theo
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default SalonListingWizard;
