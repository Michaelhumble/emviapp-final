
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Control } from 'react-hook-form';
import { JobFormValues } from '../job/jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

interface DetailsSectionProps {
  control: Control<JobFormValues>;
  onNext?: () => void;
  onPrevious?: () => void;
  isLastStep?: boolean;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({
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
            english: 'Job Details',
            vietnamese: 'Chi tiết Công việc'
          })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t({
            english: 'Provide details about the position',
            vietnamese: 'Cung cấp chi tiết về vị trí công việc'
          })}
        </p>
      </div>

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t({
                english: 'Description',
                vietnamese: 'Mô tả'
              })}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={t({
                  english: 'Describe the responsibilities and daily tasks for this role',
                  vietnamese: 'Mô tả trách nhiệm và công việc hàng ngày cho vai trò này'
                })}
                className="min-h-[150px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="vietnameseDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t({
                english: 'Vietnamese Description (Optional)',
                vietnamese: 'Mô tả bằng tiếng Việt (Không bắt buộc)'
              })}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={t({
                  english: 'Vietnamese version of the job description',
                  vietnamese: 'Phiên bản tiếng Việt của mô tả công việc'
                })}
                className="min-h-[150px]"
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

export default DetailsSection;
