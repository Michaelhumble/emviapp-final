
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface JobBasicInfoProps {
  form: any;
  onLoadTemplate?: (industry: string) => void;
}

export const JobBasicInfo: React.FC<JobBasicInfoProps> = ({ form, onLoadTemplate }) => {
  const { t } = useTranslation();
  
  const industries = [
    { value: 'nails', label: 'Nails' },
    { value: 'hair', label: 'Hair & Beauty' },
    { value: 'spa', label: 'Spa & Massage' },
    { value: 'barber', label: 'Barbershop' }
  ];

  const jobTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'temporary', label: 'Temporary' },
    { value: 'commission', label: 'Commission' }
  ];

  const handleIndustryChange = (value: string) => {
    form.setValue('industry', value);
    if (onLoadTemplate) {
      onLoadTemplate(value);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('Basic Information', 'Thông tin cơ bản')}</h2>
      
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Job Title', 'Tên công việc')}</FormLabel>
            <FormControl>
              <Input placeholder={t('e.g. Experienced Nail Technician', 'VD: Thợ nail có kinh nghiệm')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Industry', 'Ngành nghề')}</FormLabel>
              <Select 
                onValueChange={handleIndustryChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('Select industry', 'Chọn ngành nghề')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {industries.map(industry => (
                    <SelectItem key={industry.value} value={industry.value}>
                      {t(industry.label, industry.label)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Job Type', 'Loại công việc')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('Select job type', 'Chọn loại công việc')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {t(type.label, type.label)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Location', 'Địa điểm')}</FormLabel>
              <FormControl>
                <Input placeholder={t('e.g. San Jose, CA', 'VD: San Jose, CA')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Salary Range (Optional)', 'Mức lương (Tùy chọn)')}</FormLabel>
              <FormControl>
                <Input placeholder={t('e.g. $800-1200/week', 'VD: $800-1200/tuần')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Card className="bg-blue-50/50 border border-blue-100 shadow-sm">
        <CardContent className="pt-4">
          <p className="text-sm text-blue-700">
            {t('Quick Tip: Jobs with complete details receive 2-3x more applicants', 'Lời khuyên: Đăng việc với thông tin đầy đủ nhận được nhiều ứng viên hơn 2-3 lần')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
