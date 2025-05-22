
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Checkbox } from '@/components/ui/checkbox';
import { beautySpecialties } from '@/data/specialties';
import { useTranslation } from '@/hooks/useTranslation';

interface SpecialtiesSectionProps {
  control: Control<JobFormValues>;
}

const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({ control }) => {
  const { t } = useTranslation();
  const nailSpecialties = beautySpecialties.nails || [];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">
          {t({
            english: 'Job Specialties',
            vietnamese: 'Chuyên môn công việc'
          })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t({
            english: 'Select the specialties required for this position',
            vietnamese: 'Chọn các chuyên môn cần thiết cho vị trí này'
          })}
        </p>
      </div>

      <FormField
        control={control}
        name="specialties"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {nailSpecialties.map((specialty) => (
                <FormField
                  key={specialty}
                  control={control}
                  name="specialties"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={specialty}
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(specialty)}
                            onCheckedChange={(checked) => {
                              const updatedValue = checked
                                ? [...(field.value || []), specialty]
                                : (field.value || []).filter(
                                    (value) => value !== specialty
                                  );
                              field.onChange(updatedValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {specialty}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SpecialtiesSection;
