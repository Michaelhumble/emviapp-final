
import React, { useState, useCallback } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import { JOB_TEMPLATES, JOB_TYPES } from './jobFormConstants';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
  defaultValues?: Partial<JobFormValues>;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  defaultValues = {}
}) => {
  const { isVietnamese } = useTranslation();
  const t = isVietnamese ? jobFormVi : jobFormEn;
  
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const { 
    polishedDescriptions, 
    isLoading: isPolishing, 
    fetchPolishedDescriptions 
  } = usePolishedDescriptions();

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
      template: '',
      ...defaultValues
    }
  });
  
  const { watch, setValue, getValues } = form;
  const description = watch('description');

  const handlePolishClick = () => {
    const currentDescription = getValues('description');
    if (currentDescription && currentDescription.trim().length > 0) {
      fetchPolishedDescriptions(currentDescription);
      setIsAIModalOpen(true);
    } else {
      // Handle empty description - could show a toast notification here
      console.log('Please add a description first');
    }
  };

  const handleSelectDescription = (selectedDescription: string) => {
    if (selectedDescription) {
      setValue('description', selectedDescription, { shouldValidate: true });
    }
    setIsAIModalOpen(false);
  };

  const handleTemplateChange = (templateId: string) => {
    if (!templateId) return;
    
    const selectedTemplate = JOB_TEMPLATES.find(template => template.id === templateId);
    
    if (selectedTemplate) {
      setValue('title', selectedTemplate.title || '', { shouldValidate: true });
      setValue('description', selectedTemplate.description || '', { shouldValidate: true });
      setValue('type', selectedTemplate.type || '', { shouldValidate: true });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Template Selection */}
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.templateLabel || 'Choose a Template'}</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleTemplateChange(value);
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t.templatePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {JOB_TEMPLATES.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Job Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.titleLabel || 'Job Title'} *</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t.titlePlaceholder || 'Enter job title'} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.locationLabel || 'Location'} *</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t.locationPlaceholder || 'Enter job location'} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.jobTypeLabel || 'Job Type'}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t.jobTypePlaceholder || 'Select job type'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fullTime">{t.jobTypeOptions?.fullTime || JOB_TYPES.fullTime.en}</SelectItem>
                  <SelectItem value="partTime">{t.jobTypeOptions?.partTime || JOB_TYPES.partTime.en}</SelectItem>
                  <SelectItem value="contract">{t.jobTypeOptions?.contract || JOB_TYPES.contract.en}</SelectItem>
                  <SelectItem value="freelance">{t.jobTypeOptions?.freelance || JOB_TYPES.freelance.en}</SelectItem>
                  <SelectItem value="other">{t.jobTypeOptions?.other || JOB_TYPES.other.en}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>{t.descriptionLabel || 'Job Description'} *</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handlePolishClick}
                  className="flex items-center gap-1 text-xs"
                >
                  <Sparkles className="h-3 w-3" />
                  {isVietnamese ? '✨ Trợ Giúp Từ AI' : 'Polish with AI ✨'}
                </Button>
              </div>
              <FormControl>
                <Textarea
                  placeholder={t.descriptionPlaceholder || 'Enter job description'}
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Compensation */}
        <FormField
          control={form.control}
          name="compensation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.compensationLabel || 'Compensation'}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t.compensationPlaceholder || 'E.g., $20-25/hr or $50k-60k/year'} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{t.contactInfoLabel || 'Contact Information'}</h3>
          
          {/* Email */}
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.contactInfoEmail || 'Email'} *</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder={t.contactInfoEmailPlaceholder || 'Enter contact email'} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Phone */}
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.contactInfoPhone || 'Phone Number'} *</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder={t.contactInfoPhonePlaceholder || 'Enter contact phone number'} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Photo Upload Section */}
        <div className="space-y-2">
          <FormLabel>{t.photosLabel || 'Add Photos'}</FormLabel>
          <JobPostPhotoUpload 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            translations={{
              dragDropText: t.dragDropText || 'Drag and drop images or click to select',
              photoCount: (count: number, max: number) => 
                t.photoCountText ? 
                  t.photoCountText.replace('{count}', count.toString()).replace('{max}', max.toString()) : 
                  `${count} / ${max} photos added`
            }}
          />
        </div>

        {/* Is Urgent Checkbox */}
        <FormField
          control={form.control}
          name="isUrgent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t.urgentLabel || 'Mark as Urgent'}
                  <span className="ml-2 text-sm text-muted-foreground">({t.urgentHelpText || 'Highlights your post'})</span>
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t.submitting || 'Submitting...'}
            </>
          ) : (
            t.continue || 'Continue to Pricing'
          )}
        </Button>
      </form>
      
      {/* AI Polish Modal */}
      <PolishedDescriptionsModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        descriptions={polishedDescriptions || []}
        onSelect={handleSelectDescription}
        isLoading={isPolishing}
      />
    </Form>
  );
};

export default JobForm;
