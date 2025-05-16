import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { jobFormSchema } from "@/components/posting/job/jobFormSchema";
import { useAuth } from "@/context/auth";
import { BetterResultsSection } from "@/components/posting/job";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Languages, Loader2 } from "lucide-react";

const postJobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Please provide a detailed description"),
  location: z.string().min(2, "Location is required"),
  salary: z.string().optional(),
  contactEmail: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  phoneNumber: z.string().optional(),
  jobType: z.enum(["full-time", "part-time", "contract", "temporary"]),
  requirements: z.string().optional(),
  jobSummary: z.string().optional()
});

type PostJobFormValues = z.infer<typeof postJobSchema>;

const PostJob = () => {
  const { t, isVietnamese } = useTranslation();
  const { user } = useAuth();
  const { profile } = useUserProfile();
  const { initiatePayment, isLoading } = usePostPayment();
  const [selectedTier, setSelectedTier] = useState('standard');
  
  const form = useForm<PostJobFormValues>({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      salary: '',
      contactEmail: user?.email || '',
      phoneNumber: profile?.phone_number || '',
      jobType: 'full-time',
      requirements: '',
      jobSummary: ''
    }
  });

  const onSubmit = async (data: PostJobFormValues) => {
    try {
      const jobDetails = {
        title: data.title,
        description: data.description,
        location: data.location,
        compensation_details: data.salary,
        contact_info: {
          email: data.contactEmail,
          phone: data.phoneNumber
        },
        employment_type: data.jobType,
        requirements: data.requirements?.split(',').map(req => req.trim()),
        post_type: 'job',
        user_id: user?.id
      };

      const pricingOptions = {
        selectedPricingTier: selectedTier,
        isFirstPost: true // Set based on user post history
      };

      await initiatePayment('job', jobDetails, pricingOptions);
    } catch (error) {
      console.error('Error submitting job post:', error);
      toast.error(t('Failed to submit job post', 'Không thể gửi bài đăng công việc'));
    }
  };

  return (
    <Layout>
      <div className="container max-w-3xl px-4 py-12">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>{t('Post a Job', 'Đăng tin tuyển dụng')}</CardTitle>
            <CardDescription>{t('Fill out the form below to post your job listing', 'Điền vào mẫu dưới đây để đăng tin tuyển dụng của bạn')}</CardDescription>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Job Title', 'Chức danh')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={t('e.g. Nail Technician', 'VD: Thợ làm móng')} />
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
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input className="pl-10" {...field} placeholder={t('e.g. San Jose, CA', 'VD: San Jose, CA')} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Salary', 'Lương')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={t('e.g. $25-35/hr, 60% commission', 'VD: $25-35/giờ, 60% hoa hồng')} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Job Type', 'Loại công việc')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('Select job type', 'Chọn loại công việc')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* Would normally use a map with data array */}
                          <SelectItem value="full-time">{t('Full-time', 'Toàn thời gian')}</SelectItem>
                          <SelectItem value="part-time">{t('Part-time', 'Bán thời gian')}</SelectItem>
                        </SelectContent>
                      </Select>
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
                        <Textarea 
                          {...field}
                          placeholder={t('Describe the job responsibilities, qualifications, etc.', 'Mô tả trách nhiệm công việc, trình độ chuyên môn, v.v.')}
                          className="min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Contact Email (optional)', 'Email liên hệ (tùy chọn)')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email" 
                          placeholder={t('Email for applications', 'Email để nhận đơn ứng tuyển')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Contact Phone Number (optional)', 'Số điện thoại liên hệ (tùy chọn)')}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            className="pl-10" 
                            {...field} 
                            placeholder={t('Phone number for applications', 'Số điện thoại để ứng tuyển')}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Requirements (comma separated)', 'Yêu cầu (phân cách bằng dấu phẩy)')}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Languages className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            className="pl-10" 
                            {...field} 
                            placeholder={t('e.g. 2+ years experience, bilingual, licensed', 'VD: 2+ năm kinh nghiệm, song ngữ, có giấy phép')}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <BetterResultsSection />
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('Processing...', 'Đang xử lý...')}
                    </>
                  ) : (
                    t('Continue to Payment', 'Tiếp tục thanh toán')
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default PostJob;
