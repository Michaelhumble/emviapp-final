
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Calendar, Upload, Sparkles } from "lucide-react";

interface SalonIdentitySectionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonIdentitySection = ({ form }: SalonIdentitySectionProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full">
          <Building className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-800">Step 1</span>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-3">Your Salon Identity</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Let's start with the essential details that will help buyers understand your salon's unique character and heritage
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="salonName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  Salon Name *
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Beautiful Nails Spa" 
                    className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Building className="w-4 h-4 text-purple-500" />
                  Business Type *
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200 bg-white/50 backdrop-blur-sm">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-gray-200 shadow-xl">
                    <SelectItem value="nail-salon" className="hover:bg-purple-50">Nail Salon</SelectItem>
                    <SelectItem value="hair-salon" className="hover:bg-purple-50">Hair Salon</SelectItem>
                    <SelectItem value="beauty-salon" className="hover:bg-purple-50">Beauty Salon</SelectItem>
                    <SelectItem value="spa" className="hover:bg-purple-50">Spa</SelectItem>
                    <SelectItem value="barbershop" className="hover:bg-purple-50">Barbershop</SelectItem>
                    <SelectItem value="massage" className="hover:bg-purple-50">Massage Therapy</SelectItem>
                    <SelectItem value="other" className="hover:bg-purple-50">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="establishedYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  Established Year
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="2015" 
                    className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-purple-500" />
                  Logo (Optional)
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200 bg-white/50 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Premium Feature Highlight */}
      <div className="mt-10 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Premium Listing Benefits</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your salon will be featured prominently to our network of verified buyers, increasing visibility and attracting serious inquiries faster than standard listings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
