
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FinancialDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
  onNext: () => void;
  onPrev: () => void;
}

export const FinancialDetailsStep: React.FC<FinancialDetailsStepProps> = ({ form, onNext, onPrev }) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Financial Details</h2>
        <p className="text-gray-600 mt-2">
          Provide the financial information for your salon
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="askingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asking Price *</FormLabel>
              <FormControl>
                <Input placeholder="Enter asking price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="monthlyRent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Rent *</FormLabel>
              <FormControl>
                <Input placeholder="Enter monthly rent" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="monthlyProfit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Profit</FormLabel>
              <FormControl>
                <Input placeholder="Enter monthly profit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="monthlyRevenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Revenue</FormLabel>
              <FormControl>
                <Input placeholder="Enter monthly revenue" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearlyRevenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yearly Revenue</FormLabel>
              <FormControl>
                <Input placeholder="Enter yearly revenue" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employeeCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Employees</FormLabel>
              <FormControl>
                <Input placeholder="Enter employee count" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
