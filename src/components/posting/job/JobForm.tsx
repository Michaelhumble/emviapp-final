
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { LoaderCircle, Upload } from 'lucide-react';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import { JOB_TEMPLATES, JOB_TEMPLATES_VI } from './jobFormConstants';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import AiDescriptionModal from './AiDescriptionModal';

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
  const formText = isVietnamese ? {} : jobFormEn; // Replace with Vietnamese text when available
  
  const [selectedJobType, setSelectedJobType] = useState<string>(defaultValues.type || '');

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      location: '',
      type: '',
      description: '',
      contactEmail: '',
      contactPhone: '',
      isUrgent: false,
      ...defaultValues
    },
  });

  const handleFormSubmit = (values: JobFormValues) => {
    onSubmit({
      ...values,
      isUrgent: Boolean(values.isUrgent)
    });
  };

  const handleTemplateChange = (templateId: string) => {
    const templates = isVietnamese ? JOB_TEMPLATES_VI : JOB_TEMPLATES;
    const selectedTemplate = templates.find(template => template.id === templateId);
    
    if (selectedTemplate) {
      form.setValue('title', selectedTemplate.title || '');
      form.setValue('type', selectedTemplate.type || '');
      form.setValue('description', selectedTemplate.description || '');

      // Update the selectedJobType state for the AI description modal
      setSelectedJobType(templateId);
    }
  };

  const handleAIDescription = (description: string) => {
    form.setValue('description', description);
    toast({
      title: isVietnamese ? "Đã áp dụng mô tả" : "Description applied",
      description: isVietnamese 
        ? "Mô tả công việc đã được cập nhật thành công." 
        : "Your job description has been updated successfully."
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Template Selection */}
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {isVietnamese ? 'Chọn mẫu' : formText.templateLabel}
              </FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleTemplateChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={isVietnamese ? 'Chọn mẫu công việc' : formText.templatePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(isVietnamese ? JOB_TEMPLATES_VI : JOB_TEMPLATES).map((template) => (
                    <SelectItem key={template.id} value={template.id || ''}>
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
              <FormLabel>
                {isVietnamese ? 'Tiêu đề công việc' : formText.titleLabel}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={isVietnamese ? "Nhập tiêu đề công việc" : formText.titlePlaceholder} 
                  {...field} 
                />
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
              <FormLabel>
                {isVietnamese ? 'Địa điểm' : formText.locationLabel}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={isVietnamese ? "Nhập địa điểm làm việc" : formText.locationPlaceholder} 
                  {...field} 
                />
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
              <FormLabel>
                {isVietnamese ? 'Loại công việc' : formText.jobTypeLabel}
                <span className="text-destructive">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={isVietnamese ? "Chọn loại công việc" : formText.jobTypePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Full Time">{isVietnamese ? 'Toàn thời gian' : formText.jobTypeOptions?.fullTime}</SelectItem>
                  <SelectItem value="Part Time">{isVietnamese ? 'Bán thời gian' : formText.jobTypeOptions?.partTime}</SelectItem>
                  <SelectItem value="Contract">{isVietnamese ? 'Hợp đồng' : formText.jobTypeOptions?.contract}</SelectItem>
                  <SelectItem value="Freelance">{isVietnamese ? 'Tự do' : formText.jobTypeOptions?.freelance}</SelectItem>
                  <SelectItem value="Booth Rental">{isVietnamese ? 'Cho thuê ghế' : 'Booth Rental'}</SelectItem>
                  <SelectItem value="Other">{isVietnamese ? 'Khác' : formText.jobTypeOptions?.other}</SelectItem>
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
              <div className="flex items-center justify-between">
                <FormLabel>
                  {isVietnamese ? 'Mô tả công việc' : formText.descriptionLabel}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <AiDescriptionModal 
                  jobType={selectedJobType || form.getValues('template') || 'nail-technician'} 
                  onSelectDescription={handleAIDescription} 
                />
              </div>
              <FormControl>
                <Textarea 
                  placeholder={isVietnamese ? "Nhập mô tả công việc chi tiết" : formText.descriptionPlaceholder}
                  rows={8}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Compensation (optional) */}
        <FormField
          control={form.control}
          name="compensation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {isVietnamese ? 'Mức lương' : formText.compensationLabel}
                <span className="text-muted-foreground text-sm ml-1">
                  {isVietnamese ? '(Tùy chọn)' : formText.optionalLabel}
                </span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={isVietnamese ? "VD: $20-25/giờ hoặc $50k-60k/năm" : formText.compensationPlaceholder} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Information */}
        <Card className="mt-8">
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-medium">
              {isVietnamese ? 'Thông tin liên hệ' : formText.contactInfoLabel}
            </h3>
            
            {/* Email */}
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isVietnamese ? 'Email' : formText.contactInfoEmail}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={isVietnamese ? "Nhập email liên hệ" : formText.contactInfoEmailPlaceholder} 
                      {...field} 
                    />
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
                  <FormLabel>
                    {isVietnamese ? 'Số điện thoại' : formText.contactInfoPhone}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={isVietnamese ? "Nhập số điện thoại liên hệ" : formText.contactInfoPhonePlaceholder} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        {/* Photo Upload */}
        <div className="space-y-2">
          <FormLabel>
            {isVietnamese ? 'Thêm hình ảnh (tùy chọn)' : formText.photosLabel}
          </FormLabel>
          <JobPostPhotoUpload
            photos={photoUploads}
            setPhotos={setPhotoUploads}
            maxPhotos={5}
          />
          <p className="text-sm text-muted-foreground mt-2">
            {isVietnamese 
              ? `${photoUploads.length} / 5 hình ảnh đã thêm` 
              : formText.photoCountText?.replace('{count}', String(photoUploads.length)).replace('{max}', '5')}
          </p>
        </div>
        
        {/* Urgent Checkbox */}
        <FormField
          control={form.control}
          name="isUrgent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {isVietnamese ? 'Đánh dấu là gấp' : formText.urgentLabel}
                </FormLabel>
                <FormDescription>
                  {isVietnamese ? 'Làm nổi bật bài đăng của bạn' : formText.urgentHelpText}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              {isVietnamese ? 'Đang gửi...' : formText.submitting}
            </span>
          ) : (
            isVietnamese ? 'Tiếp tục với giá' : formText.continue
          )}
        </Button>
      </form>
    </Form>
  );
};

export default JobForm;
