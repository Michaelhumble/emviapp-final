
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileText, Globe, Link } from "lucide-react";

interface SalonPostDescriptionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPostDescription = ({ form }: SalonPostDescriptionProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Salon Description
        </h3>
        <p className="text-gray-600">
          Describe your salon and why someone should consider buying it
        </p>
      </div>

      <div className="space-y-6">
        <FormField
          control={form.control}
          name="englishDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-600" />
                English Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your salon, its unique features, clientele, and why it's a great opportunity..."
                  className="min-h-[120px] border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
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
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <Globe className="h-4 w-4 text-purple-600" />
                Vietnamese Description (Mô tả bằng tiếng Việt)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả tiệm nail của bạn, đặc điểm độc đáo, khách hàng, và tại sao đây là cơ hội tuyệt vời..."
                  className="min-h-[120px] border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                  {...field}
                />
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
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <Link className="h-4 w-4 text-purple-600" />
                Virtual Tour URL (Optional)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/virtual-tour"
                  type="url"
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
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
