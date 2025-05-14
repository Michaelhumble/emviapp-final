
import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles, Loader2 } from 'lucide-react';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';
import SectionHeader from '@/components/posting/SectionHeader';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { JOB_TEMPLATES, JOB_TYPES } from './jobFormConstants';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';

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
  const { isVietnamese } = useTranslation();
  const t = isVietnamese ? jobFormVi : jobFormEn;
  
  const [isPolishModalOpen, setIsPolishModalOpen] = useState(false);
  const { polishedDescriptions, isLoading, fetchPolishedDescriptions } = usePolishedDescriptions();
  
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

  const handlePolishClick = () => {
    const currentDescription = form.getValues('description');
    if (!currentDescription || currentDescription.trim().length < 10) {
      // Only polish if there's some content to work with
      return;
    }
    
    setIsPolishModalOpen(true);
    fetchPolishedDescriptions(currentDescription);
  };

  const handleSelectPolishedDescription = (description: string) => {
    form.setValue('description', description, { shouldValidate: true });
    setIsPolishModalOpen(false);
  };

  const validatePhotoUpload = useCallback((files: File[]) => {
    // Validate file types and sizes
    for (const file of files) {
      // Check file type
      if (!file.type.match(/image\/(jpeg|png|webp)/)) {
        return { valid: false, message: isVietnamese ? 'Chỉ chấp nhận file JPG, PNG hoặc WEBP' : 'Only JPG, PNG or WEBP files are allowed' };
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return { valid: false, message: isVietnamese ? 'Hình ảnh không được vượt quá 5MB' : 'Images must be less than 5MB' };
      }
    }
    
    return { valid: true, message: '' };
  }, [isVietnamese]);

  const applyTemplate = (templateId: string) => {
    const template = JOB_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      form.setValue('title', template.title, { shouldValidate: true });
      form.setValue('type', template.type, { shouldValidate: true });
      form.setValue('description', template.description, { shouldValidate: true });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Template Selection */}
          <div className="space-y-4">
            <SectionHeader 
              title={isVietnamese ? "Mẫu đăng tuyển" : "Job Templates"} 
              emoji="📋"
            />
            
            <Select onValueChange={applyTemplate}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t.templatePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {t.templates.map((template, index) => (
                  <SelectItem key={index} value={JOB_TEMPLATES[index].id}>
                    {template}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Basic Job Info */}
          <div className="space-y-4">
            <SectionHeader 
              title={isVietnamese ? "Thông tin công việc" : "Job Information"} 
              emoji="💼"
            />
            
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {isVietnamese ? "Tiêu đề công việc *" : "Job Title *"} 
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={isVietnamese ? "VD: Thợ Nail có kinh nghiệm" : "Ex: Experienced Nail Tech"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">{t.jobTypeLabel}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={isVietnamese ? "Chọn loại công việc" : "Select job type"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(JOB_TYPES).map(([value, labels]) => (
                          <SelectItem key={value} value={value}>
                            {isVietnamese ? labels.vi : labels.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">{t.locationLabel} *</FormLabel>
                  <FormControl>
                    <Input placeholder={isVietnamese ? "Địa chỉ làm việc" : "Work location"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="compensation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    {t.compensationLabel} {t.optionalLabel}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t.compensationPlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Job Description */}
          <div className="space-y-4">
            <SectionHeader 
              title={isVietnamese ? "Mô tả công việc" : "Job Description"} 
              emoji="📝"
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-sm font-medium">{t.descriptionLabel}</FormLabel>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={handlePolishClick}
                      className="h-8 px-3 text-xs font-medium transition-all hover:bg-primary/10 hover:text-primary"
                    >
                      <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                      {isVietnamese ? "✨ Trợ Giúp Từ AI" : "Polish with AI ✨"}
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea 
                      placeholder={t.descriptionPlaceholder} 
                      className="min-h-32 resize-y"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <SectionHeader 
              title={isVietnamese ? "Thông tin liên hệ" : "Contact Information"} 
              emoji="📞"
            />
            
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">{t.emailLabel}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
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
                    <FormLabel className="text-sm font-medium">{t.phoneLabel}</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel" 
                        placeholder={t.phonePlaceholder} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Extras - Photos, Urgency, etc. */}
          <div className="space-y-6">
            <SectionHeader 
              title={isVietnamese ? "Thêm thông tin" : "Additional Details"} 
              emoji="✨"
            />
            
            <div className="space-y-4">
              <FormLabel className="text-sm font-medium">{t.uploadLabel}</FormLabel>
              <JobPostPhotoUpload
                photoUploads={photoUploads}
                setPhotoUploads={setPhotoUploads}
                maxFiles={5}
                validateUpload={validatePhotoUpload}
                placeholder={t.uploadPlaceholder}
                uploadLimitText={isVietnamese ? `${photoUploads.length} / 5 ảnh được thêm` : `${photoUploads.length} / 5 images`}
              />
            </div>
            
            <FormField
              control={form.control}
              name="isUrgent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium">{t.urgentLabel}</FormLabel>
                    <p className="text-xs text-muted-foreground">
                      {t.urgentHint}
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isVietnamese ? "Đang xử lý..." : "Processing..."}
              </>
            ) : (
              t.continue
            )}
          </Button>
        </form>
      </Form>
      
      <PolishedDescriptionsModal
        isOpen={isPolishModalOpen}
        onClose={() => setIsPolishModalOpen(false)}
        descriptions={polishedDescriptions}
        onSelect={handleSelectPolishedDescription}
        isLoading={isLoading}
      />
    </>
  );
};

export default JobForm;
