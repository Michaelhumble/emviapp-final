
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface SalonPostDescriptionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPostDescription = ({ form }: SalonPostDescriptionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-medium">Salon Description</h2>
      <p className="text-gray-600">
        Provide detailed information about your salon to attract potential buyers
      </p>

      <FormField
        control={form.control}
        name="englishDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>English Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your salon, location advantages, reason for selling, equipment included, etc."
                className="min-h-32 resize-y"
                {...field}
              />
            </FormControl>
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
          </FormItem>
        )}
      />
    </div>
  );
};
