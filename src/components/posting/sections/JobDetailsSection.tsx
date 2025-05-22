
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control, UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { employmentTypes, compensationTypes, jobBenefits, experienceLevels } from '../job/jobFormConstants';
import { JobFormValues } from '../job/jobFormSchema';

interface JobDetailsSectionProps {
  control?: Control<JobFormValues>;
  form?: UseFormReturn<JobFormValues>;
  onNext?: () => void;
  onPrevious?: () => void;
  expressMode?: boolean; // Added missing prop
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ 
  control, 
  form, 
  onNext, 
  onPrevious,
  expressMode = false // Default to false for backward compatibility
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
        <p className="text-sm text-muted-foreground mt-1">Enter information about the position</p>
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
                placeholder="e.g., Nail Technician, Hair Stylist"
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
                placeholder="City, State or full address"
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
            <FormLabel className="text-gray-900 font-medium">Job Type <span className="text-red-500">*</span></FormLabel>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {employmentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
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
            <Select
              value={field.value || ''}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500">
                  <SelectValue placeholder="Select compensation type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {compensationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
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
            <FormLabel className="text-gray-900 font-medium">Compensation Details</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., $20-25/hr + tips, 60/40 split"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Salary Range */}
      <FormField
        control={formControl}
        name="salary_range"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Salary Range</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., $50,000-60,000/year"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Experience Level */}
      <FormField
        control={formControl}
        name="experience_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Experience Level</FormLabel>
            <Select
              value={field.value || ''}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                placeholder="Describe job responsibilities, benefits, requirements, etc."
                className="min-h-[120px] resize-vertical border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
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
        name="vietnamese_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Vietnamese Description (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Vietnamese version of job description if applicable"
                className="min-h-[120px] resize-vertical border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Job Benefits */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium">Job Benefits</h3>
          <p className="text-xs text-gray-500 mt-1">Select all that apply</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {jobBenefits.map((benefit) => (
            <FormField
              key={benefit.id}
              control={formControl}
              name={benefit.id as keyof JobFormValues}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value as boolean}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm cursor-pointer">{benefit.label}</FormLabel>
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
      
      {/* Navigation buttons for multi-step form */}
      {(onNext || onPrevious) && (
        <div className="flex justify-between mt-4">
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
              onClick={() => {
                // Validate relevant fields before proceeding
                const fieldsToValidate = ['title', 'salonName', 'location', 'jobType', 'description'];
                form?.trigger(fieldsToValidate).then((isValid) => {
                  if (isValid) {
                    onNext();
                  }
                });
              }}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default JobDetailsSection;
