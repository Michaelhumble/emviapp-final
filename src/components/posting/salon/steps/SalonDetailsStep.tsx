
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Camera, DollarSign, Users, Home } from "lucide-react";
import { SalonPostPhotoUpload } from "../SalonPostPhotoUpload";

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

export const SalonDetailsStep = ({ form, photoUploads, setPhotoUploads }: SalonDetailsStepProps) => {
  return (
    <div className="space-y-8">
      {/* Financial Information */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <DollarSign className="w-5 h-5 text-purple-600" />
          <h2 className="text-2xl font-playfair font-medium">Thông Tin Tài Chính / Financial Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="askingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá Bán / Asking Price *</FormLabel>
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
                <FormLabel>Tiền Thuê Hàng Tháng / Monthly Rent *</FormLabel>
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
                <FormLabel>Doanh Thu Hàng Tháng / Monthly Revenue</FormLabel>
                <FormControl>
                  <Input placeholder="$12,000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearlyRevenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Doanh Thu Hàng Năm / Yearly Revenue</FormLabel>
                <FormControl>
                  <Input placeholder="$144,000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Salon Details */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-purple-600" />
          <h2 className="text-2xl font-playfair font-medium">Chi Tiết Salon / Salon Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="numberOfStaff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số Nhân Viên / Number of Staff</FormLabel>
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
                <FormLabel>Số Bàn / Number of Tables</FormLabel>
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
                <FormLabel>Số Ghế / Number of Chairs</FormLabel>
                <FormControl>
                  <Input placeholder="12" {...field} />
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
                <FormLabel>Diện Tích (Sq Ft) / Square Feet</FormLabel>
                <FormControl>
                  <Input placeholder="1200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Amenities */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Tiện Nghi / Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="hasWaxRoom"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Phòng Wax / Wax Room</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasHousing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Chỗ Ở / Housing</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasDiningRoom"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Phòng Ăn / Dining Room</FormLabel>
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
                  <FormLabel>Giặt Ủi / Laundry</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasParking"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Bãi Đậu Xe / Parking</FormLabel>
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
                  <FormLabel>Sẽ Đào Tạo / Will Train</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      {/* Descriptions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-playfair font-medium">Mô Tả / Description</h2>
        
        <FormField
          control={form.control}
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô Tả Tiếng Việt / Vietnamese Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả chi tiết về salon của bạn, vị trí thuận lợi, lý do bán, thiết bị bao gồm, v.v."
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
              <FormLabel>English Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your salon, location advantages, reason for selling, equipment included, etc."
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
              <FormLabel>Lý Do Bán / Reason for Selling</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tại sao bạn bán cửa hàng này? / Why are you selling this business?"
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="virtualTourUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Virtual Tour URL (Tùy Chọn / Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Photos */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Camera className="w-5 h-5 text-purple-600" />
          <h2 className="text-2xl font-playfair font-medium">Hình Ảnh / Photos</h2>
        </div>
        
        <SalonPostPhotoUpload
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
        />
      </div>
    </div>
  );
};
