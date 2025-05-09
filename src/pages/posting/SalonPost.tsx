import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from "sonner";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { useTranslation } from '@/hooks/useTranslation';
import { PricingOptions } from '@/types/job';
import { usePostPayment } from '@/hooks/usePostPayment';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { InputCurrency } from '@/components/ui/input-currency';
import { Icons } from '@/components/ui/icons';
import ImageUploader from '@/components/ImageUploader';
import { Salon } from '@/types/salon';
import { useAuth } from '@/context/auth';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  location: yup.string().required('Location is required'),
  contact_info: yup.object().shape({
    owner_name: yup.string().required('Owner name is required'),
    phone: yup.string().required('Phone is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
  }).required('Contact info is required'),
});

const SalonPost: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { initiatePayment, isLoading: isPaymentLoading } = usePostPayment();
  const [isProcessing, setIsProcessing] = useState(false);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard',
    autoRenew: false,
    durationMonths: 1
  });
  const [formData, setFormData] = useState<Salon>({} as Salon);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const onSubmit = (data: yup.InferType<typeof schema>) => {
    setFormData({
      ...data,
      image: selectedImage || '',
    });
  };

  const handleProceedToPayment = async () => {
    try {
      setIsProcessing(true);
      const result = await initiatePayment('salon', formData, pricingOptions);
      
      if (result.success && result.redirect) {
        // Successful payment initiation, redirect to Stripe or success page
        window.location.href = result.redirect;
      } else if (result.success) {
        // Success but no redirect (shouldn't happen, but handle it)
        navigate('/dashboard');
      }
      
      // If we get here without redirecting, there was an issue
      setIsProcessing(false);
    } catch (error) {
      console.error("Payment processing error:", error);
      toast.error(t("There was a problem processing your payment", "Có lỗi khi xử lý thanh toán của bạn"), {
        description: t("Please try again or contact support", "Vui lòng thử lại hoặc liên hệ hỗ trợ")
      });
      setIsProcessing(false);
    }
  };

  const handleImageUpload = (url: string) => {
    setSelectedImage(url);
  };

  return (
    <div className="container max-w-4xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('Post a Salon', 'Đăng tin Salon')}</CardTitle>
          <CardDescription>
            {t('Fill out the form below to post a salon listing.', 'Điền vào mẫu dưới đây để đăng tin salon.')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">{t('Title', 'Tiêu đề')}</Label>
              <Input id="title" {...register('title')} placeholder={t('Salon for sale in Little Saigon', 'Salon cần bán ở Little Saigon')} />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">{t('Description', 'Mô tả')}</Label>
              <Textarea id="description" {...register('description')} placeholder={t('Describe the salon', 'Mô tả về salon')} />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">{t('Location', 'Địa điểm')}</Label>
              <Input id="location" {...register('location')} placeholder={t('City, State', 'Thành phố, Tiểu bang')} />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location.message}</p>
              )}
            </div>
            <div>
              <Label>{t('Upload Image', 'Tải ảnh lên')}</Label>
              <ImageUploader onUpload={handleImageUpload} />
              {selectedImage && (
                <img src={selectedImage} alt="Uploaded" className="mt-2 max-h-40" />
              )}
            </div>
            <div>
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                {t('Contact Information', 'Thông tin liên hệ')}
              </h2>
              <div className="grid gap-4 mt-4">
                <div className="grid gap-2">
                  <Label htmlFor="owner_name">{t('Owner Name', 'Tên chủ sở hữu')}</Label>
                  <Input id="owner_name" {...register('contact_info.owner_name')} placeholder={t('John Doe', 'Nguyễn Văn A')} />
                  {errors.contact_info?.owner_name && (
                    <p className="text-sm text-red-500">{errors.contact_info.owner_name.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">{t('Phone', 'Điện thoại')}</Label>
                  <Input id="phone" {...register('contact_info.phone')} placeholder={t('123-456-7890', '123-456-7890')} />
                  {errors.contact_info?.phone && (
                    <p className="text-sm text-red-500">{errors.contact_info.phone.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{t('Email', 'Email')}</Label>
                  <Input id="email" {...register('contact_info.email')} placeholder={t('johndoe@example.com', 'johndoe@example.com')} />
                  {errors.contact_info?.email && (
                    <p className="text-sm text-red-500">{errors.contact_info.email.message}</p>
                  )}
                </div>
              </div>
            </div>
            <Button disabled={isProcessing} onClick={handleSubmit(onSubmit).then(handleProceedToPayment)}>
              {isProcessing ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  {t('Processing', 'Đang xử lý')}...
                </>
              ) : (
                t('Proceed to Payment', 'Tiến hành thanh toán')
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPost;
