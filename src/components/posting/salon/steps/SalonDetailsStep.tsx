
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageIcon, DollarSign, Users, Table } from "lucide-react";
import SalonPostPhotoUpload from "../SalonPostPhotoUpload";

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

export const SalonDetailsStep = ({ form, photoUploads, setPhotoUploads }: SalonDetailsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <ImageIcon className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Chi Tiết & Hình Ảnh / Details & Photos</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Cung cấp thông tin chi tiết về salon để thu hút người mua / Provide detailed salon information to attract buyers
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="numberOfTables"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Table className="w-4 h-4" />
                Số bàn / Number of Tables
              </FormLabel>
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
                <Users className="w-4 h-4" />
                Số ghế / Number of Chairs
              </FormLabel>
              <FormControl>
                <Input placeholder="16" {...field} />
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
              <FormLabel className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Tiền thuê mỗi tháng / Monthly Rent *
              </FormLabel>
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
                <DollarSign className="w-4 h-4" />
                Doanh thu mỗi tháng / Monthly Revenue
              </FormLabel>
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
                <Input placeholder="6" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả bằng tiếng Việt / Vietnamese Description</FormLabel>
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
              <FormLabel>English Description</FormLabel>
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
                  placeholder="Tại sao bạn muốn bán salon? / Why are you selling the salon?"
                  className="min-h-[80px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Amenities */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tiện ích / Amenities</h3>
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
                <FormLabel>Bãi đậu xe / Parking</FormLabel>
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
                <FormLabel>Giặt ủi / Laundry</FormLabel>
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
                <FormLabel>Phòng wax / Wax Room</FormLabel>
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
                <FormLabel>Phòng ăn / Dining Room</FormLabel>
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
                <FormLabel>Sẽ đào tạo / Will Train</FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Photo Upload */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Hình ảnh Salon / Salon Photos</h3>
        <SalonPostPhotoUpload 
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
          maxPhotos={8}
        />
      </div>
    </div>
  );
};
