
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
          : "Job posting created successfully!");
        
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
