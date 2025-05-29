
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, DollarSign, Users, TrendingUp } from "lucide-react";

interface SalonBusinessStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonBusinessStep = ({ form }: SalonBusinessStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Business Details
        </h3>
        <p className="text-gray-600">
          Tell us about your salon's financial performance and business metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="askingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-purple-600" />
                Asking Price
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="$350,000"
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
          name="monthlyRent"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4 text-purple-600" />
                Monthly Rent
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="$5,500"
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
          name="numberOfStaff"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                Number of Staff
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="8"
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
          name="monthlyRevenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                Monthly Revenue
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="$18,000"
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
        name="reasonForSelling"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Reason for Selling (Optional)
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Retiring, moving, expanding to new location, etc."
                className="min-h-[100px] border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SalonBusinessStep;
