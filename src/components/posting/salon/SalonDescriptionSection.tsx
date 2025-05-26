
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, DollarSign, Camera } from "lucide-react";

interface SalonDescriptionSectionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonDescriptionSection = ({ form }: SalonDescriptionSectionProps) => {
  const watchedDescription = form.watch("englishDescription") || "";
  const watchedVietnameseDescription = form.watch("vietnameseDescription") || "";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Salon Details</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Provide detailed information about your salon to attract potential buyers
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="askingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Asking Price
              </FormLabel>
              <FormControl>
                <Input placeholder="$150,000" {...field} />
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
              <FormLabel>Monthly Rent</FormLabel>
              <FormControl>
                <Input placeholder="$5,000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="revenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Revenue</FormLabel>
              <FormControl>
                <Input placeholder="$15,000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="squareFeet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Square Feet</FormLabel>
              <FormControl>
                <Input placeholder="1,200" {...field} />
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
              <FormLabel>Number of Staff</FormLabel>
              <FormControl>
                <Input placeholder="5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="virtualTourUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Virtual Tour URL (Optional)
              </FormLabel>
              <FormControl>
                <Input placeholder="https://youtu.be/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-6">
        <FormField
          control={form.control}
          name="englishDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>English Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your salon, location advantages, equipment included, lease terms, etc."
                  className="min-h-32 resize-y"
                  {...field}
                />
              </FormControl>
              <div className="text-xs text-gray-500 text-right">
                {watchedDescription.length}/1000 characters
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vietnamese Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả tiệm của bạn bằng tiếng Việt để tiếp cận nhiều người mua hơn."
                  className="min-h-32 resize-y"
                  {...field}
                />
              </FormControl>
              <div className="text-xs text-gray-500 text-right">
                {watchedVietnameseDescription.length}/1000 characters
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reasonForSelling"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Selling</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Why are you selling this business? (This helps buyers understand your situation)"
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
