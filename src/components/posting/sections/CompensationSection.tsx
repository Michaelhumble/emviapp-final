
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Job } from '@/types/job';
import { useTranslation } from '@/hooks/useTranslation';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface CompensationSectionProps {
  form: any; // Add form prop
}

const CompensationSection: React.FC<CompensationSectionProps> = ({ form }) => {
  const { t } = useTranslation();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">{t('Compensation', 'Lương & Thưởng')}</h2>
      
      <FormField
        control={form.control}
        name="salary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Salary/Compensation', 'Lương/Thưởng')}</FormLabel>
            <FormControl>
              <Input 
                placeholder={t('e.g. $20-25/hr or 60% commission', 'VD: 200-250k/ngày hoặc 60% hoa hồng')} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2 text-blue-800">
          {t('Tips for Attracting More Applicants', 'Mẹo để thu hút nhiều ứng viên hơn')}
        </h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
          <li>
            {t(
              'Be specific about pay structure (hourly, commission, etc.)',
              'Cụ thể về cấu trúc lương (theo giờ, hoa hồng, v.v.)'
            )}
          </li>
          <li>
            {t(
              'Include commission rates if applicable',
              'Bao gồm tỷ lệ hoa hồng nếu có'
            )}
          </li>
          <li>
            {t(
              'Mention benefits like health insurance or paid time off',
              'Đề cập đến các quyền lợi như bảo hiểm y tế hoặc nghỉ phép có lương'
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CompensationSection;
