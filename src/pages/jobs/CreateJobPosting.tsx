
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { JobForm } from "@/components/posting/job/JobForm";
import { JobFormValues } from "@/components/posting/job/jobFormSchema";
import EnhancedJobForm from "@/components/posting/job/EnhancedJobForm";

const CreateJobPosting: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  
  const handleSubmit = async (values: JobFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would send data to an API
      console.log('Submitting job posting:', values);
      console.log('Photo uploads:', photoUploads);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast.success("Job posting created successfully!");
      
      // Navigate to next step (pricing or preview)
      navigate("/jobs/pricing");
    } catch (error) {
      console.error('Error creating job posting:', error);
      toast.error("There was an error creating your job posting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Create Job Posting | EmviApp</title>
        <meta 
          name="description" 
          content="Create a beautiful job posting to attract the best talent in the beauty industry." 
        />
      </Helmet>
      
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
        <JobForm 
          onSubmit={handleSubmit}
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
          isSubmitting={isSubmitting}
        />
      </div>
    </Layout>
  );
};

export default CreateJobPosting;
