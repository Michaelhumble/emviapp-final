
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control, UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { JobFormValues } from '../job/jobFormSchema';

interface ContactInfoSectionProps {
  control?: Control<JobFormValues>;
  form?: UseFormReturn<JobFormValues>;
  onNext?: () => void;
  onPrevious?: () => void; // Ensure this prop is properly declared
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ control, form, onNext, onPrevious }) => {
  // Use either control directly or from form object
  const formControl = control || form?.control;
  
  if (!formControl) {
    console.error("ContactInfoSection requires either control or form prop");
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Contact Information</h2>
        <p className="text-sm text-muted-foreground mt-1">How candidates can reach you</p>
      </div>
      
      {/* Contact Name */}
      <FormField
        control={formControl}
        name="contactName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Contact Name <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                placeholder="Full name of contact person"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Contact Phone */}
      <FormField
        control={formControl}
        name="contactPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Contact Phone <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder="Phone number"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Contact Email */}
      <FormField
        control={formControl}
        name="contactEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Contact Email <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Email address"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        {onPrevious && (
          <button
            type="button"
            onClick={onPrevious}
            className="px-4 py-2 text-primary hover:underline"
          >
            Previous
          </button>
        )}
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 ml-auto"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactInfoSection;
