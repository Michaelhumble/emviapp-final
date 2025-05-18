
import React, { useState, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, ArrowLeftIcon, ArrowRightIcon, Check } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import AIPolishButton from './AIPolishButton';
import CreatableMultiSelect from '@/components/ui/creatable-multi-select';
import { JobFormValues } from './jobFormSchema';
import { IndustryType } from '@/utils/posting/types';

interface JobFormProps {
  isSubmitting?: boolean;
  onSubmit: (data: any) => void;
  onBack?: () => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  initialValues?: JobFormValues;
  showVietnameseByDefault?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
  isSubmitting = false,
  onSubmit,
  onBack,
  photoUploads,
  setPhotoUploads,
  initialValues,
  showVietnameseByDefault = false
}) => {
  const { t, isVietnamese, toggleLanguage } = useTranslation();
  const [showVietnameseFields, setShowVietnameseFields] = useState(showVietnameseByDefault);
  const [isNailsIndustry, setIsNailsIndustry] = useState(false);

  // Use react-hook-form to handle form state
  const { register, handleSubmit, control, reset, watch, setValue, formState } = useForm<JobFormValues>({
    defaultValues: initialValues || {
      title: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      compensation_details: '',
      salary_range: '',
      jobType: 'full-time',
      experience_level: 'entry',
      contactEmail: '',
      requirements: [],
      specialties: []
    }
  });

  // Detect if this is a "nails" industry job
  useEffect(() => {
    if (initialValues) {
      const specialties = initialValues.specialties || [];
      const isNails = specialties.some(specialty => 
        specialty.toLowerCase().includes('acrylic') || 
        specialty.toLowerCase().includes('gel') || 
        specialty.toLowerCase().includes('nail') || 
        specialty.toLowerCase().includes('dipping')
      );
      
      setIsNailsIndustry(isNails);
      // Only show Vietnamese by default for nail industry jobs
      setShowVietnameseFields(isNails);
    }
  }, [initialValues]);

  const handleFormSubmit = (data: JobFormValues) => {
    // Pass the form data to the parent component
    onSubmit({
      ...data,
      photoUploads
    });
  };

  // Handle photo upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setPhotoUploads(prev => [...prev, files[0]]);
    }
  };

  // Remove uploaded photo
  const removePhoto = (index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  };

  // Memoize form fields for better performance
  const formFields = useMemo(() => {
    return (
      <div className="space-y-6 p-1">
        <div>
          <Label htmlFor="title" className="font-medium">
            {t({
              english: 'Job Title',
              vietnamese: 'Tiêu Đề Công Việc'
            })}
          </Label>
          <Input
            id="title"
            placeholder={t({
              english: 'e.g. Experienced Nail Technician',
              vietnamese: 'Ví dụ: Thợ Nail Có Kinh Nghiệm'
            })}
            className="mt-1"
            {...register('title', { required: true })}
          />
        </div>

        <div>
          <Label htmlFor="description" className="font-medium">
            {t({
              english: 'Job Description',
              vietnamese: 'Mô Tả Công Việc'
            })}
          </Label>
          <Textarea
            id="description"
            placeholder={t({
              english: 'Describe the job responsibilities, benefits, and ideal candidate',
              vietnamese: 'Mô tả trách nhiệm công việc, quyền lợi và ứng viên lý tưởng'
            })}
            className="mt-1 min-h-[150px]"
            {...register('description')}
          />
          <div className="flex justify-between mt-1">
            <AIPolishButton />
          </div>
        </div>

        {(isNailsIndustry || showVietnameseFields) && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="vietnameseDescription" className="font-medium">
                {t({
                  english: 'Vietnamese Description',
                  vietnamese: 'Mô Tả Bằng Tiếng Việt'
                })}
              </Label>
              <Switch
                checked={showVietnameseFields}
                onCheckedChange={setShowVietnameseFields}
                id="vietnamese-toggle"
              />
            </div>
            {showVietnameseFields && (
              <Textarea
                id="vietnameseDescription"
                placeholder={t({
                  english: 'Describe the job in Vietnamese for broader reach',
                  vietnamese: 'Mô tả công việc bằng tiếng Việt để tiếp cận nhiều ứng viên hơn'
                })}
                className="mt-1 min-h-[150px]"
                {...register('vietnameseDescription')}
              />
            )}
          </div>
        )}

        <div>
          <Label htmlFor="location" className="font-medium">
            {t({
              english: 'Location',
              vietnamese: 'Địa Điểm'
            })}
          </Label>
          <Input
            id="location"
            placeholder={t({
              english: 'e.g. San Jose, CA',
              vietnamese: 'Ví dụ: San Jose, CA'
            })}
            className="mt-1"
            {...register('location', { required: true })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="jobType" className="font-medium">
              {t({
                english: 'Job Type',
                vietnamese: 'Loại Công Việc'
              })}
            </Label>
            <Controller
              name="jobType"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={t({
                      english: 'Select job type',
                      vietnamese: 'Chọn loại công việc'
                    })} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">
                      {t({
                        english: 'Full-time',
                        vietnamese: 'Toàn thời gian'
                      })}
                    </SelectItem>
                    <SelectItem value="part-time">
                      {t({
                        english: 'Part-time',
                        vietnamese: 'Bán thời gian'
                      })}
                    </SelectItem>
                    <SelectItem value="contract">
                      {t({
                        english: 'Contract',
                        vietnamese: 'Hợp đồng'
                      })}
                    </SelectItem>
                    <SelectItem value="temporary">
                      {t({
                        english: 'Temporary',
                        vietnamese: 'Tạm thời'
                      })}
                    </SelectItem>
                    <SelectItem value="commission">
                      {t({
                        english: 'Commission',
                        vietnamese: 'Hoa hồng'
                      })}
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label htmlFor="experience_level" className="font-medium">
              {t({
                english: 'Experience Level',
                vietnamese: 'Cấp Độ Kinh Nghiệm'
              })}
            </Label>
            <Controller
              name="experience_level"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={t({
                      english: 'Select experience level',
                      vietnamese: 'Chọn cấp độ kinh nghiệm'
                    })} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">
                      {t({
                        english: 'Entry Level',
                        vietnamese: 'Mới Vào Nghề'
                      })}
                    </SelectItem>
                    <SelectItem value="intermediate">
                      {t({
                        english: 'Intermediate',
                        vietnamese: 'Trung Cấp'
                      })}
                    </SelectItem>
                    <SelectItem value="experienced">
                      {t({
                        english: 'Experienced',
                        vietnamese: 'Có Kinh Nghiệm'
                      })}
                    </SelectItem>
                    <SelectItem value="senior">
                      {t({
                        english: 'Senior',
                        vietnamese: 'Cao Cấp'
                      })}
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="compensation_details" className="font-medium">
              {t({
                english: 'Compensation Details',
                vietnamese: 'Chi Tiết Tiền Công'
              })}
            </Label>
            <Input
              id="compensation_details"
              placeholder={t({
                english: 'e.g. Weekly pay + tips',
                vietnamese: 'Ví dụ: Trả lương hàng tuần + tiền tip'
              })}
              className="mt-1"
              {...register('compensation_details')}
            />
          </div>

          <div>
            <Label htmlFor="salary_range" className="font-medium">
              {t({
                english: 'Salary/Income Range',
                vietnamese: 'Phạm Vi Lương/Thu Nhập'
              })}
            </Label>
            <Input
              id="salary_range"
              placeholder={t({
                english: 'e.g. $700-1200/week',
                vietnamese: 'Ví dụ: $700-1200/tuần'
              })}
              className="mt-1"
              {...register('salary_range')}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="contactEmail" className="font-medium">
            {t({
              english: 'Contact Email',
              vietnamese: 'Email Liên Hệ'
            })}
          </Label>
          <Input
            id="contactEmail"
            placeholder={t({
              english: 'e.g. hiring@yoursalon.com',
              vietnamese: 'Ví dụ: hiring@yoursalon.com'
            })}
            className="mt-1"
            {...register('contactEmail', { required: true })}
          />
        </div>

        <div>
          <Label className="font-medium">
            {t({
              english: 'Job Requirements',
              vietnamese: 'Yêu Cầu Công Việc'
            })}
          </Label>
          <div className="mt-1">
            <Controller
              name="requirements"
              control={control}
              render={({ field }) => (
                <CreatableMultiSelect
                  placeholder={t({
                    english: "Add job requirements...",
                    vietnamese: "Thêm yêu cầu công việc..."
                  })}
                  values={field.value || []}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <div>
          <Label className="font-medium">
            {t({
              english: 'Specialties',
              vietnamese: 'Chuyên Môn'
            })}
          </Label>
          <div className="mt-1">
            <Controller
              name="specialties"
              control={control}
              render={({ field }) => (
                <CreatableMultiSelect
                  placeholder={t({
                    english: "Add specialties or skills needed...",
                    vietnamese: "Thêm chuyên môn hoặc kỹ năng cần thiết..."
                  })}
                  values={field.value || []}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <div>
          <Label className="font-medium mb-2 block">
            {t({
              english: 'Job Photos (Optional)',
              vietnamese: 'Hình Ảnh Công Việc (Tùy Chọn)'
            })}
          </Label>
          <div className="mt-1 flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('photo-upload')?.click()}
              className="flex items-center gap-2"
            >
              {t({
                english: 'Upload Photo',
                vietnamese: 'Tải Lên Hình Ảnh'
              })}
            </Button>
            <input
              id="photo-upload"
              type="file"
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />
            
            <span className="text-sm text-gray-500">
              {photoUploads.length 
                ? t({
                    english: `${photoUploads.length} photo(s) selected`,
                    vietnamese: `Đã chọn ${photoUploads.length} ảnh`
                  })
                : t({
                    english: 'No photos selected',
                    vietnamese: 'Chưa chọn ảnh'
                  })
              }
            </span>
          </div>
          
          {photoUploads.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {photoUploads.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }, [
    register,
    control,
    t,
    photoUploads,
    showVietnameseFields,
    isNailsIndustry
  ]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 pb-4 border-b">
          <h2 className="text-2xl font-bold">{t({
            english: 'Customize Job Post',
            vietnamese: 'Tùy Chỉnh Bài Đăng Việc Làm'
          })}</h2>
          <p className="text-gray-600">{t({
            english: 'Provide details about the position',
            vietnamese: 'Cung cấp chi tiết về vị trí công việc'
          })}</p>
        </div>

        {formFields}

        <div className="flex justify-between mt-8">
          {onBack && (
            <Button 
              type="button" 
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              {t({
                english: 'Back',
                vietnamese: 'Quay Lại'
              })}
            </Button>
          )}

          <Button 
            type="submit" 
            className="ml-auto flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t({
                  english: 'Processing...',
                  vietnamese: 'Đang Xử Lý...'
                })}
              </>
            ) : (
              <>
                {t({
                  english: 'Continue to Pricing',
                  vietnamese: 'Tiếp Tục Đến Giá Cả'
                })}
                <ArrowRightIcon className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </form>
  );
};

export default JobForm;
