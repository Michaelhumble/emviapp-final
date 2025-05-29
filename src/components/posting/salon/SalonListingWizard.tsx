
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

// Import all step components
import SalonDetailsStep from './steps/SalonDetailsStep';
import LocationDetailsStep from './steps/LocationDetailsStep';
import FinancialDetailsStep from './steps/FinancialDetailsStep';
import PhotoUpload from '@/components/posting/PhotoUpload';
import FeaturesDetailsStep from './steps/FeaturesDetailsStep';
import SalonPricingStep from './steps/SalonPricingStep';
import SalonReviewStep from './steps/SalonReviewStep';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

const SalonListingWizard = ({ onComplete }: SalonListingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
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
      salonName: '',
      businessType: 'Nail Salon',
      beautyIndustry: 'Nails',
      establishedYear: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      neighborhood: '',
      hideExactAddress: false,
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
      vietnameseDescription: '',
      englishDescription: '',
      reasonForSelling: '',
      virtualTourUrl: '',
      willTrain: false,
      hasHousing: false,
      hasWaxRoom: false,
      hasDiningRoom: false,
      hasLaundry: false,
      hasParking: false,
      isNationwide: false,
      fastSalePackage: false,
      autoRenew: false,
      termsAccepted: false
    }
  });

  const steps = [
    {
      title: 'Salon Identity / Danh tính salon',
      component: <SalonDetailsStep form={form} />
    },
    {
      title: 'Location Details / Chi tiết vị trí',
      component: <LocationDetailsStep form={form} />
    },
    {
      title: 'Business Details / Chi tiết kinh doanh',
      component: <FinancialDetailsStep form={form} />
    },
    {
      title: 'Photos / Ảnh salon',
      component: <PhotoUpload photoUploads={photoUploads} setPhotoUploads={setPhotoUploads} maxPhotos={8} />
    },
    {
      title: 'Features & Amenities / Tính năng & Tiện ích',
      component: <FeaturesDetailsStep form={form} />
    },
    {
      title: 'Pricing / Giá cả',
      component: <SalonPricingStep form={form} pricingOptions={pricingOptions} setPricingOptions={setPricingOptions} />
    },
    {
      title: 'Review / Xem lại',
      component: <SalonReviewStep form={form} pricingOptions={pricingOptions} photoUploads={photoUploads} />
    }
  ];

  const nextStep = async () => {
    const isValid = await form.trigger();
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const formData = form.getValues();
    onComplete(formData, photoUploads, pricingOptions);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Sell Your Salon / Bán Salon
            </h1>
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length} / Bước {currentStep + 1} trong {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <h2 className="mt-4 text-xl font-semibold text-purple-800">
            {steps[currentStep].title}
          </h2>
        </div>

        {/* Form Content */}
        <FormProvider {...form}>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8">
            {steps[currentStep].component}
          </div>
        </FormProvider>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous / Trước
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
            >
              Submit Listing / Đăng tin
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
            >
              Next / Tiếp theo
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalonListingWizard;
