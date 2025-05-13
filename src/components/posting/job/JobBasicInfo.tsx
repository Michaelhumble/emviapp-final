
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';

interface JobBasicInfoProps {
  form: any;
  onLoadTemplate: (industry: string) => void;
}

export const JobBasicInfo: React.FC<JobBasicInfoProps> = ({ form, onLoadTemplate }) => {
  const { t } = useTranslation();

  const handleIndustryChange = (value: string) => {
    form.setValue('industry', value);
    onLoadTemplate(value);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('Basic Information', 'Thông tin cơ bản')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Job Title', 'Chức danh')}</FormLabel>
              <FormControl>
                <Input placeholder={t('e.g. Nail Technician', 'VD: Thợ nail')} {...field} />
              </FormControl>
              <FormDescription>
                {t('A clear title helps attract the right candidates', 'Tiêu đề rõ ràng giúp thu hút ứng viên phù hợp')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  <SelectItem value="nails">{t('Nails', 'Nail')}</SelectItem>
                  <SelectItem value="hair">{t('Hair', 'Tóc')}</SelectItem>
                  <SelectItem value="spa">{t('Spa', 'Spa')}</SelectItem>
                  <SelectItem value="lashes">{t('Lashes', 'Mi')}</SelectItem>
                  <SelectItem value="skincare">{t('Skincare', 'Chăm sóc da')}</SelectItem>
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
                  <SelectItem value="full-time">{t('Full-time', 'Toàn thời gian')}</SelectItem>
                  <SelectItem value="part-time">{t('Part-time', 'Bán thời gian')}</SelectItem>
                  <SelectItem value="contract">{t('Contract', 'Hợp đồng')}</SelectItem>
                  <SelectItem value="temporary">{t('Temporary', 'Tạm thời')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="salary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Salary Range (Optional)', 'Mức lương (Tùy chọn)')}</FormLabel>
            <FormControl>
              <Input placeholder={t('e.g. $25-35/hr or $60k-80k/year', 'VD: $25-35/giờ hoặc $60k-80k/năm')} {...field} />
            </FormControl>
            <FormDescription>
              {t('Posts with salary information receive 30% more applicants', 'Bài đăng có thông tin lương nhận được nhiều hơn 30% ứng viên')}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
