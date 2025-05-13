
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useTranslation } from '@/hooks/useTranslation';
import { UserProfile } from '@/context/auth';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: JobFormValues;
  industry?: string;
  userProfile?: UserProfile;
}

export const JobForm = ({
  onSubmit,
  photoUploads = [],
  setPhotoUploads,
  isSubmitting = false,
  defaultValues,
  industry = 'nails',
  userProfile
}: JobFormProps) => {
  const { t } = useTranslation();
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      location: '',
      salary: '',
      contactEmail: userProfile?.email || '',
      phoneNumber: userProfile?.phoneNumber || '',
      jobType: 'full-time',
      requirements: [],
      jobSummary: ''
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-8 p-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">
            {t('Job Details', 'Chi tiết công việc')}
          </h2>
          
          <Form>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Job Title', 'Chức danh')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('e.g. Nail Technician', 'VD: Thợ Nail')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="mt-4">
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Job Type', 'Loại công việc')}</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-3">
                        {['full-time', 'part-time', 'contract', 'temporary'].map((type) => (
                          <Button
                            key={type}
                            type="button"
                            variant={field.value === type ? "default" : "outline"}
                            onClick={() => form.setValue('jobType', type as any)}
                            className="flex-1"
                          >
                            {t(type, type)}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mt-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Location', 'Địa điểm')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('e.g. Los Angeles, CA', 'VD: Los Angeles, CA')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mt-4">
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Salary/Compensation', 'Lương/Thù lao')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('e.g. $25-35/hr or 60%', 'VD: $25-35/giờ hoặc 60%')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mt-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Job Description', 'Mô tả công việc')}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t('Describe the job duties and requirements', 'Mô tả nhiệm vụ công việc và yêu cầu')} 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mt-4">
              <FormField
                control={form.control}
                name="jobSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Job Summary (Optional)', 'Tóm tắt công việc (Không bắt buộc)')}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t('A brief summary of the position', 'Tóm tắt ngắn gọn về vị trí')} 
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">
            {t('Contact Information', 'Thông tin liên lạc')}
          </h2>
          
          <Form>
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Email Address', 'Địa chỉ email')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="mt-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Phone Number', 'Số điện thoại')}</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="min-w-[150px]"
            >
              {isSubmitting 
                ? t('Submitting...', 'Đang gửi...') 
                : t('Continue to Pricing', 'Tiếp tục đến Giá')}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default JobForm;
