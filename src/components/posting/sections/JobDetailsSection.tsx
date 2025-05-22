
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control, UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { JobFormValues } from '../job/jobFormSchema';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export interface JobDetailsSectionProps {
  control?: Control<JobFormValues>;
  form?: UseFormReturn<JobFormValues>;
  onNext?: () => void;
  onPrevious?: () => void;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ 
  control, 
  form,
  onNext,
  onPrevious 
}) => {
  // Use either control directly or from form object
  const formControl = control || form?.control;
  
  if (!formControl) {
    console.error("JobDetailsSection requires either control or form prop");
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Job Details</h2>
        <p className="text-sm text-muted-foreground mt-1">Tell us about the position</p>
      </div>
      
      {/* Job Title */}
      <FormField
        control={formControl}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Job Title <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. Nail Technician, Hair Stylist, Manager"
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
        control={formControl}
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
        control={formControl}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Location <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                placeholder="City, State"
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
        control={formControl}
        name="jobType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Job Type</FormLabel>
            <Select
              defaultValue={field.value}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="temporary">Temporary</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Compensation Type */}
      <FormField
        control={formControl}
        name="compensation_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Compensation Type</FormLabel>
            <Select
              defaultValue={field.value}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500">
                  <SelectValue placeholder="Select compensation type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="commission">Commission</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Compensation Details */}
      <FormField
        control={formControl}
        name="compensation_details"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Compensation Details</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Provide details about pay, commission structure, benefits, etc."
                className="min-h-[100px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Job Description */}
      <FormField
        control={formControl}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Job Description <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the job responsibilities, expectations, and qualifications"
                className="min-h-[150px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Vietnamese Description */}
      <FormField
        control={formControl}
        name="vietnameseDescription"
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
      
      {/* Perks/Benefits Checkboxes */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-800">Additional Benefits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField
            control={formControl}
            name="weekly_pay"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Weekly Pay</FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={formControl}
            name="has_housing"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Housing Provided</FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={formControl}
            name="has_wax_room"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Wax Room Available</FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={formControl}
            name="owner_will_train"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Owner Will Train</FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={formControl}
            name="no_supply_deduction"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>No Supply Deduction</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
      
      <div className="flex justify-between">
        {onPrevious && (
          <button
            type="button"
            onClick={onPrevious}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
        )}
        
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            className="ml-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default JobDetailsSection;
