
import React from 'react';
import { JobFormValues } from './job/jobFormSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MobileButton } from '@/components/ui/mobile-button';
import { Edit, Share2, MapPin, FileText, Briefcase, Phone, Mail, Calendar } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface JobPreviewProps {
  jobData: JobFormValues;
  onEdit: (section?: string) => void;
  onPublish: () => void;
  isPublishing?: boolean;
}

const JobPreview: React.FC<JobPreviewProps> = ({
  jobData,
  onEdit,
  onPublish,
  isPublishing = false
}) => {
  const { t } = useTranslation();
  
  const sections = [
    {
      id: 'basics',
      title: t({ english: 'Basic Information', vietnamese: 'Thông tin cơ bản' }),
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-gray-500"><Briefcase size={18} /></div>
            <div>
              <h4 className="font-medium text-gray-900">
                {t({ english: 'Job Type', vietnamese: 'Loại công việc' })}
              </h4>
              <p>{jobData.jobType || '-'}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-1 text-gray-500"><MapPin size={18} /></div>
            <div>
              <h4 className="font-medium text-gray-900">
                {t({ english: 'Location', vietnamese: 'Địa điểm' })}
              </h4>
              <p>{jobData.location || '-'}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-1 text-gray-500"><Calendar size={18} /></div>
            <div>
              <h4 className="font-medium text-gray-900">
                {t({ english: 'Experience Level', vietnamese: 'Cấp độ kinh nghiệm' })}
              </h4>
              <p>{jobData.experience_level || '-'}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'description',
      title: t({ english: 'Job Description', vietnamese: 'Mô tả công việc' }),
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-gray-500"><FileText size={18} /></div>
            <div>
              <h4 className="font-medium text-gray-900">
                {t({ english: 'Description', vietnamese: 'Mô tả' })}
              </h4>
              <p className="whitespace-pre-wrap">{jobData.description || '-'}</p>
            </div>
          </div>
          
          {jobData.vietnameseDescription && (
            <div className="flex items-start gap-3 mt-6 pt-6 border-t">
              <div className="mt-1 text-gray-500"><FileText size={18} /></div>
              <div>
                <h4 className="font-medium text-gray-900">
                  {t({ english: 'Vietnamese Description', vietnamese: 'Mô tả Tiếng Việt' })}
                </h4>
                <p className="whitespace-pre-wrap">{jobData.vietnameseDescription}</p>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'contact',
      title: t({ english: 'Contact Information', vietnamese: 'Thông tin liên hệ' }),
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-gray-500"><Briefcase size={18} /></div>
            <div>
              <h4 className="font-medium text-gray-900">
                {t({ english: 'Salon Name', vietnamese: 'Tên Salon' })}
              </h4>
              <p>{jobData.salonName || '-'}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-1 text-gray-500"><Phone size={18} /></div>
            <div>
              <h4 className="font-medium text-gray-900">
                {t({ english: 'Phone', vietnamese: 'Số điện thoại' })}
              </h4>
              <p>{jobData.contactPhone || '-'}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-1 text-gray-500"><Mail size={18} /></div>
            <div>
              <h4 className="font-medium text-gray-900">
                {t({ english: 'Email', vietnamese: 'Email' })}
              </h4>
              <p>{jobData.contactEmail || '-'}</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>
            {t({ english: 'Job Post Preview', vietnamese: 'Xem trước tin tuyển dụng' })}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t({
              english: 'Review your job posting before publishing',
              vietnamese: 'Xem lại tin tuyển dụng trước khi đăng'
            })}
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{jobData.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{jobData.salonName}</p>
                </div>
                <button 
                  onClick={() => onEdit('title')} 
                  className="text-primary hover:text-primary/80"
                >
                  <Edit size={18} />
                </button>
              </div>
            </div>
            
            {sections.map((section) => (
              <div key={section.id} className="border-b pb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-lg">{section.title}</h3>
                  <button 
                    onClick={() => onEdit(section.id)} 
                    className="text-primary hover:text-primary/80"
                  >
                    <Edit size={18} />
                  </button>
                </div>
                {section.content}
              </div>
            ))}

            <div className="pt-4">
              <div className="flex flex-col gap-4">
                <MobileButton 
                  onClick={onPublish} 
                  disabled={isPublishing}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isPublishing ? 
                    t({ english: 'Publishing...', vietnamese: 'Đang đăng...' }) : 
                    t({ english: 'Publish Job', vietnamese: 'Đăng tin' })
                  }
                </MobileButton>
                
                <MobileButton 
                  onClick={() => onEdit()} 
                  variant="outline"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {t({
                    english: 'Edit Job Details',
                    vietnamese: 'Chỉnh sửa chi tiết công việc'
                  })}
                </MobileButton>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPreview;
