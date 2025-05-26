
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, Building2 } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonIdentitySectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
}

const SalonIdentitySection = ({ form }: SalonIdentitySectionProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="salonName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Salon Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Beautiful Nails & Spa"
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
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Business Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 border-2 focus:border-purple-500">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="nails">Nail Salon</SelectItem>
                  <SelectItem value="hair">Hair Salon</SelectItem>
                  <SelectItem value="barbershop">Barbershop</SelectItem>
                  <SelectItem value="spa">Spa & Wellness</SelectItem>
                  <SelectItem value="beauty">Full Service Beauty</SelectItem>
                  <SelectItem value="waxing">Waxing Studio</SelectItem>
                  <SelectItem value="lashes">Lash & Brow Studio</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="salonSize"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Salon Size *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 border-2 focus:border-purple-500">
                  <SelectValue placeholder="Select salon size" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="small">Small (1-5 stations)</SelectItem>
                <SelectItem value="medium">Medium (6-12 stations)</SelectItem>
                <SelectItem value="large">Large (13+ stations)</SelectItem>
                <SelectItem value="boutique">Boutique/Suite Style</SelectItem>
                <SelectItem value="custom">Custom Size</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Logo Upload */}
      <div className="border-2 border-dashed border-purple-200 rounded-xl p-8 text-center bg-purple-50/50">
        <Building2 className="h-12 w-12 text-purple-400 mx-auto mb-4" />
        <h3 className="font-semibold text-lg mb-2">Salon Logo (Optional)</h3>
        <p className="text-gray-600 mb-4">Upload your salon's logo to make your listing stand out</p>
        <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
          <Upload className="h-4 w-4 mr-2" />
          Choose Logo File
        </Button>
        <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 5MB</p>
      </div>
    </div>
  );
};

export default SalonIdentitySection;
