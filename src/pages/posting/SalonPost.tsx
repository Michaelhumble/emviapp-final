import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { usePostPayment } from '@/hooks/usePostPayment';
import { useAuth } from '@/context/auth';
import { useSalon } from '@/context/salon';
import { PricingCards } from '@/components/posting';
import { salonPricingOptions } from '@/utils/posting/salonPricing';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox"

// Define the schema for the form
const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zipCode: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  website: z.string().url({
    message: "Please enter a valid URL.",
  }).optional(),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }).optional(),
  email: z.string().email({
    message: "Please enter a valid email.",
  }).optional(),
  instagram: z.string().url({
    message: "Please enter a valid URL.",
  }).optional(),
  facebook: z.string().url({
    message: "Please enter a valid URL.",
  }).optional(),
});

// Define the steps for the form
type Steps = 'details' | 'pricing' | 'success';

// Main component
const SalonPost: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentSalon } = useSalon();
  const { initiatePayment, isLoading } = usePostPayment();

  // Form state
  const [currentStep, setCurrentStep] = useState<Steps>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFirstPost, setIsFirstPost] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState('standard');
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [autoRenew, setAutoRenew] = useState(false);

  // React Hook Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: currentSalon?.name || "",
      address: currentSalon?.address || "",
      city: currentSalon?.city || "",
      state: currentSalon?.state || "",
      zipCode: currentSalon?.zip_code || "",
      description: currentSalon?.description || "",
      website: currentSalon?.website || "",
      phone: currentSalon?.phone || "",
      email: currentSalon?.email || "",
      instagram: currentSalon?.instagram || "",
      facebook: currentSalon?.facebook || "",
    },
    mode: "onChange",
  });

  // Destructure form methods
  const { handleSubmit, control } = form;

  // Check if it's the user's first post
  useEffect(() => {
    const checkFirstPost = async () => {
      if (!user?.id) return;
      // Placeholder: Replace with actual logic to check if it's the user's first post
      setIsFirstPost(true);
    };

    checkFirstPost();
  }, [user?.id]);

  // Handle form submission
  // Fix the handleSubmit function to work with the new response types from usePostPayment
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (currentStep === 'details') {
      setCurrentStep('pricing');
    }
  };

  // Handle form submission
  // Fix the handleSubmit function to work with the new response types from usePostPayment
  const handlePricingSubmit = async () => {
    // Create the salon post data
    try {
      setIsSubmitting(true);
      
      // Set up pricing options
      const pricingOptions = {
        selectedPricingTier: selectedPricing,
        durationMonths: selectedDuration,
        autoRenew: autoRenew,
        isFirstPost: isFirstPost
      };
      
      // Validate that price data in salonPricingOptions matches the selected tier
      const selectedPricingOption = salonPricingOptions.find(option => option.id === selectedPricing);
      if (!selectedPricingOption) {
        toast.error("Invalid pricing option selected");
        setIsSubmitting(false);
        return;
      }

      console.log(`Initiating payment with tier ${selectedPricing} (${selectedPricingOption.price})`);
      
      // Call the payment initiation function
      const result = await initiatePayment('salon', { ...form.getValues(), name: form.getValues().businessName }, pricingOptions);
      
      if (result.success) {
        if (result.url) {
          // For paid listings, redirect to Stripe
          window.location.href = result.url;
        } else {
          // For free listings, redirect to success page
          navigate(`/post-success?payment_log_id=${result.payment_log_id}&free=true`);
        }
      } else {
        toast.error("Failed to process payment. Please try again.");
      }
    } catch (error: any) {
      console.error("Error submitting salon post:", error);
      toast.error(error.message || "An error occurred while submitting your post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">{t("Post a Salon", "Đăng tin Salon")}</h1>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {currentStep === 'details' && (
            <div className="space-y-4">
              <FormField
                control={control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Business Name", "Tên Salon")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("Enter your business name", "Nhập tên Salon của bạn")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Address", "Địa chỉ")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("Enter your address", "Nhập địa chỉ của bạn")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <FormField
                  control={control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{t("City", "Thành phố")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("Enter your city", "Nhập thành phố của bạn")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{t("State", "Tiểu bang")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("Enter your state", "Nhập tiểu bang của bạn")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{t("Zip Code", "Mã bưu điện")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("Enter your zip code", "Nhập mã bưu điện của bạn")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Description", "Mô tả")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("Enter a description for your salon", "Nhập mô tả cho Salon của bạn")}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Website", "Trang web")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("Enter your website URL", "Nhập URL trang web của bạn")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{t("Phone", "Điện thoại")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("Enter your phone number", "Nhập số điện thoại của bạn")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{t("Email", "Email")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("Enter your email", "Nhập email của bạn")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Instagram", "Instagram")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("Enter your Instagram URL", "Nhập URL Instagram của bạn")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Facebook", "Facebook")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("Enter your Facebook URL", "Nhập URL Facebook của bạn")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {currentStep === 'pricing' && (
            <div className="space-y-4">
              <PricingCards
                pricingOptions={salonPricingOptions}
                selectedPricing={selectedPricing}
                onChange={setSelectedPricing}
                selectedDuration={selectedDuration}
                onDurationChange={setSelectedDuration}
              />

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto-renew"
                  checked={autoRenew}
                  onCheckedChange={setAutoRenew}
                />
                <Label htmlFor="auto-renew" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                  {t("Auto-Renew Subscription", "Tự động gia hạn đăng ký")}
                </Label>
              </div>
            </div>
          )}

          {currentStep === 'details' && (
            <Button type="submit" disabled={isLoading}>
              {t("Next: Select Pricing", "Tiếp theo: Chọn giá")}
            </Button>
          )}

          {currentStep === 'pricing' && (
            <Button type="button" onClick={handlePricingSubmit} disabled={isLoading || isSubmitting}>
              {isLoading || isSubmitting ? t("Submitting...", "Đang gửi...") : t("Submit", "Gửi")}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default SalonPost;
