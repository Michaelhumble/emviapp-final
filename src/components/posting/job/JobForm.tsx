
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2, Sparkles } from 'lucide-react';
import { JobFormSchema, JobFormValues } from './jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { 
  JOB_TEMPLATES_EN, 
  JOB_TEMPLATES_VI,
  JOB_TYPES_EN,
  JOB_TYPES_VI
} from './jobFormConstants';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
  defaultValues?: Partial<JobFormValues>;
}

const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting,
  defaultValues = {}
}) => {
  const { isVietnamese, t } = useTranslation();
  const { polishedDescriptions, isLoading, fetchPolishedDescriptions } = usePolishedDescriptions();
  const [showPolishedDescriptions, setShowPolishedDescriptions] = useState(false);
  
  // Get the appropriate templates and job types based on language
  const jobTemplates = isVietnamese ? JOB_TEMPLATES_VI : JOB_TEMPLATES_EN;
  const jobTypes = isVietnamese ? JOB_TYPES_VI : JOB_TYPES_EN;
  
  // Get the text from the correct language constants
  const formText = isVietnamese ? {
    title: 'Đăng Công Việc',
    optionalLabel: '(Không bắt buộc)',
    requiredLabel: '*',
    continue: 'Tiếp tục đến Bảng giá',
    submit: 'Đăng Công Việc',
    templateLabel: 'Chọn mẫu',
    templatePlaceholder: 'Chọn mẫu công việc',
    titleLabel: 'Tiêu đề công việc',
    titlePlaceholder: 'Nhập tiêu đề công việc',
    locationLabel: 'Địa điểm',
    locationPlaceholder: 'Nhập địa điểm làm việc',
    jobTypeLabel: 'Loại công việc',
    jobTypePlaceholder: 'Chọn loại công việc',
    descriptionLabel: 'Mô tả công việc',
    descriptionPlaceholder: 'Nhập mô tả công việc',
    compensationLabel: 'Lương thưởng',
    compensationPlaceholder: 'Ví dụ: $20-25/giờ hoặc $50k-60k/năm',
    contactInfoLabel: 'Thông tin liên hệ',
    contactInfoEmail: 'Email',
    contactInfoEmailPlaceholder: 'Nhập email liên hệ',
    contactInfoPhone: 'Số điện thoại',
    contactInfoPhonePlaceholder: 'Nhập số điện thoại',
    photosLabel: 'Thêm ảnh (Không bắt buộc)',
    dragDropText: 'Kéo thả hình ảnh hoặc bấm để chọn',
    photoCountText: '{count} / {max} ảnh được thêm',
    urgentLabel: 'Đánh dấu là khẩn cấp',
    urgentHelpText: 'Làm nổi bật bài đăng của bạn',
    aiPolishButton: '✨ Trợ Giúp Từ AI',
    submitting: 'Đang gửi...',
  } : {
    title: 'Post a Job',
    optionalLabel: '(Optional)',
    requiredLabel: '*',
    continue: 'Continue to Pricing',
    submit: 'Post Job',
    templateLabel: 'Choose a Template',
    templatePlaceholder: 'Select a job template',
    titleLabel: 'Job Title',
    titlePlaceholder: 'Enter job title',
    locationLabel: 'Location',
    locationPlaceholder: 'Enter job location',
    jobTypeLabel: 'Job Type',
    jobTypePlaceholder: 'Select job type',
    descriptionLabel: 'Job Description',
    descriptionPlaceholder: 'Enter job description',
    compensationLabel: 'Compensation',
    compensationPlaceholder: 'E.g., $20-25/hr or $50k-60k/year',
    contactInfoLabel: 'Contact Information',
    contactInfoEmail: 'Email',
    contactInfoEmailPlaceholder: 'Enter contact email',
    contactInfoPhone: 'Phone Number',
    contactInfoPhonePlaceholder: 'Enter contact phone number',
    photosLabel: 'Add Photos (Optional)',
    dragDropText: 'Drag and drop images or click to select',
    photoCountText: '{count} / {max} photos added',
    urgentLabel: 'Mark as Urgent',
    urgentHelpText: 'Highlights your post',
    aiPolishButton: 'Polish with AI ✨',
    submitting: 'Submitting...',
  };

  const form = useForm<JobFormValues>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      title: '',
      location: '',
      type: '',
      description: '',
      compensation: '',
      contactEmail: '',
      contactPhone: '',
      isUrgent: false,
      ...defaultValues
    }
  });

  // Handle template selection
  const handleTemplateChange = (templateId: string) => {
    const selectedTemplate = jobTemplates.find(template => template.id === templateId);
    
    if (selectedTemplate) {
      form.setValue('title', selectedTemplate.defaultTitle || '');
      form.setValue('description', selectedTemplate.defaultDescription || '');
      form.setValue('type', selectedTemplate.defaultType || '');
    }
  };

  // Handle opening the AI polish modal
  const handlePolishClick = () => {
    const description = form.getValues('description');
    if (description) {
      fetchPolishedDescriptions(description);
      setShowPolishedDescriptions(true);
    }
  };

  // Apply a polished description when selected
  const handleSelectPolishedDescription = (description: string) => {
    form.setValue('description', description);
    form.trigger('description');
    setShowPolishedDescriptions(false);
  };

  // Close the polish modal
  const handleClosePolishedDescriptions = () => {
    setShowPolishedDescriptions(false);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Template selection */}
          <FormField
            control={form.control}
            name="template"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formText.templateLabel}</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleTemplateChange(value);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={formText.templatePlaceholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {jobTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formText.titleLabel} {formText.requiredLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={formText.titlePlaceholder} {...field} />
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
                <FormLabel>{formText.locationLabel} {formText.requiredLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={formText.locationPlaceholder} {...field} />
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
                <FormLabel>{formText.jobTypeLabel}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={formText.jobTypePlaceholder} />
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

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>{formText.descriptionLabel} {formText.requiredLabel}</FormLabel>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1" 
                    onClick={handlePolishClick}
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>{formText.aiPolishButton}</span>
                  </Button>
                </div>
                <FormControl>
                  <Textarea 
                    placeholder={formText.descriptionPlaceholder} 
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
                <FormLabel>{formText.compensationLabel} {formText.optionalLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={formText.compensationPlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Information Section */}
          <div className="border rounded-lg p-4 bg-gray-50/50">
            <h3 className="text-lg font-medium mb-4">{formText.contactInfoLabel}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Email */}
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formText.contactInfoEmail} {formText.requiredLabel}</FormLabel>
                    <FormControl>
                      <Input placeholder={formText.contactInfoEmailPlaceholder} {...field} />
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
                    <FormLabel>{formText.contactInfoPhone}</FormLabel>
                    <FormControl>
                      <Input placeholder={formText.contactInfoPhonePlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <FormLabel>{formText.photosLabel}</FormLabel>
            <JobPostPhotoUpload
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              maxPhotos={5}
              dragDropText={formText.dragDropText}
              photoCountText={formText.photoCountText}
            />
          </div>

          {/* Urgent Switch */}
          <FormField
            control={form.control}
            name="isUrgent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">{formText.urgentLabel}</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    {formText.urgentHelpText}
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {formText.submitting}
              </>
            ) : (
              formText.submit
            )}
          </Button>
        </form>
      </Form>

      {/* Polished Descriptions Modal */}
      <PolishedDescriptionsModal
        isOpen={showPolishedDescriptions}
        onClose={handleClosePolishedDescriptions}
        onSelectDescription={handleSelectPolishedDescription}
        jobType={form.getValues('template') || ''}
        aiPolishButton={formText.aiPolishButton}
      />
    </>
  );
};

export default JobForm;
