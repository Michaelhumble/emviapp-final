
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
        <h2 className="text-2xl font-playfair font-medium">Địa Chỉ / Location Details</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Thông tin địa chỉ giúp người mua tìm thấy salon của bạn / Location information helps buyers find your salon
      </p>

      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa Chỉ Đường / Street Address *</FormLabel>
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
                <FormLabel>Thành Phố / City *</FormLabel>
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
                <FormLabel>Bang / State *</FormLabel>
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
                <FormLabel>Mã Bưu Điện / ZIP Code</FormLabel>
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
              <FormLabel>Khu Vực / Neighborhood</FormLabel>
              <FormControl>
                <Input placeholder="Trung tâm thương mại, gần chợ / Downtown, Near shopping center" {...field} />
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
                  Ẩn địa chỉ chính xác / Hide exact address in listing
                </FormLabel>
                <FormDescription>
                  Chỉ hiển thị khu vực chung để bảo vệ quyền riêng tư / Only show general area to protect your privacy
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
