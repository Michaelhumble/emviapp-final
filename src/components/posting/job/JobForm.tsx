
import React, { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { JOB_TEMPLATES_EN, JOB_TEMPLATES_VI, JOB_TYPES_EN, JOB_TYPES_VI } from './jobFormConstants';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  defaultValues?: Partial<JobFormValues>;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  defaultValues = {}
}) => {
  const { isVietnamese } = useTranslation();
  const formText = isVietnamese ? jobFormVi : jobFormEn;
  const jobTemplates = isVietnamese ? JOB_TEMPLATES_VI : JOB_TEMPLATES_EN;
  const jobTypes = isVietnamese ? JOB_TYPES_EN : JOB_TYPES_VI;
  
  // Polish with AI modal state
  const [polishModalOpen, setPolishModalOpen] = useState(false);
  const [currentJobType, setCurrentJobType] = useState('');

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      type: '',
      compensation: '',
      contactEmail: '',
      contactPhone: '',
      isUrgent: false,
      ...defaultValues
    }
  });

  const handlePolishText = useCallback(() => {
    const jobType = form.getValues('title') || 'Other';
    setCurrentJobType(jobType);
    setPolishModalOpen(true);
  }, [form]);

  const handlePolishedDescription = useCallback((description: string) => {
    form.setValue('description', description, { shouldValidate: true, shouldDirty: true });
  }, [form]);

  const handleTemplateChange = useCallback((templateId: string) => {
    const template = jobTemplates.find(t => t.id === templateId);
    
    if (template) {
      if (template.defaultTitle) {
        form.setValue('title', template.defaultTitle, { shouldValidate: true });
      }
      
      if (template.defaultDescription) {
        form.setValue('description', template.defaultDescription, { shouldValidate: true });
      }
      
      if (template.defaultType) {
        form.setValue('type', template.defaultType, { shouldValidate: true });
      }
    }
  }, [form, jobTemplates]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Template Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {formText.templateLabel}
          </label>
          <Select
            onValueChange={handleTemplateChange}
            value={form.getValues('template')}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={formText.templatePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {jobTemplates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {formText.titleLabel} {formText.requiredLabel}
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={formText.titlePlaceholder} 
                  {...field} 
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.title?.message && formText.errors.title}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {formText.descriptionLabel} {formText.requiredLabel}
              </FormLabel>
              <div className="flex justify-end mb-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handlePolishText}
                  className="flex items-center gap-2 text-xs"
                >
                  <Sparkles className="h-3 w-3" />
                  {formText.aiPolishButton}
                </Button>
              </div>
              <FormControl>
                <Textarea 
                  placeholder={formText.descriptionPlaceholder}
                  className="min-h-[150px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.description?.message && formText.errors.description}
              </FormMessage>
            </FormItem>
          )}
        />
        
        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formText.locationLabel} {formText.requiredLabel}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={formText.locationPlaceholder} 
                  {...field} 
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.location?.message && formText.errors.location}
              </FormMessage>
            </FormItem>
          )}
        />
        
        {/* Job Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {formText.jobTypeLabel}
          </label>
          <Select
            onValueChange={(value) => form.setValue('type', value, { shouldValidate: true })}
            value={form.getValues('type')}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={formText.jobTypePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(jobTypes).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Compensation */}
        <FormField
          control={form.control}
          name="compensation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formText.compensationLabel} {formText.optionalLabel}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={formText.compensationPlaceholder} 
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        {/* Contact Information */}
        <div className="border-t border-gray-200 pt-5">
          <h3 className="font-medium mb-4">{formText.contactInfoLabel}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formText.contactInfoEmail} {formText.requiredLabel}</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder={formText.contactInfoEmailPlaceholder} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.contactEmail?.message && formText.errors.email}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formText.contactInfoPhone} {formText.requiredLabel}</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder={formText.contactInfoPhonePlaceholder} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.contactPhone?.message && formText.errors.phone}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {formText.photosLabel}
          </label>
          <JobPostPhotoUpload 
            photoUploads={photoUploads} 
            setPhotoUploads={setPhotoUploads} 
            maxPhotos={5}
            translations={{
              dragDropText: formText.dragDropText,
              photoCountText: formText.photoCountText
            }}
          />
        </div>
        
        {/* Urgent toggle */}
        <FormField
          control={form.control}
          name="isUrgent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-medium">{formText.urgentLabel}</FormLabel>
                <p className="text-sm text-muted-foreground">{formText.urgentHelpText}</p>
              </div>
            </FormItem>
          )}
        />
        
        {/* Submit button */}
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? formText.submitting : formText.continue}
        </Button>
      </form>
      
      <PolishedDescriptionsModal
        open={polishModalOpen}
        onOpenChange={setPolishModalOpen}
        onSelectDescription={handlePolishedDescription}
        jobType={currentJobType}
      />
    </Form>
  );
};

export default JobForm;
