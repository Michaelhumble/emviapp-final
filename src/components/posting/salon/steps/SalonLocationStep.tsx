
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Shield } from "lucide-react";

interface SalonLocationStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonLocationStep = ({ form }: SalonLocationStepProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Location Details / Chi Tiết Địa Chỉ</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Location information helps buyers find your salon / Thông tin địa chỉ giúp người mua tìm thấy salon của bạn
      </p>

      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address / Địa Chỉ Đường *</FormLabel>
              <FormControl>
                <Input placeholder="123 Main Street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City / Thành Phố *</FormLabel>
                <FormControl>
                  <Input placeholder="San Jose" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State / Bang *</FormLabel>
                <FormControl>
                  <Input placeholder="CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP Code / Mã Bưu Điện</FormLabel>
                <FormControl>
                  <Input placeholder="95123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Neighborhood / Khu Vực</FormLabel>
              <FormControl>
                <Input placeholder="Downtown, Near shopping center / Trung tâm thương mại, gần chợ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hideExactAddress"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Hide exact address in listing / Ẩn địa chỉ chính xác
                </FormLabel>
                <FormDescription>
                  Only show general area to protect your privacy / Chỉ hiển thị khu vực chung để bảo vệ quyền riêng tư
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
