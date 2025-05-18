
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobPricingTier } from '@/utils/posting/types';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { useTranslation } from '@/hooks/useTranslation';

interface JobSummaryProps {
  jobData: {
    title?: string;
    description?: string;
    vietnamese_description?: string;
    location?: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    salary_range?: string;
    compensation_type?: string;
  };
  pricingTier: JobPricingTier;
  durationMonths: number;
}

const JobSummary: React.FC<JobSummaryProps> = ({
  jobData,
  pricingTier,
  durationMonths
}) => {
  const { t } = useTranslation();
  const selectedTier = jobPricingOptions.find(option => option.tier === pricingTier);
  
  return (
    <Card className="mb-6 border-[#e8e1d5] bg-[#fdfbf8] shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="font-playfair text-xl">
          {t({
            english: 'Job Post Summary',
            vietnamese: 'Tóm tắt bài đăng công việc'
          })}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-900">{jobData.title}</h3>
          <p className="text-sm text-gray-700 mt-1 line-clamp-2">{jobData.description}</p>
          
          {jobData.vietnamese_description && (
            <div className="mt-2 text-sm text-gray-600 border-l-2 border-[#e0d5c0] pl-3 italic">
              <p className="line-clamp-2">{jobData.vietnamese_description}</p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#e8e1d5]">
          <div>
            <p className="text-xs text-gray-500">
              {t({
                english: 'Location',
                vietnamese: 'Địa điểm'
              })}
            </p>
            <p className="text-sm font-medium">{jobData.location}</p>
          </div>
          
          {jobData.salary_range && (
            <div>
              <p className="text-xs text-gray-500">
                {t({
                  english: 'Compensation',
                  vietnamese: 'Lương'
                })}
              </p>
              <p className="text-sm font-medium">
                {jobData.salary_range}
                {jobData.compensation_type && ` (${jobData.compensation_type})`}
              </p>
            </div>
          )}
        </div>
        
        <div className="pt-3 border-t border-[#e8e1d5]">
          <h4 className="text-sm font-medium text-gray-900">
            {t({
              english: 'Contact Information',
              vietnamese: 'Thông tin liên hệ'
            })}
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            <div>
              <p className="text-xs text-gray-500">
                {t({
                  english: 'Contact Name',
                  vietnamese: 'Tên liên hệ'
                })}
              </p>
              <p className="text-sm">{jobData.contactName || '-'}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">
                {t({
                  english: 'Email',
                  vietnamese: 'Email'
                })}
              </p>
              <p className="text-sm">{jobData.contactEmail || '-'}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">
                {t({
                  english: 'Phone',
                  vietnamese: 'Điện thoại'
                })}
              </p>
              <p className="text-sm">{jobData.contactPhone || '-'}</p>
            </div>
          </div>
        </div>
        
        {pricingTier !== 'free' && (
          <div className="mt-4 pt-3 border-t border-[#e8e1d5] flex items-center">
            <div className={`
              w-3 h-3 rounded-full mr-2
              ${pricingTier === 'premium' ? 'bg-purple-500' : ''}
              ${pricingTier === 'gold' ? 'bg-amber-500' : ''}
              ${pricingTier === 'diamond' ? 'bg-blue-500' : ''}
              ${pricingTier === 'standard' ? 'bg-gray-500' : ''}
            `}></div>
            <p className="text-sm font-medium">
              {t({
                english: `Featured for ${durationMonths * 30} days with ${selectedTier?.name || ''} visibility`,
                vietnamese: `Nổi bật trong ${durationMonths * 30} ngày với khả năng hiển thị ${selectedTier?.name || ''}`
              })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobSummary;
