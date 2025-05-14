
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { JOB_TEMPLATES } from './jobFormConstants';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Sparkles } from 'lucide-react';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { useTranslation } from '@/hooks/useTranslation';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';

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
  const { toast } = useToast();
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
      ...defaultValues
    },
  });

  const handleSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  const addPolishedDescription = (description: string) => {
    form.setValue('description', description);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Template Selection */}
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formText.templateLabel}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={formText.templatePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {formText.templates.map((template, index) => (
                    <SelectItem key={index} value={JOB_TEMPLATES[index]?.id || `template-${index}`}>
                      {template}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Job Details */}
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
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formText.jobTypeLabel}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
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
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>{formText.descriptionLabel} {formText.requiredLabel}</FormLabel>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setIsPolishModalOpen(true)}
                  className="text-sm flex items-center gap-1 h-auto py-1"
                >
                  <Sparkles className="h-4 w-4 text-primary" />
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
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">{formText.contactInfoLabel}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <FormLabel>{formText.contactInfoPhone} {formText.requiredLabel}</FormLabel>
                  <FormControl>
                    <Input placeholder={formText.contactInfoPhonePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Photo Upload Section */}
        <div className="border-t pt-6">
          <FormLabel className="block mb-4">{formText.photosLabel}</FormLabel>
          <JobPostPhotoUpload
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            dragDropText={formText.dragDropText}
            photoCountText={formText.photoCountText}
          />
        </div>
        
        {/* Urgent Toggle */}
        <div className="border-t pt-6">
          <FormField
            control={form.control}
            name="isUrgent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">{formText.urgentLabel}</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    {formText.urgentHelpText}
                  </div>
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
        </div>
        
        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? formText.submitting : formText.continue}
        </Button>
      </form>

      {/* Polish Descriptions Modal */}
      <PolishedDescriptionsModal
        open={isPolishModalOpen}
        onOpenChange={setIsPolishModalOpen}
        onSelectDescription={addPolishedDescription}
        jobType={form.watch('template') || form.watch('title') || ''}
      />
    </Form>
  );
};

export default JobForm;
