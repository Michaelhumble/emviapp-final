
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { JobForm } from "@/components/posting/job/JobForm";
import { JobFormValues } from "@/components/posting/job/jobFormSchema";
import PostWizardLayout from "@/components/posting/PostWizardLayout";
import { useJobPosting } from "@/hooks/jobs/useJobPosting";
import { useTranslation } from "@/hooks/useTranslation";
import { InfoCircle } from "@/components/posting/job/icons/InfoCircle";

const CreateJobPosting: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const { handleJobPost } = useJobPosting();
  const { t, isVietnamese } = useTranslation();
  
  const handleSubmit = async (values: JobFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would send data to an API
      console.log('Submitting job posting:', values);
      console.log('Photo uploads:', photoUploads);
      
      // Create job post
      const jobData = {
        ...values,
        status: 'pending',
        created_at: new Date().toISOString(),
      };
      
      // Call the job posting service
      const success = await handleJobPost(jobData);
      
      if (success) {
        // Show success message
        toast.success(isVietnamese 
          ? "Đăng tin tuyển dụng thành công!" 
          : "Your job posting is live! Let's find your perfect match.");
        
        // Navigate to next step (pricing or preview)
        navigate("/jobs/pricing");
      } else {
        throw new Error("Failed to create job posting");
      }
    } catch (error) {
      console.error('Error creating job posting:', error);
      toast.error(isVietnamese
        ? "Đã xảy ra lỗi khi tạo bài đăng việc làm. Vui lòng thử lại."
        : "There was an error creating your job posting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <Helmet>
        <title>{isVietnamese ? "Đăng Tin Tuyển Dụng | EmviApp" : "Create Job Posting | EmviApp"}</title>
        <meta 
          name="description" 
          content={isVietnamese 
            ? "Tạo bài đăng tuyển dụng đẹp để thu hút những nhân tài tốt nhất trong ngành làm đẹp."
            : "Create a beautiful job posting to attract the best talent in the beauty industry."} 
        />
      </Helmet>
      
      <PostWizardLayout>
        <div className="mb-10">
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-2">
              <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-medium shadow-sm">1</div>
              <div className="h-[2px] w-10 bg-gray-300 self-center"></div>
              <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-medium">2</div>
              <div className="h-[2px] w-10 bg-gray-300 self-center"></div>
              <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-medium">3</div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-700">{t({
                  english: "Quick Approval",
                  vietnamese: "Duyệt nhanh"
                })}</span>
              </div>
              <div className="h-4 w-[1px] bg-gray-300"></div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-700">{t({
                  english: "Cancel Anytime",
                  vietnamese: "Hủy bất cứ lúc nào"
                })}</span>
              </div>
              <div className="h-4 w-[1px] bg-gray-300"></div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-700">{t({
                  english: "24/7 Support",
                  vietnamese: "Hỗ trợ 24/7"
                })}</span>
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-left mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">{t({
              english: "Step 1: Create Your Job Post",
              vietnamese: "Bước 1: Tạo tin tuyển dụng của bạn"
            })}</h2>
            <p className="text-gray-600">{t({
              english: "Tell us about your job opportunity and reach qualified candidates",
              vietnamese: "Cho chúng tôi biết về cơ hội việc làm của bạn và tiếp cận những ứng viên có trình độ"
            })}</p>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 mb-6">
            <InfoCircle className="text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800">{t({
                english: "Tip: The more details you provide, the more qualified candidates you'll attract. Include salary range, benefits, and specific requirements.",
                vietnamese: "Mẹo: Bạn cung cấp càng nhiều chi tiết, bạn sẽ thu hút được nhiều ứng viên có trình độ hơn. Hãy đề cập đến mức lương, phúc lợi và các yêu cầu cụ thể."
              })}</p>
            </div>
          </div>
        </div>
        
        <JobForm 
          onSubmit={handleSubmit}
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
          isSubmitting={isSubmitting}
        />
      </PostWizardLayout>
    </Layout>
  );
};

export default CreateJobPosting;
