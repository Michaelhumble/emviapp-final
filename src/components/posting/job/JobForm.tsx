
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { 
  Input,
  Textarea,
  Button,
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui";
import { AlertCircle, Sparkles } from "lucide-react";
import { JOB_TYPES, JOB_TEMPLATES, YES_LADDER_OPTIONS } from './jobFormConstants';
import JobPostPhotoUpload from './JobFormPhotoUpload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  defaultValues
}) => {
  const { 
    register, 
    handleSubmit, 
    control, 
    setValue,
    watch,
    formState: { errors } 
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      template: '',
      title: '',
      type: '',
      location: '',
      compensation: '',
      isUrgent: false,
      summary: '',
      description: '',
      contactEmail: '',
      contactPhone: '',
      payWeekly: false,
      provideLunch: false,
      qualityProducts: false,
      flexibleTime: false,
      growthOpportunity: false,
      reviewBonuses: false,
      ...defaultValues
    }
  });

  // Fixed: Using proper type assertion for the event target
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name as keyof JobFormValues, e.target.checked);
  };

  // State for the AI description modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { generatePolishedDescriptions, isLoading, descriptions, error } = usePolishedDescriptions();

  // Function to handle the "Polish with AI" button click
  const handlePolishDescription = async () => {
    const currentDescription = watch('description');
    if (!currentDescription || currentDescription.length < 10) {
      alert("Please add a description of at least 10 characters before using AI polish.");
      return;
    }
    
    await generatePolishedDescriptions(currentDescription);
    setIsModalOpen(true);
  };

  // Function to handle selecting a polished description version
  const handleSelectVersion = (text: string) => {
    setValue('description', text);
    setIsModalOpen(false);
  };

  // Extract template data
  const handleTemplateChange = (value: string) => {
    const template = JOB_TEMPLATES.find(template => template.id === value);
    
    if (template) {
      // Update form values with template data
      setValue('title', template.title || '');
      setValue('type', template.type || '');
      setValue('description', template.description || '');
      // Update other fields as needed
    }
  };

  // Watch values for conditional rendering
  const watchedType = watch('type');
  const watchedDescription = watch('description');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Job Template Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-playfair font-medium mb-4">Start with a Template</h2>
        <p className="text-gray-600 mb-4">
          Choose a template to get started or create your own job posting from scratch.
        </p>
        
        <Controller
          name="template"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                handleTemplateChange(value);
              }}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a template (optional)" />
              </SelectTrigger>
              <SelectContent>
                {JOB_TEMPLATES.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Job Details */}
      <div className="space-y-6">
        <h2 className="text-2xl font-playfair font-medium">Job Details</h2>
        
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
          <Input
            {...register('title')}
            placeholder="e.g. Nail Technician, Stylist, Receptionist"
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.title.message}
            </p>
          )}
        </div>
        
        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Type*</label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.type.message}
            </p>
          )}
        </div>
        
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
          <Input
            {...register('location')}
            placeholder="e.g. Los Angeles, CA"
            className={errors.location ? "border-red-500" : ""}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.location.message}
            </p>
          )}
        </div>
        
        {/* Compensation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Compensation</label>
          <Input
            {...register('compensation')}
            placeholder="e.g. $25-35/hr + tips, $60k-80k/year"
            className={errors.compensation ? "border-red-500" : ""}
          />
          {errors.compensation && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.compensation.message}
            </p>
          )}
        </div>
        
        {/* Urgent Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isUrgent" 
            checked={watch('isUrgent')}
            onCheckedChange={(checked) => setValue('isUrgent', checked === true)}
          />
          <label 
            htmlFor="isUrgent" 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Mark as Urgent (Highlight in search results)
          </label>
        </div>
      </div>
      
      {/* Job Description */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-playfair font-medium">Job Description</h2>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handlePolishDescription}
            disabled={!watchedDescription || watchedDescription.length < 10 || isLoading}
            className="flex items-center gap-2 border-purple-200 hover:bg-purple-50"
          >
            <Sparkles className="h-4 w-4 text-purple-500" />
            Polish with AI
          </Button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Summary (optional)</label>
          <Input
            {...register('summary')}
            placeholder="Brief overview of the position"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
          <Textarea
            {...register('description')}
            placeholder="Describe the job, responsibilities, qualifications, etc."
            className={`min-h-[150px] ${errors.description ? "border-red-500" : ""}`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="space-y-6">
        <h2 className="text-2xl font-playfair font-medium">Contact Information</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
          <Input
            {...register('contactEmail')}
            placeholder="email@example.com"
            className={errors.contactEmail ? "border-red-500" : ""}
          />
          {errors.contactEmail && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.contactEmail.message}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
          <Input
            {...register('contactPhone')}
            placeholder="(555) 555-5555"
            className={errors.contactPhone ? "border-red-500" : ""}
          />
          {errors.contactPhone && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.contactPhone.message}
            </p>
          )}
        </div>
      </div>
      
      {/* Yes Ladder */}
      <div className="space-y-6">
        <h2 className="text-2xl font-playfair font-medium">Tell Candidates About Your Benefits</h2>
        <p className="text-gray-600">
          Select the benefits you offer to help attract more candidates.
        </p>
        
        <Tabs defaultValue="standard" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="standard">Standard Benefits</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Benefits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard" className="border rounded-md p-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="payWeekly"
                  checked={watch('payWeekly')}
                  onCheckedChange={(checked) => setValue('payWeekly', checked === true)}
                />
                <label htmlFor="payWeekly" className="text-sm">Weekly Pay</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="provideLunch" 
                  checked={watch('provideLunch')}
                  onCheckedChange={(checked) => setValue('provideLunch', checked === true)}
                />
                <label htmlFor="provideLunch" className="text-sm">Provide Lunch</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="qualityProducts"
                  checked={watch('qualityProducts')}
                  onCheckedChange={(checked) => setValue('qualityProducts', checked === true)}
                />
                <label htmlFor="qualityProducts" className="text-sm">Quality Products</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flexibleTime"
                  checked={watch('flexibleTime')}
                  onCheckedChange={(checked) => setValue('flexibleTime', checked === true)}
                />
                <label htmlFor="flexibleTime" className="text-sm">Flexible Hours</label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="border rounded-md p-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="growthOpportunity"
                  checked={watch('growthOpportunity')}
                  onCheckedChange={(checked) => setValue('growthOpportunity', checked === true)}
                />
                <label htmlFor="growthOpportunity" className="text-sm">Growth Opportunities</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="reviewBonuses"
                  checked={watch('reviewBonuses')}
                  onCheckedChange={(checked) => setValue('reviewBonuses', checked === true)}
                />
                <label htmlFor="reviewBonuses" className="text-sm">Review Bonuses</label>
              </div>
              
              {/* You can add more advanced benefits here */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Photo Upload */}
      <JobPostPhotoUpload 
        photoUploads={photoUploads}
        setPhotoUploads={setPhotoUploads}
      />
      
      {/* Submit */}
      <div className="flex justify-end">
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="px-6"
        >
          {isSubmitting ? "Submitting..." : "Continue to Pricing"}
        </Button>
      </div>

      {/* Polish with AI Modal */}
      <PolishedDescriptionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        descriptions={descriptions}
        isLoading={isLoading}
        onSelectVersion={handleSelectVersion}
        error={error}
      />
    </form>
  );
};

export type { JobFormValues };
export default JobForm;
