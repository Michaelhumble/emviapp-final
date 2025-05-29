
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SalonFormValues } from '../salonFormSchema';

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
}

export const SalonDetailsStep: React.FC<SalonDetailsStepProps> = ({ 
  form, 
  photoUploads, 
  setPhotoUploads 
}) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setPhotoUploads([...photoUploads, ...newFiles]);
    }
  };

  const removePhoto = (index: number) => {
    const updatedFiles = photoUploads.filter((_, i) => i !== index);
    setPhotoUploads(updatedFiles);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Details & Photos / Chi Tiết & Hình Ảnh</h2>
        <p className="text-gray-600 mt-2">
          Provide business details and photos / Cung cấp chi tiết và hình ảnh doanh nghiệp
        </p>
      </div>

      {/* Financial Information */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Information / Thông Tin Tài Chính</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="askingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asking Price (USD) / Giá Yêu Cầu *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="150000"
                    type="number"
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
                <FormLabel>Monthly Rent (USD) / Tiền Thuê Hàng Tháng *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="5000"
                    type="number"
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
                <FormLabel>Monthly Revenue (USD) / Doanh Thu Hàng Tháng</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="25000"
                    type="number"
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
                <FormLabel>Size (Square Feet) / Diện Tích</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="1200"
                    type="number"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Business Details */}
      <Card>
        <CardHeader>
          <CardTitle>Business Details / Chi Tiết Doanh Nghiệp</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="numberOfStaff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Staff / Số Nhân Viên</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="8"
                    type="number"
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
                    placeholder="6"
                    type="number"
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
                    placeholder="10"
                    type="number"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Descriptions / Mô Tả</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="vietnameseDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vietnamese Description / Mô Tả Tiếng Việt</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Mô tả salon bằng tiếng Việt..."
                    rows={4}
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
                    rows={4}
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
                    placeholder="Retirement, relocation, etc. / Nghỉ hưu, di dời, v.v."
                    rows={3}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Features & Amenities / Tiện Nghi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                  <FormLabel className="text-sm">
                    Parking / Bãi đỗ xe
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
                  <FormLabel className="text-sm">
                    Wax Room / Phòng wax
                  </FormLabel>
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
                  <FormLabel className="text-sm">
                    Laundry / Giặt ủi
                  </FormLabel>
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
                  <FormLabel className="text-sm">
                    Will Train / Sẽ đào tạo
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Photo Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Photos / Hình Ảnh *</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              <p className="text-sm text-gray-600 mt-2">
                Upload photos of your salon (required) / Tải lên hình ảnh salon (bắt buộc)
              </p>
            </div>

            {photoUploads.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photoUploads.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
