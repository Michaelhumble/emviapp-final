
import React, { useEffect } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface ContactInfoSectionProps {
  form: UseFormReturn<any>;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ form }) => {
  // Make sure we have a valid form context
  if (!form) {
    console.error("ContactInfoSection requires a valid form from react-hook-form");
    return null;
  }

  // Add debug logging
  useEffect(() => {
    console.log("ContactInfoSection rendering with form:", form);
    console.log("Form values:", form.getValues());
    console.log("salonName field:", form.getValues('salonName'));
  }, [form]);

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Contact Information</h2>
        <p className="text-sm text-muted-foreground mt-1">How candidates can reach you about this position</p>
      </div>
      
      {/* Debug div to check if this section renders */}
      <div className="bg-yellow-100 p-2 text-sm border border-yellow-300 rounded">
        Debug: Contact Section is rendering. Salon Name should be below.
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* SALON NAME FIELD - First field in the section */}
        <FormField
          control={form.control}
          name="salonName"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-gray-900 font-medium">Salon Name *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your salon name" 
                  {...field}
                  required
                  className="rounded-xl h-12 border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-1">The name of your salon or business</p>
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
      </div>
    </div>
  );
};

export default ContactInfoSection;
