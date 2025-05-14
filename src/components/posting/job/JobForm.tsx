
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JOB_TEMPLATES, JOB_TYPES, YES_LADDER_OPTIONS } from './jobFormConstants';
import { Loader2 } from 'lucide-react';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import { Badge } from '@/components/ui/badge';
import { PolishedDescriptionsModal } from './PolishedDescriptionsModal';
import { useImageUpload } from '@/hooks/useImageUpload';
import { toast } from '@/hooks/use-toast';

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
  const { uploadMultipleImages } = useImageUpload();
  const [showAIModal, setShowAIModal] = React.useState(false);
  const [currentDescription, setCurrentDescription] = React.useState('');
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      type: '',
      location: '',
      description: '',
      contactEmail: '',
      contactPhone: '',
      isUrgent: false,
      payWeekly: false,
      provideLunch: false,
      qualityProducts: false,
      flexibleTime: false,
      growthOpportunity: false,
      reviewBonuses: false,
      ...defaultValues
    }
  });

  const handleTemplateChange = (templateId: string) => {
    const selectedTemplate = JOB_TEMPLATES.find(template => template.id === templateId);
    if (selectedTemplate) {
      form.setValue('title', selectedTemplate.title);
      form.setValue('type', selectedTemplate.type);
      form.setValue('description', selectedTemplate.description);
    }
  };

  const handlePolishDescription = () => {
    const currentDesc = form.getValues('description');
    if (currentDesc?.trim().length > 10) {
      setCurrentDescription(currentDesc);
      setShowAIModal(true);
    } else {
      toast({
        title: "Description Required",
        description: "Please write at least 10 characters for the description before using AI polish.",
        variant: "destructive"
      });
    }
  };

  const applyPolishedDescription = (newDescription: string) => {
    form.setValue('description', newDescription);
    setShowAIModal(false);
  };

  const processSubmit = async (values: JobFormValues) => {
    try {
      if (photoUploads.length > 0) {
        const imageUrls = await uploadMultipleImages(photoUploads);
        values.images = imageUrls;
      }
      
      onSubmit(values);
    } catch (error) {
      console.error('Error processing form submission:', error);
      toast({
        title: "Error",
        description: "There was a problem uploading your images. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processSubmit)} className="space-y-6">
        {/* Job Template Selector */}
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a template to get started (optional)</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleTemplateChange(value);
                }}
                value={field.value}
              >
                <SelectTrigger className="w-full" placeholder="Choose a template">
                  <SelectValue placeholder="Choose a template" />
                </SelectTrigger>
                <SelectContent>
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
              <FormLabel>Job Title *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Nail Technician, Hair Stylist, Esthetician" {...field} />
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
              <FormLabel>Job Type *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || "full-time"}>
                <SelectTrigger className="w-full" placeholder="Select job type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TYPES.map((jobType) => (
                    <SelectItem key={jobType.value} value={jobType.value}>
                      {jobType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <FormLabel>Location *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. San Jose, CA" {...field} />
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
              <FormLabel>Compensation (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. $25-35/hr or 60% commission" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Urgent Badge */}
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
                <FormLabel>
                  Mark as Urgent <Badge variant="destructive" className="ml-2">Hiring Now</Badge>
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  This will highlight your job post with an urgent tag
                </p>
              </div>
            </FormItem>
          )}
        />

        {/* Job Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Job Description *</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handlePolishDescription}
                  className="text-xs"
                >
                  Polish with AI ✨
                </Button>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Describe the job, requirements, and what makes your salon special..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Summary */}
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Summary (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Brief eye-catching tagline for your job post" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Info Section */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="font-medium">Contact Information</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="contact@example.com" {...field} />
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
                  <FormLabel>Phone *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Yes Ladder - Salon Features */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="font-medium">Salon Features (Select all that apply)</h3>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {YES_LADDER_OPTIONS.map(option => (
              <FormField
                key={option.id}
                control={form.control}
                name={option.id as keyof JobFormValues}
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value as boolean}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{option.label}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {/* Photo Uploads */}
        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="font-medium">Photos (Optional)</h3>
          <JobPostPhotoUpload 
            photoUploads={photoUploads} 
            setPhotoUploads={setPhotoUploads} 
            maxPhotos={5}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Continue to Pricing'
          )}
        </Button>
      </form>

      {/* AI Polish Modal */}
      <PolishedDescriptionsModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        originalDescription={currentDescription}
        onApply={applyPolishedDescription}
      />
    </Form>
  );
};

export default JobForm;
