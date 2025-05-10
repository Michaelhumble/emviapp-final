import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';
import { usePostPayment } from '@/hooks/usePostPayment';
import { ReviewAndPaymentSection } from '@/components/posting/sections/ReviewAndPaymentSection';
import { calculateSalonPostPrice } from '@/utils/posting/salonPricing';
import { Salon } from '@/types/salon';  // Import the Salon type we defined
import { PricingOptions } from '@/utils/posting/types';
import { salonPostSchema } from '@/lib/validators/salon';
import { z } from "zod";

const SalonPostPage: React.FC = () => {
  const router = useRouter();
  const { t, isVietnamese } = useTranslation();
  const { user } = useAuth();
  const { initiatePayment, isLoading } = usePostPayment();
  const [activeStep, setActiveStep] = useState(1);
  const [isFirstPost, setIsFirstPost] = useState(true);
  const [autoRenew, setAutoRenew] = useState(false);
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard',
    autoRenew: false,
    durationMonths: 1
  });

  const form = useForm<z.infer<typeof salonPostSchema>>({
    resolver: zodResolver(salonPostSchema),
    defaultValues: {
      name: "",
      city: "",
      state: "",
      zip_code: "",
      description: "",
      email: "",
      facebook: "",
    },
  })

  const handleNextStep = () => {
    if (activeStep === 1 && !form.formState.isValid) {
      toast.error(t("Please fill in all required fields.", "Vui lòng điền đầy đủ các trường bắt buộc."));
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const updatePricingOptions = (options: Partial<PricingOptions>) => {
    setPricingOptions(prev => ({ ...prev, ...options }));
  };

  const onPricingTierChange = (pricingTier: string) => {
    updatePricingOptions({ selectedPricingTier: pricingTier });
  };

  const onSubmit = async (values: z.infer<typeof salonPostSchema>) => {
    if (!user) {
      toast.error(t("You must be logged in to post a salon.", "Bạn phải đăng nhập để đăng tin salon."));
      return;
    }

    const salonDetails = {
      ...values,
      user_id: user.id,
    };

    initiatePayment('salon', salonDetails, pricingOptions);
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">{t('Post a Salon', 'Đăng tin Salon')}</h1>

      <div className="mb-8">
        {activeStep === 1 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('Salon Details', 'Chi tiết Salon')}</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Salon Name', 'Tên Salon')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("Enter salon name", "Nhập tên salon")} {...field} />
                      </FormControl>
                      <FormDescription>
                        {t("This is the name that will be displayed on your listing.", "Đây là tên sẽ được hiển thị trên danh sách của bạn.")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>{t('City', 'Thành phố')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("Enter city", "Nhập thành phố")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>{t('State', 'Tỉnh/Bang')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("Enter state", "Nhập tỉnh/bang")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Zip Code', 'Mã Bưu Điện')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("Enter zip code", "Nhập mã bưu điện")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Description', 'Mô tả')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t("Write a description about your salon", "Viết mô tả về salon của bạn")}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("Describe your salon, services, and what makes it unique.", "Mô tả salon, dịch vụ và điều gì làm cho nó trở nên độc đáo.")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Email', 'Email')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("Enter your email", "Nhập email của bạn")} type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Facebook (Optional)', 'Facebook (Tùy chọn)')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("Enter your Facebook URL", "Nhập URL Facebook của bạn")} type="url" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <div></div>
                  <Button type="button" onClick={handleNextStep}>
                    {t('Next', 'Tiếp theo')}
                  </Button>
                </div>
              </form>
            </Form>
          </section>
        )}

        {activeStep === 2 && (
          <ReviewAndPaymentSection
            postType="salon"
            pricingOptions={pricingOptions}
            onPricingChange={onPricingTierChange}
            onUpdatePricing={updatePricingOptions}
            onNextStep={onSubmit}
            onPrevStep={handlePrevStep}
            isFirstPost={isFirstPost}
            isSubmitting={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default SalonPostPage;
