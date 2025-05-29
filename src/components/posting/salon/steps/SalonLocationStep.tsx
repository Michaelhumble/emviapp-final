
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SalonFormValues } from "../salonFormSchema";
import { MapPin } from "lucide-react";

interface SalonLocationStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonLocationStep = ({ form }: SalonLocationStepProps) => {
  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold">Location Matters / Vị trí quan trọng</h2>
        </div>
        <p className="text-gray-700 mb-2">
          Prime location listings get 3x more buyer inquiries! Show what makes your spot special.
        </p>
        <p className="text-gray-700 italic">
          Tin đăng vị trí đắc địa nhận được nhiều hơn 3 lần yêu cầu từ người mua! Cho thấy điều gì làm cho địa điểm của bạn đặc biệt.
        </p>
      </div>

      {/* Location Details section */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="h-5 w-5 text-blue-600" />
          <h3 className="text-xl font-semibold">Location Details / Chi tiết vị trí</h3>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Street Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Street Address / Địa chỉ đường phố *
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="2345 Mather Dr"
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City, State, ZIP in a row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    City / Thành phố *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="SAN JOSE"
                      className="text-base"
                    />
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
                  <FormLabel className="text-base font-medium">
                    State / Tỉnh/Thành *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="CA"
                      className="text-base"
                    />
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
                  <FormLabel className="text-base font-medium">
                    ZIP Code / Mã bưu điện
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="95116"
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Neighborhood */}
          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Neighborhood / Khu vực
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Downtown, Near shopping center / Trung tâm thành phố, Gần trung tâm mua sắm"
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Privacy option */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
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
                    <FormLabel className="text-base font-medium text-yellow-800">
                      Hide exact address in listing / Ẩn địa chỉ chính xác trong tin đăng
                    </FormLabel>
                    <p className="text-sm text-yellow-700">
                      Only show general area to protect your privacy
                    </p>
                    <p className="text-sm text-yellow-700 italic">
                      Chỉ hiển thị khu vực chung để bảo vệ quyền riêng tư của bạn
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      {/* Tips sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-green-600 text-lg">🌍</div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Location Advantage:</h4>
              <p className="text-sm text-green-700 mb-1">
                High-traffic areas and shopping centers increase salon value by 25%!
              </p>
              <p className="text-sm text-green-700 italic">
                Khu vực đông đúc và trung tâm mua sắm tăng giá trị salon lên 25%!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 text-lg">🔒</div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Privacy Tip:</h4>
              <p className="text-sm text-blue-700 mb-1">
                70% of sellers hide exact address until serious buyer contact.
              </p>
              <p className="text-sm text-blue-700 italic">
                70% người bán ẩn địa chỉ chính xác cho đến khi người mua nghiêm túc liên hệ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
