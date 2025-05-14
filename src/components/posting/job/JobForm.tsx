
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles } from 'lucide-react';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import { JOB_TYPES, JOB_TEMPLATES } from './jobFormConstants';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { useTranslation } from '@/hooks/useTranslation';

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
  const [isPolishModalOpen, setIsPolishModalOpen] = useState(false);
  const [currentJobType, setCurrentJobType] = useState('');

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      type: '',
      compensation: '',
      contactEmail: '',
      contactPhone: '',
      isUrgent: false,
      ...defaultValues
    }
  });

  const watchedDescription = form.watch('description');
  const watchedType = form.watch('type');

  // Update form when a template is selected
  const applyTemplate = (templateId: string) => {
    const selectedTemplate = JOB_TEMPLATES.find(template => template.id === templateId);
    
    if (selectedTemplate) {
      form.setValue('title', selectedTemplate.title);
      form.setValue('description', selectedTemplate.description);
      form.setValue('type', selectedTemplate.type || '');
      // Only try to set summary if it exists in the form schema
      if ('summary' in form.getValues()) {
        form.setValue('summary', selectedTemplate.summary || '');
      }
    }
  };

  // Use the polished description text when selected from modal
  const handleSelectPolishedDescription = (polishedText: string) => {
    form.setValue('description', polishedText);
  };

  useEffect(() => {
    // Track current job type for polish modal
    if (watchedType) {
      setCurrentJobType(watchedType);
    }
  }, [watchedType]);

  const handleSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Job Template Selection */}
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isVietnamese ? "Mẫu đăng tin" : "Job template"}</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  applyTemplate(value);
                }}
                value={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={isVietnamese ? "Chọn mẫu đăng tin" : "Select a template"} />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TEMPLATES.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                {isVietnamese 
                  ? "Tiết kiệm thời gian với mẫu có sẵn" 
                  : "Save time with a pre-made template"}
              </FormDescription>
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
              <FormLabel>{isVietnamese ? "Tiêu đề công việc" : "Job title"}</FormLabel>
              <FormControl>
                <Input placeholder={isVietnamese ? "VD: Cần thợ Nail" : "E.g. Nail Technician Needed"} {...field} />
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
              <FormLabel>{isVietnamese ? "Loại công việc" : "Job type"}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={isVietnamese ? "Chọn loại công việc" : "Select job type"} />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {isVietnamese && type.labelVi ? type.labelVi : type.label}
                    </SelectItem>
                  ))}
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
              <FormLabel>{isVietnamese ? "Địa điểm" : "Location"}</FormLabel>
              <FormControl>
                <Input placeholder={isVietnamese ? "VD: Houston, TX" : "E.g. Houston, TX"} {...field} />
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
              <FormLabel>{isVietnamese ? "Lương / Ăn chia" : "Compensation"}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={isVietnamese ? "VD: $1,000/tuần + ăn chia" : "E.g. $1,000/week + commission"} 
                  {...field} 
                />
              </FormControl>
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
                <FormLabel>{isVietnamese ? "Mô tả công việc" : "Job description"}</FormLabel>
                <Button 
                  type="button" 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setIsPolishModalOpen(true)}
                  className="flex items-center gap-1 text-xs"
                >
                  <Sparkles className="h-3 w-3" />
                  {isVietnamese ? "Làm chuyên nghiệp với AI" : "Polish with AI"}
                </Button>
              </div>
              <FormControl>
                <Textarea 
                  placeholder={isVietnamese 
                    ? "Mô tả chi tiết về công việc, yêu cầu và phúc lợi..." 
                    : "Describe the job, requirements, and benefits..."
                  } 
                  className="min-h-[200px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Information */}
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="contact@example.com" {...field} />
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
                <FormLabel>{isVietnamese ? "Số điện thoại" : "Phone"}</FormLabel>
                <FormControl>
                  <Input placeholder="(123) 456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Urgent Checkbox */}
        <FormField
          control={form.control}
          name="isUrgent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {isVietnamese ? "Tuyển GẤP" : "Urgent hiring"}
                </FormLabel>
                <FormDescription>
                  {isVietnamese 
                    ? "Đánh dấu tin của bạn là tuyển gấp" 
                    : "Mark your posting as urgent hiring"}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Photo Upload */}
        <div className="space-y-2">
          <FormLabel>{isVietnamese ? "Hình ảnh" : "Photos"}</FormLabel>
          <JobPostPhotoUpload
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            maxPhotos={5}
            translations={{
              dragDropText: isVietnamese 
                ? "Kéo và thả hình ảnh hoặc nhấn để chọn" 
                : "Drag and drop images or click to select",
              photoCountText: (count: number, max: number) => 
                isVietnamese 
                  ? `${count} / ${max} ảnh đã thêm` 
                  : `${count} / ${max} photos added`
            }}
          />
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? (isVietnamese ? "Đang lưu..." : "Saving...")
            : (isVietnamese ? "Tiếp tục" : "Continue")
          }
        </Button>
      </form>

      {/* Polished Descriptions Modal */}
      <PolishedDescriptionsModal
        open={isPolishModalOpen}
        onOpenChange={setIsPolishModalOpen}
        onSelectDescription={handleSelectPolishedDescription}
        jobType={currentJobType}
      />
    </Form>
  );
};

export default JobForm;
