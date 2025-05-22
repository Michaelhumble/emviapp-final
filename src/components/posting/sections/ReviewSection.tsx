
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { JobFormValues } from '../job/jobFormSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReviewSectionProps {
  formData: JobFormValues;
  onSubmit?: () => void;
  onPrevious?: () => void;
  isSubmitting?: boolean;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  formData,
  onSubmit,
  onPrevious,
  isSubmitting = false
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">
          {t({
            english: 'Review Your Job Post',
            vietnamese: 'Xem lại Tin Tuyển dụng của bạn'
          })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t({
            english: 'Please review your job details before submitting',
            vietnamese: 'Vui lòng xem lại chi tiết công việc trước khi gửi'
          })}
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {t({
                english: 'Basic Information',
                vietnamese: 'Thông tin cơ bản'
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="font-medium text-muted-foreground">
                  {t({
                    english: 'Job Title',
                    vietnamese: 'Chức danh công việc'
                  })}
                </dt>
                <dd>{formData.title || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">
                  {t({
                    english: 'Salon Name',
                    vietnamese: 'Tên Salon'
                  })}
                </dt>
                <dd>{formData.salonName || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">
                  {t({
                    english: 'Location',
                    vietnamese: 'Địa điểm'
                  })}
                </dt>
                <dd>{formData.location || '-'}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {t({
                english: 'Job Details',
                vietnamese: 'Chi tiết Công việc'
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="font-medium text-muted-foreground">
                  {t({
                    english: 'Job Type',
                    vietnamese: 'Loại Công việc'
                  })}
                </dt>
                <dd className="capitalize">{formData.jobType || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">
                  {t({
                    english: 'Experience Level',
                    vietnamese: 'Mức Kinh nghiệm'
                  })}
                </dt>
                <dd className="capitalize">{formData.experienceLevel || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">
                  {t({
                    english: 'Description',
                    vietnamese: 'Mô tả'
                  })}
                </dt>
                <dd className="whitespace-pre-line">{formData.description || '-'}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {t({
                english: 'Compensation',
                vietnamese: 'Lương thưởng'
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="font-medium text-muted-foreground">
                  {t({
                    english: 'Compensation Type',
                    vietnamese: 'Loại Lương'
                  })}
                </dt>
                <dd className="capitalize">{formData.compensation_type || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">
                  {t({
                    english: 'Range',
                    vietnamese: 'Phạm vi'
                  })}
                </dt>
                <dd>
                  {formData.compensation_min && formData.compensation_max ? 
                    `$${formData.compensation_min} - $${formData.compensation_max}` : 
                    formData.compensation_min ? 
                      `$${formData.compensation_min}+` :
                      '-'
                  }
                </dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">
                  {t({
                    english: 'Additional Details',
                    vietnamese: 'Chi tiết Bổ sung'
                  })}
                </dt>
                <dd>{formData.compensation_details || '-'}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        {onPrevious && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            disabled={isSubmitting}
          >
            {t({
              english: 'Previous',
              vietnamese: 'Trước'
            })}
          </Button>
        )}
        
        {onSubmit && (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="ml-auto"
          >
            {isSubmitting ? 
              t({
                english: 'Submitting...',
                vietnamese: 'Đang gửi...'
              }) : 
              t({
                english: 'Submit Job Post',
                vietnamese: 'Gửi Tin Tuyển dụng'
              })
            }
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
