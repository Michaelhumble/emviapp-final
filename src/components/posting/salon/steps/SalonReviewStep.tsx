
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";

interface SalonReviewStepProps {
  formData: SalonFormValues;
  photos: File[];
  selectedOptions: SalonPricingOptions;
  form: UseFormReturn<SalonFormValues>;
}

export const SalonReviewStep = ({ formData, photos, selectedOptions, form }: SalonReviewStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-playfair font-medium text-gray-900 mb-4">
          {t({
            english: 'Review Your Listing',
            vietnamese: 'Xem lại tin đăng'
          })}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t({
            english: 'Please review all information before publishing your salon listing',
            vietnamese: 'Vui lòng xem lại tất cả thông tin trước khi đăng tin salon'
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t({
                english: 'Basic Information',
                vietnamese: 'Thông tin cơ bản'
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">
                {t({
                  english: 'Salon Name:',
                  vietnamese: 'Tên salon:'
                })}
              </span>
              <span className="ml-2">{formData.salonName}</span>
            </div>
            <div>
              <span className="font-medium">
                {t({
                  english: 'Location:',
                  vietnamese: 'Vị trí:'
                })}
              </span>
              <span className="ml-2">{formData.city}, {formData.state}</span>
            </div>
            <div>
              <span className="font-medium">
                {t({
                  english: 'Asking Price:',
                  vietnamese: 'Giá yêu cầu:'
                })}
              </span>
              <span className="ml-2">${formData.askingPrice}</span>
            </div>
            <div>
              <span className="font-medium">
                {t({
                  english: 'Monthly Rent:',
                  vietnamese: 'Tiền thuê hàng tháng:'
                })}
              </span>
              <span className="ml-2">${formData.monthlyRent}</span>
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t({
                english: 'Photos',
                vietnamese: 'Hình ảnh'
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              {photos.length > 0 ? (
                <span>
                  {t({
                    english: `${photos.length} photo(s) uploaded`,
                    vietnamese: `Đã tải lên ${photos.length} hình ảnh`
                  })}
                </span>
              ) : (
                <span>
                  {t({
                    english: 'No photos uploaded',
                    vietnamese: 'Chưa tải lên hình ảnh nào'
                  })}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        {(formData.englishDescription || formData.vietnameseDescription) && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                {t({
                  english: 'Description',
                  vietnamese: 'Mô tả'
                })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.englishDescription && (
                <div>
                  <span className="font-medium text-sm text-gray-700">
                    {t({
                      english: 'English:',
                      vietnamese: 'Tiếng Anh:'
                    })}
                  </span>
                  <p className="mt-1 text-sm">{formData.englishDescription}</p>
                </div>
              )}
              {formData.vietnameseDescription && (
                <div>
                  <span className="font-medium text-sm text-gray-700">
                    {t({
                      english: 'Vietnamese:',
                      vietnamese: 'Tiếng Việt:'
                    })}
                  </span>
                  <p className="mt-1 text-sm">{formData.vietnameseDescription}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Pricing Plan */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {t({
                english: 'Selected Plan',
                vietnamese: 'Gói đã chọn'
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">
                  {selectedOptions.selectedPricingTier === 'standard' && 'Standard Plan'}
                  {selectedOptions.selectedPricingTier === 'premium' && 'Premium Plan'}
                  {selectedOptions.selectedPricingTier === 'featured' && 'Featured Plan'}
                </span>
                <div className="text-sm text-gray-600">
                  {selectedOptions.durationMonths} month{selectedOptions.durationMonths !== 1 ? 's' : ''}
                </div>
              </div>
              <Badge variant="outline" className="text-purple-600">
                Selected
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Terms and Conditions */}
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="pt-6">
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <label className="text-sm font-medium">
                      {t({
                        english: 'I agree to the Terms and Conditions',
                        vietnamese: 'Tôi đồng ý với Điều khoản và Điều kiện'
                      })}
                    </label>
                    <p className="text-sm text-gray-600">
                      {t({
                        english: 'By checking this box, you agree to our terms of service and privacy policy.',
                        vietnamese: 'Bằng cách đánh dấu vào ô này, bạn đồng ý với điều khoản dịch vụ và chính sách bảo mật của chúng tôi.'
                      })}
                    </p>
                  </div>
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};
