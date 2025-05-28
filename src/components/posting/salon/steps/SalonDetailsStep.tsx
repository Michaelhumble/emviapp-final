
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, FileText, Camera, CheckSquare } from "lucide-react";
import SalonPhotoUpload from "../SalonPostPhotoUpload";

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

export const SalonDetailsStep = ({ form, photoUploads, setPhotoUploads }: SalonDetailsStepProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Details & Photos / Chi Tiết & Hình Ảnh</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Provide detailed information and photos to attract buyers / Cung cấp thông tin chi tiết và hình ảnh để thu hút người mua
      </p>

      {/* Financial Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-medium">Financial Information / Thông Tin Tài Chính</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="askingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asking Price / Giá Yêu Cầu *</FormLabel>
                <FormControl>
                  <Input placeholder="150,000" {...field} />
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
                <FormLabel>Monthly Rent / Tiền Thuê Hàng Tháng *</FormLabel>
                <FormControl>
                  <Input placeholder="3,500" {...field} />
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
                <FormLabel>Monthly Revenue / Doanh Thu Hàng Tháng</FormLabel>
                <FormControl>
                  <Input placeholder="15,000" {...field} />
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
                <FormLabel>Square Feet / Diện Tích</FormLabel>
                <FormControl>
                  <Input placeholder="1,200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Business Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Business Details / Chi Tiết Kinh Doanh</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="numberOfStaff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Staff / Số Lượng Nhân Viên</FormLabel>
                <FormControl>
                  <Input placeholder="5" {...field} />
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
                <FormLabel>Number of Tables / Số Bàn</FormLabel>
                <FormControl>
                  <Input placeholder="8" {...field} />
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
                <FormLabel>Number of Chairs / Số Ghế</FormLabel>
                <FormControl>
                  <Input placeholder="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Descriptions */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Description / Mô Tả</h3>
        
        <FormField
          control={form.control}
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vietnamese Description / Mô Tả Tiếng Việt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả tiệm của bạn bằng tiếng Việt để tiếp cận nhiều người mua hơn"
                  className="min-h-32 resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="englishDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>English Description / Mô Tả Tiếng Anh</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your salon, location advantages, equipment included, etc."
                  className="min-h-32 resize-y"
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
              <FormLabel>Reason for Selling / Lý Do Bán</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Why are you selling this business? / Tại sao bạn bán doanh nghiệp này?"
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Photos */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Camera className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium">Photos / Hình Ảnh *</h3>
        </div>
        
        <SalonPhotoUpload
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
          maxPhotos={8}
        />
      </div>

      {/* Features */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <CheckSquare className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-medium">Features / Tính Năng</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <FormLabel>Parking Available / Có Chỗ Đậu Xe</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasLaundry"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Laundry Room / Phòng Giặt</FormLabel>
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
                <FormLabel>Wax Room / Phòng Wax</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasDiningRoom"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Dining Area / Khu Vực Ăn Uống</FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
