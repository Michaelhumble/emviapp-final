
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles } from 'lucide-react';
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
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import { JOB_TEMPLATES } from './jobFormConstants';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';

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
  const [isPolishModalOpen, setIsPolishModalOpen] = useState(false);
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
      ...defaultValues
    }
  });

  const handleSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  const handleTemplateChange = (templateId: string) => {
    // Make sure we have a valid template ID before attempting to use it
    if (!templateId) return;
    
    // Find the template with the matching ID
    const selectedTemplate = JOB_TEMPLATES.find(template => template.id === templateId);
    
    // Only update form if we actually found a matching template
    if (selectedTemplate) {
      form.setValue('title', selectedTemplate.title || '');
      form.setValue('type', selectedTemplate.type || '');
      form.setValue('description', selectedTemplate.description || '');
    }
  };

  const handlePolishClick = () => {
    // Get the current description value safely
    const currentDescription = form.getValues('description') || '';
    
    // Only proceed if there's some text to polish
    if (currentDescription.trim().length > 0) {
      // Fetch polished descriptions
      fetchPolishedDescriptions(currentDescription);
      // Open the modal
      setIsPolishModalOpen(true);
    }
  };
  
  const handleSelectPolishedDescription = (description: string) => {
    form.setValue('description', description);
    setIsPolishModalOpen(false);
  };

  const watchDescription = form.watch('description');
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Template Selection */}
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-playfair text-lg">
                {formText.template.label}
              </FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleTemplateChange(value);
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={formText.template.placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">{formText.template.placeholder}</SelectItem>
                  {JOB_TEMPLATES.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.title}
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
              <FormLabel className="font-playfair text-lg">
                {formText.title.label} *
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={formText.title.placeholder} 
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
              <FormLabel className="font-playfair text-lg">
                {formText.location.label} *
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={formText.location.placeholder} 
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
              <FormLabel className="font-playfair text-lg">
                {formText.type.label}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={formText.type.placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="full-time">{formText.type.options.fullTime}</SelectItem>
                  <SelectItem value="part-time">{formText.type.options.partTime}</SelectItem>
                  <SelectItem value="contract">{formText.type.options.contract}</SelectItem>
                  <SelectItem value="booth-rental">{formText.type.options.boothRental}</SelectItem>
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
              <div className="flex justify-between items-center">
                <FormLabel className="font-playfair text-lg">
                  {formText.description.label} *
                </FormLabel>
                {watchDescription && watchDescription.length > 20 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs flex items-center gap-1 transition-colors hover:bg-primary/5"
                    onClick={handlePolishClick}
                  >
                    {isVietnamese ? (
                      <>✨ Trợ Giúp Từ AI</>
                    ) : (
                      <>✨ Polish with AI</>
                    )}
                  </Button>
                )}
              </div>
              <FormControl>
                <Textarea
                  placeholder={formText.description.placeholder}
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
              <FormLabel className="font-playfair text-lg">
                {formText.compensation.label}
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={formText.compensation.placeholder} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Information */}
        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="font-playfair text-lg">{formText.contactInfo.title}</h3>
          
          {/* Email */}
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {formText.contactInfo.email} *
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder={formText.contactInfo.emailPlaceholder} 
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
                <FormLabel>
                  {formText.contactInfo.phone} *
                </FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder={formText.contactInfo.phonePlaceholder} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Urgent Checkbox */}
        <FormField
          control={form.control}
          name="isUrgent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-medium">
                  {formText.urgent.label}
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  {formText.urgent.description}
                </p>
              </div>
            </FormItem>
          )}
        />

        {/* Photo Upload */}
        <div className="space-y-2">
          <h3 className="font-playfair text-lg">{formText.photos.label}</h3>
          <JobPostPhotoUpload
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            maxPhotos={5}
            translations={{
              dragDropText: formText.photos.dragDrop,
              photoCount: (count: number, max: number) => 
                `${count} / ${max} ${formText.photos.count}`
            }}
          />
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? formText.buttons.submitting : formText.buttons.submit}
        </Button>
      </form>

      {/* AI Polish Modal */}
      <PolishedDescriptionsModal
        isOpen={isPolishModalOpen}
        onClose={() => setIsPolishModalOpen(false)}
        descriptions={polishedDescriptions}
        onSelect={handleSelectPolishedDescription}
        isLoading={isPolishing}
      />
    </Form>
  );
};

export default JobForm;
