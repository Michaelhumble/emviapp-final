import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';
import { usePostPayment } from '@/hooks/usePostPayment';
import { JobPricingOption, jobPricingOptions } from '@/utils/posting/jobPricing';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
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
import PricingCards from '@/components/posting/PricingCards';
import { DurationOption } from '@/types/pricing';

// Define the schema for the job post form
const jobPostSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  location: z.string().min(3, { message: "Location must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  salaryRange: z.string().optional(),
  jobType: z.string().min(2, { message: "Job type must be selected." }),
  applicationEmail: z.string().email({ message: "Invalid email format." }).optional(),
  applicationUrl: z.string().url({ message: "Invalid URL format." }).optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email({ message: "Invalid email format." }).optional(),
  contactPhone: z.string().optional(),
});

// Define the type for the form values based on the schema
type JobPostValues = z.infer<typeof jobPostSchema>;

const JobPost: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { initiatePayment, isLoading: isPaymentLoading } = usePostPayment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<'details' | 'pricing'>('details');
  const [selectedPricing, setSelectedPricing] = useState<string>('free');
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [autoRenew, setAutoRenew] = useState<boolean>(false);
  const [isFirstPost, setIsFirstPost] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<JobPostValues>>({});

  // React Hook Form setup
  const form = useForm<JobPostValues>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      description: "",
      salaryRange: "",
      jobType: "",
      applicationEmail: "",
      applicationUrl: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!user) {
      toast.error(t("You must be logged in to post a job", "Bạn phải đăng nhập để đăng tin tuyển dụng"));
      navigate('/login');
    }
  }, [user, navigate, t]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (currentStep === 'details') {
      form.handleSubmit((values) => {
        setFormData(values);
        setCurrentStep('pricing');
      })();
    } else if (currentStep === 'pricing') {
      // Create the job post data
      try {
        setIsSubmitting(true);
        
        // Set up pricing options
        const pricingOptions = {
          selectedPricingTier: selectedPricing,
          durationMonths: selectedDuration,
          autoRenew: autoRenew,
          isFirstPost: isFirstPost
        };
        
        // Validate that price data in jobPricingOptions matches the selected tier
        const selectedPricingOption = jobPricingOptions.find(option => option.id === selectedPricing);
        if (!selectedPricingOption) {
          toast.error("Invalid pricing option selected");
          setIsSubmitting(false);
          return;
        }

        console.log(`Initiating payment with tier ${selectedPricing} (${selectedPricingOption.price})`);

        // Call the payment initiation function
        const result = await initiatePayment('job', { ...formData, title: formData.title }, pricingOptions);
        
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
        console.error("Error submitting job post:", error);
        toast.error(error.message || "An error occurred while submitting your post");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">{t("Post a Job", "Đăng Tin Tuyển Dụng")}</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {currentStep === 'details' && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Job Title", "Tiêu Đề Công Việc")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("e.g., Senior Developer", "Ví dụ: Lập Trình Viên Cấp Cao")} {...field} />
                  </FormControl>
                  <FormDescription>
                    {t("What is the name of the job you are offering?", "Tên công việc bạn đang tuyển là gì?")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Company Name", "Tên Công Ty")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("e.g., Emvi", "Ví dụ: Emvi")} {...field} />
                  </FormControl>
                  <FormDescription>
                    {t("The name of the company offering the job.", "Tên công ty đăng tin tuyển dụng.")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Location", "Địa Điểm")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("e.g., Ho Chi Minh City", "Ví dụ: Hồ Chí Minh")} {...field} />
                  </FormControl>
                  <FormDescription>
                    {t("Where is the job located?", "Địa điểm làm việc ở đâu?")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Job Description", "Mô Tả Công Việc")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("Describe the job responsibilities and requirements.", "Mô tả trách nhiệm và yêu cầu công việc.")}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("Describe the job responsibilities and requirements.", "Mô tả trách nhiệm và yêu cầu công việc.")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salaryRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Salary Range", "Mức Lương")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("e.g., $50,000 - $70,000", "Ví dụ: $50,000 - $70,000")} {...field} />
                  </FormControl>
                  <FormDescription>
                    {t("The salary range for this position.", "Mức lương cho vị trí này.")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Job Type", "Loại Công Việc")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("Select a job type", "Chọn loại công việc")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full-time">{t("Full-time", "Toàn Thời Gian")}</SelectItem>
                      <SelectItem value="part-time">{t("Part-time", "Bán Thời Gian")}</SelectItem>
                      <SelectItem value="contract">{t("Contract", "Hợp Đồng")}</SelectItem>
                      <SelectItem value="temporary">{t("Temporary", "Thời Vụ")}</SelectItem>
                      <SelectItem value="internship">{t("Thực Tập")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {t("Select the type of job.", "Chọn loại công việc.")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="applicationEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Application Email", "Email Ứng Tuyển")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("e.g., jobs@example.com", "Ví dụ: jobs@example.com")} type="email" {...field} />
                    </FormControl>
                    <FormDescription>
                      {t("Email address for job applications.", "Địa chỉ email để ứng tuyển.")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applicationUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Application URL", "URL Ứng Tuyển")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("e.g., https://example.com/apply", "Ví dụ: https://example.com/apply")} type="url" {...field} />
                    </FormControl>
                    <FormDescription>
                      {t("URL for online job application.", "URL cho ứng tuyển trực tuyến.")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Contact Name", "Tên Liên Hệ")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("e.g., John Doe", "Ví dụ: John Doe")} {...field} />
                    </FormControl>
                    <FormDescription>
                      {t("Contact person for this job posting.", "Người liên hệ cho tin tuyển dụng này.")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Contact Email", "Email Liên Hệ")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("e.g., john@example.com", "Ví dụ: john@example.com")} type="email" {...field} />
                    </FormControl>
                    <FormDescription>
                      {t("Email address for contact person.", "Địa chỉ email của người liên hệ.")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Contact Phone", "Điện Thoại Liên Hệ")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("e.g., +15551234567", "Ví dụ: +15551234567")} type="tel" {...field} />
                    </FormControl>
                    <FormDescription>
                      {t("Phone number for contact person.", "Số điện thoại của người liên hệ.")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {currentStep === 'pricing' && (
          <div className="space-y-4">
            <PricingCards
              pricingOptions={jobPricingOptions}
              selectedPricing={selectedPricing}
              onChange={setSelectedPricing}
              selectedDuration={selectedDuration}
              onDurationChange={setSelectedDuration}
            />

            <div className="flex items-center space-x-2">
              <Checkbox id="auto-renew" checked={autoRenew} onCheckedChange={setAutoRenew} />
              <label
                htmlFor="auto-renew"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
              >
                {t("Auto-Renew Subscription", "Tự Động Gia Hạn Đăng Ký")}
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="first-post" checked={isFirstPost} onCheckedChange={setIsFirstPost} />
              <label
                htmlFor="first-post"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
              >
                {t("First Time Posting", "Lần Đầu Đăng Tin")}
              </label>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          {currentStep === 'pricing' && (
            <Button variant="secondary" onClick={() => setCurrentStep('details')}>
              {t("Previous", "Quay Lại")}
            </Button>
          )}

          <Button type="submit" disabled={isSubmitting || isPaymentLoading}>
            {isSubmitting || isPaymentLoading ? (
              <>
                {t("Submitting...", "Đang Gửi...")}
                <svg className="animate-spin h-5 w-5 ml-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </>
            ) : (
              currentStep === 'details' ? t("Next", "Tiếp Theo") : t("Submit", "Gửi")
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobPost;
