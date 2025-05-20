
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { JobFormValues, CompensationTypes } from '../jobFormSchema';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription,
  FormMessage 
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import MultiSelectTags from '@/components/ui/multi-select-tags';
import { requirementOptions, specialtyOptions } from '@/utils/posting/options';
import { useTranslation } from '@/hooks/useTranslation';

const JobDetailsForm: React.FC = () => {
  const { control } = useFormContext<JobFormValues>();
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Description (English)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the job position, responsibilities, and expectations..." 
                {...field} 
                rows={5}
                className="focus:border-primary focus:ring-2 focus:ring-primary/20"
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
                placeholder="Mô tả công việc, trách nhiệm và yêu cầu..." 
                {...field} 
                rows={5}
                className="focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </FormControl>
            <FormDescription>
              Adding a Vietnamese description will help reach more candidates
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="compensation_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Compensation Type</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="focus:border-primary focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Select compensation type" />
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
                placeholder="e.g., $20-25/hr or 60% commission" 
                {...field}
                className="focus:border-primary focus:ring-2 focus:ring-primary/20" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="requirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Requirements</FormLabel>
            <FormControl>
              <MultiSelectTags
                options={requirementOptions}
                selectedValues={field.value || []}
                onChange={(values) => field.onChange(values)}
                placeholder="Select or type requirements..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="specialties"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Desired Specialties</FormLabel>
            <FormControl>
              <MultiSelectTags
                options={specialtyOptions}
                selectedValues={field.value || []}
                onChange={(values) => field.onChange(values)}
                placeholder="Select or type specialties..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="space-y-1 leading-none">
                <FormLabel>Weekly Pay</FormLabel>
              </div>
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
              <div className="space-y-1 leading-none">
                <FormLabel>Housing Available</FormLabel>
              </div>
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
              <div className="space-y-1 leading-none">
                <FormLabel>Owner Will Train</FormLabel>
              </div>
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
              <div className="space-y-1 leading-none">
                <FormLabel>No Supply Deduction</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default JobDetailsForm;
