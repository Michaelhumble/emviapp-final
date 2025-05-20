
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { JobFormValues, CompensationTypes } from '../jobFormSchema';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AIPolishButton from '../AIPolishButton';

// Common requirements options
const requirementOptions = [
  { value: 'experience', label: 'Experience Required' },
  { value: 'license', label: 'License Required' },
  { value: 'english', label: 'English Speaking' },
  { value: 'vietnamese', label: 'Vietnamese Speaking' },
  { value: 'certified', label: 'Certified Professional' },
  { value: 'portfolio', label: 'Portfolio Required' },
  { value: 'references', label: 'References Required' },
  { value: 'weekend', label: 'Weekend Availability' },
];

// Common specialty options
const specialtyOptions = [
  { value: 'acrylic', label: 'Acrylic' },
  { value: 'gel', label: 'Gel' },
  { value: 'dipping', label: 'Dipping Powder' },
  { value: 'pedicure', label: 'Pedicure' },
  { value: 'manicure', label: 'Manicure' },
  { value: 'waxing', label: 'Waxing' },
  { value: 'facial', label: 'Facial' },
  { value: 'massage', label: 'Massage' },
  { value: 'lashes', label: 'Lash Extensions' },
  { value: 'brows', label: 'Eyebrow Services' },
];

const JobDetailsForm: React.FC = () => {
  const { control, setValue, watch } = useFormContext<JobFormValues>();
  
  const description = watch('description');
  const vietnameseDescription = watch('vietnameseDescription');

  // Handle AI Polish for English description
  const handlePolishEnglish = (polishedText: string) => {
    setValue('description', polishedText, { shouldValidate: true });
  };

  // Handle AI Polish for Vietnamese description
  const handlePolishVietnamese = (polishedText: string) => {
    setValue('vietnameseDescription', polishedText, { shouldValidate: true });
  };
  
  return (
    <div className="space-y-6">
      {/* Job Description (English) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <FormLabel className="text-base">Job Description (English)</FormLabel>
          <AIPolishButton 
            text={description || ''} 
            onPolish={handlePolishEnglish}
            context="job description" 
          />
        </div>
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea 
                  placeholder="Describe the job responsibilities, requirements, and benefits..." 
                  className="h-32 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Job Description (Vietnamese) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <FormLabel className="text-base">Job Description (Vietnamese)</FormLabel>
          <AIPolishButton 
            text={vietnameseDescription || ''} 
            onPolish={handlePolishVietnamese} 
            context="vietnamese job description"
          />
        </div>
        <FormField
          control={control}
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea 
                  placeholder="Mô tả trách nhiệm công việc, yêu cầu và lợi ích..." 
                  className="h-32 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Compensation Type */}
      <FormField
        control={control}
        name="compensation_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Compensation Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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

      {/* Compensation Details */}
      <FormField
        control={control}
        name="compensation_details"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Compensation Details</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., $25-30/hr + tips, 60% commission, etc." 
                {...field} 
                className="focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Requirements */}
      <FormField
        control={control}
        name="requirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Requirements</FormLabel>
            <FormControl>
              <MultiSelect
                selected={field.value || []}
                onChange={field.onChange}
                placeholder="Select job requirements"
                options={requirementOptions}
                className="focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Specialties */}
      <FormField
        control={control}
        name="specialties"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Required Specialties</FormLabel>
            <FormControl>
              <MultiSelect
                selected={field.value || []}
                onChange={field.onChange}
                placeholder="Select required specialties"
                options={specialtyOptions}
                className="focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Additional Perks */}
      <div className="space-y-4">
        <FormLabel className="text-base">Additional Perks</FormLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="weekly_pay"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
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
              <FormItem className="flex items-center space-x-2">
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
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                  />
                </FormControl>
                <FormLabel className="font-normal">Wax Room Available</FormLabel>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="owner_will_train"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
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
              <FormItem className="flex items-center space-x-2">
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
      </div>
    </div>
  );
};

export default JobDetailsForm;
