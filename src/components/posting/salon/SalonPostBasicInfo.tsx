
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Building, MapPin, DollarSign, Users, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SalonPostBasicInfoProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPostBasicInfo = ({ form }: SalonPostBasicInfoProps) => {
  return (
    <div className="space-y-8">
      {/* Vietnamese Salon Details - Most Important Section */}
      <Card className="border-l-4 border-l-yellow-500 bg-yellow-50/30">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Utensils className="w-6 h-6 text-yellow-600" />
            Thông tin tiệm nail Việt / Vietnamese Salon Details
          </CardTitle>
          <p className="text-sm text-gray-600">
            Những thông tin quan trọng nhất cho tiệm nail Việt Nam
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="numberOfTables"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-yellow-800">
                    Số bàn / Number of Tables *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="4" 
                      {...field} 
                      className="border-yellow-300 focus:border-yellow-500"
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-yellow-700">
                    Số bàn nail trong tiệm (thường từ 3-8 bàn)
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfChairs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-yellow-800">
                    Số ghế / Number of Chairs *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="9" 
                      {...field} 
                      className="border-yellow-300 focus:border-yellow-500"
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-yellow-700">
                    Tổng số ghế trong tiệm (bao gồm ghế pedicure)
                  </p>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="numberOfStaff"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Số nhân viên / Number of Staff *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="6" {...field} />
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
                  <FormLabel className="text-base font-semibold">
                    Tiền thuê tháng / Monthly Rent *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="$3,500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Basic Salon Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-600" />
            Thông tin cơ bản / Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="salonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên tiệm / Salon Name *</FormLabel>
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
                  <FormLabel>Loại hình / Business Type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nail-salon">Nail Salon</SelectItem>
                      <SelectItem value="nail-spa">Nail Spa</SelectItem>
                      <SelectItem value="beauty-salon">Beauty Salon</SelectItem>
                      <SelectItem value="spa">Spa</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="establishedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Năm thành lập / Established Year</FormLabel>
                  <FormControl>
                    <Input placeholder="2015" {...field} />
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
                  <FormLabel>Giá yêu cầu / Asking Price *</FormLabel>
                  <FormControl>
                    <Input placeholder="$85,000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Location Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            Địa điểm / Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ / Address *</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main Street" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thành phố / City *</FormLabel>
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
                  <FormLabel>Tiểu bang / State *</FormLabel>
                  <FormControl>
                    <Input placeholder="CA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã bưu điện / ZIP Code</FormLabel>
                  <FormControl>
                    <Input placeholder="95123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khu vực / Neighborhood</FormLabel>
                <FormControl>
                  <Input placeholder="Little Saigon, Vietnamese District" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hideExactAddress"
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
                    Ẩn địa chỉ cụ thể / Hide exact address
                  </FormLabel>
                  <p className="text-xs text-gray-600">
                    Chỉ hiển thị khu vực chung cho đến khi có người quan tâm
                  </p>
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Additional Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thông tin bổ sung / Additional Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="squareFeet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diện tích / Square Feet</FormLabel>
                  <FormControl>
                    <Input placeholder="1,200" {...field} />
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
                  <FormLabel>Doanh thu tháng / Monthly Revenue</FormLabel>
                  <FormControl>
                    <Input placeholder="$25,000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="reasonForSelling"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lý do bán / Reason for Selling *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Retiring, moving, expanding to new location, etc." 
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
            name="specialNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ghi chú đặc biệt / Special Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Equipment included, lease terms, training available, etc." 
                    className="min-h-[80px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Special Features */}
          <div className="space-y-4">
            <h4 className="font-medium">Tiện ích / Amenities</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                    <FormLabel className="text-sm">Wax Room</FormLabel>
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
                    <FormLabel className="text-sm">Dining Room</FormLabel>
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
                    <FormLabel className="text-sm">Laundry</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasHousing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm">Housing</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>

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
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Sẵn sàng đào tạo / Willing to train new owner
                  </FormLabel>
                  <p className="text-xs text-gray-600">
                    Giúp chủ mới làm quen với quy trình và khách hàng
                  </p>
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};
