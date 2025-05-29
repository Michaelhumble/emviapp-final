
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Shield, Building } from "lucide-react";

interface SalonLocationStepProps {
  form: UseFormReturn<SalonFormValues>;
}

const SalonLocationStep = ({ form }: SalonLocationStepProps) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Location Details / Thông Tin Vị Trí
        </h2>
        <p className="text-gray-600">
          Provide location information to help buyers find your salon
        </p>
        <p className="text-purple-600 font-medium">
          Cung cấp thông tin vị trí để giúp người mua tìm thấy salon của bạn
        </p>
      </div>

      {/* Address Information */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-blue-800">
              📍 Address Information / Thông Tin Địa Chỉ
            </h3>
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700 font-medium">
                    Street Address / Địa Chỉ *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="123 Main Street" 
                      {...field}
                      className="border-blue-300 focus:border-blue-500"
                    />
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
                    <FormLabel className="text-blue-700 font-medium">
                      City / Thành Phố *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="San Jose" 
                        {...field}
                        className="border-blue-300 focus:border-blue-500"
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
                    <FormLabel className="text-blue-700 font-medium">
                      State / Bang *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="CA" 
                        {...field}
                        className="border-blue-300 focus:border-blue-500"
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
                    <FormLabel className="text-blue-700 font-medium">
                      ZIP Code / Mã Bưu Điện *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="95123" 
                        {...field}
                        className="border-blue-300 focus:border-blue-500"
                      />
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
                  <FormLabel className="text-blue-700 font-medium">
                    Neighborhood / Khu Vực
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Downtown, Near shopping center, Business district, etc." 
                      {...field}
                      className="border-blue-300 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormDescription className="text-blue-600">
                    Describe the area where your salon is located
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-green-800">
              🛡️ Privacy Settings / Cài Đặt Bảo Mật
            </h3>
          </div>

          <FormField
            control={form.control}
            name="hideExactAddress"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-green-200 p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-green-700 font-medium">
                    🔒 Hide exact address in listing / Ẩn địa chỉ cụ thể
                  </FormLabel>
                  <FormDescription className="text-green-600">
                    Only show general area (city, neighborhood) to protect your privacy.
                    Exact address will be shared with serious inquirers only.
                    <br />
                    <span className="text-green-500 font-medium">
                      Chỉ hiển thị khu vực chung để bảo vệ riêng tư. Địa chỉ cụ thể chỉ chia sẻ với người mua nghiêm túc.
                    </span>
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Location Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-yellow-600 text-lg">💡</div>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">
              Location Tips / Mẹo Về Vị Trí
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Mention nearby landmarks or popular businesses / Đề cập các địa danh hoặc doanh nghiệp nổi tiếng gần đó</li>
              <li>• Highlight foot traffic and visibility / Nhấn mạnh lưu lượng người đi bộ và khả năng nhìn thấy</li>
              <li>• Include parking availability / Bao gồm thông tin về chỗ đậu xe</li>
              <li>• Note public transportation access / Ghi chú về phương tiện giao thông công cộng</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonLocationStep;
