
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JobFormValues } from '../job/jobFormSchema';
import { Control } from 'react-hook-form';
import { COMPENSATION_TYPES } from '../job/jobConstants';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

export interface CompensationSectionProps {
  control: Control<JobFormValues>;
  onNext?: () => void;
  onPrevious?: () => void;
  isLastStep?: boolean;
}

const CompensationSection: React.FC<CompensationSectionProps> = ({ 
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
            english: 'Compensation Details',
            vietnamese: 'Chi tiết Lương thưởng'
          })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t({
            english: 'Let candidates know about compensation',
            vietnamese: 'Cho ứng viên biết về chế độ lương thưởng'
          })}
        </p>
      </div>

      <FormField
        control={control}
        name="compensation_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t({
                english: 'Compensation Type',
                vietnamese: 'Loại Lương'
              })}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t({
                    english: 'Select compensation type',
                    vietnamese: 'Chọn loại lương'
                  })} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {COMPENSATION_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {t({
                      english: type.charAt(0).toUpperCase() + type.slice(1),
                      vietnamese: type.charAt(0).toUpperCase() + type.slice(1)
                    })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="compensation_min"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t({
                english: 'Minimum Compensation',
                vietnamese: 'Lương Tối thiểu'
              })}
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder={t({
                  english: 'e.g. 15',
                  vietnamese: 'VD: 15'
                })}
                {...field}
                onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="compensation_max"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t({
                english: 'Maximum Compensation',
                vietnamese: 'Lương Tối đa'
              })}
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder={t({
                  english: 'e.g. 25',
                  vietnamese: 'VD: 25'
                })}
                {...field}
                onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="compensation_details"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t({
                english: 'Compensation Details',
                vietnamese: 'Chi tiết Lương thưởng'
              })}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t({
                  english: 'e.g. Weekly pay, tips, benefits',
                  vietnamese: 'VD: Trả lương hàng tuần, tiền tip, phúc lợi'
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

export default CompensationSection;
