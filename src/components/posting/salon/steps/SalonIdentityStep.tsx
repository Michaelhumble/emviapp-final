
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Calendar, Upload } from "lucide-react";

interface SalonIdentityStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonIdentityStep = ({ form }: SalonIdentityStepProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Building className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Thông Tin Salon / Salon Identity</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Cho chúng tôi biết về salon của bạn để tạo một danh sách hấp dẫn / Tell us about your salon to create an attractive listing
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="salonName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên Salon / Salon Name *</FormLabel>
              <FormControl>
                <Input placeholder="Beautiful Nails Spa" {...field} />
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
              <FormLabel>Loại Hình Kinh Doanh / Business Type *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại hình kinh doanh / Select business type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="nail-salon">Tiệm Nail / Nail Salon</SelectItem>
                  <SelectItem value="hair-salon">Salon Tóc / Hair Salon</SelectItem>
                  <SelectItem value="beauty-salon">Salon Làm Đẹp / Beauty Salon</SelectItem>
                  <SelectItem value="spa">Spa</SelectItem>
                  <SelectItem value="barbershop">Tiệm Cắt Tóc Nam / Barbershop</SelectItem>
                  <SelectItem value="massage">Massage Therapy</SelectItem>
                  <SelectItem value="other">Khác / Other</SelectItem>
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
              <FormLabel className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Năm Thành Lập / Established Year
              </FormLabel>
              <FormControl>
                <Input placeholder="2015" {...field} />
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
              <FormLabel className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Logo (Tùy Chọn / Optional)
              </FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  accept="image/*"
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
