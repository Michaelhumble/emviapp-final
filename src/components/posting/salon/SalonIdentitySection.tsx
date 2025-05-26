
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, Building2 } from "lucide-react";
import { SalonFormValues } from "./salonFormSchema";

interface SalonIdentitySectionProps {
  form: UseFormReturn<SalonFormValues>;
}

const businessTypes = [
  "Hair Salon",
  "Nail Salon", 
  "Beauty Spa",
  "Barbershop",
  "Massage Therapy",
  "Eyebrow/Lash Studio",
  "Medical Spa",
  "Tanning Salon",
  "Other"
];

export const SalonIdentitySection = ({ form }: SalonIdentitySectionProps) => {
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server
      console.log("Logo uploaded:", file.name);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-4">
          <Building2 className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Tell us about your salon
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Help potential buyers understand your business by providing some basic information
        </p>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-8 space-y-6">
        <FormField
          control={form.control}
          name="salonName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium text-gray-800">
                Salon Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your salon name"
                  className="h-12 text-lg rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
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
              <FormLabel className="text-lg font-medium text-gray-800">
                Business Type <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 text-lg rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20">
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
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
              <FormLabel className="text-lg font-medium text-gray-800">
                Year Established
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 2020"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="h-12 text-lg rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <FormLabel className="text-lg font-medium text-gray-800">
            Salon Logo (Optional)
          </FormLabel>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
              id="logo-upload"
            />
            <label htmlFor="logo-upload" className="cursor-pointer">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Upload your salon logo</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
