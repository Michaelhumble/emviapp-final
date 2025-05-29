
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/useTranslation";

interface SalonBasicInfoStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonBasicInfoStep = ({ form }: SalonBasicInfoStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-playfair font-medium text-gray-900 mb-4">
          {t({
            english: 'Basic Information',
            vietnamese: 'Thông tin cơ bản'
          })}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t({
            english: 'Tell us about your salon to attract the right buyers',
            vietnamese: 'Chia sẻ thông tin về salon để thu hút đúng người mua'
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="salonName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  english: 'Salon Name',
                  vietnamese: 'Tên salon'
                })}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t({
                    english: 'Enter your salon name',
                    vietnamese: 'Nhập tên salon của bạn'
                  })}
                  {...field}
                />
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
              <FormLabel>
                {t({
                  english: 'Business Type',
                  vietnamese: 'Loại hình kinh doanh'
                })}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t({
                    english: 'e.g., Nail Salon, Hair Salon',
                    vietnamese: 'VD: Tiệm nail, Salon tóc'
                  })}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  english: 'Address',
                  vietnamese: 'Địa chỉ'
                })}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t({
                    english: 'Street address',
                    vietnamese: 'Địa chỉ đường phố'
                  })}
                  {...field}
                />
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
                {t({
                  english: 'City',
                  vietnamese: 'Thành phố'
                })}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t({
                    english: 'City name',
                    vietnamese: 'Tên thành phố'
                  })}
                  {...field}
                />
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
                {t({
                  english: 'State',
                  vietnamese: 'Bang'
                })}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t({
                    english: 'State',
                    vietnamese: 'Bang'
                  })}
                  {...field}
                />
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
              <FormLabel>
                {t({
                  english: 'ZIP Code',
                  vietnamese: 'Mã ZIP'
                })}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t({
                    english: 'ZIP Code',
                    vietnamese: 'Mã ZIP'
                  })}
                  {...field}
                />
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
              <FormLabel>
                {t({
                  english: 'Asking Price ($)',
                  vietnamese: 'Giá yêu cầu ($)'
                })}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t({
                    english: 'Enter asking price',
                    vietnamese: 'Nhập giá yêu cầu'
                  })}
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
              <FormLabel>
                {t({
                  english: 'Monthly Rent ($)',
                  vietnamese: 'Tiền thuê hàng tháng ($)'
                })}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t({
                    english: 'Enter monthly rent',
                    vietnamese: 'Nhập tiền thuê hàng tháng'
                  })}
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
