
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Shield, Navigation } from "lucide-react";

interface SalonLocationSectionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonLocationSection = ({ form }: SalonLocationSectionProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Step 2</span>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-3">Location Details</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Help buyers find your salon by providing accurate location information while maintaining your privacy preferences
        </p>
      </div>

      <div className="space-y-8">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <Navigation className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Primary Address</h3>
          </div>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">Street Address *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="123 Main Street" 
                      className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">City *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="San Jose" 
                        className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 bg-white/70 backdrop-blur-sm"
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
                    <FormLabel className="text-sm font-semibold text-gray-700">State *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="CA" 
                        className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 bg-white/70 backdrop-blur-sm"
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
                    <FormLabel className="text-sm font-semibold text-gray-700">ZIP Code *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="95123" 
                        className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 bg-white/70 backdrop-blur-sm"
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
                  <FormLabel className="text-sm font-semibold text-gray-700">Neighborhood</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Downtown, Near shopping center, etc." 
                      className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Privacy Options */}
        <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
          <FormField
            control={form.control}
            name="hideExactAddress"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-4 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1 border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </FormControl>
                <div className="space-y-2 leading-none">
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    Privacy Protection
                  </FormLabel>
                  <FormDescription className="text-sm text-gray-600">
                    Hide exact address in listing and only show general area to protect your privacy until you connect with serious buyers
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Location Benefits */}
        <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Location Advantage</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Accurate location details help qualified buyers in your area discover your salon faster. Our system matches nearby buyers with salons in their preferred locations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
