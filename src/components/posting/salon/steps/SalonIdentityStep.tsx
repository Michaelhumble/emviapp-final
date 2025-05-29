
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Calendar, Sparkles } from "lucide-react";

interface SalonIdentityStepProps {
  form: UseFormReturn<SalonFormValues>;
}

const beautyIndustryOptions = [
  { value: "Nails", label: "Nails" },
  { value: "Hair", label: "Hair" },
  { value: "Lashes", label: "Lashes" },
  { value: "Barber", label: "Barber" },
  { value: "Massage", label: "Massage" },
  { value: "Skincare", label: "Skincare" },
  { value: "Tattoo", label: "Tattoo" },
  { value: "Makeup", label: "Makeup" },
  { value: "Spa", label: "Spa" },
  { value: "Other", label: "Other" }
];

export const SalonIdentityStep = ({ form }: SalonIdentityStepProps) => {
  // Set default beauty industry to "Nails" if not already set
  React.useEffect(() => {
    if (!form.getValues("beautyIndustry")) {
      form.setValue("beautyIndustry", "Nails");
    }
  }, [form]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Salon Information / Thông Tin Salon</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Tell us about your salon business / Hãy cho chúng tôi biết về doanh nghiệp salon của bạn
      </p>

      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="salonName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salon Name / Tên Salon *</FormLabel>
              <FormControl>
                <Input placeholder="Beautiful Nails & Spa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="beautyIndustry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Beauty Industry / Ngành Làm Đẹp *
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || "Nails"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry / Chọn ngành" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {beautyIndustryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
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
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type / Loại Hình Kinh Doanh *</FormLabel>
              <FormControl>
                <Input placeholder="Nail Salon, Hair Salon, Spa, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="establishedYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Year Established / Năm Thành Lập
              </FormLabel>
              <FormControl>
                <Input placeholder="2020" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
