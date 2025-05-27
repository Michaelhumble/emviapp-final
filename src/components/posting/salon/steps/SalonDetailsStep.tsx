
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Camera, Car, Shirt } from "lucide-react";
import SalonPhotoUpload from "../SalonPostPhotoUpload";

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

export const SalonDetailsStep = ({ form, photoUploads, setPhotoUploads }: SalonDetailsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Chi Tiết & Hình Ảnh / Details & Photos</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Thông tin chi tiết về salon giúp người mua hiểu rõ hơn về doanh nghiệp / Detailed information helps buyers understand your business better
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="numberOfTables"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số bàn / Number of Tables</FormLabel>
              <FormControl>
                <Input placeholder="10" {...field} />
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
              <FormLabel>Số ghế / Number of Chairs</FormLabel>
              <FormControl>
                <Input placeholder="20" {...field} />
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
              <FormLabel>Tiền thuê mỗi tháng / Monthly Rent *</FormLabel>
              <FormControl>
                <Input placeholder="$3,000" {...field} />
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
              <FormLabel>Doanh thu mỗi tháng / Monthly Revenue</FormLabel>
              <FormControl>
                <Input placeholder="$15,000" {...field} />
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
              <FormLabel>Diện tích (sq ft) / Square Feet</FormLabel>
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
              <FormLabel>Số nhân viên / Number of Staff</FormLabel>
              <FormControl>
                <Input placeholder="8" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Salon Photos */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-purple-600" />
          <FormLabel className="text-base">Hình ảnh Salon / Salon Photos</FormLabel>
        </div>
        <SalonPhotoUpload
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
        />
      </div>

      {/* Amenities */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Tiện nghi / Amenities</h3>
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
                  <FormLabel className="flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    Bãi đậu xe / Parking Available
                  </FormLabel>
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
                  <FormLabel className="flex items-center gap-2">
                    <Shirt className="w-4 h-4" />
                    Giặt ủi / Laundry Facilities
                  </FormLabel>
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
                  <FormLabel>
                    Phòng wax / Wax Room
                  </FormLabel>
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
                  <FormLabel>
                    Phòng ăn / Dining Room
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Additional Description */}
      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả tiếng Việt / Vietnamese Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Mô tả salon của bạn bằng tiếng Việt..."
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
              <FormLabel>Mô tả tiếng Anh / English Description</FormLabel>
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

        <FormField
          control={form.control}
          name="reasonForSelling"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lý do bán / Reason for Selling</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Lý do bán salon / Reason for selling salon..."
                  className="min-h-[80px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
