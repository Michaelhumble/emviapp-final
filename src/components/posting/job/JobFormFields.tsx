
import React from 'react';
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch, FormState, UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { JobFormValues } from './jobFormSchema';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import EmploymentDetailsSection from '@/components/posting/sections/EmploymentDetailsSection';

interface JobFormFieldsProps {
  register: UseFormRegister<JobFormValues>;
  errors: FieldErrors<JobFormValues>;
  control: Control<JobFormValues>;
  watch: UseFormWatch<JobFormValues>;
  setValue: UseFormSetValue<JobFormValues>;
  isCustomTemplate?: boolean;
  form?: UseFormReturn<JobFormValues>;
}

const JobFormFields: React.FC<JobFormFieldsProps> = ({
  register,
  errors,
  control,
  watch,
  setValue,
  isCustomTemplate = false,
  form
}) => {
  // If form is provided directly, use it; otherwise create a wrapper with the provided props
  if (form) {
    return (
      <div className="space-y-8">
        <JobDetailsSection form={form} />
        <EmploymentDetailsSection form={form} />
        
        <div className="space-y-6">
          <h2 className="font-playfair text-xl font-semibold text-gray-900">Contact Information</h2>
          <p className="text-sm text-muted-foreground">How candidates can reach you</p>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact person's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="Email address" {...field} />
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
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
  
  // If no form is provided, use the individual props
  return (
    <div className="space-y-8">
      <JobDetailsSection form={{ control } as any} showVietnameseByDefault={false} />
      <EmploymentDetailsSection form={{ control } as any} />
      
      <div className="space-y-6">
        <h2 className="font-playfair text-xl font-semibold text-gray-900">Contact Information</h2>
        <p className="text-sm text-muted-foreground">How candidates can reach you</p>
        
        <div className="space-y-4">
          <FormField
            control={control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Name</FormLabel>
                <FormControl>
                  <Input placeholder="Contact person's name" {...field} />
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
                <FormLabel>Contact Email*</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" {...field} />
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
                  <Input placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default JobFormFields;
