
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';
import PhotoUploader from '../PhotoUploader';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting?: boolean;
}

export const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting = false 
}) => {
  const { t } = useTranslation();
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      location: '',
      employmentType: 'full-time',
      compensation: '',
      description: '',
      phoneNumber: '',  // Added for contact info
      contactEmail: '', // Added for contact info
    },
  });
  
  // Handle form submission
  const handleSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-6">
        <div className="space-y-6">
          {/* Job Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Job Title', 'Tiêu đề công việc')}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t('Nail Technician – Full Time', 'Kỹ thuật viên làm móng - Toàn thời gian')} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Job Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Location', 'Địa điểm')}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t('City, State', 'Thành phố, Tiểu bang')} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Employment Type */}
          <FormField
            control={form.control}
            name="employmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Employment Type', 'Loại việc làm')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('Select employment type', 'Chọn loại việc làm')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full-time">{t('Full-Time', 'Toàn thời gian')}</SelectItem>
                    <SelectItem value="part-time">{t('Part-Time', 'Bán thời gian')}</SelectItem>
                    <SelectItem value="contract">{t('Contract', 'Hợp đồng')}</SelectItem>
                    <SelectItem value="booth-rental">{t('Booth Rental', 'Thuê quầy')}</SelectItem>
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
                <FormLabel>{t('Compensation', 'Thù lao')}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t('E.g. $1,200/week or 60% commission', 'VD: $1,200/tuần hoặc 60% hoa hồng')} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Job Description / Summary - Fixed textarea implementation */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Job Description / Summary', 'Mô tả Công việc')}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={t('Tell artists what your salon is like, how busy it is, and why they\'ll love it', 'Hãy cho nghệ sĩ biết về salon của bạn, mức độ bận rộn, và lý do họ sẽ yêu thích nơi làm việc này')}
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <small className="text-xs text-gray-400">
                  {t('This text will show on your public job post.', 'Văn bản này sẽ hiển thị trên bài đăng công việc công khai của bạn.')}
                </small>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Phone Number - New optional field */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Phone Number (Optional)', 'Số điện thoại (Tùy chọn)')}</FormLabel>
                <FormControl>
                  <Input 
                    type="tel"
                    placeholder={t('(714) 555-1234', '(714) 555-1234')} 
                    {...field} 
                  />
                </FormControl>
                <small className="text-xs text-gray-400">
                  {t('Only visible to verified users after login', 'Chỉ hiển thị cho người dùng đã xác minh sau khi đăng nhập')}
                </small>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Contact Email - New optional field */}
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Contact Email (Optional)', 'Email liên hệ (Tùy chọn)')}</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder={t('youremail@example.com', 'email@example.com')} 
                    {...field} 
                  />
                </FormControl>
                <small className="text-xs text-gray-400">
                  {t('Artists may contact you by email if allowed', 'Nghệ sĩ có thể liên hệ với bạn qua email nếu được phép')}
                </small>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>{t('Upload Photos (Optional)', 'Tải lên ảnh (Tùy chọn)')}</Label>
            <PhotoUploader 
              files={photoUploads}
              onChange={setPhotoUploads}
              maxFiles={3}
            />
          </div>
          
          {/* Additional Options */}
          <div className="space-y-4">
            <Label>{t('Additional Options', 'Tùy chọn bổ sung')}</Label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="urgent" />
                <label
                  htmlFor="urgent"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('Mark as Urgent', 'Đánh dấu là khẩn cấp')}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" />
                <label
                  htmlFor="featured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('Feature on Homepage', 'Đặc sắc trên Trang chủ')}
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('Submitting...', 'Đang gửi...') : t('Submit Job Posting', 'Gửi bài đăng công việc')}
        </Button>
      </form>
    </Form>
  );
};
