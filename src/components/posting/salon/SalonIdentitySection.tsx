
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Calendar, Upload } from "lucide-react";

interface SalonIdentitySectionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonIdentitySection = ({ form }: SalonIdentitySectionProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Salon Identity
        </h3>
        <p className="text-gray-600">
          Tell us about your salon's identity and background
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="salonName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4 text-purple-600" />
                Salon Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Magic Nails & Spa"
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
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Business Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="nail-salon">Nail Salon</SelectItem>
                  <SelectItem value="hair-salon">Hair Salon</SelectItem>
                  <SelectItem value="spa">Day Spa</SelectItem>
                  <SelectItem value="barber-shop">Barber Shop</SelectItem>
                  <SelectItem value="beauty-salon">Beauty Salon</SelectItem>
                  <SelectItem value="massage-spa">Massage Spa</SelectItem>
                  <SelectItem value="lash-brow">Lash & Brow Studio</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="establishedYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                Year Established (Optional)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="2015"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
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
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <Upload className="h-4 w-4 text-purple-600" />
                Salon Logo (Optional)
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
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
