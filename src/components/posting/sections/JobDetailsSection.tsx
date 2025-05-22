
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control, UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { JobFormValues } from '../job/jobFormSchema';
import { employmentTypes, compensationTypes } from '../job/jobConstants';

interface JobDetailsSectionProps {
  control?: Control<JobFormValues>;
  form?: UseFormReturn<JobFormValues>;
  onNext?: () => void;
  onPrevious?: () => void; // Add the missing onPrevious prop
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ control, form, onNext, onPrevious }) => {
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
        <p className="text-sm text-muted-foreground mt-1">Share the details of your job opening</p>
      </div>

      {/* Salon Name */}
      <FormField
        control={formControl}
        name="salonName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Salon Name <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                placeholder="Enter salon name"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Job Title */}
      <FormField
        control={formControl}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Job Title <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. Nail Technician, Hair Stylist"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
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
                placeholder="Describe the job responsibilities, requirements, and what makes your salon special..."
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
        control={formControl}
        name="vietnameseDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Vietnamese Description <span className="text-gray-500">(Optional)</span></FormLabel>
            <FormControl>
              <Textarea
                placeholder="Mô tả công việc bằng tiếng Việt (tùy chọn)..."
                className="min-h-[150px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {employmentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500">
                  <SelectValue placeholder="Select compensation type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {compensationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
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
            <FormLabel className="text-gray-900 font-medium">Compensation Details <span className="text-gray-500">(Optional)</span></FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. $25-35/hr, 60% commission, etc."
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
        <p className="text-sm font-medium text-gray-900">Benefits & Perks</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={formControl}
            name="weekly_pay"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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

      {/* Navigation buttons */}
      <div className="flex justify-between pt-4">
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

export default JobDetailsSection;
