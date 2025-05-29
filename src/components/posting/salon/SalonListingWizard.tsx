
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { salonFormSchema, type SalonFormValues } from './salonFormSchema';
import SalonIdentityStep from './steps/SalonIdentityStep';
import SalonLocationStep from './steps/SalonLocationStep';
import SalonDetailsStep from './steps/SalonDetailsStep';
import SalonReviewStep from './steps/SalonReviewStep';
import { SalonPhotosSection } from './SalonPhotosSection';
import SalonPlanSelectionWithoutPrices from './SalonPlanSelectionWithoutPrices';

type SalonPricingTier = 'free' | 'standard' | 'premium' | 'featured';

interface SalonListingWizardProps {
  onComplete: (data: SalonFormValues & { 
    photoUploads: File[];
    selectedTier: SalonPricingTier;
    finalPrice: number;
  }) => void;
}

const SalonListingWizard: React.FC<SalonListingWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedTier, setSelectedTier] = useState<SalonPricingTier>('free');
  const [finalPrice, setFinalPrice] = useState(0);

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: '',
      businessType: '',
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
      employeeCount: '',
      numberOfStaff: '',
      numberOfTables: '',
      numberOfChairs: '',
      squareFeet: '',
      revenue: '',
      monthlyRevenue: '',
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
      termsAccepted: false,
    },
  });

  const steps = [
    { 
      id: 1, 
      title: 'Thông Tin Salon / Salon Identity',
      description: 'Tên và loại hình kinh doanh / Name and business type'
    },
    { 
      id: 2, 
      title: 'Địa Điểm / Location',
      description: 'Vị trí salon của bạn / Your salon location'
    },
    { 
      id: 3, 
      title: 'Chi Tiết / Details',
      description: 'Thông tin tài chính và mô tả / Financial info and descriptions'
    },
    { 
      id: 4, 
      title: 'Hình Ảnh / Photos',
      description: 'Tải lên hình ảnh salon / Upload salon photos'
    },
    { 
      id: 5, 
      title: 'Gói Đăng Tin / Listing Plan',
      description: 'Chọn gói quảng cáo / Select advertising package'
    },
    { 
      id: 6, 
      title: 'Xem Lại / Review',
      description: 'Kiểm tra thông tin cuối cùng / Final review'
    },
  ];

  const validateCurrentStep = async () => {
    const values = form.getValues();
    
    switch (currentStep) {
      case 1:
        return values.salonName && values.businessType;
      case 2:
        return values.address && values.city && values.state;
      case 3:
        return values.askingPrice && values.monthlyRent;
      case 4:
        return photoUploads.length > 0;
      case 5:
        return selectedTier;
      case 6:
        return values.termsAccepted;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    
    if (!isValid) {
      if (currentStep === 4 && photoUploads.length === 0) {
        alert('Vui lòng tải lên ít nhất một hình ảnh / Please upload at least one photo');
        return;
      }
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePricingSelect = (tier: SalonPricingTier, price: number) => {
    setSelectedTier(tier);
    setFinalPrice(price);
  };

  const handleComplete = async () => {
    const isValid = await form.trigger();
    if (!isValid || !form.getValues().termsAccepted) {
      return;
    }

    const formData = form.getValues();
    onComplete({
      ...formData,
      photoUploads,
      selectedTier,
      finalPrice,
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SalonIdentityStep form={form} />;
      case 2:
        return <SalonLocationStep form={form} />;
      case 3:
        return <SalonDetailsStep form={form} />;
      case 4:
        return (
          <SalonPhotosSection
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            maxPhotos={8}
          />
        );
      case 5:
        return (
          <SalonPlanSelectionWithoutPrices
            onPricingSelect={handlePricingSelect}
            selectedTier={selectedTier}
          />
        );
      case 6:
        return (
          <SalonReviewStep
            formData={form.getValues()}
            photoUploads={photoUploads}
            selectedTier={selectedTier}
            finalPrice={finalPrice}
            onTermsAccepted={(accepted) => form.setValue('termsAccepted', accepted)}
          />
        );
      default:
        return null;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl font-playfair text-gray-900">
              Đăng Tin Bán Salon / Post Salon Listing
            </CardTitle>
            <div className="text-sm text-gray-600">
              Bước {currentStep} / {steps.length}
            </div>
          </div>
          
          <Progress value={progress} className="w-full h-2" />
          
          <div className="mt-4">
            <h3 className="font-medium text-lg text-gray-900">
              {steps[currentStep - 1]?.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {steps[currentStep - 1]?.description}
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <div className="min-h-[400px]">
            {renderStep()}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay Lại / Previous
            </Button>

            {currentStep < steps.length ? (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Tiếp Theo / Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                disabled={!form.getValues().termsAccepted}
              >
                <Check className="h-4 w-4" />
                Hoàn Thành / Complete
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonListingWizard;
