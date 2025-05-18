import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { specialties as specialtyOptions } from '@/data/specialties';
import { Check, Info } from 'lucide-react';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { JobTemplateType } from '@/utils/jobs/jobTemplates';

export interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  isSubmitting?: boolean;
  photoUploads?: File[];
  setPhotoUploads?: React.Dispatch<React.SetStateAction<File[]>>;
  initialValues?: JobFormValues;
  onBack?: () => void;
  showVietnameseByDefault?: boolean;
  isCustomTemplate?: boolean;
  maxPhotos?: number;  // Add maxPhotos property
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  isSubmitting = false,
  photoUploads = [],
  setPhotoUploads,
  initialValues,
  onBack,
  showVietnameseByDefault = false,
  isCustomTemplate = false,
  maxPhotos = 5, // Default to 5 photos
}) => {
  const { toast } = useToast();
  const { t, isVietnamese, setVietnamese } = useTranslation();
  const [showVietnamese, setShowVietnamese] = useState(showVietnameseByDefault);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialValues || {
      title: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      jobType: 'full-time',
      compensation_details: '',
      salary_range: '',
      experience_level: 'entry-level',
      contactEmail: '',
      contactName: '',
      contactPhone: '',
      specialties: [],
      requirements: [],
      templateType: 'custom'
    },
    mode: 'onChange'
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors }
  } = form;

  useEffect(() => {
    if (initialValues) {
      Object.keys(initialValues).forEach((key) => {
        setValue(key as keyof JobFormValues, initialValues[key as keyof JobFormValues]);
      });
    }
  }, [initialValues, setValue]);

  const handlePhotoChange = useCallback((files: File[]) => {
    setPhotoUploads?.(files);
  }, [setPhotoUploads]);

  const onFormSubmit = (data: JobFormValues) => {
    if (!data.title || !data.description || !data.location || !data.contactEmail) {
      toast({
        title: "Error",
        description: "Please complete all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }
    onSubmit(data);
  };

  const toggleVietnamese = () => {
    setShowVietnamese(!showVietnamese);
    setVietnamese(!isVietnamese);
  };

  const specialties = watch("specialties");

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      {/* Back Button */}
      {onBack && (
        <Button variant="ghost" onClick={onBack} type="button">
          &larr; Back to Templates
        </Button>
      )}

      {/* Job Details Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t('Job Details')}</h2>

        {/* Title */}
        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">{t('Job Title')} *</Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                id="title"
                placeholder={t('e.g., Nail Technician')}
                {...field}
              />
            )}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="block text-sm font-medium text-gray-700">{t('Job Description')} *</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                id="description"
                placeholder={t('Describe the job role and responsibilities')}
                rows={4}
                {...field}
              />
            )}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        {/* Vietnamese Toggle */}
        <div>
          <Label htmlFor="vietnamese" className="inline-flex items-center cursor-pointer">
            <Switch id="vietnamese" checked={showVietnamese} onCheckedChange={toggleVietnamese} />
            <span className="ml-2 text-sm font-medium text-gray-700">{t('Vietnamese')}</span>
          </Label>
        </div>

        {/* Vietnamese Description */}
        {showVietnamese && (
          <div>
            <Label htmlFor="vietnameseDescription" className="block text-sm font-medium text-gray-700">{t('Vietnamese Job Description')}</Label>
            <Controller
              name="vietnameseDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="vietnameseDescription"
                  placeholder={t('Describe the job role and responsibilities in Vietnamese')}
                  rows={4}
                  {...field}
                />
              )}
            />
            {errors.vietnameseDescription && <p className="text-red-500 text-xs mt-1">{errors.vietnameseDescription.message}</p>}
          </div>
        )}

        {/* Location */}
        <div>
          <Label htmlFor="location" className="block text-sm font-medium text-gray-700">{t('Location')} *</Label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Input
                id="location"
                placeholder={t('Enter the job location')}
                {...field}
              />
            )}
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
        </div>

        {/* Job Type */}
        <div>
          <Label htmlFor="jobType" className="block text-sm font-medium text-gray-700">{t('Job Type')}</Label>
          <Controller
            name="jobType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger id="jobType">
                  <SelectValue placeholder={t('Select a job type')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="full-time">{t('Full-time')}</SelectItem>
                    <SelectItem value="part-time">{t('Part-time')}</SelectItem>
                    <SelectItem value="contract">{t('Contract')}</SelectItem>
                    <SelectItem value="temporary">{t('Temporary')}</SelectItem>
                    <SelectItem value="internship">{t('Internship')}</SelectItem>
                    <SelectItem value="volunteer">{t('Volunteer')}</SelectItem>
                    <SelectItem value="other">{t('Other')}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.jobType && <p className="text-red-500 text-xs mt-1">{errors.jobType.message}</p>}
        </div>

        {/* Compensation Details */}
        <div>
          <Label htmlFor="compensation_details" className="block text-sm font-medium text-gray-700">{t('Compensation Details')}</Label>
          <Controller
            name="compensation_details"
            control={control}
            render={({ field }) => (
              <Input
                id="compensation_details"
                placeholder={t('e.g., Competitive hourly rate plus tips')}
                {...field}
              />
            )}
          />
          {errors.compensation_details && <p className="text-red-500 text-xs mt-1">{errors.compensation_details.message}</p>}
        </div>

        {/* Salary Range */}
        <div>
          <Label htmlFor="salary_range" className="block text-sm font-medium text-gray-700">{t('Salary Range')}</Label>
          <Controller
            name="salary_range"
            control={control}
            render={({ field }) => (
              <Input
                id="salary_range"
                placeholder={t('e.g., $15 - $25 per hour')}
                {...field}
              />
            )}
          />
          {errors.salary_range && <p className="text-red-500 text-xs mt-1">{errors.salary_range.message}</p>}
        </div>

        {/* Experience Level */}
        <div>
          <Label htmlFor="experience_level" className="block text-sm font-medium text-gray-700">{t('Experience Level')}</Label>
          <Controller
            name="experience_level"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger id="experience_level">
                  <SelectValue placeholder={t('Select experience level')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="entry-level">{t('Entry Level')}</SelectItem>
                    <SelectItem value="associate">{t('Associate')}</SelectItem>
                    <SelectItem value="mid-level">{t('Mid-Level')}</SelectItem>
                    <SelectItem value="senior-level">{t('Senior Level')}</SelectItem>
                    <SelectItem value="director">{t('Director')}</SelectItem>
                    <SelectItem value="executive">{t('Executive')}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.experience_level && <p className="text-red-500 text-xs mt-1">{errors.experience_level.message}</p>}
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t('Contact Information')}</h2>

        {/* Contact Email */}
        <div>
          <Label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">{t('Contact Email')} *</Label>
          <Controller
            name="contactEmail"
            control={control}
            render={({ field }) => (
              <Input
                id="contactEmail"
                type="email"
                placeholder={t('Enter contact email')}
                {...field}
              />
            )}
          />
          {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail.message}</p>}
        </div>

        {/* Contact Name */}
        <div>
          <Label htmlFor="contactName" className="block text-sm font-medium text-gray-700">{t('Contact Name')}</Label>
          <Controller
            name="contactName"
            control={control}
            render={({ field }) => (
              <Input
                id="contactName"
                placeholder={t('Enter contact name')}
                {...field}
              />
            )}
          />
          {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName.message}</p>}
        </div>

        {/* Contact Phone */}
        <div>
          <Label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">{t('Contact Phone')}</Label>
          <Controller
            name="contactPhone"
            control={control}
            render={({ field }) => (
              <Input
                id="contactPhone"
                placeholder={t('Enter contact phone')}
                {...field}
              />
            )}
          />
          {errors.contactPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPhone.message}</p>}
        </div>
      </div>

      {/* Specialties Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t('Specialties')}</h2>
        <p className="text-gray-500 text-sm">{t('Select all that apply')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {specialtyOptions.map((specialty) => (
            <div key={specialty.value} className="flex items-center space-x-2">
              <Controller
                name="specialties"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id={`specialty-${specialty.value}`}
                    checked={Array.isArray(field.value) ? field.value.includes(specialty.value) : false}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([...(Array.isArray(field.value) ? field.value : []), specialty.value]);
                      } else {
                        field.onChange((Array.isArray(field.value) ? field.value : []).filter((v: string) => v !== specialty.value));
                      }
                    }}
                  />
                )}
              />
              <Label htmlFor={`specialty-${specialty.value}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                {specialty.label}
              </Label>
            </div>
          ))}
        </div>
        {errors.specialties && <p className="text-red-500 text-xs mt-1">{errors.specialties.message}</p>}
      </div>

      {/* Requirements Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t('Requirements')}</h2>
        <p className="text-gray-500 text-sm">{t('List any specific requirements for the job')}</p>
        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <Textarea
              id="requirements"
              placeholder={t('e.g., Valid cosmetology license, 2+ years of experience')}
              rows={3}
              {...field}
            />
          )}
        />
        {errors.requirements && <p className="text-red-500 text-xs mt-1">{errors.requirements.message}</p>}
      </div>
      
      {/* Photo Upload Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Job Photos (Optional)</h2>
        <p className="text-gray-500 text-sm">
          Add photos to make your job post stand out. Upload salon images, workstation photos, or examples of work.
        </p>
        <PhotoUploader
          onChange={handlePhotoChange}
          files={photoUploads}
          maxFiles={maxPhotos} // Pass maxPhotos to PhotoUploader as maxFiles
        />
      </div>

      {/* Submit Button */}
      <div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('Submitting...') : t('Submit')}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
