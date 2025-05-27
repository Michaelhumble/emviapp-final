
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { SalonFormValues } from './salonFormSchema';

interface SalonPostDescriptionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPostDescription: React.FC<SalonPostDescriptionProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Salon Details</h3>
        
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="reasonForSelling"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for Selling</FormLabel>
                <FormControl>
                  <Input placeholder="Enter reason for selling" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="englishDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>English Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your salon in English..."
                    rows={4}
                    {...field} 
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
                <FormLabel>Vietnamese Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Mô tả salon của bạn bằng tiếng Việt..."
                    rows={4}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-3">Salon Features</h4>
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="hasHousing"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Housing Available
                </FormLabel>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="hasWaxRoom"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Wax Room
                </FormLabel>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="hasDiningRoom"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Dining Room
                </FormLabel>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="hasLaundry"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Laundry Facilities
                </FormLabel>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="willTrain"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Will Train New Owner
                </FormLabel>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="isNationwide"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Nationwide Visibility
                </FormLabel>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="fastSalePackage"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Fast Sale Package
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
