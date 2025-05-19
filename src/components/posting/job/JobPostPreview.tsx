
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JobFormValues } from './jobFormSchema';
import { JobSpecialties } from '@/components/jobs/card-sections/JobSpecialties';
import { ChevronLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/hooks/useTranslation';

interface JobPostPreviewProps {
  jobData: JobFormValues | null;
  photoUploads?: File[];
  onBack: () => void;
}

export const JobPostPreview: React.FC<JobPostPreviewProps> = ({ 
  jobData, 
  photoUploads = [], 
  onBack 
}) => {
  const { t } = useTranslation();
  
  // If jobData is null, return null or a placeholder
  if (!jobData) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">
              {t({
                english: "No job data to preview",
                vietnamese: "Không có dữ liệu công việc để xem trước"
              })}
            </p>
            <Button onClick={onBack} className="mt-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> 
              {t({english: "Go Back", vietnamese: "Quay lại"})}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Ensure requirements and specialties are arrays
  const safeRequirements = Array.isArray(jobData.requirements) ? jobData.requirements : [];
  const safeSpecialties = Array.isArray(jobData.specialties) ? jobData.specialties : [];
  
  return (
    <Card className="w-full border-2 border-purple-100">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          {/* Job Title & Basic Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {jobData.title}
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                {jobData.jobType || t({english: 'Full-time', vietnamese: 'Toàn thời gian'})}
              </span>
              {jobData.experience_level && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {jobData.experience_level}
                </span>
              )}
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                {jobData.location}
              </span>
            </div>
          </div>
          
          {/* Photo Gallery Preview */}
          {photoUploads.length > 0 && (
            <div className="w-full">
              <h4 className="text-sm font-medium mb-2">
                {t({english: "Job Photos:", vietnamese: "Hình ảnh công việc:"})}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {photoUploads.map((photo, index) => (
                  <div key={index} className="aspect-square rounded-md overflow-hidden border border-gray-200">
                    <img 
                      src={URL.createObjectURL(photo)} 
                      alt={`Job photo ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Job Description */}
          <div>
            <h4 className="text-sm font-medium mb-1">
              {t({english: "Description:", vietnamese: "Mô tả:"})}
            </h4>
            <p className="text-gray-700 text-sm whitespace-pre-wrap">
              {jobData.description}
            </p>
          </div>
          
          {/* Vietnamese Description (if available) */}
          {jobData.vietnameseDescription && (
            <div>
              <h4 className="text-sm font-medium mb-1">
                {t({english: "Vietnamese Description:", vietnamese: "Mô tả tiếng Việt:"})}
              </h4>
              <p className="text-gray-700 text-sm whitespace-pre-wrap">
                {jobData.vietnameseDescription}
              </p>
            </div>
          )}
          
          {/* Requirements (if available) */}
          {safeRequirements.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">
                {t({english: "Requirements:", vietnamese: "Yêu cầu:"})}
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {safeRequirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Specialties */}
          {safeSpecialties.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">
                {t({english: "Specialties:", vietnamese: "Chuyên môn:"})}
              </h4>
              <JobSpecialties specialties={safeSpecialties} />
            </div>
          )}
          
          {/* Compensation Information (if available) */}
          {(jobData.salary_range || jobData.compensation_details) && (
            <div>
              <h4 className="text-sm font-medium mb-1">
                {t({english: "Compensation:", vietnamese: "Thù lao:"})}
              </h4>
              {jobData.salary_range && (
                <p className="text-sm text-gray-700">
                  <strong>{t({english: "Salary Range:", vietnamese: "Khoảng lương:"})} </strong>
                  {jobData.salary_range}
                </p>
              )}
              {jobData.compensation_details && (
                <p className="text-sm text-gray-700">
                  <strong>{t({english: "Compensation Details:", vietnamese: "Chi tiết thù lao:"})} </strong>
                  {jobData.compensation_details}
                </p>
              )}
            </div>
          )}
          
          {/* Contact Information */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium mb-2">
              {t({english: "Contact Information:", vietnamese: "Thông tin liên hệ:"})}
            </h4>
            <div className="text-sm text-gray-700">
              {jobData.contactName && (
                <p>
                  <strong>{t({english: "Name:", vietnamese: "Tên:"})} </strong>
                  {jobData.contactName}
                </p>
              )}
              <p>
                <strong>{t({english: "Email:", vietnamese: "Email:"})} </strong>
                {jobData.contactEmail}
              </p>
              {jobData.contactPhone && (
                <p>
                  <strong>{t({english: "Phone:", vietnamese: "Điện thoại:"})} </strong>
                  {jobData.contactPhone}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
