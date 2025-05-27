
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import SalonPaymentFeatures from "../SalonPaymentFeatures";

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  onPayment: () => void;
}

export const SalonReviewStep = ({ form, formData, selectedOptions, onPayment }: SalonReviewStepProps) => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Xem Lại & Thanh Toán / Review & Payment</h2>
        <p className="text-gray-600 mt-2">
          Xem lại thông tin và hoàn tất thanh toán / Review your information and complete payment
        </p>
      </div>

      {/* Terms Acceptance */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <FormField
          control={form.control}
          name="termsAccepted"
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
                  Tôi đồng ý với các điều khoản và điều kiện / I agree to the terms and conditions *
                </FormLabel>
                <p className="text-sm text-gray-600">
                  Bằng cách đánh dấu vào ô này, bạn xác nhận rằng tất cả thông tin được cung cấp là chính xác và bạn đồng ý với các điều khoản dịch vụ của EmviApp.
                  / By checking this box, you confirm that all information provided is accurate and you agree to EmviApp's terms of service.
                </p>
              </div>
            </FormItem>
          )}
        />
        <FormMessage />
      </div>

      {/* Payment Component */}
      <SalonPaymentFeatures
        formData={formData}
        selectedOptions={selectedOptions}
        onPayment={onPayment}
        onBack={() => {}} // Will be handled by parent wizard
      />
    </div>
  );
};
