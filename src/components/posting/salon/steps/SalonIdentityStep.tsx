
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SalonFormValues } from "../salonFormSchema";

interface SalonIdentityStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonIdentityStep = ({ form }: SalonIdentityStepProps) => {
  // Pre-fill business type with "Nail Salon" on component mount
  useEffect(() => {
    if (!form.getValues('businessType')) {
      form.setValue('businessType', 'Nail Salon');
    }
  }, [form]);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Salon Information / Thông Tin Salon</h2>
        <p className="text-gray-600 mt-2">
          Tell us about your salon business / Hãy cho chúng tôi biết về doanh nghiệp salon của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="salonName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salon Name / Tên Salon *</FormLabel>
              <FormControl>
                <Input placeholder="Enter salon name / Nhập tên salon" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value || "Nail Salon"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type / Chọn loại hình" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Nail Salon">Nail Salon / Tiệm Nail</SelectItem>
                  <SelectItem value="Hair Salon">Hair Salon / Salon Tóc</SelectItem>
                  <SelectItem value="Spa">Spa / Spa</SelectItem>
                  <SelectItem value="Beauty Salon">Beauty Salon / Salon Làm Đẹp</SelectItem>
                  <SelectItem value="Barbershop">Barbershop / Tiệm Cắt Tóc Nam</SelectItem>
                  <SelectItem value="Massage">Massage / Massage</SelectItem>
                  <SelectItem value="Eyebrow Threading">Eyebrow Threading / Chỉ Lông Mày</SelectItem>
                  <SelectItem value="Waxing Salon">Waxing Salon / Salon Wax</SelectItem>
                  <SelectItem value="Other">Other / Khác</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="establishedYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Established Year / Năm Thành Lập (Optional)</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter year established / Nhập năm thành lập" 
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
