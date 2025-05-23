
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import ContactInfoSection from '../sections/ContactInfoSection';
import JobDetailsSection from '../sections/JobDetailsSection';
import PhotoUpload from '../sections/PhotoUpload';
import PricingSection from '../sections/PricingSection';
import { PricingOptions, IndustryType } from '@/utils/posting/types';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import IndustrySpecialtiesSection from '../sections/IndustrySpecialtiesSection';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, photos: File[], pricingOptions: PricingOptions) => void;
  defaultValues?: Partial<JobFormValues>;
  isLoading?: boolean;
  saveProgress?: boolean;
  selectedTemplate?: IndustryType | null;
  onIndustryChange?: (industry: string) => void;
}

const EnhancedJobForm = ({
  onSubmit,
  defaultValues,
  isLoading = false,
  saveProgress = true,
  selectedTemplate,
  onIndustryChange
}: EnhancedJobFormProps) => {
  const [activeTab, setActiveTab] = useState('details');
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'premium',
    durationMonths: 1,
    autoRenew: true,
  });
  const { t } = useTranslation();

  // Initialize form with default values
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      salonName: '',
      title: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      jobType: 'full-time',
      compensation_type: 'hourly',
      compensation_details: '',
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      requirements: [],
      specialties: [],
      ...defaultValues,
    },
  });

  const handleFormSubmit = (data: JobFormValues) => {
    // For now, just validate photos before moving to the next step
    if (activeTab === 'details') {
      setActiveTab('upload');
    } else if (activeTab === 'upload') {
      setActiveTab('pricing');
    } else if (activeTab === 'pricing') {
      if (photoUploads.length === 0) {
        toast.warning(
          t({
            english: "Please upload at least one photo",
            vietnamese: "Vui lòng tải lên ít nhất một hình ảnh"
          })
        );
        setActiveTab('upload');
        return;
      }
      
      onSubmit(data, photoUploads, pricingOptions);
    }
  };

  const handleTabChange = (value: string) => {
    const isValid = form.trigger();
    isValid.then((valid) => {
      if (valid || saveProgress) {
        setActiveTab(value);
        if (saveProgress) {
          // Auto-save progress when changing tabs
          const currentValues = form.getValues();
          console.log("Saving progress:", currentValues);
          localStorage.setItem('job-post-draft', JSON.stringify(currentValues));
        }
      } else {
        toast.warning(
          t({
            english: "Please fix form errors before proceeding",
            vietnamese: "Vui lòng sửa lỗi biểu mẫu trước khi tiếp tục"
          })
        );
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="details">Job Details</TabsTrigger>
            <TabsTrigger value="upload">Photos</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-8">
            <IndustrySpecialtiesSection 
              form={form} 
              onIndustryChange={onIndustryChange}
            />
            
            <JobDetailsSection form={form} />
            <ContactInfoSection form={form} />
            
            <div className="flex justify-end">
              <Button type="button" onClick={() => handleTabChange('upload')}>
                Continue to Photos
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-8">
            <PhotoUpload
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              maxPhotos={10}
            />
            
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleTabChange('details')}
              >
                Back to Details
              </Button>
              <Button 
                type="button" 
                onClick={() => handleTabChange('pricing')}
              >
                Continue to Pricing
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="pricing" className="space-y-8">
            <PricingSection
              onPricingChange={(options) => setPricingOptions(options)}
              pricingOptions={pricingOptions}
              setPricingOptions={setPricingOptions}
            />
            
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleTabChange('upload')}
              >
                Back to Photos
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Preview & Publish'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};

export default EnhancedJobForm;
