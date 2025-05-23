
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { JobFormValues } from '../job/jobFormSchema';

interface JobDetailsSectionProps {
  form: UseFormReturn<JobFormValues>;
  onNext?: () => void;
  expressMode?: boolean;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ form, onNext, expressMode = false }) => {
  const jobTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'temporary', label: 'Temporary' },
  ];

  const compensationOptions = [
    { value: 'hourly', label: 'Hourly' },
    { value: 'commission', label: 'Commission' },
    { value: 'salary', label: 'Salary' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  // Field validation and navigation
  const handleNext = async () => {
    // Define fields to validate - typesafe by using only form fields
    const fieldsToValidate = [
      'title', 
      'salonName', 
      'location', 
      'description', 
      'jobType'
    ] as const; // This creates a readonly tuple type that TypeScript can validate
    
    // Trigger validation
    const result = await form.trigger(fieldsToValidate);
    
    if (result && onNext) {
      onNext();
    }
  };

  return (
    <div className="space-y-8">
      {/* Job Details Section */}
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Job Details</h2>
        <p className="text-sm text-muted-foreground mt-1">Tell us about the position you're hiring for</p>
      </div>

      {/* Job Title */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Job Title <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g. Nail Technician, Hair Stylist, etc."
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Salon Name */}
      <FormField
        control={form.control}
        name="salonName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Salon Name <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input 
                placeholder="Name of your salon or business"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Location */}
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Location <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input 
                placeholder="City, State (e.g. Los Angeles, CA)"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Job Type */}
      <FormField
        control={form.control}
        name="jobType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Job Type <span className="text-red-500">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {jobTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Compensation Type */}
      <FormField
        control={form.control}
        name="compensation_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Compensation Type</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500">
                  <SelectValue placeholder="Select compensation type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {compensationOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Compensation Details */}
      <FormField
        control={form.control}
        name="compensation_details"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Compensation Details</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g. $20/hr or 60% commission + tips"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Benefits Checkboxes */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Benefits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Weekly Pay */}
          <FormField
            control={form.control}
            name="weekly_pay"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="weekly_pay"
                  />
                </FormControl>
                <Label 
                  htmlFor="weekly_pay" 
                  className="font-normal text-base leading-6 text-gray-700"
                >
                  Weekly Pay
                </Label>
              </FormItem>
            )}
          />
          
          {/* Housing Provided */}
          <FormField
            control={form.control}
            name="has_housing"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="has_housing"
                  />
                </FormControl>
                <Label 
                  htmlFor="has_housing" 
                  className="font-normal text-base leading-6 text-gray-700"
                >
                  Housing Provided
                </Label>
              </FormItem>
            )}
          />
          
          {/* Wax Room Available */}
          <FormField
            control={form.control}
            name="has_wax_room"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="has_wax_room"
                  />
                </FormControl>
                <Label 
                  htmlFor="has_wax_room" 
                  className="font-normal text-base leading-6 text-gray-700"
                >
                  Wax Room Available
                </Label>
              </FormItem>
            )}
          />
          
          {/* Owner Will Train */}
          <FormField
            control={form.control}
            name="owner_will_train"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="owner_will_train"
                  />
                </FormControl>
                <Label 
                  htmlFor="owner_will_train" 
                  className="font-normal text-base leading-6 text-gray-700"
                >
                  Owner Will Train
                </Label>
              </FormItem>
            )}
          />
          
          {/* No Supply Deduction */}
          <FormField
            control={form.control}
            name="no_supply_deduction"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="no_supply_deduction"
                  />
                </FormControl>
                <Label 
                  htmlFor="no_supply_deduction" 
                  className="font-normal text-base leading-6 text-gray-700"
                >
                  No Supply Deduction
                </Label>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Job Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Job Description <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the job responsibilities, required skills, and experience"
                className="min-h-[150px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Vietnamese Description (Optional) */}
      <FormField
        control={form.control}
        name="vietnamese_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Vietnamese Description (Optional)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Mô tả công việc bằng tiếng Việt"
                className="min-h-[150px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Navigation buttons */}
      <div className="flex justify-end pt-2">
        <Button
          type="button"
          onClick={handleNext}
          className="px-6"
        >
          Next: Contact Information
        </Button>
      </div>
    </div>
  );
};

export default JobDetailsSection;
