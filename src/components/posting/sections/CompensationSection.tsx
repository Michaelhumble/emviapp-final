
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { JobFormValues } from '../job/jobFormSchema';

interface CompensationSectionProps {
  form: UseFormReturn<JobFormValues>;
}

const CompensationSection: React.FC<CompensationSectionProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Compensation Details</h2>
        <p className="text-sm text-muted-foreground mt-1">Provide information about pay and compensation</p>
      </div>

      <FormField
        control={form.control}
        name="compensation_type"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-gray-900 font-medium">Compensation Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hourly" id="hourly" />
                  <Label htmlFor="hourly">Hourly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="commission" id="commission" />
                  <Label htmlFor="commission">Commission</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="salary" id="salary" />
                  <Label htmlFor="salary">Salary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="booth-rental" id="booth-rental" />
                  <Label htmlFor="booth-rental">Booth Rental</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="per-service" id="per-service" />
                  <Label htmlFor="per-service">Per Service</Label>
                </div>
              </RadioGroup>
            </FormControl>
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
                placeholder="e.g., $20-25/hr or 60% commission"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Provide specific details about pay rate, commission structure, or other compensation information
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="weekly_pay"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Weekly Pay Estimate</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., $800-1200/week"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
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
              <FormLabel className="text-gray-900 font-medium">
                Housing Available
              </FormLabel>
              <FormDescription>
                Check if housing or accommodation is provided or available
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {/* Additional form fields for other job benefits */}
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="has_wax_room"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-gray-900 font-medium">Wax Room Available</FormLabel>
                <FormDescription>
                  Check if a wax room is available for services
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
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
                <FormLabel className="text-gray-900 font-medium">Owner Will Train</FormLabel>
                <FormDescription>
                  Check if owner provides training for the position
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
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
                <FormLabel className="text-gray-900 font-medium">No Supply Deduction</FormLabel>
                <FormDescription>
                  Check if supplies are provided without deduction from pay
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CompensationSection;
