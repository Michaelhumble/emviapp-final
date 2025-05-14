
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles, Loader2 } from 'lucide-react';
import { jobSchema, JobFormValues } from './jobFormSchema';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { usePolishedDescriptions } from '@/__experimental/usePolishedDescriptions';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';
import { JOB_TEMPLATES } from './jobFormConstants';

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
  const { isVietnamese, t } = useTranslation();
  const formText = isVietnamese ? jobFormVi : jobFormEn;
  
  const [polishingDescription, setPolishingDescription] = useState(false);
  
  // Use the form with proper default values
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      location: '',
      type: 'full-time',
      description: '',
      contactEmail: '',
      contactPhone: '',
      isUrgent: false,
      ...defaultValues
    }
  });
  
  // Watch the description field for polishing
  const description = form.watch('description');
  
  // Watch the template field to update descriptions based on selected template
  const selectedTemplate = form.watch('template');
  
  // Get the template display name based on the selected template
  const getTemplateDisplayName = () => {
    if (!selectedTemplate) return '';
    
    const template = JOB_TEMPLATES.find(t => t.id === selectedTemplate);
    return isVietnamese ? (template?.titleVi || template?.title || '') : (template?.title || '');
  };
  
  // Polish description modal state and handlers
  const { 
    descriptions, 
    isLoading: isLoadingDescriptions, 
    isOpen: isPolishModalOpen,
    handleOpenChange: handlePolishModalOpenChange,
    onSelect: handleSelectDescription,
    selectedTemplate: templateId
  } = usePolishedDescriptions({
    initialContent: description,
    jobType: getTemplateDisplayName(),
    isOpen: polishingDescription,
    onOpenChange: (open) => setPolishingDescription(open),
    onSelect: (polishedDescription) => {
      form.setValue('description', polishedDescription);
    }
  });
  
  // Get job template options with proper translations
  const getJobTemplateOptions = () => {
    return JOB_TEMPLATES.map(template => ({
      value: template.id,
      label: isVietnamese ? template.titleVi || template.title : template.title
    }));
  };
  
  // Handle job template selection to populate description
  const handleTemplateChange = (value: string) => {
    form.setValue('template', value);
    
    if (value) {
      const template = JOB_TEMPLATES.find(t => t.id === value);
      if (template) {
        // Only auto-fill description if it's empty or matches a previous template
        const currentDescription = form.getValues('description');
        if (!currentDescription || JOB_TEMPLATES.some(t => 
          currentDescription === (isVietnamese ? t.descriptionVi : t.description)
        )) {
          form.setValue('description', isVietnamese ? (template.descriptionVi || '') : template.description);
        }
        
        if (!form.getValues('title')) {
          form.setValue('title', isVietnamese ? (template.titleVi || '') : template.title);
        }
        
        form.setValue('type', template.type);
      }
    }
  };
  
  // Submit handler
  const handleSubmit = (values: JobFormValues) => {
    onSubmit({
      ...values,
      images: photoUploads
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Job Template Selection */}
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formText.templateLabel}</FormLabel>
              <Select
                value={field.value}
                onValueChange={handleTemplateChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={formText.templatePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getJobTemplateOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Job Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formText.titleLabel} {formText.requiredLabel}</FormLabel>
              <FormControl>
                <Input placeholder={formText.titlePlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Job Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formText.locationLabel} {formText.requiredLabel}</FormLabel>
              <FormControl>
                <Input placeholder={formText.locationPlaceholder} {...field} />
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
              <FormLabel>{formText.jobTypeLabel}</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={formText.jobTypePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(formText.jobTypeOptions).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Job Description with Polish Button */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>{formText.descriptionLabel} {formText.requiredLabel}</FormLabel>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  className="h-8 text-xs gap-1"
                  onClick={() => setPolishingDescription(true)}
                >
                  <Sparkles className="w-3.5 h-3.5" />
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
              <FormLabel>{formText.compensationLabel} {formText.optionalLabel}</FormLabel>
              <FormControl>
                <Input placeholder={formText.compensationPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{formText.contactInfoLabel}</h3>
          
          {/* Contact Email */}
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formText.contactInfoEmail}</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder={formText.contactInfoEmailPlaceholder} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Contact Phone */}
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formText.contactInfoPhone}</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder={formText.contactInfoPhonePlaceholder} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Photo Upload */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">{formText.photosLabel}</h3>
          <JobPostPhotoUpload
            files={photoUploads}
            onChange={setPhotoUploads}
            dragDropText={formText.dragDropText}
            photoCountText={formText.photoCountText}
            maxFiles={5}
          />
        </div>
        
        {/* Urgent Checkbox */}
        <FormField
          control={form.control}
          name="isUrgent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{formText.urgentLabel}</FormLabel>
                <p className="text-sm text-muted-foreground">{formText.urgentHelpText}</p>
              </div>
            </FormItem>
          )}
        />
        
        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {formText.submitting}
            </>
          ) : formText.continue}
        </Button>
      </form>
      
      {/* Polish Description Modal */}
      <PolishedDescriptionsModal
        isOpen={isPolishModalOpen}
        onClose={() => setPolishingDescription(false)}
        descriptions={descriptions}
        onSelect={handleSelectDescription}
        isLoading={isLoadingDescriptions}
        selectedTemplate={templateId}
      />
    </Form>
  );
};

export default JobForm;
