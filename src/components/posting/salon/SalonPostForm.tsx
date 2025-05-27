
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import SalonPostPhotoUpload from './SalonPostPhotoUpload';
import { SalonFormValues } from './salonFormSchema';

interface SalonPostFormProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

const SalonPostForm: React.FC<SalonPostFormProps> = ({ form, photoUploads, setPhotoUploads }) => {
  return (
    <div className="space-y-6">
      {/* Business Details */}
      <Card>
        <CardHeader>
          <CardTitle>Chi Tiết Kinh Doanh / Business Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <FormLabel>Tiền thuê mỗi tháng / Monthly Rent ($)</FormLabel>
                  <FormControl>
                    <Input placeholder="5000" {...field} />
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
                  <FormLabel>Doanh thu mỗi tháng / Monthly Revenue ($)</FormLabel>
                  <FormControl>
                    <Input placeholder="15000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="vietnameseDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả (Tiếng Việt) / Description (Vietnamese)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Mô tả chi tiết về salon của bạn..." 
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
                <FormLabel>Mô tả (Tiếng Anh) / Description (English)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Detailed description of your salon..." 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Features & Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Tiện ích & Đặc điểm / Features & Amenities</CardTitle>
        </CardHeader>
        <CardContent>
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
                  <FormLabel>Bãi đậu xe / Parking Available</FormLabel>
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
                  <FormLabel>Giặt ủi / Laundry Facilities</FormLabel>
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
          </div>
        </CardContent>
      </Card>

      {/* Photo Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Hình ảnh Salon / Salon Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <SalonPostPhotoUpload 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            maxPhotos={8}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPostForm;
