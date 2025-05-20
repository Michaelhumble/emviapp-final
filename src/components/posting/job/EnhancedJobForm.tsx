import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreatableMultiSelect } from '@/components/ui/creatable-multi-select';
import { specialtyOptions, requirementOptions } from '@/utils/posting/options';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { useTranslation } from '@/hooks/useTranslation';
import { JobTypes } from '@/components/posting/job/jobFormSchema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { ProgressBar } from '@/components/posting/job/ProgressBar';
import { PricingSection } from '@/components/posting/PricingSection';
import { PricingContext } from '@/context/pricing/PricingContext';
import { JobPricingOption } from '@/utils/posting/types';
import { useIsMobile } from '@/hooks/use-mobile';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: any) => Promise<boolean>;
  initialTemplate?: JobFormValues;
  onBack?: () => void;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
  onStepChange?: (step: number) => void;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  initialTemplate,
  onBack,
  isCustomTemplate,
  maxPhotos = 5,
  onStepChange,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { pricingOptions, setPricingOptions } = React.useContext(PricingContext);
  const [uploads, setUploads] = useState<File[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialTemplate || {
      title: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      jobType: '',
      compensation_type: '',
      compensation_details: '',
      salary_range: '',
      experience_level: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      contactZalo: '',
      salonName: '',
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
      specialties: [],
      requirements: [],
      templateType: '',
    },
    mode: 'onChange',
  });

  const { register, handleSubmit, formState: { errors, isValid }, watch, setValue } = form;

  const handlePhotoUpload = useCallback((files: File[]) => {
    setUploads(files);
  }, []);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      onStepChange?.(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      onStepChange?.(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      onBack?.();
    }
  };

  const salaryRange = watch('salary_range');
  const compensationType = watch('compensation_type');

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>{t({ english: 'Salon Details', vietnamese: 'Chi tiết về Salon' })}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="salonName">{t({ english: 'Salon Name', vietnamese: 'Tên Salon' })}</Label>
                <Input id="salonName" placeholder={t({ english: 'Enter salon name', vietnamese: 'Nhập tên salon' })} {...register('salonName', { required: 'Salon name is required' })} />
                {errors.salonName && (
                  <p className="text-red-500 text-sm">{errors.salonName.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactName">{t({ english: 'Contact Name', vietnamese: 'Tên Liên Hệ' })}</Label>
                <Input id="contactName" placeholder={t({ english: 'Enter contact name', vietnamese: 'Nhập tên liên hệ' })} {...register('contactName')} />
                {errors.contactName && (
                  <p className="text-red-500 text-sm">{errors.contactName.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactPhone">{t({ english: 'Contact Phone', vietnamese: 'Số Điện Thoại Liên Hệ' })}</Label>
                <Input id="contactPhone" placeholder={t({ english: 'Enter contact phone', vietnamese: 'Nhập số điện thoại liên hệ' })} {...register('contactPhone')} />
                {errors.contactPhone && (
                  <p className="text-red-500 text-sm">{errors.contactPhone.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactEmail">{t({ english: 'Contact Email', vietnamese: 'Email Liên Hệ' })}</Label>
                <Input id="contactEmail" type="email" placeholder={t({ english: 'Enter contact email', vietnamese: 'Nhập email liên hệ' })} {...register('contactEmail')} />
                {errors.contactEmail && (
                  <p className="text-red-500 text-sm">{errors.contactEmail.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">{t({ english: 'Location', vietnamese: 'Địa Điểm' })}</Label>
                <Input id="location" placeholder={t({ english: 'Enter location', vietnamese: 'Nhập địa điểm' })} {...register('location', { required: 'Location is required' })} />
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location.message}</p>
                )}
              </div>
            </CardContent>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>{t({ english: 'Job Details', vietnamese: 'Chi tiết Công việc' })}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">{t({ english: 'Job Title', vietnamese: 'Tiêu Đề Công Việc' })}</Label>
                <Input id="title" placeholder={t({ english: 'Enter job title', vietnamese: 'Nhập tiêu đề công việc' })} {...register('title', { required: 'Job title is required' })} />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="jobType">{t({ english: 'Job Type', vietnamese: 'Loại Công Việc' })}</Label>
                <Select onValueChange={(value) => setValue('jobType', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t({ english: 'Select a job type', vietnamese: 'Chọn loại công việc' })} />
                  </SelectTrigger>
                  <SelectContent>
                    {JobTypes.map((type) => (
                      <SelectItem key={type} value={type}>{t({ english: type, vietnamese: type })}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.jobType && (
                  <p className="text-red-500 text-sm">{errors.jobType.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="specialties">{t({ english: 'Specialties', vietnamese: 'Chuyên Môn' })}</Label>
                <CreatableMultiSelect
                  value={watch('specialties') || []}
                  onChange={(values) => setValue('specialties', values)}
                  placeholder={t({ english: 'Select specialties', vietnamese: 'Chọn chuyên môn' })}
                  options={specialtyOptions.map((option) => option.label)}
                />
                {errors.specialties && (
                  <p className="text-red-500 text-sm">{errors.specialties.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="compensation_type">{t({ english: 'Compensation Type', vietnamese: 'Loại Hình Trả Lương' })}</Label>
                <Input id="compensation_type" placeholder={t({ english: 'Enter compensation type', vietnamese: 'Nhập loại hình trả lương' })} {...register('compensation_type')} />
                {errors.compensation_type && (
                  <p className="text-red-500 text-sm">{errors.compensation_type.message}</p>
                )}
              </div>
              {compensationType && (
                <div className="grid gap-2">
                  <Label htmlFor="compensation_details">{t({ english: 'Compensation Details', vietnamese: 'Chi Tiết Về Lương' })}</Label>
                  <Input id="compensation_details" placeholder={t({ english: 'Enter compensation details', vietnamese: 'Nhập chi tiết về lương' })} {...register('compensation_details')} />
                  {errors.compensation_details && (
                    <p className="text-red-500 text-sm">{errors.compensation_details.message}</p>
                  )}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="salary_range">{t({ english: 'Salary Range', vietnamese: 'Mức Lương' })}</Label>
                <Input id="salary_range" placeholder={t({ english: 'Enter salary range', vietnamese: 'Nhập mức lương' })} {...register('salary_range')} />
                {errors.salary_range && (
                  <p className="text-red-500 text-sm">{errors.salary_range.message}</p>
                )}
              </div>
            </CardContent>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>{t({ english: 'More Details & Requirements', vietnamese: 'Thông Tin Chi Tiết & Yêu Cầu' })}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="description">{t({ english: 'Job Description (English)', vietnamese: 'Mô Tả Công Việc (Tiếng Anh)' })}</Label>
                <Textarea id="description" placeholder={t({ english: 'Enter job description in English', vietnamese: 'Nhập mô tả công việc bằng tiếng Anh' })} {...register('description', { required: 'Job description is required' })} />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vietnameseDescription">{t({ english: 'Job Description (Vietnamese)', vietnamese: 'Mô Tả Công Việc (Tiếng Việt)' })}</Label>
                <Textarea id="vietnameseDescription" placeholder={t({ english: 'Enter job description in Vietnamese', vietnamese: 'Nhập mô tả công việc bằng tiếng Việt' })} {...register('vietnameseDescription')} />
                {errors.vietnameseDescription && (
                  <p className="text-red-500 text-sm">{errors.vietnameseDescription.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="requirements">{t({ english: 'Requirements', vietnamese: 'Yêu Cầu' })}</Label>
                <CreatableMultiSelect
                  value={watch('requirements') || []}
                  onChange={(values) => setValue('requirements', values)}
                  placeholder={t({ english: 'Select requirements', vietnamese: 'Chọn yêu cầu' })}
                  options={requirementOptions.map((option) => option.label)}
                />
                {errors.requirements && (
                  <p className="text-red-500 text-sm">{errors.requirements.message}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="weekly_pay" {...register('weekly_pay')} className="peer h-5 w-5" />
                <Label htmlFor="weekly_pay" className="peer-data-[state=checked]:text-sky-500">
                  {t({ english: 'Weekly Pay', vietnamese: 'Trả Lương Hàng Tuần' })}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="has_housing" {...register('has_housing')} className="peer h-5 w-5" />
                <Label htmlFor="has_housing" className="peer-data-[state=checked]:text-sky-500">
                  {t({ english: 'Housing Provided', vietnamese: 'Cung Cấp Chỗ Ở' })}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="has_wax_room" {...register('has_wax_room')} className="peer h-5 w-5" />
                <Label htmlFor="has_wax_room" className="peer-data-[state=checked]:text-sky-500">
                  {t({ english: 'Wax Room Available', vietnamese: 'Phòng Wax Sẵn Có' })}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="owner_will_train" {...register('owner_will_train')} className="peer h-5 w-5" />
                <Label htmlFor="owner_will_train" className="peer-data-[state=checked]:text-sky-500">
                  {t({ english: 'Owner Will Train', vietnamese: 'Chủ Sẽ Đào Tạo' })}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="no_supply_deduction" {...register('no_supply_deduction')} className="peer h-5 w-5" />
                <Label htmlFor="no_supply_deduction" className="peer-data-[state=checked]:text-sky-500">
                  {t({ english: 'No Supply Deduction', vietnamese: 'Không Trừ Chi Phí Vật Tư' })}
                </Label>
              </div>
            </CardContent>
          </>
        );
      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle>{t({ english: 'Photos & Pricing', vietnamese: 'Hình Ảnh & Giá' })}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <PhotoUploader
                onChange={handlePhotoUpload}
                files={uploads}
                maxFiles={maxPhotos}
                accept="image/*"
              />
              <PricingSection />
            </CardContent>
          </>
        );
      default:
        return <div>{t({ english: 'Unknown step', vietnamese: 'Bước không xác định' })}</div>;
    }
  };

  const pricingTiers: JobPricingOption[] = [
    {
      id: 'standard',
      name: 'Standard',
      price: 99,
      description: 'Standard Job Listing',
      tier: 'standard',
      features: ['7-day listing', 'Basic visibility'],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 199,
      description: 'Premium Job Listing',
      tier: 'premium',
      features: ['14-day listing', 'Featured visibility', 'Priority placement'],
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 299,
      description: 'Gold Job Listing',
      tier: 'gold',
      features: ['30-day listing', 'Top visibility', 'Social promotion', 'Priority support'],
    },
  ];

  const handleSubmitForm = async (data: JobFormValues) => {
    if (!isValid) {
      toast({
        title: t({ english: 'Error', vietnamese: 'Lỗi' }),
        description: t({ english: 'Please fill in all required fields.', vietnamese: 'Vui lòng điền đầy đủ các trường bắt buộc.' }),
      });
      return;
    }

    if (uploads.length > maxPhotos) {
      toast({
        title: t({ english: 'Error', vietnamese: 'Lỗi' }),
        description: t({ english: `You can only upload up to ${maxPhotos} photos.`, vietnamese: `Bạn chỉ có thể tải lên tối đa ${maxPhotos} ảnh.` }),
      });
      return;
    }

    if (!pricingOptions) {
      toast({
        title: t({ english: 'Error', vietnamese: 'Lỗi' }),
        description: t({ english: 'Please select a pricing option.', vietnamese: 'Vui lòng chọn một tùy chọn giá.' }),
      });
      return;
    }

    const success = await onSubmit(data, uploads, pricingOptions);
    if (success) {
      toast({
        title: t({ english: 'Success', vietnamese: 'Thành công' }),
        description: t({ english: 'Job post created successfully!', vietnamese: 'Bài đăng công việc đã được tạo thành công!' }),
      });
    } else {
      toast({
        title: t({ english: 'Error', vietnamese: 'Lỗi' }),
        description: t({ english: 'Failed to create job post. Please try again.', vietnamese: 'Không thể tạo bài đăng công việc. Vui lòng thử lại.' }),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      {renderStepContent()}
      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>
          {currentStep === 1 ? t({ english: 'Back to Templates', vietnamese: 'Quay lại Mẫu' }) : t({ english: 'Previous', vietnamese: 'Trước' })}
        </Button>
        {currentStep < totalSteps ? (
          <Button onClick={nextStep} disabled={!isValid}>
            {t({ english: 'Next', vietnamese: 'Tiếp theo' })}
          </Button>
        ) : (
          <Button type="submit" disabled={!isValid}>
            {t({ english: 'Submit', vietnamese: 'Gửi' })}
          </Button>
        )}
      </div>
    </form>
  );
};

export default EnhancedJobForm;
