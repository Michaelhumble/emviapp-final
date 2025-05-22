
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Control } from 'react-hook-form';
import { JobFormValues } from '../job/jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

interface LocationSectionProps {
  control: Control<JobFormValues>;
  onNext?: () => void;
  onPrevious?: () => void;
  isLastStep?: boolean;
}

const LocationSection: React.FC<LocationSectionProps> = ({
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
            english: 'Location',
            vietnamese: 'Địa điểm'
          })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t({
            english: 'Where is this position located?',
            vietnamese: 'Vị trí công việc này ở đâu?'
          })}
        </p>
      </div>

      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t({
                english: 'Location',
                vietnamese: 'Địa điểm'
              })}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t({
                  english: 'e.g. San Jose, CA',
                  vietnamese: 'VD: San Jose, CA'
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
        name="isNationwide"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
            <FormControl>
              <Checkbox
                checked={field.value as boolean}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                {t({
                  english: 'Nationwide Visibility',
                  vietnamese: 'Hiển thị Toàn quốc'
                })}
              </FormLabel>
              <p className="text-sm text-muted-foreground">
                {t({
                  english: 'Make this job visible nationwide',
                  vietnamese: 'Hiển thị công việc này trên toàn quốc'
                })}
              </p>
            </div>
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

export default LocationSection;
