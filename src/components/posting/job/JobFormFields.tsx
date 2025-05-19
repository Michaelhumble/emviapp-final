
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
  // Use provided form or create a dummy one with essential properties
  const formContext = form || {
    control,
    register,
    formState: {
      errors,
      isDirty: false,
      isSubmitted: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValidating: false,
      isValid: Object.keys(errors).length === 0,
      submitCount: 0,
      dirtyFields: {},
      touchedFields: {},
      defaultValues: {},
      isLoading: false,
      disabled: false,
      validatingFields: {}
    }
  };

  return (
    <div className="space-y-8">
      {form ? (
        <>
          <JobDetailsSection form={formContext} />
          <EmploymentDetailsSection form={formContext} />
        </>
      ) : (
        <Form {...formContext}>
          <JobDetailsSection form={formContext} />
          <EmploymentDetailsSection form={formContext} />
        </Form>
      )}
      
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
