
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { JobFormValues } from '../job/jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

interface BasicInfoSectionProps {
  control: Control<JobFormValues>;
  onNext?: () => void;
  onPrevious?: () => void;
  isLastStep?: boolean;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  control,
  onNext,
  onPrevious,
  isLastStep = false
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">
          {t({
            english: 'Basic Information',
            vietnamese: 'Thông tin cơ bản'
          })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t({
            english: 'Start with the basics of your job posting',
            vietnamese: 'Bắt đầu với những thông tin cơ bản về tin tuyển dụng của bạn'
          })}
        </p>
      </div>

      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t({
                english: 'Job Title',
                vietnamese: 'Chức danh công việc'
              })}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t({
                  english: 'e.g. Nail Technician, Salon Manager',
                  vietnamese: 'VD: Kỹ thuật viên Nail, Quản lý Salon'
                })}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="salonName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t({
                english: 'Salon Name',
                vietnamese: 'Tên Salon'
              })}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t({
                  english: 'e.g. Beauty Nails & Spa',
                  vietnamese: 'VD: Tiệm Nail & Spa Đẹp'
                })}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        {onPrevious && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
          >
            {t({
              english: 'Previous',
              vietnamese: 'Trước'
            })}
          </Button>
        )}
        
        {onNext && (
          <Button
            type="button"
            onClick={onNext}
            className="ml-auto"
          >
            {isLastStep ? 
              t({
                english: 'Submit',
                vietnamese: 'Gửi'
              }) : 
              t({
                english: 'Next',
                vietnamese: 'Tiếp theo'
              })
            }
          </Button>
        )}
      </div>
    </div>
  );
};

export default BasicInfoSection;
