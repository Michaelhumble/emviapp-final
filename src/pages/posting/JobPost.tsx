
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';

const JobPost = () => {
  const { t } = useTranslation();

  // Placeholder function for form submission
  const handleSubmitJob = async (values: any, photoUploads: File[], pricingOptions: any) => {
    console.log('Submitting job:', { values, photoUploads, pricingOptions });
    // Actual submission logic will be implemented later
  };

  return (
    <Layout>
      <div className="container max-w-5xl py-12 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-playfair bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
              {t({
                english: 'Create Job Posting',
                vietnamese: 'Đăng Tin Tuyển Dụng'
              })}
            </h1>
            <p className="text-gray-600 mt-2">
              {t({
                english: 'Find your perfect employee in minutes',
                vietnamese: 'Tìm nhân viên lý tưởng của bạn trong vài phút'
              })}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                {t({
                  english: '~5 min to complete',
                  vietnamese: '~5 phút để hoàn thành'
                })}
              </span>
            </div>
          </div>
        </div>
        
        <Card className="border shadow-md rounded-xl bg-gradient-to-b from-white to-gray-50">
          <CardContent className="p-6 sm:p-8">
            <EnhancedJobForm onSubmit={handleSubmitJob} />
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="mb-1">
            {t({
              english: 'Need help? Contact our support team at support@emviapp.com',
              vietnamese: 'Cần trợ giúp? Liên hệ với đội ngũ hỗ trợ tại support@emviapp.com'
            })}
          </p>
          <p className="text-xs text-purple-500">
            {t({
              english: 'All job postings are reviewed within 24 hours',
              vietnamese: 'Tất cả các bài đăng việc làm được xem xét trong vòng 24 giờ'
            })}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default JobPost;
