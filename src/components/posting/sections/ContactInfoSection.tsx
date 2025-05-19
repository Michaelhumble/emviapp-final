
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';

export interface ContactInfoSectionProps {
  form: UseFormReturn<any>;
  onNext?: () => void;
  onBack?: () => void;
  isCustomTemplate?: boolean;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ 
  form,
  onNext,
  onBack
}) => {
  // Make sure we have a valid form context
  if (!form) {
    console.error("ContactInfoSection requires a valid form from react-hook-form");
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Contact Information</h2>
        <p className="text-sm text-muted-foreground mt-1">How candidates can reach you about this position</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Contact Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Who candidates should ask for" 
                  {...field}
                  className="rounded-xl h-12 border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Phone Number</FormLabel>
              <FormControl>
                <Input 
                  placeholder="(555) 123-4567" 
                  type="tel"
                  {...field}
                  className="rounded-xl h-12 border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-gray-900 font-medium">Email Address *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="your-email@example.com" 
                  type="email"
                  required
                  {...field}
                  className="rounded-xl h-12 border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex justify-between pt-4">
        {onBack && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
          >
            Back
          </Button>
        )}
        
        {onNext && (
          <Button 
            type="button" 
            onClick={onNext}
            className="ml-auto"
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContactInfoSection;
