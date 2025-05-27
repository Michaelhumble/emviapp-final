
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SalonPhotoUpload from "../SalonPostPhotoUpload";
import { AlertCircle } from "lucide-react";

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

export const SalonDetailsStep = ({ form, photoUploads, setPhotoUploads }: SalonDetailsStepProps) => {
  const formData = form.getValues();
  const hasRequiredFields = formData.askingPrice && formData.monthlyRent;
  const hasPhotos = photoUploads.length > 0;
  const canProceed = hasRequiredFields && hasPhotos;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Chi Tiết & Hình Ảnh / Details & Photos</h2>
        <p className="text-gray-600 mt-2">
          Cung cấp thông tin chi tiết về salon và tải lên hình ảnh / Provide detailed information about your salon and upload photos
        </p>
      </div>

      {/* Financial Information */}
      <Card>
        <CardHeader>
          <CardTitle>Thông Tin Tài Chính / Financial Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="askingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá Bán / Asking Price *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$150,000"
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
                  <FormLabel>Tiền Thuê Hàng Tháng / Monthly Rent *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$3,500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="monthlyRevenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doanh Thu Hàng Tháng / Monthly Revenue</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$25,000"
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
                  <FormLabel>Diện Tích / Square Feet</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1,500 sq ft"
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

      {/* Salon Details */}
      <Card>
        <CardHeader>
          <CardTitle>Chi Tiết Salon / Salon Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="numberOfStaff"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số Nhân Viên / Number of Staff</FormLabel>
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
              name="numberOfTables"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số Bàn / Number of Tables</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="10"
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
                  <FormLabel>Số Ghế / Number of Chairs</FormLabel>
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
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Tiện Nghi / Amenities</CardTitle>
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
                    Chỗ Đậu Xe / Parking
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
                    Phòng Giặt / Laundry
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
                    Phòng Wax / Wax Room
                  </FormLabel>
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
                  <FormLabel className="text-sm">
                    Phòng Ăn / Dining Room
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
                    Sẽ Đào Tạo / Will Train
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Mô Tả / Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="vietnameseDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô Tả Tiếng Việt / Vietnamese Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Mô tả salon của bạn bằng tiếng Việt..."
                    className="min-h-24"
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
                <FormLabel>English Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your salon in English..."
                    className="min-h-24"
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
                <FormLabel>Lý Do Bán / Reason for Selling</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Why are you selling this salon?"
                    className="min-h-20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Photo Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Hình Ảnh Salon / Salon Photos *</CardTitle>
        </CardHeader>
        <CardContent>
          <SalonPhotoUpload
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            maxPhotos={8}
          />
          
          {/* Validation Message */}
          {(!hasRequiredFields || !hasPhotos) && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-orange-800">
                <p className="font-medium">Cần hoàn thành để tiếp tục / Required to continue:</p>
                <ul className="mt-1 space-y-1">
                  {!formData.askingPrice && (
                    <li>• Giá bán / Asking price</li>
                  )}
                  {!formData.monthlyRent && (
                    <li>• Tiền thuê hàng tháng / Monthly rent</li>
                  )}
                  {!hasPhotos && (
                    <li>• Ít nhất 1 hình ảnh salon / At least 1 salon photo</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
