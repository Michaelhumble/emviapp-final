
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SalonFormValues } from "../salonFormSchema";
import SalonPostPhotoUpload from "../SalonPostPhotoUpload";
import { DollarSign, Users, Building } from "lucide-react";

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

export const SalonDetailsStep = ({ form, photoUploads, setPhotoUploads }: SalonDetailsStepProps) => {
  return (
    <div className="space-y-8">
      {/* Show Your Value section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold">Show Your Value / Thể hiện giá trị của bạn</h2>
        </div>
        <p className="text-gray-700 mb-2">
          Detailed financials and business metrics attract serious buyers willing to pay premium prices!
        </p>
        <p className="text-gray-700 italic">
          Tài chính chi tiết và số liệu kinh doanh thu hút người mua nghiêm túc sẵn sàng trả giá cao!
        </p>
      </div>

      {/* Business Details section */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-6">
          <Building className="h-5 w-5 text-blue-600" />
          <h3 className="text-xl font-semibold">Business Details / Chi tiết kinh doanh</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Asking Price */}
          <FormField
            control={form.control}
            name="askingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  Asking Price / Giá yêu cầu *
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="200,000"
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Monthly Rent */}
          <FormField
            control={form.control}
            name="monthlyRent"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Monthly Rent / Tiền thuê hàng tháng *
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="50000"
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Monthly Profit */}
          <FormField
            control={form.control}
            name="monthlyRevenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Monthly Profit / Lợi nhuận hàng tháng
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="$8,000 / 8.000$"
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Monthly Revenue */}
          <FormField
            control={form.control}
            name="monthlyRevenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Monthly Revenue / Doanh thu hàng tháng
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="$25,000 / 25.000$"
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Employee Count */}
          <FormField
            control={form.control}
            name="numberOfStaff"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  Employee Count / Số nhân viên
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="8"
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number of Tables */}
          <FormField
            control={form.control}
            name="numberOfTables"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Number of Tables / Số bàn
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="12"
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Square Feet */}
          <FormField
            control={form.control}
            name="squareFeet"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Square Feet / Diện tích (ft²)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="2,500 ft²"
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <FormField
            control={form.control}
            name="englishDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium flex items-center gap-2">
                  📄 English Description
                </FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Describe your salon's unique features, services, and what makes it special..."
                    className="min-h-[120px] text-base"
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
                <FormLabel className="text-base font-medium flex items-center gap-2">
                  📄 Vietnamese Description / Mô tả tiếng Việt
                </FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Mô tả các tính năng độc đáo, dịch vụ của salon và điều gì làm cho nó đặc biệt..."
                    className="min-h-[120px] text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Reason for Selling */}
        <div className="mt-6">
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
                    {...field} 
                    placeholder="Retirement, relocation, new business venture... / Nghỉ hưu, chuyển chỗ ở, khởi nghiệp mới..."
                    className="min-h-[80px] text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Features & Amenities */}
        <div className="mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-blue-600 text-lg">⭐</div>
              <h4 className="text-lg font-semibold text-blue-800">
                Features & Amenities / Tính năng & Tiện ích
              </h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <FormLabel className="text-sm font-medium">
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
                    <FormLabel className="text-sm font-medium">
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
                    <FormLabel className="text-sm font-medium">
                      Parking / Bãi đỗ xe
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Photo Upload Section */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-purple-600 text-lg">📸</div>
          <h3 className="text-xl font-semibold">Hình Ảnh Salon / Salon Photos</h3>
        </div>
        
        <p className="text-gray-600 mb-4">
          Tải lên hình ảnh đẹp để thu hút người mua. Hình ảnh chất lượng cao sẽ giúp salon của bạn nổi bật!<br />
          Upload beautiful photos to attract buyers. High-quality images will make your salon stand out!
        </p>
        
        <SalonPostPhotoUpload 
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
        />
      </div>

      {/* Tips sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-green-600 text-lg">💡</div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Value Tip:</h4>
              <p className="text-sm text-green-700 mb-1">
                Salons with detailed financials sell 60% faster than those without!
              </p>
              <p className="text-sm text-green-700 italic">
                Salon có tài chính chi tiết bán nhanh hơn 60% so với những salon không có!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 text-lg">⭐</div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Success Factor:</h4>
              <p className="text-sm text-blue-700 mb-1">
                High monthly profit margins attract premium buyers instantly.
              </p>
              <p className="text-sm text-blue-700 italic">
                Tỷ suất lợi nhuận hàng tháng cao thu hút người mua cao cấp ngay lập tức.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
