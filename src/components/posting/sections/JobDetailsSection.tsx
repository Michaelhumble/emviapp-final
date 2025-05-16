
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Partial, Job } from '@/types/job';
import { useTranslation } from '@/hooks/useTranslation';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface JobDetailsSectionProps {
  form: any;  // Add form prop
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ form }) => {
  const { t } = useTranslation();
  
  // Job type options
  const jobTypes = [
    { value: 'full-time', label: t('Full-time', 'Toàn thời gian') },
    { value: 'part-time', label: t('Part-time', 'Bán thời gian') },
    { value: 'contract', label: t('Contract', 'Hợp đồng') },
    { value: 'temporary', label: t('Temporary', 'Tạm thời') }
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">{t('Job Details', 'Chi tiết công việc')}</h2>
      
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Job Title', 'Tiêu đề công việc')} *</FormLabel>
            <FormControl>
              <Input 
                placeholder={t('e.g. Nail Technician', 'VD: Thợ nail')}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Location', 'Địa điểm')} *</FormLabel>
            <FormControl>
              <Input 
                placeholder={t('e.g. Los Angeles, CA', 'VD: Quận 7, TP.HCM')} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="jobType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Job Type', 'Loại công việc')} *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('Select job type', 'Chọn loại công việc')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {jobTypes.map(type => (
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
      
      <FormField
        control={form.control}
        name="jobSummary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Job Summary', 'Tóm tắt công việc')}</FormLabel>
            <FormControl>
              <Input 
                placeholder={t('Short summary of the position', 'Tóm tắt ngắn về vị trí')} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Job Description', 'Mô tả công việc')} *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t('Enter detailed job description...', 'Nhập mô tả chi tiết...')}
                rows={5}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default JobDetailsSection;
