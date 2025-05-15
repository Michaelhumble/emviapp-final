import React, { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormSchema, JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import JobPostPhotoUpload from '@/components/posting/job/JobPostPhotoUpload';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PolishedDescriptionsModal from '@/components/posting/job/PolishedDescriptionsModal';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
  defaultValues?: Partial<JobFormValues>;
}

const jobTypes = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "other", label: "Other" }
];

const JobForm: React.FC<JobFormProps> = ({ onSubmit, photoUploads, setPhotoUploads, isSubmitting, defaultValues }) => {
  const { isVietnamese, t } = useTranslation();
  const formText = isVietnamese ? jobFormVi : jobFormEn;
  const [openPolishModal, setOpenPolishModal] = useState(false);
  const [descriptionToPolish, setDescriptionToPolish] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
      location: defaultValues?.location || '',
      type: defaultValues?.type || '',
      compensation: defaultValues?.compensation || '',
      contactEmail: defaultValues?.contactEmail || '',
      contactPhone: defaultValues?.contactPhone || '',
      isUrgent: defaultValues?.isUrgent || false,
      template: defaultValues?.template || '',
      perks: defaultValues?.perks || [],
      summary: defaultValues?.summary || '',
      shortSummary: defaultValues?.shortSummary || '',
      payWeekly: defaultValues?.payWeekly || false,
      provideLunch: defaultValues?.provideLunch || false,
      qualityProducts: defaultValues?.qualityProducts || false,
      reviewBonuses: defaultValues?.reviewBonuses || false,
      flexibleHours: defaultValues?.flexibleHours || false,
      growthOpportunities: defaultValues?.growthOpportunities || false,
    },
    mode: 'onChange',
  });

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    form.setValue('description', e.target.value);
  }, [form]);

  const handleSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t(formText.titleLabel)}</FormLabel>
              <FormControl>
                <Input placeholder={t(formText.titlePlaceholder)} {...field} />
              </FormControl>
              <FormDescription>{t(formText.titleDescription)}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t(formText.descriptionLabel)}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t(formText.descriptionPlaceholder)}
                  className="resize-none"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleDescriptionChange(e);
                    setDescriptionToPolish(e.target.value);
                  }}
                />
              </FormControl>
              <FormDescription>{t(formText.descriptionDescription)}</FormDescription>
              <FormMessage />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setOpenPolishModal(true)}
              >
                {t(formText.polishDescriptionButton)}
              </Button>
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t(formText.locationLabel)}</FormLabel>
              <FormControl>
                <Input placeholder={t(formText.locationPlaceholder)} {...field} />
              </FormControl>
              <FormDescription>{t(formText.locationDescription)}</FormDescription>
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
              <FormLabel>{t(formText.jobType.label)}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t(formText.jobType.placeholder)} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <FormLabel>{t(formText.compensationLabel)}</FormLabel>
              <FormControl>
                <Input placeholder={t(formText.compensationPlaceholder)} {...field} />
              </FormControl>
              <FormDescription>{t(formText.compensationDescription)}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Email */}
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t(formText.contactEmailLabel)}</FormLabel>
              <FormControl>
                <Input placeholder={t(formText.contactEmailPlaceholder)} {...field} />
              </FormControl>
              <FormDescription>{t(formText.contactEmailDescription)}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Phone */}
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t(formText.contactPhoneLabel)}</FormLabel>
              <FormControl>
                <Input placeholder={t(formText.contactPhonePlaceholder)} {...field} />
              </FormControl>
              <FormDescription>{t(formText.contactPhoneDescription)}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Is Urgent */}
        <FormField
          control={form.control}
          name="isUrgent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
              <div className="space-y-0.5">
                <FormLabel>{t(formText.isUrgentLabel)}</FormLabel>
                <FormDescription>{t(formText.isUrgentDescription)}</FormDescription>
              </div>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Photo Uploads */}
        <FormField
          control={form.control}
          name="photoUploads"
          render={() => (
            <FormItem>
              <FormLabel>{t(formText.photoUploadLabel)}</FormLabel>
              <FormControl>
                <JobPostPhotoUpload
                  photoUploads={photoUploads}
                  setPhotoUploads={setPhotoUploads}
                />
              </FormControl>
              <FormDescription>{t(formText.photoUploadDescription)}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t(formText.submitButtonLoading) : t(formText.submitButton)}
        </Button>
      </form>

      <PolishedDescriptionsModal
        open={openPolishModal}
        setOpen={setOpenPolishModal}
        text={descriptionToPolish}
      />
    </Form>
  );
};

export default JobForm;
