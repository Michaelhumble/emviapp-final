
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface DescriptionDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
  onNext: () => void;
  onPrev: () => void;
}

export const DescriptionDetailsStep: React.FC<DescriptionDetailsStepProps> = ({ form, onNext, onPrev }) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Description & Details</h2>
        <p className="text-gray-600 mt-2">
          Describe your salon and what makes it special
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vietnamese Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Mô tả salon của bạn bằng tiếng Việt"
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="englishDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>English Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your salon in English"
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reasonForSelling"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Selling</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Why are you selling your salon?"
                  className="min-h-[80px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="virtualTourUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Virtual Tour URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
