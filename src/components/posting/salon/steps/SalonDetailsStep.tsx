
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { DollarSign, Home, Users, Scissors, Square, TrendingUp } from "lucide-react";

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
}

export const SalonDetailsStep = ({ form, photoUploads, setPhotoUploads }: SalonDetailsStepProps) => {
  const handleFileUpload = (files: File[]) => {
    setPhotoUploads(files);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-playfair font-medium mb-2">Details & Photos / Chi Tiết & Hình Ảnh</h2>
        <p className="text-gray-600">
          Add photos and details about your salon / Thêm hình ảnh và chi tiết về salon của bạn
        </p>
      </div>

      {/* Photo Upload - Required */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📸 Salon Photos / Hình Ảnh Salon *
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FileUpload
            onFilesSelected={handleFileUpload}
            accept="image/*"
            multiple
            maxFiles={10}
            maxSize={5 * 1024 * 1024} // 5MB
          />
          <p className="text-sm text-gray-500 mt-2">
            Upload at least 3 photos (interior, exterior, equipment) / Tải lên ít nhất 3 hình ảnh
          </p>
        </CardContent>
      </Card>

      {/* Financial Details - All Optional */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Financial Information / Thông Tin Tài Chính (Optional / Tùy chọn)
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="askingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asking Price / Giá Yêu Cầu (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="$150,000" {...field} />
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
                  <Input placeholder="$3,500" {...field} />
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
                <FormLabel className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Monthly Revenue / Doanh Thu Hàng Tháng (Optional)
                </FormLabel>
                <FormControl>
                  <Input placeholder="$25,000" {...field} />
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
                  Square Feet / Diện Tích (Optional)
                </FormLabel>
                <FormControl>
                  <Input placeholder="1,200 sq ft" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Salon Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Salon Details / Chi Tiết Salon
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="numberOfStaff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Staff / Số Nhân Viên (Optional)</FormLabel>
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
                <FormLabel className="flex items-center gap-2">
                  <Scissors className="w-4 h-4" />
                  Number of Chairs / Số Ghế (Optional)
                </FormLabel>
                <FormControl>
                  <Input placeholder="12" {...field} />
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
                  <Input placeholder="10" {...field} />
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
          <CardTitle>Description / Mô Tả</CardTitle>
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
                <FormLabel>English Description / Mô Tả Tiếng Anh</FormLabel>
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
                <FormLabel>Reason for Selling / Lý Do Bán (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="e.g., Retirement, Moving, New Business..."
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

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities & Features / Tiện Nghi & Tính Năng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="hasParking"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm">Parking / Chỗ đậu xe</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasLaundry"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm">Laundry / Giặt ủi</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasWaxRoom"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm">Wax Room / Phòng wax</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasDiningRoom"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm">Dining Room / Phòng ăn</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="willTrain"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm">Will Train / Sẽ đào tạo</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
