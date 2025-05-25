
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';

interface CompensationSectionProps {
  control: Control<any>;
}

const CompensationSection: React.FC<CompensationSectionProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Compensation</h2>
        <p className="text-sm text-muted-foreground mt-1">Specify how this position will be compensated</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="compensationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compensation Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select compensation type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="commission">Commission</SelectItem>
                  <SelectItem value="hourly-plus-commission">Hourly + Commission</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="compensationDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compensation Details</FormLabel>
              <FormControl>
                <Input placeholder="e.g. $15-20/hour, 40-60% commission" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CompensationSection;
