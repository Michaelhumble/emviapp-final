
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, DollarSign } from "lucide-react";
import { SalonFormValues } from "./salonFormSchema";

interface SalonDescriptionSectionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonDescriptionSection = ({ form }: SalonDescriptionSectionProps) => {
  const { watch } = form;
  const watchedDescription = watch("salonDescription") || "";
  const watchedReason = watch("reasonForSelling") || "";

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-4">
          <FileText className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Describe your salon
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Help potential buyers understand what makes your salon special and why it's a great investment
        </p>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-8 space-y-6">
        <FormField
          control={form.control}
          name="salonDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium text-gray-800">
                Salon Description <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your salon's unique features, services, clientele, equipment, and what makes it special..."
                  className="min-h-32 text-base rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 resize-none"
                  {...field}
                />
              </FormControl>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{watchedDescription.length}/1000 characters</span>
                <span className={watchedDescription.length < 30 ? "text-red-500" : "text-green-600"}>
                  {watchedDescription.length < 30 ? `${30 - watchedDescription.length} more needed` : "Minimum met"}
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="askingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium text-gray-800">
                Asking Price <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-500 font-medium">USD</span>
                  </div>
                  <Input
                    type="number"
                    placeholder="250000"
                    className="h-12 text-lg rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 pl-20"
                    min="0"
                    step="1000"
                    {...field}
                  />
                </div>
              </FormControl>
              <p className="text-sm text-gray-500">Enter the full asking price for your salon</p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reasonForSelling"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium text-gray-800">
                Reason for Selling (Optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Why are you selling? (e.g., retirement, relocation, career change, etc.)"
                  className="min-h-24 text-base rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 resize-none"
                  {...field}
                />
              </FormControl>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{watchedReason.length}/300 characters</span>
                <span className="text-gray-400">Optional field</span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="virtualTourUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium text-gray-800">
                Virtual Tour URL (Optional)
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://example.com/virtual-tour"
                  className="h-12 text-lg rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                  {...field}
                />
              </FormControl>
              <p className="text-sm text-gray-500">
                Add a link to a virtual tour, video walkthrough, or photo gallery
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
