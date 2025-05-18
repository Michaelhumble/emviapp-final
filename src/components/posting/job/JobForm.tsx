import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import { FormField } from '@/components/ui/form';
import { JobFormValues } from './jobFormSchema';
import { Switch } from '@/components/ui/switch';
import { beautySpecialties, commonRequirements } from '@/data/specialties';
import { useTranslation } from '@/hooks/useTranslation';

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  initialValues?: JobFormValues;
  onBack?: () => void;
  showVietnameseByDefault?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting, 
  initialValues,
  onBack,
  showVietnameseByDefault = false
}) => {
  const { t, isVietnamese, toggleLanguage } = useTranslation();
  const [showVietnamese, setShowVietnamese] = useState(showVietnameseByDefault);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JobFormValues>({
    defaultValues: initialValues,
  });
  
  useEffect(() => {
    if (initialValues) {
      Object.keys(initialValues).forEach(key => {
        setValue(key as keyof JobFormValues, initialValues[key as keyof JobFormValues]);
      });
    }
  }, [initialValues, setValue]);
  
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setPhotoUploads(files);
  };
  
  const handleSpecialtiesChange = (selected: string[]) => {
    setValue('specialties', selected);
  };
  
  const handleRequirementsChange = (selected: string[]) => {
    setValue('requirements', selected);
  };
  
  const toggleVietnamese = () => {
    setShowVietnamese(!showVietnamese);
    toggleLanguage();
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Back Button */}
      {onBack && (
        <Button type="button" variant="ghost" onClick={onBack}>
          ← {t({
            english: 'Back to Template Selection',
            vietnamese: 'Quay lại chọn mẫu'
          })}
        </Button>
      )}
      
      {/* Title */}
      <div>
        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
          {t({
            english: 'Job Title',
            vietnamese: 'Tiêu đề công việc'
          })}
        </Label>
        <Input
          type="text"
          id="title"
          placeholder={t({
            english: 'e.g. Nail Technician',
            vietnamese: 'ví dụ: Kỹ thuật viên làm móng'
          })}
          className="mt-1 block w-full"
          {...register('title', { required: true })}
        />
        {errors.title && <p className="mt-2 text-sm text-red-600">{t({
          english: 'Job title is required',
          vietnamese: 'Yêu cầu tiêu đề công việc'
        })}</p>}
      </div>
      
      {/* Description */}
      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
            {t({
              english: 'Job Description',
              vietnamese: 'Mô tả công việc'
            })}
          </Label>
          <div className="flex items-center space-x-2">
            <Label htmlFor="showVietnamese" className="text-sm font-medium text-gray-700">
              {t({
                english: 'Vietnamese',
                vietnamese: 'Tiếng Việt'
              })}
            </Label>
            <Switch id="showVietnamese" checked={showVietnamese} onCheckedChange={toggleVietnamese} />
          </div>
        </div>
        
        {!showVietnamese ? (
          <Textarea
            id="description"
            rows={4}
            className="mt-1 block w-full resize-none"
            placeholder={t({
              english: 'Describe the job responsibilities and requirements',
              vietnamese: 'Mô tả trách nhiệm và yêu cầu công việc'
            })}
            {...register('description', { required: true })}
          />
        ) : (
          <Textarea
            id="vietnameseDescription"
            rows={4}
            className="mt-1 block w-full resize-none"
            placeholder={t({
              english: 'Describe the job responsibilities and requirements in Vietnamese',
              vietnamese: 'Mô tả trách nhiệm và yêu cầu công việc bằng tiếng Việt'
            })}
            {...register('vietnameseDescription')}
          />
        )}
        
        {errors.description && <p className="mt-2 text-sm text-red-600">{t({
          english: 'Job description is required',
          vietnamese: 'Yêu cầu mô tả công việc'
        })}</p>}
      </div>
      
      {/* Location */}
      <div>
        <Label htmlFor="location" className="block text-sm font-medium text-gray-700">
          {t({
            english: 'Location',
            vietnamese: 'Địa điểm'
          })}
        </Label>
        <Input
          type="text"
          id="location"
          placeholder={t({
            english: 'e.g. Ho Chi Minh City',
            vietnamese: 'ví dụ: Thành phố Hồ Chí Minh'
          })}
          className="mt-1 block w-full"
          {...register('location', { required: true })}
        />
        {errors.location && <p className="mt-2 text-sm text-red-600">{t({
          english: 'Location is required',
          vietnamese: 'Yêu cầu địa điểm'
        })}</p>}
      </div>
      
      {/* Compensation Details */}
      <div>
        <Label htmlFor="compensation_details" className="block text-sm font-medium text-gray-700">
          {t({
            english: 'Compensation Details',
            vietnamese: 'Chi tiết bồi thường'
          })}
        </Label>
        <Input
          type="text"
          id="compensation_details"
          placeholder={t({
            english: 'e.g. Competitive hourly rate + tips',
            vietnamese: 'ví dụ: Mức lương cạnh tranh theo giờ + tiền thưởng'
          })}
          className="mt-1 block w-full"
          {...register('compensation_details')}
        />
      </div>
      
      {/* Salary Range */}
      <div>
        <Label htmlFor="salary_range" className="block text-sm font-medium text-gray-700">
          {t({
            english: 'Salary Range',
            vietnamese: 'Khoảng lương'
          })}
        </Label>
        <Input
          type="text"
          id="salary_range"
          placeholder={t({
            english: 'e.g. $15 - $25 per hour',
            vietnamese: 'ví dụ: $15 - $25 mỗi giờ'
          })}
          className="mt-1 block w-full"
          {...register('salary_range')}
        />
      </div>
      
      {/* Job Type */}
      <div>
        <Label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
          {t({
            english: 'Job Type',
            vietnamese: 'Loại công việc'
          })}
        </Label>
        <Select onValueChange={(value) => setValue('jobType', value as JobFormValues['jobType'])}>
          <SelectTrigger className="mt-1 w-full">
            <SelectValue placeholder={t({
              english: 'Select a job type',
              vietnamese: 'Chọn một loại công việc'
            })} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">{t({
              english: 'Full-time',
              vietnamese: 'Toàn thời gian'
            })}</SelectItem>
            <SelectItem value="part-time">{t({
              english: 'Part-time',
              vietnamese: 'Bán thời gian'
            })}</SelectItem>
            <SelectItem value="contract">{t({
              english: 'Contract',
              vietnamese: 'Hợp đồng'
            })}</SelectItem>
            <SelectItem value="temporary">{t({
              english: 'Temporary',
              vietnamese: 'Tạm thời'
            })}</SelectItem>
            <SelectItem value="commission">{t({
              english: 'Commission',
              vietnamese: 'Hoa hồng'
            })}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Experience Level */}
      <div>
        <Label htmlFor="experience_level" className="block text-sm font-medium text-gray-700">
          {t({
            english: 'Experience Level',
            vietnamese: 'Cấp độ kinh nghiệm'
          })}
        </Label>
        <Select onValueChange={(value) => setValue('experience_level', value as JobFormValues['experience_level'])}>
          <SelectTrigger className="mt-1 w-full">
            <SelectValue placeholder={t({
              english: 'Select experience level',
              vietnamese: 'Chọn cấp độ kinh nghiệm'
            })} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="entry">{t({
              english: 'Entry Level',
              vietnamese: 'Mới vào nghề'
            })}</SelectItem>
            <SelectItem value="intermediate">{t({
              english: 'Intermediate',
              vietnamese: 'Trung cấp'
            })}</SelectItem>
            <SelectItem value="experienced">{t({
              english: 'Experienced',
              vietnamese: 'Có kinh nghiệm'
            })}</SelectItem>
            <SelectItem value="senior">{t({
              english: 'Senior',
              vietnamese: 'Cao cấp'
            })}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Contact Email */}
      <div>
        <Label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
          {t({
            english: 'Contact Email',
            vietnamese: 'Email liên hệ'
          })}
        </Label>
        <Input
          type="email"
          id="contactEmail"
          placeholder={t({
            english: 'e.g. hr@example.com',
            vietnamese: 'ví dụ: hr@example.com'
          })}
          className="mt-1 block w-full"
          {...register('contactEmail', {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        {errors.contactEmail && (
          <p className="mt-2 text-sm text-red-600">
            {errors.contactEmail.type === 'required'
              ? t({
                english: 'Contact email is required',
                vietnamese: 'Yêu cầu email liên hệ'
              })
              : t({
                english: 'Invalid email address',
                vietnamese: 'Địa chỉ email không hợp lệ'
              })}
          </p>
        )}
      </div>
      
      {/* Contact Name */}
      <div>
        <Label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
          {t({
            english: 'Contact Name',
            vietnamese: 'Tên liên hệ'
          })}
        </Label>
        <Input
          type="text"
          id="contactName"
          placeholder={t({
            english: 'e.g. John Smith',
            vietnamese: 'ví dụ: John Smith'
          })}
          className="mt-1 block w-full"
          {...register('contactName')}
        />
      </div>
      
      {/* Contact Phone */}
      <div>
        <Label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
          {t({
            english: 'Contact Phone',
            vietnamese: 'Điện thoại liên hệ'
          })}
        </Label>
        <Input
          type="tel"
          id="contactPhone"
          placeholder={t({
            english: 'e.g. 123-456-7890',
            vietnamese: 'ví dụ: 123-456-7890'
          })}
          className="mt-1 block w-full"
          {...register('contactPhone')}
        />
      </div>
      
      {/* Specialties */}
      <div>
        <Label htmlFor="specialties" className="block text-sm font-medium text-gray-700">
          {t({
            english: 'Specialties',
            vietnamese: 'Chuyên môn'
          })}
        </Label>
        <MultiSelect
          options={Object.values(beautySpecialties).flatMap(specialty => specialty)}
          onChange={handleSpecialtiesChange}
          placeholder={t({
            english: 'Select specialties',
            vietnamese: 'Chọn chuyên môn'
          })}
        />
      </div>
      
      {/* Requirements */}
      <div>
        <Label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
          {t({
            english: 'Requirements',
            vietnamese: 'Yêu cầu'
          })}
        </Label>
        <MultiSelect
          options={commonRequirements}
          onChange={handleRequirementsChange}
          placeholder={t({
            english: 'Select requirements',
            vietnamese: 'Chọn yêu cầu'
          })}
        />
      </div>
      
      {/* Photo Upload */}
      <div>
        <Label htmlFor="photoUpload" className="block text-sm font-medium text-gray-700">
          {t({
            english: 'Upload Photos',
            vietnamese: 'Tải ảnh lên'
          })}
        </Label>
        <Input
          type="file"
          id="photoUpload"
          multiple
          accept="image/*"
          className="mt-1 block w-full"
          onChange={handlePhotoUpload}
        />
        {photoUploads.length > 0 && (
          <div className="mt-2">
            {photoUploads.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="inline-block h-16 w-16 rounded-md object-cover mr-2"
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? t({
            english: 'Submitting...',
            vietnamese: 'Đang gửi...'
          })
          : t({
            english: 'Submit',
            vietnamese: 'Gửi'
          })}
      </Button>
    </form>
  );
};

export default JobForm;
