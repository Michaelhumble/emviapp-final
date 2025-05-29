
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/useTranslation";

interface SalonDescriptionStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonDescriptionStep = ({ form }: SalonDescriptionStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-playfair font-medium text-gray-900 mb-4">
          {t({
            english: 'Salon Description',
            vietnamese: 'Mô tả salon'
          })}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t({
            english: 'Provide detailed information about your salon to attract potential buyers',
            vietnamese: 'Cung cấp thông tin chi tiết về salon để thu hút người mua tiềm năng'
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="englishDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  english: 'English Description',
                  vietnamese: 'Mô tả bằng tiếng Anh'
                })}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t({
                    english: 'Describe your salon, location advantages, reason for selling, equipment included, etc.',
                    vietnamese: 'Mô tả salon, ưu điểm vị trí, lý do bán, thiết bị bao gồm, v.v.'
                  })}
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
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  english: 'Vietnamese Description',
                  vietnamese: 'Mô tả bằng tiếng Việt'
                })}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t({
                    english: 'Describe your salon in Vietnamese to reach more buyers',
                    vietnamese: 'Mô tả salon bằng tiếng Việt để tiếp cận nhiều người mua hơn'
                  })}
                  className="min-h-32 resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="revenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t({
                    english: 'Monthly Revenue ($)',
                    vietnamese: 'Doanh thu hàng tháng ($)'
                  })}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t({
                      english: 'Average monthly revenue',
                      vietnamese: 'Doanh thu trung bình hàng tháng'
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
            name="squareFeet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t({
                    english: 'Square Feet',
                    vietnamese: 'Diện tích (feet vuông)'
                  })}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t({
                      english: 'Total square footage',
                      vietnamese: 'Tổng diện tích'
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
            name="numberOfStaff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t({
                    english: 'Number of Staff',
                    vietnamese: 'Số nhân viên'
                  })}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t({
                      english: 'Current staff count',
                      vietnamese: 'Số nhân viên hiện tại'
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
            name="virtualTourUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t({
                    english: 'Virtual Tour URL (Optional)',
                    vietnamese: 'Link tour ảo (Tùy chọn)'
                  })}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t({
                      english: 'Link to virtual tour or video',
                      vietnamese: 'Link đến tour ảo hoặc video'
                    })}
                    {...field}
                  />
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
              <FormLabel>
                {t({
                  english: 'Reason for Selling',
                  vietnamese: 'Lý do bán'
                })}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t({
                    english: 'Why are you selling this business? (This helps buyers understand your situation)',
                    vietnamese: 'Tại sao bạn bán doanh nghiệp này? (Điều này giúp người mua hiểu tình huống của bạn)'
                  })}
                  className="resize-y"
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
