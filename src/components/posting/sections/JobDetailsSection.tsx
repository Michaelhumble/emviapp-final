import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { JobTypeOption } from '../job/jobFormSchema';

interface JobDetailsSectionProps {
  form: UseFormReturn<any>;
  onNext?: () => void;
  onBack?: () => void;
  isCustomTemplate?: boolean;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({
  form,
  onNext,
  onBack,
  isCustomTemplate = false
}) => {
  // Make sure we have a valid form context
  if (!form) {
    console.error("JobDetailsSection requires a valid form from react-hook-form");
    return null;
  }

  const jobTypes: JobTypeOption[] = [
    'full-time',
    'part-time',
    'contract',
    'temporary',
    'commission'
  ];

  const compensationTypes = [
    { value: 'hourly', label: 'Hourly' },
    { value: 'salary', label: 'Salary' },
    { value: 'commission', label: 'Commission' },
    { value: 'tips', label: 'Tips Only' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Job Details</h2>
        <p className="text-sm text-muted-foreground mt-1">Tell candidates about the position</p>
      </div>
      
      <div className="grid gap-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Job Title *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g. Nail Technician, Hair Stylist, Massage Therapist" 
                  {...field}
                  className="rounded-xl h-12 border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Job Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="rounded-xl h-12 border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
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
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Location *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="City, State (e.g. Houston, TX)" 
                  {...field}
                  className="rounded-xl h-12 border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Job Description *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the job responsibilities, requirements, and any other important details" 
                  {...field}
                  className="min-h-[120px] rounded-xl border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Vietnamese Description (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Mô tả công việc bằng tiếng Việt (tùy chọn)" 
                  {...field}
                  className="min-h-[120px] rounded-xl border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="compensation_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-medium">Compensation Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-xl h-12 border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200">
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

          <FormField
            control={form.control}
            name="compensation_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-medium">Compensation Details</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. $15-20/hr, 60% commission, etc." 
                    {...field}
                    className="rounded-xl h-12 border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-medium text-gray-900">Benefits & Perks</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="weekly_pay"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Weekly Pay</FormLabel>
                    <FormDescription>Offer weekly payment schedule</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="has_housing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Housing Available</FormLabel>
                    <FormDescription>Accommodation provided</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="has_wax_room"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Wax Room</FormLabel>
                    <FormDescription>Dedicated waxing space</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="owner_will_train"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Training Provided</FormLabel>
                    <FormDescription>Owner will train new staff</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="no_supply_deduction"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">No Supply Deduction</FormLabel>
                    <FormDescription>Supplies provided at no cost</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        {onBack && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
          >
            Back
          </Button>
        )}
        
        {onNext && (
          <Button 
            type="button" 
            onClick={onNext}
            className="ml-auto"
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

function FormDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-muted-foreground">{children}</p>
  );
}

export default JobDetailsSection;
