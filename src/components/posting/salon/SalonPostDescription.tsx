
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { useTranslation } from "@/hooks/useTranslation";

interface SalonPostDescriptionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPostDescription = ({ form }: SalonPostDescriptionProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {t({ english: "Salon Description", vietnamese: "Mô Tả Tiệm" })}
        </h3>
        
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="vietnameseDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t({ english: "Vietnamese Description", vietnamese: "Mô Tả Tiếng Việt" })}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t({ 
                      english: "Describe your salon in Vietnamese for Vietnamese-speaking buyers...", 
                      vietnamese: "Mô tả tiệm của bạn bằng tiếng Việt cho khách hàng Việt..." 
                    })}
                    className="min-h-[120px]"
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
                <FormLabel>
                  {t({ english: "English Description", vietnamese: "Mô Tả Tiếng Anh" })} *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t({ 
                      english: "Describe your salon in English. Include details about location, clientele, equipment, and what makes it special...", 
                      vietnamese: "Mô tả tiệm của bạn bằng tiếng Anh. Bao gồm chi tiết về vị trí, khách hàng, thiết bị và điều gì làm nó đặc biệt..." 
                    })}
                    className="min-h-[120px]"
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
                <FormLabel>
                  {t({ english: "Reason for Selling", vietnamese: "Lý Do Bán" })} *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t({ 
                      english: "Please explain why you are selling the salon...", 
                      vietnamese: "Vui lòng giải thích tại sao bạn bán tiệm..." 
                    })}
                    className="min-h-[80px]"
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
                <FormLabel>
                  {t({ english: "Special Notes", vietnamese: "Ghi Chú Đặc Biệt" })}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t({ 
                      english: "Any additional important information about the salon...", 
                      vietnamese: "Bất kỳ thông tin quan trọng bổ sung nào về tiệm..." 
                    })}
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

      <div>
        <h4 className="text-md font-medium mb-4">
          {t({ english: "Salon Features", vietnamese: "Tính Năng Tiệm" })}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {t({ english: "Will Train New Owner", vietnamese: "Sẽ Đào Tạo Chủ Mới" })}
                  </FormLabel>
                </div>
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
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {t({ english: "Housing Available", vietnamese: "Có Nhà Ở" })}
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
                    {t({ english: "Wax Room", vietnamese: "Phòng Wax" })}
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
                    {t({ english: "Dining/Break Room", vietnamese: "Phòng Ăn/Nghỉ" })}
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
                  <FormLabel>
                    {t({ english: "Laundry Facilities", vietnamese: "Tiện Ích Giặt Ủi" })}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isNationwide"
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
                    {t({ english: "Nationwide Listing (+$10)", vietnamese: "Đăng Toàn Quốc (+$10)" })}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fastSalePackage"
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
                    {t({ english: "Fast Sale Package (+$20)", vietnamese: "Gói Bán Nhanh (+$20)" })}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
