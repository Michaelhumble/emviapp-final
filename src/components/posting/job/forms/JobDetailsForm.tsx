
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { JobFormValues, CompensationTypes } from '../jobFormSchema';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

const JobDetailsForm: React.FC = () => {
  const { control } = useFormContext<JobFormValues>();
  
  return (
    <div className="space-y-8">
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Description (English)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the job responsibilities, required experience, skills, etc." 
                {...field} 
                rows={6}
                className="focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="vietnameseDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Description (Vietnamese)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Mô tả công việc bằng tiếng Việt" 
                {...field} 
                rows={6}
                className="focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="compensation_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compensation Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus:border-primary focus:ring-2 focus:ring-primary/20">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CompensationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="compensation_details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compensation Details</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., $20/hr + commission" 
                  {...field} 
                  className="focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
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
                <FormLabel>
                  Weekly Pay
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
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
                <FormLabel>
                  Housing Provided
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
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
                <FormLabel>
                  Owner Will Train
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
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
                <FormLabel>
                  No Supply Deduction
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default JobDetailsForm;
