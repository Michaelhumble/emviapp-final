import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import { usePostPayment } from '@/hooks/usePostPayment';
import { JobDetailsSubmission, PricingOptions } from '@/types/job';
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const jobPostSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
  employment_type: z.string().optional(),
  requirements: z.string().optional(),
  contact_info: z.object({
    owner_name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    notes: z.string().optional(),
    zalo: z.string().optional(),
  }).optional(),
  image: z.string().optional(),
  vietnamese_description: z.string().optional(),
  preferred_languages: z.string().optional().array(),
  benefits: z.string().optional().array(),
  features: z.string().optional().array(),
  salon_type: z.string().optional(),
  specialties: z.string().optional().array(),
  weekly_pay: z.boolean().default(false).optional(),
  has_housing: z.boolean().default(false).optional(),
  has_wax_room: z.boolean().default(false).optional(),
  no_supply_deduction: z.boolean().default(false).optional(),
  owner_will_train: z.boolean().default(false).optional(),
  tip_range: z.string().optional(),
  salary_range: z.string().optional(),
  is_urgent: z.boolean().default(false).optional(),
  user_id: z.string().optional(),
  post_type: z.string().optional(),
});

const JobPost: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'free',
    autoRenew: false,
    durationMonths: 1,
  });
  
  const { initiatePayment, isLoading } = usePostPayment();

  const form = useForm<z.infer<typeof jobPostSchema>>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      compensation_type: "",
      compensation_details: "",
      employment_type: "",
      requirements: "",
      contact_info: {
        owner_name: "",
        phone: "",
        email: "",
        notes: "",
        zalo: "",
      },
      image: "",
      vietnamese_description: "",
      preferred_languages: [],
      benefits: [],
      features: [],
      salon_type: "",
      specialties: [],
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      no_supply_deduction: false,
      owner_will_train: false,
      tip_range: "",
      salary_range: "",
      is_urgent: false,
      user_id: "",
      post_type: "",
    },
  });

  useEffect(() => {
    // Set default values for checkboxes to false
    form.setValue("weekly_pay", false);
    form.setValue("has_housing", false);
    form.setValue("has_wax_room", false);
    form.setValue("no_supply_deduction", false);
    form.setValue("owner_will_train", false);
    form.setValue("is_urgent", false);
  }, [form.setValue]);

  const handleProceedToPayment = async () => {
    try {
      setIsProcessing(true);
      const formData = form.getValues();
      const result = await initiatePayment('job', formData, pricingOptions);
      
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

  return (
    <Layout>
      <div className="container max-w-4xl py-12">
        <Card>
          <CardHeader>
            <CardTitle>{t('Post a Job', 'Đăng tin tuyển dụng')}</CardTitle>
            <CardDescription>
              {t('Fill in the details to post a new job listing.', 'Điền thông tin chi tiết để đăng tin tuyển dụng mới.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleProceedToPayment)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Job Title', 'Tiêu đề công việc')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('e.g., Hair Stylist', 'VD: Thợ làm tóc')} {...field} />
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
                      <FormLabel>{t('Job Description', 'Mô tả công việc')}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t('Describe the job responsibilities and requirements', 'Mô tả trách nhiệm và yêu cầu công việc')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Location', 'Địa điểm')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('e.g., Ho Chi Minh City', 'VD: Thành phố Hồ Chí Minh')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="compensation_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Compensation Type', 'Loại hình trả lương')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('Select a compensation type', 'Chọn loại hình trả lương')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hourly">{t('Hourly', 'Theo giờ')}</SelectItem>
                          <SelectItem value="salary">{t('Salary', 'Theo lương')}</SelectItem>
                          <SelectItem value="commission">{t('Commission', 'Theo hoa hồng')}</SelectItem>
                          <SelectItem value="negotiable">{t('Negotiable', 'Thỏa thuận')}</SelectItem>
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
                      <FormLabel>{t('Compensation Details', 'Chi tiết lương')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('e.g., $20/hour + tips', 'VD: $20/giờ + tiền boa')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="employment_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Employment Type', 'Loại hình làm việc')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('Select employment type', 'Chọn loại hình làm việc')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full-time">{t('Full-time', 'Toàn thời gian')}</SelectItem>
                          <SelectItem value="part-time">{t('Part-time', 'Bán thời gian')}</SelectItem>
                          <SelectItem value="contract">{t('Contract', 'Hợp đồng')}</SelectItem>
                          <SelectItem value="internship">{t('Internship', 'Thực tập')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Requirements', 'Yêu cầu')}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t('List any specific skills or qualifications', 'Liệt kê các kỹ năng hoặc trình độ cụ thể')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact_info.owner_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Contact Name', 'Tên liên hệ')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('Enter contact name', 'Nhập tên liên hệ')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact_info.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Contact Phone', 'Điện thoại liên hệ')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('Enter contact phone', 'Nhập số điện thoại liên hệ')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact_info.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Contact Email', 'Email liên hệ')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('Enter contact email', 'Nhập email liên hệ')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="weekly_pay"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm font-medium leading-none">
                            {t("Weekly Pay", "Trả lương hàng tuần")}
                          </FormLabel>
                          <FormDescription>
                            {t("Indicate if you offer weekly pay", "Cho biết nếu bạn trả lương hàng tuần")}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="has_housing"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm font-medium leading-none">
                            {t("Housing Available", "Có chỗ ở")}
                          </FormLabel>
                          <FormDescription>
                            {t("Indicate if housing is available", "Cho biết nếu có chỗ ở")}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="has_wax_room"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm font-medium leading-none">
                            {t("Wax Room Available", "Có phòng wax")}
                          </FormLabel>
                          <FormDescription>
                            {t("Indicate if a wax room is available", "Cho biết nếu có phòng wax")}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="no_supply_deduction"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm font-medium leading-none">
                            {t("No Supply Deduction", "Không khấu trừ vật tư")}
                          </FormLabel>
                          <FormDescription>
                            {t("Indicate if there is no deduction for supplies", "Cho biết nếu không có khấu trừ vật tư")}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="owner_will_train"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm font-medium leading-none">
                            {t("Owner Will Train", "Chủ sẽ đào tạo")}
                          </FormLabel>
                          <FormDescription>
                            {t("Indicate if the owner will provide training", "Cho biết nếu chủ sẽ cung cấp đào tạo")}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_urgent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm font-medium leading-none">
                            {t("Urgent Hiring", "Tuyển gấp")}
                          </FormLabel>
                          <FormDescription>
                            {t("Indicate if the position needs to be filled urgently", "Cho biết nếu vị trí cần được lấp đầy gấp")}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <Button disabled={isLoading || isProcessing} type="submit">
                    {isLoading || isProcessing ? (
                      <>
                        {t('Processing...', 'Đang xử lý...')}
                      </>
                    ) : (
                      t('Proceed to Payment', 'Tiến hành thanh toán')
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default JobPost;
