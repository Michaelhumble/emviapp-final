import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobFormSchema, JobFormValues } from "./jobFormSchema";
import JobPostPhotoUpload from "./JobPostPhotoUpload";
import PolishedDescriptionsModal from "./PolishedDescriptionsModal";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  JOB_TEMPLATES_EN, 
  JOB_TEMPLATES_VI,
  JOB_TYPES_EN, 
  JOB_TYPES_VI
} from "./jobFormConstants";

type JobFormProps = {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  defaultValues?: Partial<JobFormValues>;
};

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  defaultValues = {},
}) => {
  const { t, isVietnamese } = useTranslation();
  const formText = t('jobForm');

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Select templates and job types based on language
  const jobTemplates = isVietnamese ? JOB_TEMPLATES_VI : JOB_TEMPLATES_EN;
  const jobTypes = isVietnamese ? JOB_TYPES_VI : JOB_TYPES_EN;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: defaultValues.title || "",
      description: defaultValues.description || "",
      location: defaultValues.location || "",
      type: defaultValues.type || "",
      compensation: defaultValues.compensation || "",
      contactEmail: defaultValues.contactEmail || "",
      contactPhone: defaultValues.contactPhone || "",
      isUrgent: defaultValues.isUrgent || false,
      template: defaultValues.template || "",
      perks: defaultValues.perks || [],
      summary: defaultValues.summary || "",
    },
  });

  const templateValue = watch("template");
  
  const handleTemplateChange = (selectedTemplate: string) => {
    setValue("template", selectedTemplate);
    
    // Find the selected template from the language-specific templates array
    const template = jobTemplates.find(t => t.id === selectedTemplate);
    
    if (template) {
      if (template.title) setValue("title", template.title);
      if (template.description) setValue("description", template.description);
      if (template.type) setValue("type", template.type);
    }
  };

  const handlePolishDescription = (polishedText: string) => {
    setValue("description", polishedText);
  };

  // Rest of the form JSX
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Template Selection */}
      <div className="space-y-2">
        <Label htmlFor="template">{formText.templateLabel}</Label>
        <Controller
          name="template"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={handleTemplateChange}
            >
              <SelectTrigger id="template" className="w-full">
                <SelectValue placeholder={formText.templatePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {jobTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.label || template.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          {formText.titleLabel} {formText.requiredLabel}
        </Label>
        <Input
          id="title"
          {...register("title")}
          placeholder={formText.titlePlaceholder}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{formText.errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="description">
            {formText.descriptionLabel} {formText.requiredLabel}
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => setIsAIModalOpen(true)}
          >
            {formText.aiPolishButton}
          </Button>
        </div>
        <Textarea
          id="description"
          {...register("description")}
          placeholder={formText.descriptionPlaceholder}
          className="min-h-[200px]"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{formText.errors.description}</p>
        )}
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">
          {formText.locationLabel} {formText.requiredLabel}
        </Label>
        <Input
          id="location"
          {...register("location")}
          placeholder={formText.locationPlaceholder}
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{formText.errors.location}</p>
        )}
      </div>

      {/* Job Type */}
      <div className="space-y-2">
        <Label htmlFor="type">{formText.jobTypeLabel}</Label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder={formText.jobTypePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Compensation */}
      <div className="space-y-2">
        <Label htmlFor="compensation">
          {formText.compensationLabel} {formText.optionalLabel}
        </Label>
        <Input
          id="compensation"
          {...register("compensation")}
          placeholder={formText.compensationPlaceholder}
        />
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">{formText.contactInfoLabel}</h3>
        
        <div className="space-y-2">
          <Label htmlFor="contactEmail">
            {formText.contactInfoEmail} {formText.requiredLabel}
          </Label>
          <Input
            id="contactEmail"
            type="email"
            {...register("contactEmail")}
            placeholder={formText.contactInfoEmailPlaceholder}
          />
          {errors.contactEmail && (
            <p className="text-red-500 text-sm">{formText.errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactPhone">
            {formText.contactInfoPhone} {formText.requiredLabel}
          </Label>
          <Input
            id="contactPhone"
            {...register("contactPhone")}
            placeholder={formText.contactInfoPhonePlaceholder}
          />
          {errors.contactPhone && (
            <p className="text-red-500 text-sm">{formText.errors.phone}</p>
          )}
        </div>
      </div>

      {/* Photo Upload */}
      <div className="space-y-4">
        <h3 className="font-medium">
          {formText.photosLabel}
        </h3>
        <JobPostPhotoUpload 
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
          maxPhotos={5}
          dragDropText={formText.dragDropText}
          photoCountText={formText.photoCountText}
        />
      </div>

      {/* Urgent Switch */}
      <div className="flex items-center space-x-2">
        <Controller
          name="isUrgent"
          control={control}
          render={({ field }) => (
            <Switch
              id="urgent"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <div>
          <Label htmlFor="urgent" className="cursor-pointer">
            {formText.urgentLabel}
          </Label>
          <p className="text-sm text-muted-foreground">
            {formText.urgentHelpText}
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
            {formText.submitting}
          </>
        ) : (
          formText.continue
        )}
      </Button>

      {/* AI Polish Modal */}
      <PolishedDescriptionsModal
        isOpen={isAIModalOpen}
        setIsOpen={setIsAIModalOpen}
        onSelect={handlePolishDescription}
        currentText={watch("description") || ""}
      />
    </form>
  );
};

export default JobForm;
