
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { JobFormValues } from './jobFormSchema';
import { Textarea } from '@/components/ui/textarea';

interface JobDescriptionSectionProps {
  control: Control<JobFormValues>;
}

const JobDescriptionSection: React.FC<JobDescriptionSectionProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Job Description</h2>
        <p className="text-sm text-muted-foreground mt-1">Describe the position in detail</p>
      </div>

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Job Description (English)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the job responsibilities, what you're looking for in a candidate, and what makes this opportunity special..."
                className="min-h-[200px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
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
            <FormLabel className="text-gray-900 font-medium">Job Description (Vietnamese) - Optional</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Mô tả công việc bằng tiếng Việt (tùy chọn)..."
                className="min-h-[200px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default JobDescriptionSection;
