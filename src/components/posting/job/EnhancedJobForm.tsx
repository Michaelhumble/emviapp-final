
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { MobileButton } from '@/components/ui/mobile-button';
import { ArrowRight } from 'lucide-react';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import SalonNameInput from '../wrappers/SalonNameInput';
import JobDetailsSection from '../sections/JobDetailsSection';
import ContactInfoSection from '../sections/ContactInfoSection';
import RequirementsSection from '../sections/RequirementsSection';
import PricingSection from '../sections/PricingSection';
import PhotoUpload from '../sections/PhotoUpload';
import SpecialtiesSection from '../sections/SpecialtiesSection';
import UploadSection from '../sections/UploadSection';
import { PricingOptions } from '@/utils/posting/types';

interface EnhancedJobFormProps {
  onSubmit: (formData: JobFormValues, uploads: File[], pricing: PricingOptions) => Promise<boolean>;
  onStepChange?: (step: number) => void;
  maxPhotos?: number;
  defaultFormValues?: Partial<JobFormValues>;
  expressMode?: boolean;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  onStepChange,
  maxPhotos = 5,
  defaultFormValues = {},
  expressMode = false
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'premium',
    durationMonths: 1,
    autoRenew: true,
    isFirstPost: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      salonName: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      jobType: 'full-time',
      compensation_type: 'hourly',
      has_housing: false,
      has_wax_room: false,
      weekly_pay: false,
      owner_will_train: false,
      no_supply_deduction: false,
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      requirements: [],
      specialties: [],
      ...defaultFormValues,
    }
  });

  // Get salonName from form state for display
  const salonName = form.watch('salonName');
  
  const steps = expressMode ? 1 : 4;

  useEffect(() => {
    if (onStepChange) {
      onStepChange(step);
    }
  }, [step, onStepChange]);

  const nextStep = () => {
    if (step < steps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleFormSubmit: SubmitHandler<JobFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      console.log('Form data before submit:', data);
      console.log('Pricing options:', pricingOptions);
      
      const success = await onSubmit(data, photoUploads, pricingOptions);
      
      if (success) {
        // If we're in express mode, don't reset the form
        if (!expressMode) {
          form.reset();
          setPhotoUploads([]);
          setStep(1);
        }
      }
      
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  const handlePricingChange = (options: PricingOptions) => {
    setPricingOptions(prev => ({ ...prev, ...options }));
  };

  // Handle SalonName change directly (convenience for this field)
  const handleSalonNameChange = (value: string) => {
    form.setValue('salonName', value);
  };

  // For express mode, we show all sections in one page
  if (expressMode) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className="space-y-8">
            {/* Salon Name Input */}
            <div className="border-b pb-4 mb-6">
              <h2 className="font-playfair text-2xl font-semibold text-gray-900">
                {t({
                  english: 'Express Job Posting',
                  vietnamese: 'Đăng tin nhanh'
                })}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t({
                  english: 'Fill in all job details on one page',
                  vietnamese: 'Điền tất cả thông tin công việc trong một trang'
                })}
              </p>
            </div>

            <SalonNameInput
              value={salonName}
              onChange={handleSalonNameChange}
            />
            
            {/* Job Details Section */}
            <JobDetailsSection control={form.control} />
            
            {/* Specialties Section */}
            <SpecialtiesSection control={form.control} />
            
            {/* Requirements Section */}
            <RequirementsSection form={form} />
            
            {/* Contact Info Section */}
            <ContactInfoSection control={form.control} />
            
            {/* Upload Section */}
            <PhotoUpload
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              maxPhotos={maxPhotos}
            />
            
            {/* Pricing Section */}
            <PricingSection 
              onPricingChange={handlePricingChange} 
              pricingOptions={pricingOptions}
              setPricingOptions={setPricingOptions}
            />
            
            <div className="flex justify-end pt-4">
              <MobileButton 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? 
                  t({
                    english: 'Creating...',
                    vietnamese: 'Đang tạo...'
                  }) :
                  t({
                    english: 'Continue to Preview',
                    vietnamese: 'Tiếp tục đến Xem trước'
                  })
                }
                <ArrowRight className="ml-2 h-4 w-4" />
              </MobileButton>
            </div>
          </div>
        </form>
      </Form>
    );
  }

  // Step-by-step wizard for regular mode
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        {/* Step 1: Salon & Job Details */}
        {step === 1 && (
          <div className="space-y-8">
            <SalonNameInput
              value={salonName}
              onChange={handleSalonNameChange}
            />
            <JobDetailsSection control={form.control} />
            
            <div className="flex justify-end pt-4">
              <Button 
                type="button" 
                onClick={nextStep}
                className="w-full sm:w-auto"
              >
                {t({
                  english: 'Next: Specialties & Requirements',
                  vietnamese: 'Tiếp: Chuyên môn & Yêu cầu'
                })}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 2: Specialties & Requirements */}
        {step === 2 && (
          <div className="space-y-8">
            <SpecialtiesSection control={form.control} />
            <RequirementsSection control={form.control} />
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                onClick={prevStep} 
                variant="outline"
              >
                {t({
                  english: 'Back',
                  vietnamese: 'Quay lại'
                })}
              </Button>
              <Button 
                type="button" 
                onClick={nextStep}
              >
                {t({
                  english: 'Next: Contact & Photos',
                  vietnamese: 'Tiếp: Liên hệ & Hình ảnh'
                })}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 3: Contact Info & Photos */}
        {step === 3 && (
          <div className="space-y-8">
            <ContactInfoSection control={form.control} />
            <PhotoUpload
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              maxPhotos={maxPhotos}
            />
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                onClick={prevStep} 
                variant="outline"
              >
                {t({
                  english: 'Back',
                  vietnamese: 'Quay lại'
                })}
              </Button>
              <Button 
                type="button" 
                onClick={nextStep}
              >
                {t({
                  english: 'Next: Pricing & Promotion',
                  vietnamese: 'Tiếp: Định giá & Quảng bá'
                })}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 4: Pricing & Promotion */}
        {step === 4 && (
          <div className="space-y-8">
            <PricingSection 
              onPricingChange={handlePricingChange} 
              pricingOptions={pricingOptions}
              setPricingOptions={setPricingOptions}
            />
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                onClick={prevStep} 
                variant="outline"
              >
                {t({
                  english: 'Back',
                  vietnamese: 'Quay lại'
                })}
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ?
                  t({
                    english: 'Creating Job...',
                    vietnamese: 'Đang tạo công việc...'
                  }) :
                  t({
                    english: 'Create Job Listing',
                    vietnamese: 'Tạo tin tuyển dụng'
                  })
                }
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};

export default EnhancedJobForm;
