
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { JobFormValues } from '../jobFormSchema';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

const JobContactForm: React.FC = () => {
  const { control } = useFormContext<JobFormValues>();
  
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="contactName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Full name" 
                {...field} 
                className="focus:border-primary focus:ring-2 focus:ring-primary/20"
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
            <FormLabel>Contact Phone</FormLabel>
            <FormControl>
              <Input 
                placeholder="(123) 456-7890" 
                {...field} 
                className="focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="contactEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Email</FormLabel>
            <FormControl>
              <Input 
                placeholder="email@example.com" 
                type="email"
                {...field}
                className="focus:border-primary focus:ring-2 focus:ring-primary/20" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default JobContactForm;
