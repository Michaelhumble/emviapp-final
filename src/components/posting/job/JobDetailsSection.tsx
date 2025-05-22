
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Control, UseFormReturn } from 'react-hook-form';
import { JobFormValues } from './jobFormSchema';
import { employmentTypes as JOB_TYPES, experienceLevels as EXPERIENCE_LEVELS } from './jobConstants';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

interface JobDetailsSectionProps {
  control?: Control<JobFormValues>;
  form?: UseFormReturn<JobFormValues>;
  onNext?: () => void;
  onPrevious?: () => void;
  isLastStep?: boolean;
  expressMode?: boolean;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({
  control,
  form,
  onNext,
  onPrevious,
  isLastStep = false,
  expressMode = false,
}) => {
  // Use either control directly or from form object
  const formControl = control || form?.control;
  
  if (!formControl) {
    console.error("JobDetailsSection requires either control or form prop");
    return null;
  }

  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">
          {t({
            english: 'Job Details',
            vietnamese: 'Chi tiết Công việc'
          })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t({
            english: 'Tell us more about this position',
            vietnamese: 'Cho chúng tôi biết thêm về vị trí này'
          })}
        </p>
      </div>
      
      <FormField
        control={formControl}
        name="jobType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t({
                english: 'Employment Type',
                vietnamese: 'Loại Hình Công việc'
              })}
            </FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t({
                    english: 'Select employment type',
                    vietnamese: 'Chọn loại hình công việc'
                  })} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {JOB_TYPES.map((type) => (
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
        control={formControl}
        name="experience_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t({
                english: 'Experience Level',
                vietnamese: 'Cấp độ Kinh nghiệm'
              })}
            </FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t({
                    english: 'Select experience level',
                    vietnamese: 'Chọn cấp độ kinh nghiệm'
                  })} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {EXPERIENCE_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {t({
                      english: level.charAt(0).toUpperCase() + level.slice(1),
                      vietnamese: level.charAt(0).toUpperCase() + level.slice(1)
                    })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Checkboxes for job features */}
      <div className="space-y-4">
        <FormField
          control={formControl}
          name="weekly_pay"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t({
                    english: 'Weekly Pay',
                    vietnamese: 'Lương Hàng Tuần'
                  })}
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={formControl}
          name="has_housing"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t({
                    english: 'Housing Provided',
                    vietnamese: 'Có Cung cấp Chỗ ở'
                  })}
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={formControl}
          name="owner_will_train"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t({
                    english: 'Owner Will Train',
                    vietnamese: 'Chủ sẽ Đào tạo'
                  })}
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={formControl}
          name="no_supply_deduction"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t({
                    english: 'No Supply Deduction',
                    vietnamese: 'Không Khấu trừ Chi phí Vật tư'
                  })}
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={formControl}
          name="has_wax_room"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t({
                    english: 'Wax Room Available',
                    vietnamese: 'Có Phòng Wax'
                  })}
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>

      {/* Navigation buttons */}
      {(onNext || onPrevious) && (
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
      )}
    </div>
  );
};

export default JobDetailsSection;
