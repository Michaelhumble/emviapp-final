
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { JobFormValues, JobTypes } from '../jobFormSchema';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

const JobBasicInfoForm: React.FC = () => {
  const { control } = useFormContext<JobFormValues>();
  
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="salonName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Salon Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter the name of your salon" 
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
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., Nail Technician, Hair Stylist" 
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
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., Brooklyn, NY" 
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
        name="jobType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="focus:border-primary focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {JobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default JobBasicInfoForm;
