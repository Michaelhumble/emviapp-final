
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Shield, Globe, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface SalonLocationStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonLocationStep = ({ form }: SalonLocationStepProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Motivational Banner */}
      <div className="bg-gradient-to-r from-green-50 via-blue-50 to-teal-50 border border-green-200 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-gray-900">🗺️ Location Matters / Vị trí quan trọng</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Prime location listings get 3x more buyer inquiries! Show what makes your spot special.
          <br />
          <span className="text-green-600 font-medium">Tin đăng vị trí đắc địa nhận được nhiều hơn 3 lần yêu cầu từ người mua! Cho thấy điều gì làm cho địa điểm của bạn đặc biệt.</span>
        </p>
      </div>

      {/* Location Form Card */}
      <div className="bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-playfair text-xl font-semibold text-gray-900">Location Details / Chi tiết vị trí</h3>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Street Address / Địa chỉ đường phố *
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="123 Main Street / 123 Đường Chính" 
                    {...field} 
                    className="h-12 border-2 border-gray-200 focus:border-green-400 rounded-xl"
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
                  <FormLabel className="text-sm font-medium text-gray-700">
                    City / Thành phố *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="San Jose / Thành phố Hồ Chí Minh" 
                      {...field} 
                      className="h-12 border-2 border-gray-200 focus:border-green-400 rounded-xl"
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
                  <FormLabel className="text-sm font-medium text-gray-700">
                    State / Tỉnh/Thành *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="CA / TP.HCM" 
                      {...field} 
                      className="h-12 border-2 border-gray-200 focus:border-green-400 rounded-xl"
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
                  <FormLabel className="text-sm font-medium text-gray-700">
                    ZIP Code / Mã bưu điện
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="95123 / 70000" 
                      {...field} 
                      className="h-12 border-2 border-gray-200 focus:border-green-400 rounded-xl"
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
                <FormLabel className="text-sm font-medium text-gray-700">
                  Neighborhood / Khu vực
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Downtown, Near shopping center / Trung tâm thành phố, Gần trung tâm mua sắm" 
                    {...field} 
                    className="h-12 border-2 border-gray-200 focus:border-green-400 rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hideExactAddress"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-amber-50 p-4 rounded-xl border border-amber-200">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-amber-800">
                    <Shield className="w-4 h-4" />
                    Hide exact address in listing / Ẩn địa chỉ chính xác trong tin đăng
                  </FormLabel>
                  <FormDescription className="text-amber-700 text-sm">
                    Only show general area to protect your privacy
                    <br />
                    <span className="italic">Chỉ hiển thị khu vực chung để bảo vệ quyền riêng tư của bạn</span>
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Location Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-green-500" />
              <span className="font-medium text-green-800">Location Advantage:</span>
            </div>
            <p className="text-sm text-green-700">
              High-traffic areas and shopping centers increase salon value by 25%!
              <br />
              <span className="italic">Khu vực đông đúc và trung tâm mua sắm tăng giá trị salon lên 25%!</span>
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-blue-800">Privacy Tip:</span>
            </div>
            <p className="text-sm text-blue-700">
              70% of sellers hide exact address until serious buyer contact.
              <br />
              <span className="italic">70% người bán ẩn địa chỉ chính xác cho đến khi người mua nghiêm túc liên hệ.</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
