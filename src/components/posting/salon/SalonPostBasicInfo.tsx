
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SalonPostBasicInfoProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPostBasicInfo = ({ form }: SalonPostBasicInfoProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông Tin Cơ Bản Salon</h2>
        <p className="text-gray-600">Vui lòng điền thông tin chi tiết về salon của bạn</p>
      </div>

      {/* Vietnamese-specific fields at the top */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-4">Thông Tin Tiệm Nail Việt</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="numberOfTables"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số Bàn (Number of Tables) *</FormLabel>
                <FormControl>
                  <Input placeholder="4" {...field} />
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
                <FormLabel>Số Ghế (Number of Chairs) *</FormLabel>
                <FormControl>
                  <Input placeholder="9" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="salonName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên Salon (Salon Name) *</FormLabel>
              <FormControl>
                <Input placeholder="Beautiful Nails Spa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại Hình Kinh Doanh (Business Type) *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại hình kinh doanh" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="nail-salon">Tiệm Nail</SelectItem>
                  <SelectItem value="hair-salon">Salon Tóc</SelectItem>
                  <SelectItem value="beauty-salon">Salon Làm Đẹp</SelectItem>
                  <SelectItem value="spa">Spa</SelectItem>
                  <SelectItem value="barbershop">Tiệm Cắt Tóc Nam</SelectItem>
                  <SelectItem value="massage">Massage</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thành Phố (City) *</FormLabel>
              <FormControl>
                <Input placeholder="San Jose" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bang (State) *</FormLabel>
              <FormControl>
                <Input placeholder="CA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="askingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá Sang (Asking Price) *</FormLabel>
              <FormControl>
                <Input placeholder="$120,000" {...field} />
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
              <FormLabel>Tiền Thuê Hàng Tháng (Monthly Rent) *</FormLabel>
              <FormControl>
                <Input placeholder="$3,500" {...field} />
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
              <FormLabel>Số Nhân Viên (Number of Staff) *</FormLabel>
              <FormControl>
                <Input placeholder="5" {...field} />
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
              <FormLabel>Diện Tích (Square Feet)</FormLabel>
              <FormControl>
                <Input placeholder="1,200 sqft" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="revenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Doanh Thu Hàng Tháng (Monthly Revenue)</FormLabel>
              <FormControl>
                <Input placeholder="$15,000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Khu Vực (Neighborhood)</FormLabel>
              <FormControl>
                <Input placeholder="Downtown, Little Saigon, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
