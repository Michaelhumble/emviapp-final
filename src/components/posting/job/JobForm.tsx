
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { JobFormValues } from './jobFormSchema';
import ContactInfoSection from '../sections/ContactInfoSection';
import EmploymentDetailsSection from '../sections/EmploymentDetailsSection';

interface JobFormProps {
  onSubmit: (data: any) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
  initialValues?: JobFormValues;
  onBack?: () => void;
  showVietnameseByDefault?: boolean;
}

export const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  initialValues,
  onBack,
  showVietnameseByDefault = false
}) => {
  const { t, isVietnamese } = useTranslation();
  const [showVietnameseField, setShowVietnameseField] = useState(showVietnameseByDefault || false);
  
  const form = useForm({
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      vietnameseDescription: initialValues?.vietnameseDescription || '',
      location: initialValues?.location || '',
      compensation_details: initialValues?.compensation_details || '',
      salary_range: initialValues?.salary_range || '',
      jobType: initialValues?.jobType || 'full-time',
      experience_level: initialValues?.experience_level || 'experienced',
      contactEmail: initialValues?.contactEmail || '',
      requirements: initialValues?.requirements?.join('\n') || '',
      specialties: initialValues?.specialties?.join('\n') || '',
    },
  });
  
  const handleFormSubmit = (data: any) => {
    // Convert requirements and specialties from string to array
    const processedData = {
      ...data,
      requirements: data.requirements.split('\n').filter((item: string) => item.trim() !== ''),
      specialties: data.specialties.split('\n').filter((item: string) => item.trim() !== ''),
    };
    
    onSubmit(processedData);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-playfair text-gray-900 mb-2">
          {t({
            english: 'Customize Your Job Posting',
            vietnamese: 'Tùy chỉnh Bài đăng Việc làm của Bạn'
          })}
        </h2>
        <p className="text-gray-600">
          {t({
            english: 'Perfect your job listing to attract the right candidates',
            vietnamese: 'Hoàn thiện danh sách công việc của bạn để thu hút các ứng viên phù hợp'
          })}
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    {t({
                      english: 'Job Title',
                      vietnamese: 'Chức danh Công việc'
                    })}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t({
                        english: 'E.g. Experienced Nail Technician',
                        vietnamese: 'Ví dụ: Thợ làm móng có Kinh nghiệm'
                      })} 
                      {...field}
                      className="h-12"
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
                  <FormLabel className="text-base font-medium">
                    {t({
                      english: 'Job Description',
                      vietnamese: 'Mô tả Công việc'
                    })}
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t({
                        english: 'Describe the position, responsibilities, and ideal candidate...',
                        vietnamese: 'Mô tả vị trí, trách nhiệm và ứng viên lý tưởng...'
                      })} 
                      {...field} 
                      className="min-h-[180px] resize-y"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {(showVietnameseField || initialValues?.vietnameseDescription) && (
              <FormField
                control={form.control}
                name="vietnameseDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex justify-between">
                      <span>
                        {t({
                          english: 'Vietnamese Description',
                          vietnamese: 'Mô tả bằng tiếng Việt'
                        })}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t({
                          english: 'Enter the job description in Vietnamese...',
                          vietnamese: 'Nhập mô tả công việc bằng tiếng Việt...'
                        })} 
                        {...field} 
                        className="min-h-[180px] resize-y"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {!showVietnameseField && !initialValues?.vietnameseDescription && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowVietnameseField(true)}
                className="w-full"
              >
                {t({
                  english: 'Add Vietnamese Description',
                  vietnamese: 'Thêm Mô tả tiếng Việt'
                })}
              </Button>
            )}
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    {t({
                      english: 'Location',
                      vietnamese: 'Vị trí'
                    })}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t({
                        english: 'E.g. Houston, TX',
                        vietnamese: 'Ví dụ: Houston, TX'
                      })} 
                      {...field}
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="compensation_details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      {t({
                        english: 'Compensation Details',
                        vietnamese: 'Chi tiết Thù lao'
                      })}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t({
                          english: 'E.g. Hourly + Commission + Tips',
                          vietnamese: 'Ví dụ: Theo giờ + Hoa hồng + Tiền boa'
                        })} 
                        {...field}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="salary_range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      {t({
                        english: 'Salary Range',
                        vietnamese: 'Phạm vi Lương'
                      })}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t({
                          english: 'E.g. $800-$1500 weekly',
                          vietnamese: 'Ví dụ: $800-$1500 mỗi tuần'
                        })} 
                        {...field}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <EmploymentDetailsSection form={form} />
            
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    {t({
                      english: 'Requirements (one per line)',
                      vietnamese: 'Yêu cầu (mỗi dòng một yêu cầu)'
                    })}
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t({
                        english: 'E.g.\nMinimum 2 years experience\nMust be licensed\nFluent in English',
                        vietnamese: 'Ví dụ:\nTối thiểu 2 năm kinh nghiệm\nPhải có giấy phép\nThông thạo tiếng Anh'
                      })} 
                      {...field} 
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="specialties"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    {t({
                      english: 'Specialties/Skills (one per line)',
                      vietnamese: 'Chuyên môn/Kỹ năng (mỗi dòng một kỹ năng)'
                    })}
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t({
                        english: 'E.g.\nAcrylics\nGel Polish\nNail Art',
                        vietnamese: 'Ví dụ:\nMóng acrylic\nSơn gel\nNail Art'
                      })} 
                      {...field} 
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <ContactInfoSection form={form} />
          </div>
          
          <div className="flex justify-between pt-4">
            {onBack ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t({
                  english: 'Back to Templates',
                  vietnamese: 'Quay lại Mẫu'
                })}
              </Button>
            ) : (
              <div />
            )}
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? t({
                english: 'Processing...',
                vietnamese: 'Đang xử lý...'
              }) : t({
                english: 'Continue to Review',
                vietnamese: 'Tiếp tục để Xem lại'
              })}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
