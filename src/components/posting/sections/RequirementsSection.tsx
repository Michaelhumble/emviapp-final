
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control, UseFormReturn } from 'react-hook-form';
import { JobFormValues } from '../job/jobFormSchema';
import { Textarea } from '@/components/ui/textarea';

interface RequirementsSectionProps {
  control?: Control<JobFormValues>;
  form?: UseFormReturn<JobFormValues>;
}

const RequirementsSection: React.FC<RequirementsSectionProps> = ({ control, form }) => {
  // Use either control directly or from form object
  const formControl = control || form?.control;
  
  if (!formControl) {
    console.error("RequirementsSection requires either control or form prop");
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Requirements & Benefits</h2>
        <p className="text-sm text-muted-foreground mt-1">Specify what you're looking for and what you offer</p>
      </div>

      <FormField
        control={formControl}
        name="requirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Job Requirements</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List any skills, experience, or certifications required for this position"
                className="min-h-[120px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
                value={Array.isArray(field.value) ? field.value.join('\n') : field.value || ''}
                onChange={e => {
                  const value = e.target.value;
                  const reqArray = value.split('\n').filter(item => item.trim() !== '');
                  field.onChange(reqArray);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RequirementsSection;
