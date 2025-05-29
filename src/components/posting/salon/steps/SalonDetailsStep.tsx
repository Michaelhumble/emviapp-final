
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, Users, Building2, FileText, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonDetailsStep = ({ form }: SalonDetailsStepProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Motivational Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 border border-emerald-200 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-gray-900">💰 Show Your Value / Thể hiện giá trị của bạn</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Detailed financials and business metrics attract serious buyers willing to pay premium prices!
          <br />
          <span className="text-emerald-600 font-medium">Tài chính chi tiết và số liệu kinh doanh thu hút người mua nghiêm túc sẵn sàng trả giá cao!</span>
        </p>
      </div>

      {/* Business Details Form Card */}
      <div className="bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-playfair text-xl font-semibold text-gray-900">Business Details / Chi tiết kinh doanh</h3>
        </div>

        <div className="space-y-8">
          {/* Financial Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="askingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    Asking Price / Giá yêu cầu *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$150,000 / 150.000$" 
                      {...field} 
                      className="h-12 border-2 border-gray-200 focus:border-emerald-400 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthlyRent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Monthly Rent / Tiền thuê hàng tháng *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$5,000 / 5.000$" 
                      {...field} 
                      className="h-12 border-2 border-gray-200 focus:border-emerald-400 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthlyProfit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Monthly Profit / Lợi nhuận hàng tháng
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$8,000 / 8.000$" 
                      {...field} 
                      className="h-12 border-2 border-gray-200 focus:border-emerald-400 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthlyRevenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Monthly Revenue / Doanh thu hàng tháng
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$25,000 / 25.000$" 
                      {...field} 
                      className="h-12 border-2 border-gray-200 focus:border-emerald-400 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Staff & Space Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="employeeCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Users className="w-4 h-4 text-blue-500" />
                    Employee Count / Số nhân viên
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="8" 
                      {...field} 
                      className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfTables"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Number of Tables / Số bàn
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="12" 
                      {...field} 
                      className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="squareFeet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Square Feet / Diện tích (ft²)
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="2,500 ft²" 
                      {...field} 
                      className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="englishDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FileText className="w-4 h-4 text-purple-500" />
                    English Description
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your salon's unique features, services, and what makes it special..." 
                      {...field} 
                      className="min-h-[120px] border-2 border-gray-200 focus:border-purple-400 rounded-xl resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vietnameseDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FileText className="w-4 h-4 text-purple-500" />
                    Vietnamese Description / Mô tả tiếng Việt
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Mô tả các tính năng độc đáo, dịch vụ của salon và điều gì làm cho nó đặc biệt..." 
                      {...field} 
                      className="min-h-[120px] border-2 border-gray-200 focus:border-purple-400 rounded-xl resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="reasonForSelling"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Reason for Selling / Lý do bán
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Retirement, relocation, new business venture... / Nghỉ hưu, chuyển chỗ ở, khởi nghiệp mới..." 
                    {...field} 
                    className="min-h-[80px] border-2 border-gray-200 focus:border-gray-400 rounded-xl resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Features & Amenities */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Features & Amenities / Tính năng & Tiện ích
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="willTrain"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm text-blue-800">
                      Will Train / Sẽ đào tạo
                    </FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasWaxRoom"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm text-blue-800">
                      Wax Room / Phòng wax
                    </FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasParking"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm text-blue-800">
                      Parking / Bãi đỗ xe
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Success Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-emerald-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="font-medium text-emerald-800">Value Tip:</span>
            </div>
            <p className="text-sm text-emerald-700">
              Salons with detailed financials sell 60% faster than those without!
              <br />
              <span className="italic">Salon có tài chính chi tiết bán nhanh hơn 60% so với những salon không có!</span>
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-blue-800">Success Factor:</span>
            </div>
            <p className="text-sm text-blue-700">
              High monthly profit margins attract premium buyers instantly.
              <br />
              <span className="italic">Tỷ suất lợi nhuận hàng tháng cao thu hút người mua cao cấp ngay lập tức.</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
