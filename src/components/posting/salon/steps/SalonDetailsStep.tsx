
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, Square, Users, Camera, FileText } from "lucide-react";
import PhotoUpload from "@/components/posting/PhotoUpload";

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

export const SalonDetailsStep = ({ form, photoUploads, setPhotoUploads }: SalonDetailsStepProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <Camera className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Details & Photos / Chi Tiết & Hình Ảnh</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Add photos and business details to attract serious buyers / Thêm hình ảnh và thông tin kinh doanh để thu hút người mua nghiêm túc
      </p>

      {/* Photo Upload Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Salon Photos / Hình Ảnh Salon *
        </h3>
        <p className="text-sm text-gray-600">
          Upload high-quality photos of your salon interior, equipment, and storefront / Tải lên hình ảnh chất lượng cao của nội thất salon, thiết bị và mặt tiền cửa hàng
        </p>
        <PhotoUpload 
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
          maxPhotos={10}
        />
      </div>

      {/* Financial Information - All Optional */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Financial Information / Thông Tin Tài Chính (Optional / Tùy chọn)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="askingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asking Price / Giá Yêu Cầu (Optional / Tùy chọn)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="$150,000" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  The total price you're asking for the business / Tổng giá bạn yêu cầu cho doanh nghiệp
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monthlyRent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Rent / Tiền Thuê Hàng Tháng (Optional / Tùy chọn)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="$3,500" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Monthly rent paid to landlord / Tiền thuê hàng tháng trả cho chủ nhà
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monthlyRevenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Revenue / Doanh Thu Hàng Tháng (Optional / Tùy chọn)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="$25,000" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Average monthly gross revenue / Doanh thu gộp trung bình hàng tháng
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="squareFeet"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Square className="w-4 h-4" />
                  Square Feet / Diện Tích (Optional / Tùy chọn)
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="1,200 sq ft" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Total square footage of the salon / Tổng diện tích của salon
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Business Details */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Users className="w-5 h-5" />
          Business Details / Chi Tiết Kinh Doanh (Optional / Tùy chọn)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="numberOfStaff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Staff / Số Nhân Viên</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="5" 
                    {...field} 
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
                <FormLabel>Number of Tables / Số Bàn</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="8" 
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
                <FormLabel>Number of Chairs / Số Ghế</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="12" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Descriptions */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Descriptions / Mô Tả (Optional / Tùy chọn)
        </h3>
        
        <FormField
          control={form.control}
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vietnamese Description / Mô Tả Tiếng Việt</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Salon nail đẹp, vị trí tốt, khách hàng thân thiết. Thiết bị hiện đại, đội ngũ nhân viên kinh nghiệm. Cơ hội đầu tư tuyệt vời cho người muốn kinh doanh trong ngành làm đẹp..."
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Describe your salon in Vietnamese for Vietnamese-speaking buyers / Mô tả salon của bạn bằng tiếng Việt cho người mua nói tiếng Việt
              </FormDescription>
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
                  placeholder="Beautiful nail salon in prime location with loyal customer base. Modern equipment, experienced staff, and excellent reputation. Perfect investment opportunity for someone looking to enter the beauty industry..."
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Describe your salon in English for English-speaking buyers / Mô tả salon của bạn bằng tiếng Anh cho người mua nói tiếng Anh
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reasonForSelling"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Selling / Lý Do Bán (Optional / Tùy chọn)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Retiring after 15 successful years / Nghỉ hưu sau 15 năm kinh doanh thành công"
                  className="min-h-[80px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Help buyers understand why you're selling / Giúp người mua hiểu tại sao bạn bán
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Features and Amenities */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Features & Amenities / Tiện Nghi & Đặc Điểm</h3>
        
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
                <div className="space-y-1 leading-none">
                  <FormLabel>Parking Available / Có Chỗ Đậu Xe</FormLabel>
                </div>
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
                <div className="space-y-1 leading-none">
                  <FormLabel>Wax Room / Phòng Wax</FormLabel>
                </div>
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
                <div className="space-y-1 leading-none">
                  <FormLabel>Dining/Break Room / Phòng Ăn/Nghỉ</FormLabel>
                </div>
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
                <div className="space-y-1 leading-none">
                  <FormLabel>Laundry Facilities / Tiện Nghi Giặt Ủi</FormLabel>
                </div>
              </FormItem>
            )}
          />

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
                  <FormLabel>Will Train New Owner / Sẽ Đào Tạo Chủ Mới</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
