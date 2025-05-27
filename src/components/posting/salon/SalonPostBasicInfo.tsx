
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { useTranslation } from "@/hooks/useTranslation";

interface SalonPostBasicInfoProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPostBasicInfo = ({ form }: SalonPostBasicInfoProps) => {
  const { t } = useTranslation();
  
  const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {t({ english: "Basic Salon Information", vietnamese: "Thông Tin Cơ Bản Tiệm" })}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="salonName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t({ english: "Salon Name", vietnamese: "Tên Tiệm" })} *
                </FormLabel>
                <FormControl>
                  <Input placeholder={t({ english: "Enter salon name", vietnamese: "Nhập tên tiệm" })} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t({ english: "City", vietnamese: "Thành Phố" })} *
                </FormLabel>
                <FormControl>
                  <Input placeholder={t({ english: "Enter city", vietnamese: "Nhập thành phố" })} {...field} />
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
                <FormLabel>
                  {t({ english: "State", vietnamese: "Bang" })} *
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t({ english: "Select state", vietnamese: "Chọn bang" })} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t({ english: "Neighborhood/Area", vietnamese: "Khu Vực" })}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t({ english: "e.g., Little Saigon, Asian Plaza", vietnamese: "VD: Little Saigon, Asian Plaza" })} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-4">
          {t({ english: "Vietnamese Salon Details", vietnamese: "Chi Tiết Tiệm Việt" })}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="numberOfTables"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t({ english: "Number of Tables", vietnamese: "Số Bàn" })} *
                </FormLabel>
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
                <FormLabel>
                  {t({ english: "Number of Chairs", vietnamese: "Số Ghế" })} *
                </FormLabel>
                <FormControl>
                  <Input placeholder="9" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-4">
          {t({ english: "Financial Information", vietnamese: "Thông Tin Tài Chính" })}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="askingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t({ english: "Asking Price", vietnamese: "Giá Sang" })} *
                </FormLabel>
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
                <FormLabel>
                  {t({ english: "Monthly Rent", vietnamese: "Tiền Thuê Hàng Tháng" })} *
                </FormLabel>
                <FormControl>
                  <Input placeholder="$4,500" {...field} />
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
                <FormLabel>
                  {t({ english: "Monthly Revenue", vietnamese: "Doanh Thu Hàng Tháng" })}
                </FormLabel>
                <FormControl>
                  <Input placeholder="$25,000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-4">
          {t({ english: "Additional Details", vietnamese: "Thông Tin Thêm" })}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="numberOfStaff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t({ english: "Number of Staff", vietnamese: "Số Nhân Viên" })} *
                </FormLabel>
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
                <FormLabel>
                  {t({ english: "Square Footage", vietnamese: "Diện Tích" })}
                </FormLabel>
                <FormControl>
                  <Input placeholder="1,200 sq ft" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
