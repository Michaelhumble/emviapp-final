
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SalonPostForm } from './SalonPostForm';
import SalonPlanSelectionSection from './SalonPlanSelectionSection';
import SalonPaymentFeatures from './SalonPaymentFeatures';
import { SalonPricingOptions, SalonPricingTier, calculateSalonPostPrice } from '@/utils/posting/salonPricing';
import { SalonFormValues } from './salonFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SalonListingWizard = () => {
  const { t } = useTranslation();
  const { user, userRole } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SalonFormValues | null>(null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  
  // Initialize with proper SalonPricingTier type
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard' as SalonPricingTier,
    isNationwide: false,
    fastSalePackage: false,
    showAtTop: false,
    bundleWithJobPost: false,
    isFirstPost: false
  });

  const totalSteps = 3;
  
  const handleFormSubmit = (values: SalonFormValues) => {
    setFormData(values);
    setCurrentStep(2);
  };

  const handlePricingOptionsChange = (options: SalonPricingOptions) => {
    setPricingOptions(options);
  };

  const handleNextFromPricing = () => {
    setCurrentStep(3);
  };

  const handlePaymentComplete = async () => {
    if (!formData || !user) {
      toast.error('Missing required data for listing creation');
      return;
    }

    try {
      // Create salon listing in database with pending status
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
          business_type: 'salon',
          description: formData.englishDescription || formData.vietnameseDescription || '',
          is_urgent: formData.fastSalePackage,
          is_private: false,
          is_featured: pricingOptions.showAtTop,
          status: 'pending' // Set initial status as pending for moderation
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
      
      // TODO: Redirect to success page or salon listing dashboard
      // For now, just reset the wizard
      setCurrentStep(1);
      setFormData(null);
      setPhotoUploads([]);
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const currentPrice = calculateSalonPostPrice(pricingOptions);

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {t({ english: 'List Your Salon for Sale', vietnamese: 'Đăng bán Salon của bạn' })}
        </h1>
        <Progress value={(currentStep / totalSteps) * 100} className="mb-4" />
        <p className="text-gray-600">
          {t({ english: `Step ${currentStep} of ${totalSteps}`, vietnamese: `Bước ${currentStep} / ${totalSteps}` })}
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <SalonPostForm
              onSubmit={handleFormSubmit}
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              onNationwideChange={(checked) => 
                setPricingOptions(prev => ({ ...prev, isNationwide: checked }))
              }
              onFastSaleChange={(checked) => 
                setPricingOptions(prev => ({ ...prev, fastSalePackage: checked }))
              }
            />
          )}

          {currentStep === 2 && (
            <SalonPlanSelectionSection
              selectedOptions={pricingOptions}
              onOptionsChange={handlePricingOptionsChange}
              onNext={handleNextFromPricing}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && formData && (
            <SalonPaymentFeatures
              formData={formData}
              selectedOptions={pricingOptions}
              onPayment={handlePaymentComplete}
              onBack={() => setCurrentStep(2)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonListingWizard;
