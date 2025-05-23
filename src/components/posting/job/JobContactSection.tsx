
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { JobFormValues } from './jobFormSchema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface JobContactSectionProps {
  control: Control<JobFormValues>;
}

const JobContactSection: React.FC<JobContactSectionProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Contact Information</h2>
        <p className="text-sm text-muted-foreground mt-1">How should candidates reach you?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Contact Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="contact@salon.com"
                  className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Contact Phone</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="applicationInstructions"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Application Instructions</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell candidates how to apply (e.g., 'Send resume to...', 'Call during business hours', etc.)"
                className="min-h-[120px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
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

export default JobContactSection;
