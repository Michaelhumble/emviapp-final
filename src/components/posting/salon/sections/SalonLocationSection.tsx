
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MapPin, Eye, EyeOff } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonLocationSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
}

const SalonLocationSection = ({ form }: SalonLocationSectionProps) => {
  const hideAddress = form.watch("hideAddress");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">City *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Los Angeles"
                  className="h-12 border-2 focus:border-purple-500"
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
              <FormLabel className="text-base font-semibold">State *</FormLabel>
              <FormControl>
                <Input
                  placeholder="California"
                  className="h-12 border-2 focus:border-purple-500"
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
            <FormLabel className="text-base font-semibold">Neighborhood Highlights</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., Busy plaza next to Starbucks, high foot traffic, visible from main street..."
                className="min-h-24 border-2 focus:border-purple-500"
                {...field}
              />
            </FormControl>
            <p className="text-sm text-gray-600">Help buyers understand the location advantages</p>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Privacy Toggle */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {hideAddress ? <EyeOff className="h-5 w-5 text-amber-600" /> : <Eye className="h-5 w-5 text-amber-600" />}
            <div>
              <h3 className="font-semibold text-amber-900">Address Privacy</h3>
              <p className="text-sm text-amber-700">
                {hideAddress ? "Exact address hidden until buyer expresses interest" : "City and neighborhood will be visible to all viewers"}
              </p>
            </div>
          </div>
          <FormField
            control={form.control}
            name="hideAddress"
            render={({ field }) => (
              <FormItem>
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

      {/* Interactive Map Placeholder */}
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50">
        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="font-semibold text-lg mb-2">Interactive Map Pin</h3>
        <p className="text-gray-600">Click to set your salon's location on the map</p>
        <p className="text-sm text-gray-500 mt-2">This helps buyers understand the area and accessibility</p>
      </div>
    </div>
  );
};

export default SalonLocationSection;
