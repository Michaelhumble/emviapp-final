
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SalonFormValues } from "../salonFormSchema";

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
}

export const SalonDetailsStep = ({ form, photoUploads, setPhotoUploads }: SalonDetailsStepProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setPhotoUploads([...photoUploads, ...files]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Details & Photos / Chi Tiết & Hình Ảnh</h2>
        <p className="text-gray-600 mt-2">
          Add details and photos of your salon / Thêm chi tiết và hình ảnh salon
        </p>
      </div>

      {/* Financial Information - All Optional */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-medium mb-4">Financial Information / Thông Tin Tài Chính (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="askingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asking Price / Giá Yêu Cầu (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $50,000" {...field} />
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
                <FormLabel>Monthly Rent / Tiền Thuê Hàng Tháng (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $3,000" {...field} />
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
                <FormLabel>Monthly Revenue / Doanh Thu Hàng Tháng (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $15,000" {...field} />
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
                <FormLabel>Square Feet / Diện Tích (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1,200 sq ft" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Salon Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="numberOfStaff"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Staff / Số Nhân Viên (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 5" {...field} />
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
              <FormLabel>Number of Tables / Số Bàn (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 8" {...field} />
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
              <FormLabel>Number of Chairs / Số Ghế (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 10" {...field} />
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
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vietnamese Description / Mô Tả Tiếng Việt</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Mô tả salon bằng tiếng Việt..."
                  className="min-h-[100px]"
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
                  placeholder="Describe your salon in English..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Photo Upload */}
      <div>
        <FormLabel>Salon Photos / Hình Ảnh Salon *</FormLabel>
        <div className="mt-2">
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          {photoUploads.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photoUploads.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotoUploads(photoUploads.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="hasParking"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Parking Available / Có Chỗ Đậu Xe</FormLabel>
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
          name="willTrain"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Will Train / Sẽ Đào Tạo</FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
