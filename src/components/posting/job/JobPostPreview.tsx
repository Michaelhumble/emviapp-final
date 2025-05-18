
import React from 'react';
import { JobFormValues } from './jobFormSchema';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { JobPricingTier } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';

interface JobPostPreviewProps {
  jobData: JobFormValues | null;
  photoUploads: File[];
  onBack: () => void;
  pricingTier?: JobPricingTier;
}

export const JobPostPreview: React.FC<JobPostPreviewProps> = ({
  jobData,
  photoUploads,
  onBack,
  pricingTier = 'standard'
}) => {
  const { t } = useTranslation();
  
  if (!jobData) {
    return (
      <Card className="bg-gray-50">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">{t({english: "No job data to preview", vietnamese: "Không có dữ liệu công việc để xem trước"})}</p>
          <Button onClick={onBack} className="mt-4">
            {t({english: "Go Back", vietnamese: "Quay lại"})}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Get tier styling
  const getTierBadgeStyle = () => {
    switch (pricingTier) {
      case 'premium':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'gold':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'diamond':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'free':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Button
          size="sm"
          variant="ghost"
          onClick={onBack}
          className="absolute top-4 right-4 flex items-center z-10"
        >
          <Pencil className="h-4 w-4 mr-1" />
          {t({english: "Edit", vietnamese: "Chỉnh sửa"})}
        </Button>
      </div>

      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Pricing tier badge */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold line-clamp-2">{jobData.title}</h2>
            <Badge className={`ml-2 ${getTierBadgeStyle()}`}>
              {pricingTier.charAt(0).toUpperCase() + pricingTier.slice(1)}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2 text-sm text-gray-500">
            <span className="flex items-center">
              📍 {jobData.location}
            </span>
            {jobData.isUrgent && (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                {t({english: "Urgent", vietnamese: "Khẩn cấp"})}
              </Badge>
            )}
          </div>
          
          {/* Job Photos */}
          {photoUploads.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">{t({english: "Photos", vietnamese: "Hình ảnh"})}</h3>
              <div className="grid grid-cols-3 gap-2">
                {photoUploads.map((file, index) => (
                  <div key={index} className="aspect-square rounded-md overflow-hidden bg-gray-100">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`Job photo ${index+1}`}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Job description */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">{t({english: "Description", vietnamese: "Mô tả"})}</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{jobData.description}</p>
            
            {jobData.vietnameseDescription && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-700">{t({english: "Vietnamese Description", vietnamese: "Mô tả tiếng Việt"})}</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{jobData.vietnameseDescription}</p>
              </div>
            )}
          </div>
          
          {/* Job details */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">{t({english: "Job Details", vietnamese: "Chi tiết công việc"})}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {jobData.employmentType && (
                <div>
                  <span className="text-gray-500">{t({english: "Employment Type:", vietnamese: "Loại công việc:"})}</span>
                  <span className="ml-1 font-medium">{jobData.employmentType}</span>
                </div>
              )}
              
              {jobData.compensationType && (
                <div>
                  <span className="text-gray-500">{t({english: "Compensation Type:", vietnamese: "Loại thù lao:"})}</span>
                  <span className="ml-1 font-medium">{jobData.compensationType}</span>
                </div>
              )}
              
              {jobData.compensationDetails && (
                <div>
                  <span className="text-gray-500">{t({english: "Compensation Details:", vietnamese: "Chi tiết thù lao:"})}</span>
                  <span className="ml-1 font-medium">{jobData.compensationDetails}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Job requirements */}
          {jobData.requirements && jobData.requirements.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">{t({english: "Requirements", vietnamese: "Yêu cầu"})}</h3>
              <ul className="list-disc pl-5 space-y-1">
                {Array.isArray(jobData.requirements) 
                  ? jobData.requirements.map((req, index) => (
                      <li key={index} className="text-gray-600">{req}</li>
                    ))
                  : <li className="text-gray-600">{jobData.requirements}</li>
                }
              </ul>
            </div>
          )}
          
          {/* Specialties */}
          {jobData.specialties && jobData.specialties.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">{t({english: "Specialties", vietnamese: "Chuyên môn"})}</h3>
              <div className="flex flex-wrap gap-2">
                {jobData.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Perks */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">{t({english: "Perks & Benefits", vietnamese: "Đãi ngộ & Phúc lợi"})}</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              {jobData.weeklyPay && (
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> {t({english: "Weekly Pay", vietnamese: "Trả lương hàng tuần"})}
                </div>
              )}
              {jobData.hasHousing && (
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> {t({english: "Housing Available", vietnamese: "Có nhà ở"})}
                </div>
              )}
              {jobData.ownerWillTrain && (
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> {t({english: "Owner Will Train", vietnamese: "Chủ sẽ đào tạo"})}
                </div>
              )}
              {jobData.noSupplyDeduction && (
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> {t({english: "No Supply Deduction", vietnamese: "Không khấu trừ vật tư"})}
                </div>
              )}
            </div>
          </div>
          
          {/* Contact information */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">{t({english: "Contact Information", vietnamese: "Thông tin liên hệ"})}</h3>
            <div className="space-y-1 text-sm">
              <div className="flex items-start">
                <span className="text-gray-500 w-20">{t({english: "Email:", vietnamese: "Email:"})}</span>
                <span className="text-gray-800">{jobData.contactEmail}</span>
              </div>
              {jobData.contactPhone && (
                <div className="flex items-start">
                  <span className="text-gray-500 w-20">{t({english: "Phone:", vietnamese: "Điện thoại:"})}</span>
                  <span className="text-gray-800">{jobData.contactPhone}</span>
                </div>
              )}
              {jobData.contactName && (
                <div className="flex items-start">
                  <span className="text-gray-500 w-20">{t({english: "Name:", vietnamese: "Tên:"})}</span>
                  <span className="text-gray-800">{jobData.contactName}</span>
                </div>
              )}
              {jobData.contactZalo && (
                <div className="flex items-start">
                  <span className="text-gray-500 w-20">{t({english: "Zalo:", vietnamese: "Zalo:"})}</span>
                  <span className="text-gray-800">{jobData.contactZalo}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
