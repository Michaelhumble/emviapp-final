
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Building2, Calendar } from "lucide-react";

interface SalonIdentityStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonIdentityStep = ({ form }: SalonIdentityStepProps) => {
  // Auto-fill Business Type with "Nail Salon" if empty
  React.useEffect(() => {
    const currentBusinessType = form.getValues('businessType');
    if (!currentBusinessType) {
      form.setValue('businessType', 'Nail Salon');
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
                <Input 
                  placeholder="e.g., Beautiful Nails & Spa, Golden Touch Salon"
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
              <FormLabel>Business Type / Loại Hình Kinh Doanh *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Nail Salon, Hair Salon, Spa, etc." 
                  {...field} 
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-1">
                Pre-filled as "Nail Salon" - edit if needed / Đã điền sẵn "Nail Salon" - chỉnh sửa nếu cần
              </p>
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
                Year Established / Năm Thành Lập (Optional / Tùy chọn)
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., 2020, 2018" 
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
