
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Building } from "lucide-react";

interface SalonLocationSectionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonLocationSection = ({ form }: SalonLocationSectionProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Salon Location
        </h3>
        <p className="text-gray-600">
          Where is your salon located?
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-600" />
                Street Address
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="123 Main Street"
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">City</FormLabel>
                <FormControl>
                  <Input
                    placeholder="San Jose"
                    className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">State</FormLabel>
                <FormControl>
                  <Input
                    placeholder="CA"
                    className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Zip Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="95123"
                    className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <Building className="h-4 w-4 text-purple-600" />
                Neighborhood (Optional)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Little Saigon, Chinatown, etc."
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hideExactAddress"
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
                  Hide exact address from listing
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Only show general area to protect privacy
                </p>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
