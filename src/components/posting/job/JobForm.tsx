
import React, { useState, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles } from 'lucide-react';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MobileButton } from '@/components/ui/mobile-button';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';

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
  const { isVietnamese } = useTranslation();
  const t = isVietnamese ? jobFormVi : jobFormEn;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { polishedDescriptions, isLoading, fetchPolishedDescriptions } = usePolishedDescriptions();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      template: '',
      title: '',
      type: 'fullTime',
      location: '',
      description: '',
      summary: '',
      contactEmail: '',
      contactPhone: '',
      compensation: '',
      perks: [],
      urgent: false,
      ...defaultValues
    }
  });

  const description = form.watch('description');

  const handlePolishClick = useCallback(() => {
    if (!description || description.trim().length < 10) {
      form.setError('description', { 
        type: 'manual', 
        message: isVietnamese ? 
          'Vui lòng nhập ít nhất 10 ký tự để làm đẹp mô tả.' : 
          'Please enter at least 10 characters to polish the description.'
      });
      return;
    }
    
    fetchPolishedDescriptions(description);
    setIsModalOpen(true);
  }, [description, fetchPolishedDescriptions, form, isVietnamese]);

  const handleSelectDescription = useCallback((selectedDescription: string) => {
    form.setValue('description', selectedDescription);
    form.clearErrors('description');
    setIsModalOpen(false);
  }, [form]);

  // Determine which job templates to show based on language
  const jobTemplates = isVietnamese ? t.templates : [
    'Nail Technician',
    'Hair Stylist',
    'Spa Technician',
    'Receptionist',
    'Manager',
    'Massage Therapist',
    'Lash Technician',
    'Tattoo Artist',
    'Makeup Artist',
    'Microblading Artist',
    'Barber',
    'Waxing Specialist',
    'Threading Expert',
    'Facialist',
    'Skincare Consultant',
    'Brow Technician',
    'Piercing Specialist',
    'Permanent Makeup Artist',
    'Booth Renter',
    'Freelance Beauty Pro',
    'Other',
  ];

  // Maximum images allowed for upload
  const MAX_FILES = 5;

  const validateUploads = useCallback((files: File[]) => {
    // Check if we've exceeded the maximum allowed files
    if (files.length > MAX_FILES) {
      return {
        valid: false,
        message: isVietnamese 
          ? `Chỉ được phép tải lên tối đa ${MAX_FILES} hình ảnh.`
          : `Maximum of ${MAX_FILES} images allowed.`
      };
    }
    
    // Validate each file
    for (const file of files) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        return {
          valid: false,
          message: isVietnamese 
            ? 'Chỉ chấp nhận file hình ảnh.' 
            : 'Only image files are allowed.'
        };
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        return {
          valid: false, 
          message: isVietnamese
            ? 'Kích thước file không được vượt quá 5MB.'
            : 'File size should not exceed 5MB.'
        };
      }
    }
    
    return { valid: true, message: '' };
  }, [isVietnamese]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Form Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-center">
            {t.title}
          </h1>
          <p className="text-muted-foreground text-center mt-2">
            {t.requiredLabel}
          </p>
        </div>

        {/* Job Template */}
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.templatePlaceholder}</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  // Add template-specific content in the future
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobTemplates.map((template, index) => (
                    <SelectItem 
                      key={index} 
                      value={template.toLowerCase().replace(/\s+/g, '_')}
                    >
                      {template}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.summaryLabel} {t.optionalLabel}</FormLabel>
              <FormControl>
                <Input placeholder={t.summaryPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Type & Location */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Job Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.jobTypeLabel}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="fullTime">{t.jobTypeOptions.fullTime}</SelectItem>
                    <SelectItem value="partTime">{t.jobTypeOptions.partTime}</SelectItem>
                    <SelectItem value="contract">{t.jobTypeOptions.contract}</SelectItem>
                    <SelectItem value="freelance">{t.jobTypeOptions.freelance}</SelectItem>
                    <SelectItem value="other">{t.jobTypeOptions.other}</SelectItem>
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
                <FormLabel>{t.locationLabel} *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>{t.descriptionLabel}</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-1 text-primary hover:text-primary/90 hover:bg-primary/5 border-primary/20 bg-primary/5"
                  onClick={handlePolishClick}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{t.polishWithAI}</span>
                </Button>
              </div>
              <FormControl>
                <Textarea 
                  placeholder={t.descriptionPlaceholder}
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
              <FormLabel>{t.compensationLabel}</FormLabel>
              <FormControl>
                <Input placeholder={t.compensationPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Perks */}
        <FormField
          control={form.control}
          name="perks"
          render={() => (
            <FormItem>
              <div className="mb-2">
                <FormLabel>{t.perksLabel}</FormLabel>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="perks"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes('flexibleHours')}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, 'flexibleHours'])
                              : field.onChange(field.value?.filter((value) => value !== 'flexibleHours'));
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {t.perks.flexibleHours}
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="perks"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes('weeklyPay')}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, 'weeklyPay'])
                              : field.onChange(field.value?.filter((value) => value !== 'weeklyPay'));
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {t.perks.weeklyPay}
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="perks"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes('provideLunch')}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, 'provideLunch'])
                              : field.onChange(field.value?.filter((value) => value !== 'provideLunch'));
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {t.perks.provideLunch}
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="perks"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes('qualityProducts')}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, 'qualityProducts'])
                              : field.onChange(field.value?.filter((value) => value !== 'qualityProducts'));
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {t.perks.qualityProducts}
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="perks"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes('reviewBonuses')}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, 'reviewBonuses'])
                              : field.onChange(field.value?.filter((value) => value !== 'reviewBonuses'));
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {t.perks.reviewBonuses}
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="perks"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes('growthOpportunities')}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, 'growthOpportunities'])
                              : field.onChange(field.value?.filter((value) => value !== 'growthOpportunities'));
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {t.perks.growthOpportunities}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </FormItem>
          )}
        />

        {/* Urgent Option */}
        <FormField
          control={form.control}
          name="urgent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-medium cursor-pointer">
                  {t.urgentLabel}
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  {t.urgentHint}
                </p>
              </div>
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <div className="space-y-2">
          <Label>
            {t.uploadLabel} <span className="text-xs text-muted-foreground ml-1">(0-5)</span>
          </Label>
          <JobPostPhotoUpload 
            photos={photoUploads} 
            setPhotos={setPhotoUploads} 
            maxFiles={MAX_FILES}
            validateUpload={validateUploads}
            placeholder={t.uploadPlaceholder}
            uploadLimitText={`${photoUploads.length} / ${MAX_FILES} ${isVietnamese ? 'hình' : 'images'}`}
          />
        </div>

        {/* Contact Information */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Email */}
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.emailLabel}</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
                <FormLabel>{t.phoneLabel}</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder={t.phonePlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <MobileButton 
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-opacity-25"></div>
                <span>{isVietnamese ? 'Đang xử lý...' : 'Processing...'}</span>
              </div>
            ) : (
              t.continue
            )}
          </MobileButton>
        </div>
      </form>

      {/* Polished Descriptions Modal */}
      <PolishedDescriptionsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        descriptions={polishedDescriptions}
        onSelect={handleSelectDescription}
        isLoading={isLoading}
      />
    </Form>
  );
};

export default JobForm;
