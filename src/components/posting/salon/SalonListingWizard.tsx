
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { SalonIdentityStep } from './steps/SalonIdentityStep';
import { SalonLocationStep } from './steps/SalonLocationStep';
import { SalonDetailsStep } from './steps/SalonDetailsStep';
import { SalonPricingStep } from './steps/SalonPricingStep';
import { SalonReviewStep } from './steps/SalonReviewStep';
import { SalonPricingOptions, SalonPricingTier } from '@/utils/posting/salonPricing';
import { salonFormSchema, SalonFormValues } from './salonFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SalonListingWizard = () => {
  const { t } = useTranslation();
  const { user, userRole } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard' as SalonPricingTier,
    isNationwide: false,
    fastSalePackage: false,
    showAtTop: false,
    bundleWithJobPost: false,
    isFirstPost: false
  });

  const totalSteps = 5;

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: "",
      businessType: "",
      establishedYear: "",
      logo: undefined,
      address: "",
      city: "",
      state: "",
      zipCode: "",
      neighborhood: "",
      hideExactAddress: false,
      askingPrice: "",
      monthlyRent: "",
      numberOfStaff: "",
      numberOfTables: "",
      numberOfChairs: "",
      squareFeet: "",
      revenue: "",
      monthlyRevenue: "",
      yearlyRevenue: "",
      reasonForSelling: "",
      vietnameseDescription: "",
      englishDescription: "",
      virtualTourUrl: "",
      willTrain: false,
      isNationwide: false,
      fastSalePackage: false,
      hasHousing: false,
      hasWaxRoom: false,
      hasDiningRoom: false,
      hasLaundry: false,
      hasParking: false,
      termsAccepted: false,
    },
  });

  // Watch for changes in nationwide and fast sale options
  const isNationwide = form.watch("isNationwide");
  const fastSalePackage = form.watch("fastSalePackage");
  
  // Update pricing options when form values change
  React.useEffect(() => {
    setPricingOptions(prev => ({ ...prev, isNationwide, fastSalePackage }));
  }, [isNationwide, fastSalePackage]);

  const handleNext = async () => {
    let fieldsToValidate: (keyof SalonFormValues)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["salonName", "businessType"];
        break;
      case 2:
        fieldsToValidate = ["address", "city", "state"];
        break;
      case 3:
        fieldsToValidate = ["askingPrice", "monthlyRent"];
        break;
      case 4:
        // Pricing validation handled in component
        break;
      case 5:
        fieldsToValidate = ["termsAccepted"];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePaymentComplete = async () => {
    const formData = form.getValues();
    
    if (!user) {
      toast.error('Missing required data for listing creation');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('salon_sales')
        .insert({
          user_id: user.id,
          salon_name: formData.salonName,
          city: formData.city,
          state: formData.state,
          asking_price: parseFloat(formData.askingPrice),
          monthly_rent: parseFloat(formData.monthlyRent),
          size: formData.squareFeet || null,
          business_type: formData.businessType,
          description: formData.englishDescription || formData.vietnameseDescription || '',
          is_urgent: formData.fastSalePackage,
          is_private: false,
          is_featured: pricingOptions.showAtTop,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating salon listing:', error);
        toast.error('Failed to create salon listing. Please try again.');
        return;
      }

      console.log('Salon listing created successfully:', data);
      toast.success('Salon listing submitted for review!');
      
      // Reset the wizard
      setCurrentStep(1);
      form.reset();
      setPhotoUploads([]);
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const renderCurrentStep = () => {
    const formData = form.getValues();
    
    switch (currentStep) {
      case 1:
        return <SalonIdentityStep form={form} />;
      case 2:
        return <SalonLocationStep form={form} />;
      case 3:
        return (
          <SalonDetailsStep 
            form={form} 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
          />
        );
      case 4:
        return (
          <SalonPricingStep
            selectedOptions={pricingOptions}
            onOptionsChange={setPricingOptions}
          />
        );
      case 5:
        return (
          <SalonReviewStep
            form={form}
            formData={formData}
            selectedOptions={pricingOptions}
            onPayment={handlePaymentComplete}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return t({ english: 'Salon Identity', vietnamese: 'Thông Tin Salon' });
      case 2: return t({ english: 'Location Details', vietnamese: 'Chi Tiết Địa Chỉ' });
      case 3: return t({ english: 'Details & Photos', vietnamese: 'Chi Tiết & Hình Ảnh' });
      case 4: return t({ english: 'Pricing Plan', vietnamese: 'Gói Đăng Tin' });
      case 5: return t({ english: 'Review & Payment', vietnamese: 'Xem Lại & Thanh Toán' });
      default: return '';
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {t({ english: 'List Your Salon for Sale', vietnamese: 'Đăng bán Salon của bạn' })}
        </h1>
        <Progress value={(currentStep / totalSteps) * 100} className="mb-4" />
        <p className="text-gray-600">
          {t({ english: `Step ${currentStep} of ${totalSteps}: ${getStepTitle()}`, vietnamese: `Bước ${currentStep} / ${totalSteps}: ${getStepTitle()}` })}
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form className="space-y-8">
              {renderCurrentStep()}
              
              {currentStep < 5 && (
                <div className="flex justify-between pt-6">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t({ english: 'Back', vietnamese: 'Quay Lại' })}
                  </Button>
                  
                  <Button 
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2"
                  >
                    {t({ english: 'Next', vietnamese: 'Tiếp Theo' })}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonListingWizard;
