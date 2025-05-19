
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface EmploymentDetailsSectionProps {
  form: UseFormReturn<any>;
}

const EmploymentDetailsSection: React.FC<EmploymentDetailsSectionProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <h2 className="font-playfair text-xl font-semibold text-gray-900">Employment Details</h2>
      <p className="text-sm text-muted-foreground">Information about the position and requirements</p>
      
      <div className="space-y-5">
        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Job Type *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="full-time" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Full-time
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="part-time" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Part-time
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="contract" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Contract
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="temporary" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Temporary
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="commission" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Commission
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="experience_level"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Experience Level *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="entry" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Entry Level
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="intermediate" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Intermediate
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="experienced" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Experienced
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="senior" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Senior
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="salary_range"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary Range</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., $20-25/hr or $40k-60k/year" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="compensation_details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compensation Details</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Commission structure, tips, benefits" 
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

export default EmploymentDetailsSection;
