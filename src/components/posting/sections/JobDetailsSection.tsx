
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Control } from 'react-hook-form';
import { JobFormValues } from '../job/jobFormSchema';
import { JOB_TYPES, EXPERIENCE_LEVELS } from '../job/jobConstants';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

interface JobDetailsSectionProps {
  control: Control<JobFormValues>;
  onNext?: () => void;
  onPrevious?: () => void;
  isLastStep?: boolean;
  expressMode?: boolean;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({
  control,
  onNext,
  onPrevious,
  isLastStep = false,
  expressMode = false
}) => {
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
            english: 'Provide more information about the position',
            vietnamese: 'Cung cấp thêm thông tin về vị trí'
          })}
        </p>
      </div>

      <FormField
        control={control}
        name="jobType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t({
                english: 'Job Type',
                vietnamese: 'Loại Công việc'
              })}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t({
                    english: 'Select job type',
                    vietnamese: 'Chọn loại công việc'
                  })} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {JOB_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {t({
                      english: type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' '),
                      vietnamese: type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')
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
        name="experienceLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t({
                english: 'Experience Level',
                vietnamese: 'Mức Kinh nghiệm'
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
                    vietnamese: 'Chọn mức kinh nghiệm'
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

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t({
                english: 'Job Description',
                vietnamese: 'Mô tả Công việc'
              })}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={t({
                  english: 'Describe the role, responsibilities, and what a typical day looks like',
                  vietnamese: 'Mô tả vai trò, trách nhiệm và một ngày làm việc điển hình'
                })}
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="requirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t({
                english: 'Requirements',
                vietnamese: 'Yêu cầu'
              })}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={t({
                  english: 'List qualifications, skills, licenses, or certifications needed',
                  vietnamese: 'Liệt kê trình độ chuyên môn, kỹ năng, giấy phép hoặc chứng chỉ cần thiết'
                })}
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Navigation buttons */}
      {!expressMode && (
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
