
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/hooks/useTranslation';
import { Switch } from '@/components/ui/switch';
import { JobFormValues } from './jobFormSchema';
import { IndustryType } from '@/utils/posting/types';
import { CreatableMultiSelect } from '@/components/ui/creatable-multi-select';

interface JobFormProps {
  onSubmit: (formData: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  initialValues?: JobFormValues;
  onBack?: () => void;
  showVietnameseByDefault?: boolean;
}

const JobForm = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting, 
  initialValues,
  onBack,
  showVietnameseByDefault = false 
}: JobFormProps) => {
  const { t } = useTranslation();
  const [showVietnameseDescription, setShowVietnameseDescription] = useState(showVietnameseByDefault);
  const [industry, setIndustry] = useState<IndustryType>('nails');

  const { register, handleSubmit, control, formState: { errors } } = useForm<JobFormValues>({
    defaultValues: initialValues || {
      title: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      compensation_details: '',
      salary_range: '',
      jobType: 'full-time',
      experience_level: 'experienced',
      contactEmail: '',
      requirements: [],
      specialties: []
    }
  });

  const handleFormSubmit = (data: JobFormValues) => {
    onSubmit(data);
  };

  const specialtyOptions = {
    nails: ['Acrylic', 'Gel', 'Dip Powder', 'Nail Art', 'Pedicure', 'Manicure'],
    hair: ['Cutting', 'Coloring', 'Styling', 'Extensions', 'Balayage', 'Treatments'],
    lashes: ['Classic Lashes', 'Volume Lashes', 'Hybrid Lashes', 'Lash Lifts', 'Tinting'],
    brows: ['Microblading', 'Tinting', 'Lamination', 'Threading', 'Waxing'],
    massage: ['Swedish', 'Deep Tissue', 'Hot Stone', 'Sports', 'Thai', 'Reflexology'],
    skincare: ['Facials', 'Chemical Peels', 'Microdermabrasion', 'Waxing', 'Body Treatments'],
    makeup: ['Bridal', 'Editorial', 'SFX', 'Airbrush', 'Everyday'],
    barber: ['Haircuts', 'Fades', 'Beard Trims', 'Hot Towel Shaves', 'Line Ups'],
    tattoo: ['Traditional', 'Realism', 'Watercolor', 'Black & Grey', 'Japanese']
  };

  const commonRequirements = [
    'License required', 'Experience needed', 
    'English speaking', 'Vietnamese speaking', 
    'Client base preferred', 'Transportation required',
    'Weekends required', 'Full-time availability'
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-6">
          {t({
            english: 'Customize Job Details',
            vietnamese: 'Tùy Chỉnh Chi Tiết Công Việc'
          })}
        </h3>
        
        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                {t({
                  english: 'Job Title',
                  vietnamese: 'Chức Danh Công Việc'
                })}
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input 
                id="title"
                placeholder="e.g. Experienced Nail Technician"
                {...register('title', { required: true })}
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">
                  {t({
                    english: 'Job title is required',
                    vietnamese: 'Yêu cầu tiêu đề công việc'
                  })}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">
                {t({
                  english: 'Location',
                  vietnamese: 'Địa Điểm'
                })}
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input 
                id="location"
                placeholder="e.g. San Jose, CA"
                {...register('location', { required: true })}
                className={errors.location ? 'border-red-500' : ''}
              />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {t({
                    english: 'Location is required',
                    vietnamese: 'Yêu cầu địa điểm'
                  })}
                </p>
              )}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobType">
                {t({
                  english: 'Job Type',
                  vietnamese: 'Loại Công Việc'
                })}
              </Label>
              <select
                id="jobType"
                {...register('jobType')}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="contract">Contract</option>
                <option value="temporary">Temporary</option>
                <option value="commission">Commission</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience_level">
                {t({
                  english: 'Experience Level',
                  vietnamese: 'Mức Độ Kinh Nghiệm'
                })}
              </Label>
              <select
                id="experience_level"
                {...register('experience_level')}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="entry">Entry Level</option>
                <option value="intermediate">Intermediate</option>
                <option value="experienced">Experienced</option>
                <option value="senior">Senior</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">
              {t({
                english: 'Job Description',
                vietnamese: 'Mô Tả Công Việc'
              })}
            </Label>
            <Textarea 
              id="description"
              placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
              {...register('description')}
              rows={5}
              className="min-h-[150px]"
            />
          </div>
          
          {/* Vietnamese Description Toggle & Field */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Switch 
                checked={showVietnameseDescription}
                onCheckedChange={setShowVietnameseDescription}
                id="vietnamese-toggle"
              />
              <Label htmlFor="vietnamese-toggle" className="cursor-pointer">
                {t({
                  english: 'Add Vietnamese Description',
                  vietnamese: 'Thêm Mô Tả Tiếng Việt'
                })}
              </Label>
            </div>
            
            {showVietnameseDescription && (
              <div className="space-y-2">
                <Textarea 
                  id="vietnameseDescription"
                  placeholder="Mô tả công việc bằng tiếng Việt..."
                  {...register('vietnameseDescription')}
                  rows={5}
                  className="min-h-[150px]"
                />
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="compensation_details">
                {t({
                  english: 'Compensation Details',
                  vietnamese: 'Chi Tiết Lương Thưởng'
                })}
              </Label>
              <Input 
                id="compensation_details"
                placeholder="e.g. $20-25/hr plus tips"
                {...register('compensation_details')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactEmail">
                {t({
                  english: 'Contact Email',
                  vietnamese: 'Email Liên Hệ'
                })}
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input 
                id="contactEmail"
                type="email"
                placeholder="e.g. hiring@salon.com"
                {...register('contactEmail', { required: true })}
                className={errors.contactEmail ? 'border-red-500' : ''}
              />
              {errors.contactEmail && (
                <p className="text-red-500 text-sm">
                  {t({
                    english: 'Contact email is required',
                    vietnamese: 'Yêu cầu email liên hệ'
                  })}
                </p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>
              {t({
                english: 'Required Skills/Qualifications',
                vietnamese: 'Kỹ Năng/Trình Độ Yêu Cầu'
              })}
            </Label>
            <Controller
              control={control}
              name="requirements"
              render={({ field }) => (
                <CreatableMultiSelect
                  value={field.value || []}
                  onChange={field.onChange}
                  options={commonRequirements}
                  placeholder="Add requirements..."
                  className="w-full"
                />
              )}
            />
          </div>
          
          <div className="space-y-2">
            <Label>
              {t({
                english: 'Specialties',
                vietnamese: 'Chuyên Môn'
              })}
            </Label>
            <Controller
              control={control}
              name="specialties"
              render={({ field }) => (
                <CreatableMultiSelect
                  value={field.value || []}
                  onChange={field.onChange}
                  options={specialtyOptions[industry] || []}
                  placeholder="Add specialties..."
                  className="w-full"
                />
              )}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        {onBack && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            disabled={isSubmitting}
          >
            {t({
              english: 'Back',
              vietnamese: 'Quay Lại'
            })}
          </Button>
        )}
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="ml-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
        >
          {t({
            english: 'Continue to Review',
            vietnamese: 'Tiếp Tục Để Xem Xét'
          })}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
