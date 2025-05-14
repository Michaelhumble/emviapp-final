import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { JobPostPhotoUpload } from './JobPostPhotoUpload';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { PolishedDescriptionsModal } from './PolishedDescriptionsModal';
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
  defaultValues = {},
}) => {
  const { isVietnamese, t } = useTranslation();
  const formText = isVietnamese ? jobFormVi : jobFormEn;
  const [isPolishModalOpen, setIsPolishModalOpen] = useState(false);

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
      // Ensure we're using isUrgent instead of urgent to match the schema
      ...defaultValues,
    },
  });

  const handleTemplateSelect = (templateId: string) => {
    const template = JOB_TEMPLATES.find(t => t.id === templateId);
    
    if (template) {
      form.setValue('title', template.title || '');
      form.setValue('description', template.description || '');
      form.setValue('summary', template.summary || '');
      form.setValue('type', template.type || '');
    }
  };

  const handlePolishedDescription = (description: string) => {
    form.setValue('description', description);
    setIsPolishModalOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Template Selection */}
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formText.templateLabel}</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  handleTemplateSelect(value);
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={formText.templatePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {JOB_TEMPLATES.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.label}
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
              <FormLabel>{formText.titleLabel} {formText.requiredLabel}</FormLabel>
              <FormControl>
                <Input placeholder={formText.titlePlaceholder} {...field} />
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
              <FormLabel>{formText.jobTypeLabel} {formText.optionalLabel}</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={formText.jobTypePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fullTime">{formText.jobTypeOptions.fullTime}</SelectItem>
                  <SelectItem value="partTime">{formText.jobTypeOptions.partTime}</SelectItem>
                  <SelectItem value="contract">{formText.jobTypeOptions.contract}</SelectItem>
                  <SelectItem value="freelance">{formText.jobTypeOptions.freelance}</SelectItem>
                  <SelectItem value="other">{formText.jobTypeOptions.other}</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>{formText.descriptionLabel} {formText.requiredLabel}</FormLabel>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsPolishModalOpen(true)}
                  className="text-xs"
                >
                  {formText.aiPolishButton}
                </Button>
              </div>
              <FormControl>
                <Textarea 
                  placeholder={formText.descriptionPlaceholder} 
                  rows={6}
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
            </FormItem>
          )}
        />

        {/* Contact Info Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{formText.contactInfoLabel}</h3>
          
          {/* Email */}
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
                <FormLabel>{formText.contactInfoPhone} {formText.requiredLabel}</FormLabel>
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
        <JobPostPhotoUpload 
          photos={photoUploads} 
          setPhotos={setPhotoUploads} 
          formText={formText}
        />

        {/* Mark as Urgent */}
        <FormField
          control={form.control}
          name="isUrgent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>{formText.urgentLabel}</FormLabel>
                <FormDescription>
                  {formText.urgentHelpText}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {formText.submitting}
            </>
          ) : formText.continue}
        </Button>
      </form>

      {/* Polish with AI Modal */}
      <PolishedDescriptionsModal
        isOpen={isPolishModalOpen}
        onClose={() => setIsPolishModalOpen(false)}
        onSelect={handlePolishedDescription}
        currentDescription={form.getValues('description')}
        industry="nail" // Assuming default industry, adjust as needed
      />
    </Form>
  );
};

export default JobForm;
