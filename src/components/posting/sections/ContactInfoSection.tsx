
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface ContactInfoSectionProps {
  form: UseFormReturn<any>;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Contact Information</h2>
      <p className="text-sm text-muted-foreground">How candidates can reach you about this position</p>
      
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Who candidates should ask for" 
                  {...field} 
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
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input 
                  placeholder="(555) 123-4567" 
                  type="tel"
                  {...field} 
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
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="your-email@example.com" 
                  type="email"
                  required
                  {...field} 
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
