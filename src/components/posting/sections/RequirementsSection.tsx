
import React from 'react';
import { Control } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface RequirementsSectionProps {
  control?: Control<any>;
  form?: any;
}

const RequirementsSection: React.FC<RequirementsSectionProps> = ({ control, form }) => {
  const { t } = useTranslation();
  const formContext = useFormContext();
  
  const finalControl = control || form?.control || (formContext && formContext.control);
  const formWatch = form?.watch || (formContext && formContext.watch);
  const formSetValue = form?.setValue || (formContext && formContext.setValue);

  // If no form context is available, show an error
  if (!finalControl || !formWatch || !formSetValue) {
    console.error('RequirementsSection: No form control available');
    return null;
  }

  const requirements = formWatch('requirements') || [];
  const [newRequirement, setNewRequirement] = React.useState('');

  const addRequirement = () => {
    if (newRequirement.trim() !== '') {
      formSetValue('requirements', [...requirements, newRequirement]);
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    formSetValue(
      'requirements',
      requirements.filter((_, i) => i !== index)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addRequirement();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">{t('Requirements & Qualifications', 'Yêu cầu & Tiêu chuẩn')}</h2>
      
      <div className="space-y-4">
        <FormField
          control={finalControl}
          name="requirements"
          render={() => (
            <FormItem>
              <FormLabel>{t('Requirements', 'Yêu cầu')}</FormLabel>
              <div className="flex space-x-2">
                <Input
                  placeholder={t('e.g. 2+ years experience', 'VD: 2+ năm kinh nghiệm')}
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button 
                  type="button" 
                  onClick={addRequirement} 
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {requirements.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">{t('Added Requirements:', 'Yêu cầu đã thêm:')}</p>
            <ul className="space-y-2">
              {requirements.map((req: string, index: number) => (
                <li 
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md border"
                >
                  <span className="text-sm">{req}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRequirement(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequirementsSection;
