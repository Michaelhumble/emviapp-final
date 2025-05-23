
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control, UseFormReturn } from 'react-hook-form';
import { JobFormValues } from '../job/jobFormSchema';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

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
            <div className="mb-3">
              {field.value && Array.isArray(field.value) && field.value.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {field.value.map((requirement, index) => (
                    <Badge key={index} className="px-2 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
                      {requirement}
                      <button
                        type="button"
                        className="ml-1"
                        onClick={() => {
                          const newRequirements = [...field.value];
                          if (Array.isArray(newRequirements)) {
                            newRequirements.splice(index, 1);
                            field.onChange(newRequirements);
                          }
                        }}
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <FormControl>
              <Textarea
                placeholder="List any skills, experience, or certifications required for this position (one per line)"
                className="min-h-[120px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                value=""
                onChange={(e) => {
                  if (e.target.value.includes('\n')) {
                    const newRequirement = e.target.value.trim();
                    if (newRequirement) {
                      const currentRequirements = Array.isArray(field.value) ? field.value : [];
                      field.onChange([...currentRequirements, newRequirement]);
                      e.target.value = '';
                    }
                  }
                }}
                onBlur={(e) => {
                  const newRequirement = e.target.value.trim();
                  if (newRequirement) {
                    const currentRequirements = Array.isArray(field.value) ? field.value : [];
                    field.onChange([...currentRequirements, newRequirement]);
                    e.target.value = '';
                  }
                }}
              />
            </FormControl>
            <p className="text-sm text-gray-500 mt-1">Press Enter after each requirement to add it to the list</p>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RequirementsSection;
