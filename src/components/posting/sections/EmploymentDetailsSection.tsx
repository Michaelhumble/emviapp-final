
import React from 'react';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';

interface EmploymentDetailsSectionProps {
  form: UseFormReturn<JobFormValues>;
}

const EmploymentDetailsSection: React.FC<EmploymentDetailsSectionProps> = ({ form }) => {
  // Ensure we have a valid form context
  if (!form || !form.control) {
    console.error("EmploymentDetailsSection: Missing form context");
    return null;
  }
  
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Employment Details</h2>
        <p className="text-sm text-muted-foreground mt-1">Information about the job position</p>
      </div>
      
      <FormField
        control={form.control}
        name="jobType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Employment Type*</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="temporary">Temporary</SelectItem>
                <SelectItem value="commission">Commission</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              What type of employment are you offering?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="experience_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Experience Level*</FormLabel>
            
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="entry" id="entry" />
                  <Label htmlFor="entry">Entry Level</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="experienced" id="experienced" />
                  <Label htmlFor="experienced">Experienced</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="senior" id="senior" />
                  <Label htmlFor="senior">Senior</Label>
                </div>
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
            <FormLabel className="text-gray-900 font-medium">Salary Range</FormLabel>
            <FormControl>
              <Input placeholder="e.g., $50,000 - $70,000 per year" {...field} />
            </FormControl>
            <FormDescription>
              What salary range are you offering for this position?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="compensation_details"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Compensation Details</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Plus commission, bonuses, benefits" {...field} />
            </FormControl>
            <FormDescription>
              Any additional details about compensation package
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EmploymentDetailsSection;
