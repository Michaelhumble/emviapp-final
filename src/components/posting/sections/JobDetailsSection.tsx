
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { JobFormValues } from '../job/jobFormSchema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface JobDetailsSectionProps {
  control: Control<JobFormValues>;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ control }) => {
  const employmentTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'temporary', label: 'Temporary' }
  ];

  const compensationTypes = [
    { value: 'hourly', label: 'Hourly' },
    { value: 'commission', label: 'Commission' },
    { value: 'salary', label: 'Salary' },
    { value: 'hybrid', label: 'Hybrid' }
  ];
  
  const experienceLevels = [
    { value: 'entry-level', label: 'Entry Level' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'experienced', label: 'Experienced' },
    { value: 'senior', label: 'Senior' }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Job Details</h2>
        <p className="text-sm text-muted-foreground mt-1">Tell us about the position</p>
      </div>

      {/* Job Title */}
      <FormField
        control={control}
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
      
      {/* Job Type */}
      <FormField
        control={control}
        name="jobType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Job Type <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-wrap gap-4"
              >
                {employmentTypes.map((type) => (
                  <FormItem key={type.value} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={type.value} />
                    </FormControl>
                    <FormLabel className="font-normal">{type.label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Location */}
      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Location <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                placeholder="Enter city and state"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Experience Level */}
      <FormField
        control={control}
        name="experience_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Experience Level</FormLabel>
            <Select 
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500">
                  <SelectValue placeholder="Select required experience" />
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
      
      {/* Compensation Type */}
      <FormField
        control={control}
        name="compensation_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Compensation Type</FormLabel>
            <Select 
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500">
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
      
      {/* Salary Range */}
      <FormField
        control={control}
        name="salary_range"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Salary Range</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. $50,000 - $70,000 or $20-30/hour"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Benefits */}
      <div className="space-y-4">
        <FormLabel className="text-gray-900 font-medium">Benefits</FormLabel>
        
        <FormField
          control={control}
          name="weekly_pay"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">Weekly Pay</FormLabel>
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="has_housing"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">Housing Available</FormLabel>
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="has_wax_room"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">Wax Room</FormLabel>
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="owner_will_train"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">Owner Will Train</FormLabel>
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="no_supply_deduction"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">No Supply Deduction</FormLabel>
            </FormItem>
          )}
        />
      </div>
      
      {/* Description */}
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Job Description <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the job responsibilities, qualifications, and any other relevant details"
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
        control={control}
        name="vietnameseDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Vietnamese Description (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Mô tả công việc bằng tiếng Việt (nếu có)"
                className="min-h-[150px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default JobDetailsSection;
