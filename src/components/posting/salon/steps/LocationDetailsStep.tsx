
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Shield, TrendingUp, Star } from 'lucide-react';

interface LocationDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
}

const LocationDetailsStep = ({ form }: LocationDetailsStepProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
          <span className="ml-3 text-xl font-medium">🗺️ Location Matters / Vị trí quan trọng</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Prime location listings get 3x more buyer inquiries! Show what makes your spot special.
          <br />
          <span className="text-green-600 font-medium">
          Tin đăng vị trí đắc địa nhận được nhiều hơn 3 lần yêu cầu từ người mua! Cho thấy điều gì làm cho địa điểm của bạn đặc biệt.
          </span>
        </p>
      </div>

      {/* Location Details Section */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-medium text-green-900">Location Details / Chi tiết vị trí</h3>
        </div>

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address / Địa chỉ đường phố *</FormLabel>
                <FormControl>
                  <Input placeholder="2345 Mather Dr" {...field} />
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
                  <FormLabel>City / Thành phố *</FormLabel>
                  <FormControl>
                    <Input placeholder="SAN JOSE" {...field} />
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
                  <FormLabel>State / Tỉnh/Thành *</FormLabel>
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
                  <FormLabel>ZIP Code / Mã bưu điện</FormLabel>
                  <FormControl>
                    <Input placeholder="95116" {...field} />
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
                <FormLabel>Neighborhood / Khu vực</FormLabel>
                <FormControl>
                  <Input placeholder="Downtown, Near shopping center / Trung tâm thành phố, Gần trung tâm mua sắm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hideExactAddress"
            render={({ field }) => (
              <FormItem className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="flex items-center gap-2 text-orange-800">
                      <Shield className="w-4 h-4" />
                      Hide exact address in listing / Ẩn địa chỉ chính xác trong tin đăng
                    </FormLabel>
                    <FormDescription className="text-orange-700">
                      Only show general area to protect your privacy
                      <br />
                      Chỉ hiển thị khu vực chung để bảo vệ quyền riêng tư của bạn
                    </FormDescription>
                  </div>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Location Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
            <span className="font-medium text-green-900">📍 Location Advantage:</span>
          </div>
          <p className="text-green-800 text-sm">
            High-traffic areas and shopping centers increase salon value by 25%!
            <br />
            <span className="text-green-600">
            Khu vực đông đúc và trung tâm mua sắm tăng giá trị salon lên 25%!
            </span>
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Star className="w-4 h-4 text-blue-600 mr-2" />
            <span className="font-medium text-blue-900">🔒 Privacy Tip:</span>
          </div>
          <p className="text-blue-800 text-sm">
            70% of sellers hide exact address until serious buyer contact.
            <br />
            <span className="text-blue-600">
            70% người bán ẩn địa chỉ chính xác cho đến khi người mua nghiêm túc liên hệ.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailsStep;
