
import React from 'react';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Control, UseFormReturn } from 'react-hook-form';
import { JobFormValues } from '../job/jobFormSchema';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { beautySpecialties } from '@/data/specialties';

export interface IndustrySpecialtiesSectionProps {
  control?: Control<JobFormValues>;
  form?: UseFormReturn<JobFormValues>;
  onIndustryChange?: (industry: string) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const IndustrySpecialtiesSection: React.FC<IndustrySpecialtiesSectionProps> = ({ 
  control, 
  form, 
  onIndustryChange,
  onNext,
  onPrevious
}) => {
  // Use either control directly or from form object
  const formControl = control || form?.control;
  
  if (!formControl) {
    console.error("IndustrySpecialtiesSection requires either control or form prop");
    return null;
  }

  const industries = Object.keys(beautySpecialties);

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Industry & Specialties</h2>
        <p className="text-sm text-muted-foreground mt-1">Choose the industry category for this job posting</p>
      </div>

      <FormField
        control={formControl}
        name="industry"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Industry</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                if (onIndustryChange) {
                  onIndustryChange(value);
                }
              }}
              value={field.value || ''}
            >
              <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500">
                <SelectValue placeholder="Select an industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry.charAt(0).toUpperCase() + industry.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <div className="flex justify-between">
        {onPrevious && (
          <button
            type="button"
            onClick={onPrevious}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
        )}
        
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            className="ml-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default IndustrySpecialtiesSection;
