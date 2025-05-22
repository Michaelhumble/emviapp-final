
import React from 'react';
import { JobFormValues } from '../job/jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface ReviewSectionProps {
  formValues: JobFormValues;
  onNext?: () => void;
  onPrevious?: () => void;
  isLastStep?: boolean;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  formValues,
  onNext,
  onPrevious,
  isLastStep = false
}) => {
  const { t } = useTranslation();

  // Format the compensation range
  const formatCompensationRange = () => {
    const min = formValues.compensationMin;
    const max = formValues.compensationMax;
    const type = formValues.compensation_type;
    
    if (!min && !max) return 'Not specified';
    
    let result = '';
    
    if (min) {
      result += formatCurrency(Number(min));
    }
    
    if (min && max) {
      result += ' - ';
    }
    
    if (max) {
      result += formatCurrency(Number(max));
    }
    
    if (type === 'hourly') {
      result += '/hour';
    } else if (type === 'salary') {
      result += '/year';
    }
    
    return result;
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">
          {t({
            english: 'Review Your Job Posting',
            vietnamese: 'Xem lại Bài đăng Công việc của Bạn'
          })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t({
            english: 'Review your job posting before submitting',
            vietnamese: 'Xem lại bài đăng công việc của bạn trước khi gửi'
          })}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">
            {t({
              english: 'Basic Information',
              vietnamese: 'Thông tin Cơ bản'
            })}
          </h3>
          
          <div className="mt-3 space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">
                {t({
                  english: 'Job Title',
                  vietnamese: 'Chức danh Công việc'
                })}
              </p>
              <p className="mt-1">{formValues.title || 'Not specified'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">
                {t({
                  english: 'Salon Name',
                  vietnamese: 'Tên Salon'
                })}
              </p>
              <p className="mt-1">{formValues.salonName || 'Not specified'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">
                {t({
                  english: 'Location',
                  vietnamese: 'Địa điểm'
                })}
              </p>
              <p className="mt-1">{formValues.location || 'Not specified'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">
                {t({
                  english: 'Employment Type',
                  vietnamese: 'Loại Hình Công việc'
                })}
              </p>
              <p className="mt-1">
                {formValues.jobType ? 
                  formValues.jobType.charAt(0).toUpperCase() + formValues.jobType.slice(1) : 
                  'Not specified'
                }
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">
                {t({
                  english: 'Experience Level',
                  vietnamese: 'Cấp độ Kinh nghiệm'
                })}
              </p>
              <p className="mt-1">
                {formValues.experience_level ? 
                  formValues.experience_level.charAt(0).toUpperCase() + formValues.experience_level.slice(1) : 
                  'Not specified'
                }
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium">
            {t({
              english: 'Compensation',
              vietnamese: 'Lương thưởng'
            })}
          </h3>
          
          <div className="mt-3 space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">
                {t({
                  english: 'Compensation Type',
                  vietnamese: 'Loại Lương'
                })}
              </p>
              <p className="mt-1">
                {formValues.compensation_type ? 
                  formValues.compensation_type.charAt(0).toUpperCase() + formValues.compensation_type.slice(1) : 
                  'Not specified'
                }
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">
                {t({
                  english: 'Compensation Range',
                  vietnamese: 'Phạm vi Lương'
                })}
              </p>
              <p className="mt-1">{formatCompensationRange()}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">
                {t({
                  english: 'Compensation Details',
                  vietnamese: 'Chi tiết Lương thưởng'
                })}
              </p>
              <p className="mt-1">{formValues.compensation_details || 'Not specified'}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium">
            {t({
              english: 'Job Details',
              vietnamese: 'Chi tiết Công việc'
            })}
          </h3>
          
          <div className="mt-3 space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">
                {t({
                  english: 'Description',
                  vietnamese: 'Mô tả'
                })}
              </p>
              <p className="mt-1 whitespace-pre-line">{formValues.description || 'Not specified'}</p>
            </div>
            
            {formValues.vietnameseDescription && (
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {t({
                    english: 'Vietnamese Description',
                    vietnamese: 'Mô tả tiếng Việt'
                  })}
                </p>
                <p className="mt-1 whitespace-pre-line">{formValues.vietnameseDescription}</p>
              </div>
            )}
            
            <div>
              <p className="text-sm font-medium text-gray-500">
                {t({
                  english: 'Job Features',
                  vietnamese: 'Tính năng Công việc'
                })}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {formValues.weekly_pay && (
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    <p className="text-sm">
                      {t({
                        english: 'Weekly Pay',
                        vietnamese: 'Lương Hàng Tuần'
                      })}
                    </p>
                  </div>
                )}
                
                {formValues.has_housing && (
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    <p className="text-sm">
                      {t({
                        english: 'Housing Provided',
                        vietnamese: 'Có Cung cấp Chỗ ở'
                      })}
                    </p>
                  </div>
                )}
                
                {formValues.owner_will_train && (
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    <p className="text-sm">
                      {t({
                        english: 'Owner Will Train',
                        vietnamese: 'Chủ sẽ Đào tạo'
                      })}
                    </p>
                  </div>
                )}
                
                {formValues.no_supply_deduction && (
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    <p className="text-sm">
                      {t({
                        english: 'No Supply Deduction',
                        vietnamese: 'Không Khấu trừ Chi phí Vật tư'
                      })}
                    </p>
                  </div>
                )}
                
                {formValues.has_wax_room && (
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    <p className="text-sm">
                      {t({
                        english: 'Wax Room Available',
                        vietnamese: 'Có Phòng Wax'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        {onPrevious && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
          >
            {t({
              english: 'Previous',
              vietnamese: 'Trước'
            })}
          </Button>
        )}
        
        {onNext && (
          <Button
            type="button"
            onClick={onNext}
            className="ml-auto"
          >
            {isLastStep ? 
              t({
                english: 'Submit',
                vietnamese: 'Gửi'
              }) : 
              t({
                english: 'Next',
                vietnamese: 'Tiếp theo'
              })
            }
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
