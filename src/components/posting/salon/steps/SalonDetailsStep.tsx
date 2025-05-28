
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Camera, DollarSign, Users, Square } from "lucide-react";

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
}

export const SalonDetailsStep = ({ form, photoUploads, setPhotoUploads }: SalonDetailsStepProps) => {
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setPhotoUploads([...photoUploads, ...files]);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <Camera className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Details & Photos / Chi Tiết & Hình Ảnh</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Provide details and photos to attract potential buyers / Cung cấp chi tiết và hình ảnh để thu hút người mua tiềm năng
      </p>

      {/* Financial Details - NOW OPTIONAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="askingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Asking Price / Giá Yêu Cầu (Optional / Tùy chọn)
              </FormLabel>
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
              <FormLabel>Monthly Rent / Tiền Thuê Hàng Tháng (Optional / Tùy chọn)</FormLabel>
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
              <FormLabel>Monthly Revenue / Doanh Thu Hàng Tháng (Optional / Tùy chọn)</FormLabel>
              <FormControl>
                <Input placeholder="12,000" {...field} />
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
              <FormLabel className="flex items-center gap-2">
                <Square className="w-4 h-4" />
                Square Feet / Diện Tích (Optional / Tùy chọn)
              </FormLabel>
              <FormControl>
                <Input placeholder="1,200" {...field} />
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
              <FormLabel className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Number of Staff / Số Nhân Viên (Optional / Tùy chọn)
              </FormLabel>
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
              <FormLabel>Number of Tables / Số Bàn (Optional / Tùy chọn)</FormLabel>
              <FormControl>
                <Input placeholder="8" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Photo Upload */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Photos / Hình Ảnh *</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            id="photo-upload"
          />
          <label htmlFor="photo-upload" className="cursor-pointer block text-center">
            <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-600">Click to upload photos / Nhấp để tải lên hình ảnh</p>
            <p className="text-sm text-gray-500 mt-1">
              Upload multiple photos of your salon / Tải lên nhiều hình ảnh của salon
            </p>
          </label>
        </div>
        {photoUploads.length > 0 && (
          <p className="text-sm text-green-600">
            {photoUploads.length} photo{photoUploads.length > 1 ? 's' : ''} selected / 
            {photoUploads.length} hình ảnh đã chọn
          </p>
        )}
      </div>

      {/* Descriptions */}
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="englishDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>English Description / Mô Tả Tiếng Anh (Optional / Tùy chọn)</FormLabel>
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
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vietnamese Description / Mô Tả Tiếng Việt (Optional / Tùy chọn)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả tiệm của bạn bằng tiếng Việt để tiếp cận nhiều người mua hơn."
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
              <FormLabel>Reason for Selling / Lý Do Bán (Optional / Tùy chọn)</FormLabel>
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

      {/* Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Features & Amenities / Tính Năng & Tiện Nghi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="hasParking"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Parking Available / Có Chỗ Đỗ Xe</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasWaxRoom"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Wax Room / Phòng Wax</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasLaundry"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Laundry / Giặt Ủi</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="willTrain"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Will Train New Owner / Sẽ Đào Tạo Chủ Mới</FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
