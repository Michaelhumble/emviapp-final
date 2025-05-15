
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import JobPostPhotoUpload from '@/components/posting/job/JobPostPhotoUpload';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';
import { JOB_TYPES_EN, JOB_TYPES_VI } from './jobFormConstants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      ...defaultValues,
      isUrgent: defaultValues.isUrgent !== undefined ? defaultValues.isUrgent : false
    },
    mode: "onChange"
  });
  
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue
  } = form;

  const jobTypes = isVietnamese ? JOB_TYPES_VI : JOB_TYPES_EN;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Job Type Section */}
      <div className="space-y-2">
        <label htmlFor="type" className="block text-sm font-medium">
          {formText.jobTypeLabel} {formText.requiredLabel}
        </label>
        <Select
          onValueChange={value => setValue("type", value)}
          defaultValue={watch("type")}
        >
          <SelectTrigger className="w-full">
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
        {errors.type && <p className="text-sm text-red-500">{formText.errors.type}</p>}
      </div>

      {/* Job Title Section */}
      <div className="space-y-2">
        <Label htmlFor="title">{formText.titleLabel} {formText.requiredLabel}</Label>
        <Input
          id="title"
          placeholder={formText.titlePlaceholder}
          type="text"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Location Section */}
      <div className="space-y-2">
        <Label htmlFor="location">{formText.locationLabel} {formText.requiredLabel}</Label>
        <Input
          id="location"
          placeholder={formText.locationPlaceholder}
          type="text"
          {...register("location")}
        />
        {errors.location && (
          <p className="text-sm text-red-500">{errors.location.message}</p>
        )}
      </div>

      {/* Job Description Section */}
      <div className="space-y-2">
        <Label htmlFor="description">{formText.descriptionLabel} {formText.requiredLabel}</Label>
        <Textarea
          id="description"
          placeholder={formText.descriptionPlaceholder}
          rows={4}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Compensation Section */}
      <div className="space-y-2">
        <Label htmlFor="compensation">{formText.compensationLabel} {formText.optionalLabel}</Label>
        <Input
          id="compensation"
          placeholder={formText.compensationPlaceholder}
          type="text"
          {...register("compensation")}
        />
      </div>

      {/* Contact Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{formText.contactInfoLabel}</h3>
        
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="contactEmail">{formText.contactInfoEmail} {formText.requiredLabel}</Label>
          <Input
            id="contactEmail"
            placeholder={formText.contactInfoEmailPlaceholder}
            type="email"
            {...register("contactEmail")}
          />
          {errors.contactEmail && (
            <p className="text-sm text-red-500">{errors.contactEmail.message}</p>
          )}
        </div>
        
        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="contactPhone">{formText.contactInfoPhone} {formText.optionalLabel}</Label>
          <Input
            id="contactPhone"
            placeholder={formText.contactInfoPhonePlaceholder}
            type="tel"
            {...register("contactPhone")}
          />
          {errors.contactPhone && (
            <p className="text-sm text-red-500">{errors.contactPhone.message}</p>
          )}
        </div>
      </div>

      {/* Photo Upload Section */}
      <div className="space-y-2">
        <Label>{formText.photosLabel}</Label>
        <JobPostPhotoUpload
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className={cn("w-full")} disabled={isSubmitting}>
        {isSubmitting ? formText.submitting : formText.continue}
      </Button>
    </form>
  );
};

export default JobForm;
