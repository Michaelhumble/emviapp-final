
import React, { useState, useEffect } from 'react';
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
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, CheckCircle, Camera } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import { JOB_TEMPLATES, JOB_TYPES, YES_LADDER_OPTIONS } from './jobFormConstants';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';
import { PolishedDescriptionsModal } from './PolishedDescriptionsModal';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const { uploadMultipleImages, isUploading } = useImageUpload();
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const {
    generatePolishedDescriptions,
    descriptions,
    isLoading: isGeneratingDescriptions,
    error: descriptionsError
  } = usePolishedDescriptions();

  // Initialize form with default values
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
    },
  });

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    const selectedTemplate = JOB_TEMPLATES.find(template => template.id === templateId);
    
    if (selectedTemplate) {
      form.setValue('title', selectedTemplate.title);
      form.setValue('type', selectedTemplate.type);
      form.setValue('description', selectedTemplate.description);
    }
  };

  const handlePolishWithAI = async () => {
    const description = form.getValues('description');
    if (description && description.length > 10) {
      await generatePolishedDescriptions(description);
      setIsAIModalOpen(true);
    } else {
      toast({
        title: "Description required",
        description: "Please enter a job description to polish.",
        variant: "destructive"
      });
    }
  };

  const handleApplyPolishedDescription = (polishedText: string) => {
    form.setValue('description', polishedText);
    setIsAIModalOpen(false);
  };

  const handleSubmitForm = async (values: JobFormValues) => {
    try {
      // Handle image uploads if any
      if (photoUploads.length > 0) {
        const uploadedUrls = await uploadMultipleImages(photoUploads);
        values.images = uploadedUrls;
      }
      
      // Submit the form
      onSubmit(values);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error submitting form",
        description: "There was a problem uploading your images. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
        {/* Job Post Template */}
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Post Template (Optional)</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  handleTemplateSelect(value);
                }}
                value={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {field.value ? 
                      JOB_TEMPLATES.find(template => template.id === field.value)?.title || "Select a template" : 
                      "Select a template"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {JOB_TEMPLATES.map((template) => (
                    <SelectItem key={template.id} value={template.id}>{template.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose a template to get started quickly
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Two columns layout for basic info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Nail Technician" {...field} />
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
                <FormLabel>Job Type*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {field.value ? 
                        JOB_TYPES.find(type => type.value === field.value)?.label || "Select job type" : 
                        "Select job type"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location*</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Los Angeles, CA" {...field} />
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
                <Input placeholder="e.g. $25-30/hr + tips, 60% commission, etc." {...field} />
              </FormControl>
              <FormDescription>
                Enter compensation details to attract more applicants
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Is Urgent */}
        <FormField
          control={form.control}
          name="isUrgent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Mark as urgent hiring need</FormLabel>
                <FormDescription>
                  This will help your post stand out to candidates
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Job Summary */}
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Summary (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="A brief one-line summary of the position" {...field} />
              </FormControl>
              <FormDescription>
                A short headline that appears above your full description
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Job Description*</FormLabel>
                <Button 
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handlePolishWithAI}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Polish with AI
                </Button>
              </div>
              <FormControl>
                <Textarea 
                  placeholder="Describe the position, requirements, and what makes your salon special..." 
                  className="min-h-[150px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Yes Ladder - Checkboxes in a grid */}
        <div className="space-y-4">
          <div className="font-medium text-sm">
            Salon Perks (Boost applications with these features)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {YES_LADDER_OPTIONS.map((option) => (
              <FormField
                key={option.id}
                control={form.control}
                name={option.id as keyof JobFormValues}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-3 border border-gray-200 bg-white">
                    <FormControl>
                      <Checkbox
                        checked={field.value as boolean}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {/* Photo Upload */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-gray-500" />
            <div className="font-medium">Job Photos (Optional)</div>
          </div>
          <JobPostPhotoUpload 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            maxPhotos={5}
          />
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-5 rounded-lg space-y-4">
          <div className="font-medium">Contact Information</div>
          
          {/* Two columns for contact fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email*</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
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
                  <FormLabel>Contact Phone*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="w-full sm:w-auto"
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting || isUploading ? 'Saving...' : 'Continue to Posting Options'}
          </Button>
        </div>
      </form>
      
      {/* AI Polish Modal */}
      <PolishedDescriptionsModal 
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        originalDescription={form.getValues('description')}
        descriptions={descriptions}
        isLoading={isGeneratingDescriptions}
        onApply={handleApplyPolishedDescription}
      />
    </Form>
  );
};

export default JobForm;
