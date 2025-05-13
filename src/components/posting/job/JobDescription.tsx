
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/hooks/useTranslation';

interface JobDescriptionProps {
  form: any;
}

export const JobDescription: React.FC<JobDescriptionProps> = ({ form }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('Job Description', 'Mô tả công việc')}</h2>
      
      <FormField
        control={form.control}
        name="jobSummary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Job Summary', 'Tóm tắt công việc')}</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t('Provide a brief overview of the position', 'Cung cấp tổng quan ngắn gọn về vị trí')} 
                className="min-h-24"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fullDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Full Job Description', 'Mô tả công việc chi tiết')}</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t('Describe the role in detail, including day-to-day responsibilities', 'Mô tả chi tiết về vai trò, bao gồm trách nhiệm hàng ngày')} 
                className="min-h-32"
                {...field} 
              />
            </FormControl>
            <FormDescription>
              {t('A detailed description helps candidates understand if they are a good fit', 'Mô tả chi tiết giúp ứng viên hiểu nếu họ phù hợp')}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="requirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Requirements', 'Yêu cầu công việc')}</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t('List skills, experience, and qualifications needed', 'Liệt kê kỹ năng, kinh nghiệm và trình độ cần thiết')} 
                className="min-h-24"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="benefits"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Benefits (Optional)', 'Quyền lợi (Tùy chọn)')}</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t('List perks, benefits, and advantages of working here', 'Liệt kê các đãi ngộ, quyền lợi và ưu đãi khi làm việc tại đây')} 
                className="min-h-24"
                {...field} 
              />
            </FormControl>
            <FormDescription>
              {t('Highlighting benefits can make your post stand out', 'Nêu bật quyền lợi có thể làm nổi bật bài đăng của bạn')}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
