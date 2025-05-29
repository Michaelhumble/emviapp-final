
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, DollarSign, Users, TrendingUp, Home, Car, GraduationCap, HandHeart } from "lucide-react";

interface SalonBusinessStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonBusinessStep = ({ form }: SalonBusinessStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Business Details / Chi tiết kinh doanh
        </h3>
        <p className="text-gray-600">
          Financial information and business metrics / Thông tin tài chính và chỉ số kinh doanh
        </p>
      </div>

      {/* Financial Information */}
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-900">Financial Information / Thông tin tài chính</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="askingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                  Asking Price / Giá yêu cầu *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="$350,000"
                    className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    {...field}
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
                <FormLabel className="text-base font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-purple-600" />
                  Monthly Rent / Tiền thuê hàng tháng *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="$5,500"
                    className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    {...field}
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
                <FormLabel className="text-base font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  Monthly Revenue / Doanh thu hàng tháng
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="$18,000"
                    className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    {...field}
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
                <FormLabel className="text-base font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Monthly Profit / Lợi nhuận hàng tháng
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="$8,000"
                    className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Business Metrics */}
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-900">Business Metrics / Chỉ số kinh doanh</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="numberOfTables"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Nail Stations / Số bàn làm móng
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="8"
                    type="number"
                    className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfChairs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Pedicure Chairs / Số ghế spa chân
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="6"
                    type="number"
                    className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfStaff"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  Number of Employees / Số nhân viên
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="8"
                    type="number"
                    className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    {...field}
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
                <FormLabel className="text-base font-medium">
                  Square Footage / Diện tích (ft²)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="1,200"
                    className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Additional Features */}
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-900">Features & Services / Tính năng & Dịch vụ</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-1 leading-none">
                  <FormLabel className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-purple-600" />
                    Training Provided / Có đào tạo lại
                  </FormLabel>
                </div>
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
                <div className="space-y-1 leading-none">
                  <FormLabel className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-purple-600" />
                    Parking Available / Có chỗ đậu xe
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="helpWithTransition"
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
                    <HandHeart className="h-4 w-4 text-purple-600" />
                    Will Help with Transition / Sẽ giúp chuyển giao
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="equipmentIncluded"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Equipment Included / Bao gồm thiết bị
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="reasonForSelling"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Reason for Selling / Lý do bán
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Retiring, moving, expanding to new location, etc. / Nghỉ hưu, chuyển nhà, mở rộng địa điểm mới, v.v."
                className="min-h-[100px] border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
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

export default SalonBusinessStep;
