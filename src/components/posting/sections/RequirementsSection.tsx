
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from '@/hooks/useTranslation';
import { JobDetailsSubmission } from '@/types/job';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, X } from 'lucide-react';

const RequirementsSection = () => {
  const { t } = useTranslation();
  const { control, watch, setValue } = useFormContext<Partial<JobDetailsSubmission>>();
  const requirements = watch('requirements') || [];
  const [newRequirement, setNewRequirement] = React.useState('');

  const addRequirement = () => {
    if (newRequirement.trim() === '') return;
    
    setValue('requirements', [...requirements, newRequirement]);
    setNewRequirement('');
  };

  const removeRequirement = (index: number) => {
    setValue('requirements', requirements.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">{t("Requirements", "Yêu cầu")}</h2>
      
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input 
            value={newRequirement}
            onChange={(e) => setNewRequirement(e.target.value)}
            placeholder={t("Add a requirement", "Thêm yêu cầu")}
            className="flex-grow"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addRequirement();
              }
            }}
          />
          <Button 
            type="button" 
            onClick={addRequirement}
            variant="secondary"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            {t("Add", "Thêm")}
          </Button>
        </div>
        
        <div className="space-y-2">
          {requirements.map((requirement, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <span>{requirement}</span>
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                onClick={() => removeRequirement(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          {requirements.length === 0 && (
            <p className="text-sm text-muted-foreground italic">
              {t("No requirements added yet", "Chưa có yêu cầu nào được thêm")}
            </p>
          )}
        </div>
      </div>
      
      <FormField
        control={control}
        name="requirements"
        render={({ field: { value, ...rest } }) => (
          <FormItem className="hidden">
            <FormControl>
              <Input 
                {...rest} 
                value={requirements.join(',')} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2 text-blue-800">
          {t('Tips for Better Applicants', 'Mẹo để thu hút ứng viên tốt hơn')}
        </h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
          <li>
            {t(
              'Clearly specify years of experience required',
              'Nêu rõ số năm kinh nghiệm yêu cầu'
            )}
          </li>
          <li>
            {t(
              'List specific skills or certifications needed',
              'Liệt kê các kỹ năng hoặc chứng chỉ cụ thể cần thiết'
            )}
          </li>
          <li>
            {t(
              'Include language requirements if applicable',
              'Bao gồm yêu cầu ngôn ngữ nếu có'
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RequirementsSection;
