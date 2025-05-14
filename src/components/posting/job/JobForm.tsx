
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { JOB_TEMPLATES } from './jobFormConstants';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en'; 
import { jobFormVi } from '@/constants/jobForm.vi';

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
  const [isPolishModalOpen, setIsPolishModalOpen] = useState(false);
  const { isVietnamese, t } = useTranslation();
  const formText = isVietnamese ? jobFormVi : jobFormEn;

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      location: '',
      type: '',
      description: '',
      compensation: '',
      contactEmail: '',
      contactPhone: '',
      urgent: false,
      ...defaultValues
    },
  });

  const watchedTemplate = form.watch('template');
  const watchedType = form.watch('type');
  const watchedDescription = form.watch('description');

  // Handle template selection
  const handleTemplateChange = (value: string) => {
    const selectedTemplate = JOB_TEMPLATES.find(template => template.id === value);
    
    if (selectedTemplate) {
      form.setValue('template', value);
      form.setValue('title', selectedTemplate.title);
      form.setValue('type', selectedTemplate.type);
      form.setValue('description', selectedTemplate.description);
    }
  };

  // Polish description with AI
  const handlePolishDescription = () => {
    setIsPolishModalOpen(true);
  };

  const handleSelectPolishedDescription = (description: string) => {
    form.setValue('description', description);
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
                onValueChange={(value) => handleTemplateChange(value)}
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
                      {isVietnamese && template.id === 'nail-technician' 
                        ? 'Thợ Nail' 
                        : isVietnamese && template.id === 'hair-stylist'
                        ? 'Thợ Tóc'
                        : isVietnamese && template.id === 'spa-technician'
                        ? 'Kỹ thuật viên Spa'
                        : isVietnamese && template.id === 'salon-receptionist'
                        ? 'Lễ tân Salon'
                        : isVietnamese && template.id === 'other'
                        ? 'Khác'
                        : template.title}
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
              <FormLabel>{formText.jobTypeLabel} {formText.requiredLabel}</FormLabel>
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
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Description with AI Polish button */}
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
                  className="text-xs flex items-center gap-1"
                  onClick={handlePolishDescription}
                  disabled={!watchedDescription || watchedDescription.length < 10}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{formText.aiPolishButton}</span>
                </Button>
              </div>
              <FormControl>
                <Textarea 
                  placeholder={formText.descriptionPlaceholder}
                  className="min-h-[200px]" 
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

        {/* Contact Information Section */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium mb-4">{formText.contactInfoLabel}</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formText.contactInfoEmail} {formText.requiredLabel}</FormLabel>
                  <FormControl>
                    <Input placeholder={formText.contactInfoEmailPlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formText.contactInfoPhone} {formText.optionalLabel}</FormLabel>
                  <FormControl>
                    <Input placeholder={formText.contactInfoPhonePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <h3 className="font-medium mb-2">{formText.photosLabel}</h3>
          <JobPostPhotoUpload 
            photoUploads={photoUploads} 
            setPhotoUploads={setPhotoUploads}
            translations={{
              dragDropText: formText.dragDropText,
              photoCountText: formText.photoCountText
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? formText.submitting : formText.continue}
          </Button>
        </div>

        {/* Polish Description Modal */}
        <PolishedDescriptionsModal
          open={isPolishModalOpen}
          onOpenChange={setIsPolishModalOpen}
          onSelectDescription={handleSelectPolishedDescription}
          jobType={watchedTemplate || watchedType}
        />
      </form>
    </Form>
  );
};

export default JobForm;
