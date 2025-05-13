import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobFormSchema, JobFormValues } from './jobFormSchema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';
import { Dropzone } from '@/components/ui/dropzone';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';

export const JobForm: React.FC<{
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: JobFormValues;
  industry?: string;
  userProfile?: any;
}> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting,
  defaultValues,
  industry = "nails",
  userProfile
}) => {
  const { t, isVietnamese } = useTranslation();
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: defaultValues || {
      job_title: '',
      job_type: 'full_time',
      specialties: [],
      address: '',
      city: '',
      state: '',
      zip_code: '',
      compensation_type: 'hourly',
      compensation_details: '',
      tip_range: '',
      summary: '',
      description: '',
      years_experience_required: '0',
      weekly_pay: false,
      contact_info: {
        owner_name: userProfile?.name || '',
        phone: userProfile?.phone || '',
        email: userProfile?.email || '',
        zalo: '',
        notes: ''
      }
    }
  });

  const handleSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  const specialtiesList = [
    "Nail Technician",
    "Hair Stylist",
    "Esthetician",
    "Massage Therapist",
    "Salon Manager",
    "Cosmetologist",
    "Barber",
    "Makeup Artist",
    "Eyelash Technician",
    "Waxing Specialist",
    "Receptionist",
    "Assistant"
  ];

  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(defaultValues?.specialties || []);

  useEffect(() => {
    form.setValue("specialties", selectedSpecialties);
  }, [selectedSpecialties, form.setValue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="space-y-6">
          {/* Job Title Field */}
          <FormField
            control={form.control}
            name="job_title"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="text-base font-medium">
                  {t('Job Title', 'Tên Công Việc')} <span className="text-red-500">*</span>
                </FormLabel>
                <Input 
                  placeholder={t('e.g. Experienced Nail Technician', 'VD: Thợ Nail Có Kinh Nghiệm')} 
                  {...field} 
                  className="w-full"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Job Type Field */}
          <FormField
            control={form.control}
            name="job_type"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="text-base font-medium">
                  {t('Job Type', 'Loại Công Việc')} <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('Select job type', 'Chọn loại công việc')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_time">{t('Full-time', 'Toàn thời gian')}</SelectItem>
                    <SelectItem value="part_time">{t('Part-time', 'Bán thời gian')}</SelectItem>
                    <SelectItem value="contract">{t('Contract', 'Hợp đồng')}</SelectItem>
                    <SelectItem value="temporary">{t('Temporary', 'Tạm thời')}</SelectItem>
                    <SelectItem value="flexible">{t('Flexible', 'Linh hoạt')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Specialties Field */}
          <div className="mb-6">
            <FormLabel className="text-base font-medium">
              {t('Specialties', 'Chuyên Môn')}
            </FormLabel>
            <div className="flex flex-wrap gap-2 mt-2">
              {specialtiesList.map((specialty) => (
                <Badge
                  key={specialty}
                  variant={selectedSpecialties.includes(specialty) ? "default" : "outline"}
                  onClick={() => {
                    if (selectedSpecialties.includes(specialty)) {
                      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty));
                    } else {
                      setSelectedSpecialties([...selectedSpecialties, specialty]);
                    }
                  }}
                  className="cursor-pointer"
                >
                  {t(specialty, specialty)}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Location Section */}
          <div className="mt-8 mb-6">
            <h3 className="text-lg font-medium mb-4">{t('Location', 'Địa Điểm')}</h3>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      {t('Address', 'Địa Chỉ')} <span className="text-red-500">*</span>
                    </FormLabel>
                    <Input 
                      placeholder={t('Street address', 'Địa chỉ đường phố')} 
                      {...field}
                      className="w-full" 
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        {t('City', 'Thành Phố')} <span className="text-red-500">*</span>
                      </FormLabel>
                      <Input 
                        placeholder={t('City', 'Thành phố')} 
                        {...field} 
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        {t('State', 'Tiểu Bang')} <span className="text-red-500">*</span>
                      </FormLabel>
                      <Input 
                        placeholder={t('State', 'Tiểu bang')} 
                        {...field} 
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        {t('ZIP Code', 'Mã ZIP')}
                      </FormLabel>
                      <Input 
                        placeholder={t('ZIP code', 'Mã ZIP')} 
                        {...field} 
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          
          {/* Compensation Section */}
          <div className="mt-8 mb-6">
            <h3 className="text-lg font-medium mb-4">{t('Compensation', 'Thù Lao')}</h3>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="compensation_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      {t('Compensation Type', 'Loại Thù Lao')} <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('Select compensation type', 'Chọn loại thù lao')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">{t('Hourly', 'Theo giờ')}</SelectItem>
                        <SelectItem value="commission">{t('Commission', 'Hoa hồng')}</SelectItem>
                        <SelectItem value="salary">{t('Salary', 'Lương')}</SelectItem>
                        <SelectItem value="mixed">{t('Mixed (Salary + Commission)', 'Hỗn hợp (Lương + Hoa hồng)')}</SelectItem>
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
                    <FormLabel className="text-base font-medium">
                      {t('Compensation Details', 'Chi Tiết Thù Lao')} <span className="text-red-500">*</span>
                    </FormLabel>
                    <Input 
                      placeholder={t('e.g. $25-35/hr or 60% commission', 'VD: $25-35/giờ hoặc 60% hoa hồng')} 
                      {...field} 
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tip_range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      {t('Expected Tip Range (Optional)', 'Phạm Vi Tiền Tip Dự Kiến (Không bắt buộc)')}
                    </FormLabel>
                    <Input 
                      placeholder={t('e.g. $100-200/day', 'VD: $100-200/ngày')} 
                      {...field} 
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="weekly_pay"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 mt-1"
                    />
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-base">
                        {t('Weekly Pay Available', 'Trả Lương Hàng Tuần')}
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        {t('Check this if you offer weekly payment options', 'Chọn nếu bạn cung cấp lựa chọn trả lương hàng tuần')}
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Experience Section */}
          <div className="mt-8 mb-6">
            <FormField
              control={form.control}
              name="years_experience_required"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    {t('Years of Experience Required', 'Số Năm Kinh Nghiệm Yêu Cầu')}
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('Select years', 'Chọn số năm')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">{t('No experience required', 'Không yêu cầu kinh nghiệm')}</SelectItem>
                      <SelectItem value="1">{t('1+ year', '1+ năm')}</SelectItem>
                      <SelectItem value="2">{t('2+ years', '2+ năm')}</SelectItem>
                      <SelectItem value="3">{t('3+ years', '3+ năm')}</SelectItem>
                      <SelectItem value="5">{t('5+ years', '5+ năm')}</SelectItem>
                      <SelectItem value="7">{t('7+ years', '7+ năm')}</SelectItem>
                      <SelectItem value="10">{t('10+ years', '10+ năm')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Job Summary Field */}
          <div className="mt-8 mb-6">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    {t('Job Summary', 'Tóm Tắt Công Việc')} <span className="text-red-500">*</span>
                  </FormLabel>
                  <Textarea 
                    placeholder={t('Brief overview of the position (1-2 sentences)', 'Tổng quan ngắn gọn về vị trí (1-2 câu)')} 
                    {...field} 
                    className="w-full min-h-[100px]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Job Description Field */}
          <div className="mt-8 mb-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    {t('Job Description', 'Mô Tả Công Việc')} <span className="text-red-500">*</span>
                  </FormLabel>
                  <Textarea 
                    placeholder={t('Detailed job description, responsibilities, and requirements', 'Mô tả chi tiết công việc, trách nhiệm và yêu cầu')} 
                    {...field} 
                    className="w-full min-h-[200px]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Contact Information Section */}
          <div className="mt-10 bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h3 className="text-lg font-medium mb-6">{t('Contact Information', 'Thông Tin Liên Hệ')}</h3>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="contact_info.owner_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      {t('Contact Name', 'Tên Liên Hệ')} <span className="text-red-500">*</span>
                    </FormLabel>
                    <Input 
                      placeholder={t('Your name or business name', 'Tên của bạn hoặc tên doanh nghiệp')} 
                      {...field} 
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contact_info.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      {t('Phone Number', 'Số Điện Thoại')} <span className="text-red-500">*</span>
                    </FormLabel>
                    <Input 
                      placeholder={t('e.g. (555) 123-4567', 'VD: (555) 123-4567')} 
                      {...field} 
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contact_info.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      {t('Email Address', 'Địa Chỉ Email')} <span className="text-red-500">*</span>
                    </FormLabel>
                    <Input 
                      placeholder={t('e.g. youremail@example.com', 'VD: email@example.com')} 
                      {...field} 
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contact_info.zalo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      {t('Zalo (Optional)', 'Zalo (Không bắt buộc)')}
                    </FormLabel>
                    <Input 
                      placeholder={t('Your Zalo contact', 'Liên hệ Zalo của bạn')} 
                      {...field} 
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contact_info.notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      {t('Additional Contact Notes', 'Ghi Chú Liên Hệ Bổ Sung')}
                    </FormLabel>
                    <Textarea 
                      placeholder={t('Best time to contact, preferred method, etc.', 'Thời gian liên hệ tốt nhất, phương thức ưa thích, v.v.')} 
                      {...field} 
                      className="w-full min-h-[100px]"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Photo Upload Section */}
          <div className="mt-10 bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h3 className="text-lg font-medium mb-6">{t('Upload Photos', 'Tải Lên Hình Ảnh')}</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                {t('Upload photos of your salon or work environment. Photos help attract more candidates.', 
                   'Tải lên hình ảnh của tiệm hoặc môi trường làm việc của bạn. Hình ảnh giúp thu hút nhiều ứng viên hơn.')}
              </p>
              
              <Dropzone
                value={photoUploads}
                onChange={setPhotoUploads}
                maxFiles={5}
                maxSize={5 * 1024 * 1024} // 5MB
                accept={{
                  'image/*': ['.png', '.jpg', '.jpeg', '.gif']
                }}
              />
              
              {photoUploads.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    {t('Uploaded Photos:', 'Hình Ảnh Đã Tải Lên:')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {photoUploads.map((file, index) => (
                      <Badge key={index} variant="secondary" className="py-1 px-2">
                        {file.name} ({Math.round(file.size / 1024)}KB)
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="rounded-md bg-primary py-3 px-8 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {isSubmitting ? 
              t('Processing...', 'Đang xử lý...') : 
              t('Submit Job Posting', 'Đăng Tin Tuyển Dụng')}
          </button>
        </div>
      </form>
    </Form>
  );
};
