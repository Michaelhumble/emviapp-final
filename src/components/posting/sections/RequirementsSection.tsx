
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Partial, Job } from '@/types/job';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';

interface RequirementsSectionProps {
  form: any; // Add form prop
}

const RequirementsSection: React.FC<RequirementsSectionProps> = ({ form }) => {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "requirements"
  });

  const addRequirement = () => {
    append("");
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">{t('Requirements', 'Yêu cầu')}</h2>
      
      <div className="space-y-4">
        <FormLabel className="block mb-1">
          {t('Skills & Requirements', 'Kỹ năng & Yêu cầu')}
        </FormLabel>
        
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <FormField
              control={form.control}
              name={`requirements.${index}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder={t('e.g. 2+ years of experience', 'VD: 2+ năm kinh nghiệm')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => remove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={addRequirement}
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('Add Requirement', 'Thêm yêu cầu')}
        </Button>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2 text-blue-800">
          {t('Tips for Writing Great Requirements', 'Mẹo để viết yêu cầu tốt')}
        </h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
          <li>
            {t(
              'Be specific about skills needed for the position',
              'Cụ thể về các kỹ năng cần thiết cho vị trí'
            )}
          </li>
          <li>
            {t(
              'Clarify minimum experience requirements',
              'Làm rõ các yêu cầu kinh nghiệm tối thiểu'
            )}
          </li>
          <li>
            {t(
              'Include any necessary certifications or licenses',
              'Bao gồm mọi chứng chỉ hoặc giấy phép cần thiết'
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RequirementsSection;
