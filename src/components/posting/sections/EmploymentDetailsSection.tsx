
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
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { employmentTypes, compensationTypes } from '@/components/posting/job/jobFormConstants';
import { UseFormReturn } from 'react-hook-form';

interface EmploymentDetailsSectionProps {
  form: UseFormReturn<any>;
}

const EmploymentDetailsSection: React.FC<EmploymentDetailsSectionProps> = ({ form }) => {
  // Make sure we have a valid form context
  if (!form) {
    console.error("EmploymentDetailsSection requires a valid form from react-hook-form");
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="employmentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
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
        
        <FormField
          control={form.control}
          name="compensationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compensation Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
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
      </div>
      
      <FormField
        control={form.control}
        name="compensationDetails"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Compensation Details</FormLabel>
            <FormControl>
              <Input placeholder="e.g., $20-30/hr plus tips, 50-60% commission, etc." {...field} />
            </FormControl>
            <FormDescription>
              Include salary range, commission structure, or other compensation details
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="weeklyPay"
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
                <FormDescription>
                  Employee gets paid weekly
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="hasHousing"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Housing Available</FormLabel>
                <FormDescription>
                  Housing is provided for employees
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="ownerWillTrain"
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
                <FormDescription>
                  Owner provides on-the-job training
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="noSupplyDeduction"
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
                <FormDescription>
                  Supplies are provided at no cost
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default EmploymentDetailsSection;
