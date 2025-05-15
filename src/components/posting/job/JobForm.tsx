
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobFormSchema, JobFormValues } from "./jobFormSchema";
import JobPostHeader from "./JobPostHeader";
import LanguageSelector from "./LanguageSelector";
import JobTemplateSelector from "./JobTemplateSelector";
import YesLadder from "./YesLadder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JOB_TYPES_EN, JOB_TYPES_VI } from "./jobFormConstants";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowRight, CheckCircle, Lock, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  defaultValues?: Partial<JobFormValues>;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  defaultValues = {}
}) => {
  const { isVietnamese, t } = useTranslation();
  const [enhancementOptions, setEnhancementOptions] = useState<Record<string, boolean>>({});
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      type: "",
      compensation: "",
      contactEmail: "",
      contactPhone: "",
      isUrgent: false,
      ...defaultValues
    }
  });

  const handleTemplateSelection = (templateData: Partial<JobFormValues>) => {
    Object.entries(templateData).forEach(([key, value]) => {
      if (form.getValues(key as keyof JobFormValues) !== undefined) {
        form.setValue(key as keyof JobFormValues, value as any);
      }
    });
  };

  const handleYesLadder = (questionId: string, value: boolean) => {
    const newOptions = { ...enhancementOptions, [questionId]: value };
    setEnhancementOptions(newOptions);
    form.setValue("enhancementOptions", newOptions);
  };

  const handleFormSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4 sm:px-6"
    >
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm py-2">
        <LanguageSelector sticky={true} />
      </div>
      
      <JobPostHeader />
      
      <JobTemplateSelector onSelectTemplate={handleTemplateSelection} />
      
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 md:p-8 mb-10"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          {t("Job Details", "Chi Tiết Công Việc")}
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Job Title", "Tên Công Việc")} *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t("e.g. Experienced Nail Technician", "VD: Thợ Nail Có Kinh Nghiệm")} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Job Type", "Loại Công Việc")} *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("Select job type", "Chọn loại công việc")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(isVietnamese ? JOB_TYPES_VI : JOB_TYPES_EN).map(type => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Location", "Địa Điểm")} *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t("e.g. San Francisco, CA", "VD: Houston, TX")} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="compensation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Compensation", "Thù Lao")}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t("e.g. $25-30/hr + tips", "VD: $700-900/tuần + tips")} 
                      {...field} 
                    />
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
                  <FormLabel>{t("Job Description", "Mô Tả Công Việc")} *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t("Describe the job responsibilities, requirements, and benefits...", "Mô tả trách nhiệm, yêu cầu công việc và các quyền lợi...")} 
                      className="min-h-32" 
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
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Contact Email", "Email Liên Hệ")} *</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="email@example.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Contact Phone", "Số Điện Thoại")} *</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel" 
                        placeholder={t("e.g. (555) 123-4567", "VD: (555) 123-4567")} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Trust Badges Section */}
            <div className="flex flex-wrap items-center justify-center gap-3 border-t border-gray-100 pt-6 mt-8">
              <Badge variant="secondary" className="flex items-center gap-1.5 bg-gray-50 text-gray-600 py-1.5 px-3">
                <Shield className="w-3.5 h-3.5" />
                <span>{t("Data Encrypted", "Dữ Liệu Được Mã Hóa")}</span>
              </Badge>
              
              <Badge variant="secondary" className="flex items-center gap-1.5 bg-gray-50 text-gray-600 py-1.5 px-3">
                <Lock className="w-3.5 h-3.5" />
                <span>{t("Privacy Protected", "Bảo Vệ Quyền Riêng Tư")}</span>
              </Badge>
              
              <Badge variant="secondary" className="flex items-center gap-1.5 bg-gray-50 text-gray-600 py-1.5 px-3">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{t("Verified Business", "Doanh Nghiệp Đã Xác Thực")}</span>
              </Badge>
            </div>
          </form>
        </Form>
      </motion.div>
      
      <YesLadder onYesAnswered={handleYesLadder} />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center mb-12"
      >
        <Button 
          onClick={form.handleSubmit(handleFormSubmit)}
          disabled={isSubmitting}
          size="lg"
          className="px-8 py-6 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg transition-all"
        >
          {isSubmitting ? 
            t("Processing...", "Đang xử lý...") : 
            t("Continue to Pricing", "Tiếp tục đến Giá Cả")}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <p className="text-xs text-gray-500 mt-4 text-center max-w-md">
          {t(
            "You can edit or remove your post anytime. No commitment until you choose a pricing plan.",
            "Bạn có thể chỉnh sửa hoặc xóa bài đăng bất kỳ lúc nào. Không cam kết cho đến khi bạn chọn gói giá."
          )}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default JobForm;
