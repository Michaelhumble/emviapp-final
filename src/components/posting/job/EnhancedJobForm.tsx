
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues, IndustryType } from './jobFormSchema';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JobDetailsSection from '../sections/JobDetailsSection';
import ContactInfoSection from '../sections/ContactInfoSection';
import RequirementsSection from '../sections/RequirementsSection';
import SpecialtiesSection from '../sections/SpecialtiesSection';
import IndustrySpecialtiesSection from '../sections/IndustrySpecialtiesSection';
import PhotoUpload from '../sections/PhotoUpload';
import PricingSection from '../sections/PricingSection';
import JobSummary from '../JobSummary';
import JobTemplateSelector from './JobTemplateSelector';
import { getJobTemplate } from '@/utils/jobs/jobTemplates';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import ConfettiExplosion from '@/components/ui/ConfettiExplosion';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, photos: File[], pricing: PricingOptions) => void;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ onSubmit }) => {
  const [selectedTab, setSelectedTab] = useState<string>('template');
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard' as JobPricingTier,
    durationMonths: 1,
    autoRenew: false,
  });

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
      compensation_details: '',
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      specialties: [],
      requirements: [],
    }
  });

  const handleTemplateSelect = (template: JobFormValues, templateType: IndustryType) => {
    // Get the full template data
    const fullTemplate = getJobTemplate(templateType);
    
    // Pre-populate the form with the template data
    form.reset({
      title: fullTemplate.title,
      salonName: fullTemplate.salonName,
      description: fullTemplate.description,
      vietnameseDescription: fullTemplate.vietnameseDescription,
      location: fullTemplate.location,
      jobType: fullTemplate.jobType,
      compensation_type: fullTemplate.compensation_type,
      compensation_details: fullTemplate.compensation_details,
      weekly_pay: fullTemplate.weekly_pay,
      has_housing: fullTemplate.has_housing,
      has_wax_room: fullTemplate.has_wax_room,
      owner_will_train: fullTemplate.owner_will_train,
      no_supply_deduction: fullTemplate.no_supply_deduction,
      salary_range: fullTemplate.salary_range,
      experience_level: fullTemplate.experience_level,
      contactName: fullTemplate.contactName,
      contactEmail: fullTemplate.contactEmail,
      contactPhone: fullTemplate.contactPhone,
      requirements: fullTemplate.requirements,
      specialties: fullTemplate.specialties,
      industry: templateType,
      templateType: templateType
    });
    
    // Move to the details tab
    setSelectedTab('details');
  };

  const onPricingChange = (options: PricingOptions) => {
    setPricingOptions(options);
  };
  
  const handleFormSubmit = (data: JobFormValues) => {
    setShowConfetti(true);
    onSubmit(data, photoUploads, pricingOptions);
    
    // Reset confetti after animation
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  return (
    <div className="w-full">
      {showConfetti && <ConfettiExplosion duration={3000} />}
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="template">Template</TabsTrigger>
          <TabsTrigger value="details">Job Details</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="preview">Preview & Publish</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
            <TabsContent value="template" className="mt-0">
              <JobTemplateSelector onSelect={handleTemplateSelect} />
            </TabsContent>
            
            <TabsContent value="details" className="mt-0 space-y-8">
              <JobDetailsSection 
                form={form} 
                onNext={() => setSelectedTab('requirements')} 
                onPrevious={() => setSelectedTab('template')} 
              />
              
              <ContactInfoSection 
                form={form} 
                onNext={() => setSelectedTab('requirements')} 
                onPrevious={() => setSelectedTab('template')} 
              />
            </TabsContent>
            
            <TabsContent value="requirements" className="mt-0 space-y-8">
              <RequirementsSection 
                form={form} 
                onNext={() => setSelectedTab('photos')} 
                onPrevious={() => setSelectedTab('details')} 
              />
              
              <SpecialtiesSection 
                form={form} 
                onNext={() => setSelectedTab('photos')} 
                onPrevious={() => setSelectedTab('details')} 
              />
              
              <IndustrySpecialtiesSection 
                form={form} 
                onNext={() => setSelectedTab('photos')} 
                onPrevious={() => setSelectedTab('details')} 
              />
              
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setSelectedTab('details')}
                >
                  Previous
                </Button>
                <Button 
                  type="button"
                  onClick={() => setSelectedTab('photos')}
                >
                  Next
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="photos" className="mt-0">
              <PhotoUpload 
                photoUploads={photoUploads} 
                setPhotoUploads={setPhotoUploads} 
                maxPhotos={5} 
              />
              
              <div className="flex justify-between mt-8">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setSelectedTab('requirements')}
                >
                  Previous
                </Button>
                <Button 
                  type="button"
                  onClick={() => setSelectedTab('preview')}
                >
                  Next
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0 space-y-8">
              <PricingSection 
                onPricingChange={onPricingChange} 
                pricingOptions={pricingOptions}
                setPricingOptions={setPricingOptions}
              />
              
              <JobSummary 
                formValues={form.getValues()} 
                photos={photoUploads} 
              />
              
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setSelectedTab('photos')}
                >
                  Previous
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Publish Job Post
                </Button>
              </div>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default EnhancedJobForm;
