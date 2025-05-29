
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, Shield, FileText } from "lucide-react";

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
}

const SalonDetailsStep = ({ form }: SalonDetailsStepProps) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Business Details / Chi Tiết Kinh Doanh
        </h2>
        <p className="text-gray-600">
          Provide financial and operational information about your salon business
        </p>
        <p className="text-purple-600 font-medium">
          Cung cấp thông tin tài chính và hoạt động của salon
        </p>
      </div>

      {/* Financial Information */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-green-800">
              💰 Financial Information / Thông Tin Tài Chính
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="askingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-green-700 font-medium">
                    Asking Price / Giá Bán *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$150,000" 
                      {...field}
                      className="border-green-300 focus:border-green-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="grossRevenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-green-700 font-medium">
                    Monthly Gross Revenue / Doanh Thu Tháng
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$25,000" 
                      {...field}
                      className="border-green-300 focus:border-green-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="netProfit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-green-700 font-medium">
                    Monthly Net Profit / Lợi Nhuận Tháng
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$8,000" 
                      {...field}
                      className="border-green-300 focus:border-green-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Business Features */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-blue-800">
              🛡️ Business Features / Đặc Điểm Kinh Doanh
            </h3>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="equipmentIncluded"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-blue-200 p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-blue-700 font-medium">
                      ✅ Equipment Included / Bao Gồm Thiết Bị
                    </FormLabel>
                    <p className="text-sm text-blue-600">
                      All salon equipment, chairs, tools, and fixtures included in sale
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leaseTransferable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-blue-200 p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-blue-700 font-medium">
                      🏢 Lease Transferable / Hợp Đồng Thuê Có Thể Chuyển Nhượng
                    </FormLabel>
                    <p className="text-sm text-blue-600">
                      Current lease can be transferred to new owner
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sellerFinancing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-blue-200 p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-blue-700 font-medium">
                      💳 Seller Financing Available / Hỗ Trợ Tài Chính
                    </FormLabel>
                    <p className="text-sm text-blue-600">
                      Willing to provide financing options to qualified buyers
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-purple-800">
              📝 Salon Description / Mô Tả Salon
            </h3>
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="englishDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-700 font-medium">
                    English Description *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your salon, location advantages, equipment, clientele, reason for selling, etc. Be detailed to attract serious buyers!"
                      className="min-h-32 resize-y border-purple-300 focus:border-purple-500"
                      {...field}
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
                  <FormLabel className="text-purple-700 font-medium">
                    Vietnamese Description / Mô Tả Tiếng Việt
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả salon của bạn bằng tiếng Việt để tiếp cận nhiều người mua hơn. Bao gồm ưu điểm vị trí, thiết bị, khách hàng, lý do bán..."
                      className="min-h-32 resize-y border-purple-300 focus:border-purple-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reasonForSelling"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-700 font-medium">
                    Reason for Selling / Lý Do Bán
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Why are you selling? (Retirement, relocation, new opportunity, etc.) This helps buyers understand your situation."
                      className="resize-y border-purple-300 focus:border-purple-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonDetailsStep;
