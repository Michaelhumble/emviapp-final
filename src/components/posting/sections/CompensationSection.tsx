
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import { compensationTranslations } from '@/components/posting/job/formTranslations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CompensationSectionProps {
  onFieldChange?: (field: string, value: any) => void;
}

export const CompensationSection = ({ onFieldChange }: CompensationSectionProps) => {
  const form = useFormContext<JobFormValues>();
  const { t, isVietnamese } = useTranslation();

  const handleFieldChange = (field: string, value: any) => {
    if (onFieldChange) {
      onFieldChange(field, value);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">
          {t({
            english: "Compensation Details",
            vietnamese: "Chi tiết bồi thường"
          })}
        </h2>
        <p className="text-gray-500">
          {t({
            english: "Provide details about the compensation package for this position.",
            vietnamese: "Cung cấp chi tiết về gói lương thưởng cho vị trí này."
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="compensation_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  english: "Compensation Type",
                  vietnamese: "Loại thù lao"
                })}
              </FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  handleFieldChange('compensation_type', value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t({
                      english: "Select compensation type",
                      vietnamese: "Chọn loại thù lao"
                    })} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hourly">{t({
                    english: "Hourly Rate",
                    vietnamese: "Mức giờ"
                  })}</SelectItem>
                  <SelectItem value="commission">{t({
                    english: "Commission Only",
                    vietnamese: "Chỉ hoa hồng"
                  })}</SelectItem>
                  <SelectItem value="mixed">{t({
                    english: "Hourly + Commission",
                    vietnamese: "Giờ + Hoa hồng"
                  })}</SelectItem>
                  <SelectItem value="salary">{t({
                    english: "Salary",
                    vietnamese: "Lương"
                  })}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="compensation_details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  english: "Compensation Range",
                  vietnamese: "Phạm vi thù lao"
                })}
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={t({
                    english: "e.g., $20-25/hour or 60% commission",
                    vietnamese: "VD: 20-25$/giờ hoặc 60% hoa hồng"
                  })} 
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('compensation_details', e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">
          {t({
            english: "Additional Benefits",
            vietnamese: "Quyền lợi bổ sung"
          })}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="weekly_pay"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      handleFieldChange('weekly_pay', checked);
                    }} 
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {t({
                      english: "Weekly Pay",
                      vietnamese: "Trả lương hàng tuần"
                    })}
                  </FormLabel>
                  <FormDescription>
                    {t({
                      english: "Employee gets paid on a weekly basis",
                      vietnamese: "Nhân viên được trả lương hàng tuần"
                    })}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="has_housing"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      handleFieldChange('has_housing', checked);
                    }} 
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {t({
                      english: "Housing Provided",
                      vietnamese: "Có chỗ ở"
                    })}
                  </FormLabel>
                  <FormDescription>
                    {t({
                      english: "Housing is available for staff",
                      vietnamese: "Có chỗ ở dành cho nhân viên"
                    })}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="has_wax_room"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      handleFieldChange('has_wax_room', checked);
                    }} 
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {t({
                      english: "Wax Room Available",
                      vietnamese: "Có phòng wax"
                    })}
                  </FormLabel>
                  <FormDescription>
                    {t({
                      english: "Includes a wax room for services",
                      vietnamese: "Bao gồm phòng wax cho dịch vụ"
                    })}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="owner_will_train"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      handleFieldChange('owner_will_train', checked);
                    }} 
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {t({
                      english: "Owner Will Train",
                      vietnamese: "Chủ sẽ đào tạo"
                    })}
                  </FormLabel>
                  <FormDescription>
                    {t({
                      english: "On-the-job training is provided",
                      vietnamese: "Đào tạo tại chỗ được cung cấp"
                    })}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="no_supply_deduction"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      handleFieldChange('no_supply_deduction', checked);
                    }} 
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {t({
                      english: "No Supply Deduction",
                      vietnamese: "Không trừ tiền vật tư"
                    })}
                  </FormLabel>
                  <FormDescription>
                    {t({
                      english: "Supplies provided at no cost to employee",
                      vietnamese: "Vật tư được cung cấp miễn phí"
                    })}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CompensationSection;
