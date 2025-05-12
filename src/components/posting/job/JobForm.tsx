import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FileText, Image, MapPin, Phone, Mail, Briefcase, DollarSign } from 'lucide-react';
import { getJobTemplate, getVietnameseTemplate } from '@/utils/jobTemplates';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';
import SectionHeader from '../SectionHeader';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: JobFormValues;
  industry?: string;
  userProfile?: any;
}

export const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  defaultValues,
  industry = '',
  userProfile
}) => {
  const { t, isVietnamese } = useTranslation();
  const [selectedIndustry, setSelectedIndustry] = useState(industry);
  const [vietnameseTemplate, setVietnameseTemplate] = useState<Partial<JobFormValues> | null>(null);
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      location: '',
      salary: '',
      jobType: 'full-time',
      phoneNumber: userProfile?.phoneNumber || '',
      contactEmail: userProfile?.email || '',
    },
  });

  useEffect(() => {
    if (selectedIndustry && !defaultValues) {
      // Apply template only if no existing data
      const template = getJobTemplate(selectedIndustry, userProfile);
      const vTemplate = getVietnameseTemplate(selectedIndustry);
      
      setVietnameseTemplate(vTemplate);
      
      if (template) {
        Object.keys(template).forEach((key) => {
          const typedKey = key as keyof JobFormValues;
          form.setValue(typedKey, template[typedKey] as any);
        });
      }
    }
  }, [selectedIndustry, form, defaultValues, userProfile]);

  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value);
  };
  
  // Photo upload handling
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Limit to max 5 photos
      const newFiles = Array.from(files).slice(0, 5 - photoUploads.length);
      setPhotoUploads([...photoUploads, ...newFiles]);
    }
  };
  
  const removePhoto = (index: number) => {
    setPhotoUploads(photoUploads.filter((_, i) => i !== index));
  };
  
  const FormSection = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 hover:border-purple-200 transition-colors ${className || ''}`}>
      {children}
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-8">
        {/* Industry Selection */}
        <FormSection>
          <SectionHeader
            title={t("Select Industry", "Chọn Ngành Nghề")}
            emoji="🏷️"
          />
          <FormField
            control={form.control}
            name="jobType"
            render={({ field }) => (
              <FormItem>
                <Select
                  value={selectedIndustry}
                  onValueChange={handleIndustryChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("Select Industry", "Chọn Ngành Nghề")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nails">🧖‍♀️ {t("Nails", "Móng")}</SelectItem>
                    <SelectItem value="hair">💇‍♀️ {t("Hair", "Tóc")}</SelectItem>
                    <SelectItem value="eyebrowLash">👁️ {t("Eyelash & Brows", "Mi & Lông Mày")}</SelectItem>
                    <SelectItem value="tattoo">🎨 {t("Tattoo", "Xăm")}</SelectItem>
                    <SelectItem value="massage">✋ {t("Massage & Spa", "Mát-xa & Spa")}</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </FormSection>
        
        {/* Job Title Section */}
        <FormSection className="bg-gradient-to-br from-white to-purple-50/30">
          <SectionHeader
            title={t("Job Title", "Tiêu Đề Công Việc")}
            emoji="📝"
            description={t("Create an appealing title that attracts qualified candidates", "Tạo tiêu đề hấp dẫn để thu hút ứng viên có trình độ")}
          />
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder={isVietnamese && vietnameseTemplate ? vietnameseTemplate.title : "e.g. Experienced Nail Technician Needed"}
                    className="pl-10 border-2 h-12"
                  />
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
                {selectedIndustry === "nails" && vietnameseTemplate && (
                  <div className="mt-2 text-sm text-gray-500">
                    {isVietnamese ? (
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        ✨ English: {jobFormSchema.shape.title.default()}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        ✨ Tiếng Việt: {vietnameseTemplate.title}
                      </Badge>
                    )}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        {/* Job Summary Section */}
        <FormSection className="bg-gradient-to-br from-white to-pink-50/30">
          <SectionHeader
            title={t("Job Summary", "Tóm Tắt Công Việc")}
            emoji="📊"
            description={t("Brief overview of the position (appears in search results)", "Mô tả ngắn gọn về vị trí (hiển thị trong kết quả tìm kiếm)")}
          />
          
          <FormField
            control={form.control}
            name="jobSummary"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <Textarea
                    {...field}
                    placeholder={isVietnamese && vietnameseTemplate?.jobSummary 
                      ? vietnameseTemplate.jobSummary 
                      : "Brief overview of what makes this position great"}
                    className="min-h-[80px] pl-10 border-2 pt-2"
                  />
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
                {selectedIndustry === "nails" && vietnameseTemplate && (
                  <div className="mt-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-md border border-purple-100">
                    <span className="block mb-2 text-sm font-medium text-purple-700">
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                        ✨ {t("Suggested for Nail Salons", "Đề xuất cho Tiệm Nail")}
                      </Badge>
                    </span>
                    <p className="text-sm text-gray-600">
                      {isVietnamese 
                        ? jobFormSchema.shape.jobSummary.default() || "Looking for a friendly, reliable nail tech with experience in dip, gel, and design. Great team, busy salon, weekly pay."
                        : vietnameseTemplate.jobSummary}
                    </p>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        {/* Job Type & Salary Section */}
        <FormSection>
          <SectionHeader
            title={t("Job Details", "Chi Tiết Công Việc")}
            emoji="💼"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    {t("Employment Type", "Loại Hình Công Việc")}
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("Select job type", "Chọn loại hình công việc")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">{t("Full-Time", "Toàn Thời Gian")}</SelectItem>
                      <SelectItem value="part-time">{t("Part-Time", "Bán Thời Gian")}</SelectItem>
                      <SelectItem value="contract">{t("Contract", "Hợp Đồng")}</SelectItem>
                      <SelectItem value="temporary">{t("Temporary", "Tạm Thời")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    {t("Salary/Compensation", "Lương/Thu Nhập")}
                  </FormLabel>
                  <div className="relative">
                    <Input 
                      {...field} 
                      placeholder={isVietnamese && vietnameseTemplate 
                        ? vietnameseTemplate.salary 
                        : "e.g. $800-1200/week or Competitive pay"}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>

        {/* Location Section */}
        <FormSection>
          <SectionHeader
            title={t("Location", "Địa Điểm")}
            emoji="📍"
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder={t("City, State (e.g. San Jose, CA)", "Thành Phố, Tiểu Bang (VD: San Jose, CA)")}
                    className="pl-10"
                  />
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        {/* Detailed Description */}
        <FormSection className="bg-gradient-to-br from-white to-blue-50/30">
          <SectionHeader
            title={t("Job Description", "Mô Tả Công Việc")}
            emoji="📄"
            description={t("Provide details about responsibilities, skills required, and benefits", "Cung cấp chi tiết về trách nhiệm, kỹ năng yêu cầu và quyền lợi")}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Textarea
                  {...field}
                  placeholder={t("Detail the job responsibilities, required skills, and benefits", "Chi tiết về trách nhiệm công việc, kỹ năng yêu cầu và quyền lợi")}
                  className="min-h-[150px]"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        {/* Contact Information Section */}
        <FormSection>
          <SectionHeader
            title={t("Contact Information", "Thông Tin Liên Hệ")}
            emoji="📞"
            description={t("This information will be visible to candidates who want to apply", "Thông tin này sẽ hiển thị cho các ứng viên muốn ứng tuyển")}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {t("Phone Number", "Số Điện Thoại")}
                  </FormLabel>
                  <Input 
                    {...field} 
                    placeholder={t("e.g. (123) 456-7890", "VD: (123) 456-7890")} 
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {t("Email", "Email")}
                  </FormLabel>
                  <Input 
                    {...field} 
                    placeholder={t("e.g. hire@yoursalon.com", "VD: tuyendung@tiemnail.com")} 
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>

        {/* Photo Upload Section */}
        <FormSection className="bg-gradient-to-br from-white to-yellow-50/30">
          <SectionHeader
            title={t("Photo Upload", "Tải Ảnh Lên")}
            emoji="📸"
            description={t("💡 Add Real Salon Photos to Stand Out", "💡 Thêm Hình Ảnh Thực Tế Để Nổi Bật Hơn")}
          />
          
          <div className="mt-2">
            <div 
              className="border-2 border-dashed border-gray-300 hover:border-primary hover:bg-gray-50/50 transition-colors rounded-lg p-6 text-center cursor-pointer bg-gradient-to-r from-white to-purple-50/20"
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              <Image className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-2">
                <Label htmlFor="photo-upload" className="text-primary hover:text-primary/80 cursor-pointer">
                  {t("Upload photos", "Tải ảnh lên")}
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  {t("PNG, JPG, WEBP up to 5MB (max 5 photos)", "PNG, JPG, WEBP tối đa 5MB (tối đa 5 ảnh)")}
                </p>
              </div>
              <input 
                id="photo-upload" 
                type="file" 
                multiple 
                onChange={handlePhotoChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            {/* Photo Previews */}
            {photoUploads.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {photoUploads.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={URL.createObjectURL(photo)} 
                      alt={`Upload ${index + 1}`}
                      className="h-24 w-full object-cover rounded-md border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <p className="text-xs text-gray-500 truncate mt-1">{photo.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FormSection>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button 
            type="submit" 
            size="lg" 
            disabled={isSubmitting}
            className="px-10 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium py-6"
          >
            {isSubmitting ? (
              t("Posting Job...", "Đang Đăng Tin...")
            ) : (
              t("Post Job Now", "Đăng Tin Ngay")
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
