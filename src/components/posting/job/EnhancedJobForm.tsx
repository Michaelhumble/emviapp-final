
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jobFormSchema, JobFormValues, JOB_TYPES, JOB_TEMPLATES } from './jobFormSchema';
import JobFormPhotoUpload from './JobFormPhotoUpload';
import { useImageUpload } from '@/hooks/useImageUpload';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
}

const EnhancedJobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting 
}) => {
  const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
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
      images: [],
    }
  });

  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isAiPolishModalOpen, setIsAiPolishModalOpen] = useState(false);
  const { uploadMultipleImages, isUploading } = useImageUpload();
  const description = watch('description');
  const { generatePolishedDescriptions, polishedVersions, isLoading, error } = usePolishedDescriptions(description);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (templateId === 'custom') return;

    const selectedTemplate = JOB_TEMPLATES.find(template => template.id === templateId);
    if (selectedTemplate) {
      setValue('title', selectedTemplate.defaultTitle);
      setValue('description', selectedTemplate.defaultDescription);
      setValue('summary', selectedTemplate.defaultSummary);
      setValue('type', selectedTemplate.defaultType);
    }
  };

  const handlePolishClick = async () => {
    setIsAiPolishModalOpen(true);
    await generatePolishedDescriptions();
  };

  const handleSelectPolishedVersion = (text: string) => {
    setValue('description', text);
    setIsAiPolishModalOpen(false);
  };

  const handleFormSubmit = async (values: JobFormValues) => {
    if (photoUploads.length > 0) {
      try {
        const uploadedUrls = await uploadMultipleImages(photoUploads);
        values.images = uploadedUrls;
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="template">Job Template (Optional)</Label>
        <Select onValueChange={handleTemplateChange} value={selectedTemplate}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a template or start from scratch" />
          </SelectTrigger>
          <SelectContent>
            {JOB_TEMPLATES.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="block">
            Job Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            className={errors.title ? "border-destructive" : ""}
            {...register('title')}
          />
          {errors.title && (
            <p className="text-destructive text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="type" className="block">
            Job Type <span className="text-destructive">*</span>
          </Label>
          <Select 
            onValueChange={(value) => setValue('type', value)} 
            value={watch('type')}
          >
            <SelectTrigger className={errors.type ? "border-destructive" : ""}>
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
          {errors.type && (
            <p className="text-destructive text-sm">{errors.type.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="block">
          Location <span className="text-destructive">*</span>
        </Label>
        <Input
          id="location"
          placeholder="City, State"
          className={errors.location ? "border-destructive" : ""}
          {...register('location')}
        />
        {errors.location && (
          <p className="text-destructive text-sm">{errors.location.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="compensation" className="block">
          Compensation (Optional)
        </Label>
        <Input
          id="compensation"
          placeholder="e.g., $25-30/hr, $60K-80K/year, 60% commission"
          {...register('compensation')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary" className="block">
          Short Summary (Optional)
        </Label>
        <Input
          id="summary"
          placeholder="Brief one-liner about the position"
          {...register('summary')}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="description" className="block">
            Full Description <span className="text-destructive">*</span>
          </Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={handlePolishClick}
            disabled={!description || description.length < 20}
          >
            Polish with AI
          </Button>
        </div>
        <Textarea
          id="description"
          rows={6}
          className={errors.description ? "border-destructive" : ""}
          {...register('description')}
        />
        {errors.description && (
          <p className="text-destructive text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contactEmail" className="block">
            Contact Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contactEmail"
            type="email"
            className={errors.contactEmail ? "border-destructive" : ""}
            {...register('contactEmail')}
          />
          {errors.contactEmail && (
            <p className="text-destructive text-sm">{errors.contactEmail.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone" className="block">
            Contact Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contactPhone"
            type="tel"
            className={errors.contactPhone ? "border-destructive" : ""}
            {...register('contactPhone')}
          />
          {errors.contactPhone && (
            <p className="text-destructive text-sm">{errors.contactPhone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-3 border rounded-lg p-4 bg-muted/30">
        <h3 className="font-medium">Job Perks and Benefits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="payWeekly" {...register('payWeekly')} />
            <Label htmlFor="payWeekly">Weekly Pay</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="provideLunch" {...register('provideLunch')} />
            <Label htmlFor="provideLunch">Lunch Provided</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="qualityProducts" {...register('qualityProducts')} />
            <Label htmlFor="qualityProducts">Quality Products</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="flexibleTime" {...register('flexibleTime')} />
            <Label htmlFor="flexibleTime">Flexible Hours</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="growthOpportunity" {...register('growthOpportunity')} />
            <Label htmlFor="growthOpportunity">Growth Opportunity</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="reviewBonuses" {...register('reviewBonuses')} />
            <Label htmlFor="reviewBonuses">Review Bonuses</Label>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <Checkbox id="isUrgent" {...register('isUrgent')} />
          <Label htmlFor="isUrgent" className="font-medium">
            Mark as Urgent
          </Label>
        </div>
        <p className="text-xs text-muted-foreground">
          Urgent listings get more attention and appear with special styling
        </p>
      </div>

      <div className="border rounded-lg p-4">
        <JobFormPhotoUpload
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
          maxPhotos={5}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || isUploading}>
          {isSubmitting || isUploading ? "Saving..." : "Continue to Pricing"}
        </Button>
      </div>

      <PolishedDescriptionsModal
        isOpen={isAiPolishModalOpen}
        onClose={() => setIsAiPolishModalOpen(false)}
        isLoading={isLoading}
        descriptions={polishedVersions}
        onSelectVersion={handleSelectPolishedVersion}
        error={error}
      />
    </form>
  );
};

export default EnhancedJobForm;
