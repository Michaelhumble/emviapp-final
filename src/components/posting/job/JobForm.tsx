
import React, { useState, useEffect } from 'react';
import { MobileButton } from '@/components/ui/mobile-button';
import { JobFormValues, IndustryType } from './jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import JobDetailsSection from '../sections/JobDetailsSection';
import CompensationSection from '../sections/CompensationSection';
import ContactInformationSection from '../sections/ContactInformationSection';
import { Job } from '@/types/job';
import { jobPostingTranslations } from '@/translations/jobPostingForm';
import JobTemplateSelector from './JobTemplateSelector';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { 
  Check, 
  Shield, 
  Clock, 
  ChevronRight, 
  EyeIcon, 
  ThumbsUp,
  Users,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface JobFormProps {
  onSubmit: (values: any) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
  initialValues?: JobFormValues;
}

export const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting,
  initialValues
}) => {
  const { t } = useTranslation();
  const commonTranslations = jobPostingTranslations.common;
  const [industryType, setIndustryType] = useState<IndustryType | ''>('');
  const [formProgress, setFormProgress] = useState(0);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [recentApplicationsCount, setRecentApplicationsCount] = useState(0);
  
  const [formState, setFormState] = useState({
    jobDetails: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      location: initialValues?.location || '',
      requirements: initialValues?.requirements || [],
      specialties: [],
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      no_supply_deduction: false,
      owner_will_train: false,
      industry: initialValues?.industry || '',
      experience_level: initialValues?.experience_level || 'experienced' as 'entry' | 'intermediate' | 'experienced' | 'senior',
    },
    compensation: {
      employment_type: initialValues?.jobType || 'full-time',
      compensation_type: '',
      compensation_details: initialValues?.compensation_details || '',
      salary_range: initialValues?.salary_range || '',
      tip_range: '',
      experience_level: initialValues?.experience_level || 'experienced' as 'entry' | 'intermediate' | 'experienced' | 'senior',
    },
    contact_info: {
      owner_name: '',
      phone: '',
      email: initialValues?.contactEmail || '',
      notes: '',
      zalo: '',
    },
  });

  // Set up random recent applications count for social proof
  useEffect(() => {
    const randomCount = Math.floor(Math.random() * 10) + 15; // 15-25 range
    setRecentApplicationsCount(randomCount);
    
    // Start a timer to simulate another applicant every few seconds
    const timer = setInterval(() => {
      setRecentApplicationsCount(prev => prev + 1);
    }, 45000); // 45 seconds
    
    return () => clearInterval(timer);
  }, []);
  
  // Calculate form completion progress
  useEffect(() => {
    let completedFields = 0;
    let totalRequiredFields = 6; // title, industry, location, experience_level, employment_type, contact_info.email
    
    // Job details
    if (formState.jobDetails.title) completedFields++;
    if (formState.jobDetails.industry) completedFields++;
    if (formState.jobDetails.location) completedFields++;
    if (formState.jobDetails.experience_level) completedFields++;
    
    // Compensation
    if (formState.compensation.employment_type) completedFields++;
    
    // Contact info
    if (formState.contact_info.email) completedFields++;
    
    // Calculate percentage
    const progress = Math.min(Math.round((completedFields / totalRequiredFields) * 100), 100);
    setFormProgress(progress);
  }, [formState]);
  
  const handleJobDetailsChange = (details: any) => {
    setFormState(prev => ({
      ...prev, 
      jobDetails: details
    }));
    
    // Update the industry type if it has been selected
    if (details.industry && details.industry !== industryType) {
      setIndustryType(details.industry);
    }
  };
  
  const handleCompensationChange = (compensation: any) => {
    setFormState(prev => ({ ...prev, compensation }));
  };
  
  const handleContactInfoChange = (contactInfo: Partial<Job['contact_info']>) => {
    setFormState(prev => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        ...contactInfo
      }
    }));
  };
  
  const handleTemplateSelection = (templateData: Partial<JobFormValues>) => {
    if (templateData.industry) {
      setIndustryType(templateData.industry as IndustryType);
    }
    
    // Update job details
    setFormState(prev => ({
      ...prev,
      jobDetails: {
        ...prev.jobDetails,
        title: templateData.title || prev.jobDetails.title,
        description: templateData.description || prev.jobDetails.description,
        industry: templateData.industry || prev.jobDetails.industry,
        requirements: templateData.requirements || prev.jobDetails.requirements,
        location: templateData.location || prev.jobDetails.location,
      },
      compensation: {
        ...prev.compensation,
        employment_type: templateData.jobType || prev.compensation.employment_type,
        salary_range: templateData.salary_range || prev.compensation.salary_range,
        experience_level: templateData.experience_level || prev.compensation.experience_level,
      }
    }));
    
    // Show success notification
    showTemplateAppliedNotification();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Merge form sections into a single object for submission
    const formData = {
      ...formState.jobDetails,
      ...formState.compensation,
      contact_info: formState.contact_info,
    };
    
    onSubmit(formData);
  };
  
  const showTemplateAppliedNotification = () => {
    // Create and append a temporary notification element
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-50 text-green-700 p-4 rounded-lg shadow-lg border border-green-100 flex items-center z-50 animate-in fade-in';
    
    // Add notification content
    notification.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
      <span>${t({
        english: "Template applied! All fields are filled. Continue to review.",
        vietnamese: "Đã áp dụng mẫu! Tất cả các trường đã được điền. Tiếp tục để xem xét."
      })}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
      notification.classList.add('animate-out', 'fade-out');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 4000);
  };
  
  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-10 bg-white rounded-lg relative">
      {/* Progress indicator */}
      <div className="sticky top-0 z-10 bg-white pt-2 pb-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">{t({
              english: "Job Completion",
              vietnamese: "Hoàn thành công việc"
            })}</span>
            <Badge variant={formProgress === 100 ? "default" : "outline"} className={formProgress === 100 ? "bg-green-600" : ""}>
              {formProgress === 100 ? (
                <><Check className="h-3 w-3 mr-1" /> {t({english: "Ready to publish", vietnamese: "Sẵn sàng đăng"})}</>
              ) : (
                <>{formProgress}%</>
              )}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 text-purple-500 mr-1" />
              <span>{t({
                english: "~3 min to complete",
                vietnamese: "~3 phút để hoàn thành"
              })}</span>
            </div>
            
            <div className="hidden sm:flex items-center text-xs text-gray-500">
              <Users className="h-3 w-3 text-blue-500 mr-1" />
              <span>{t({
                english: `${recentApplicationsCount} recent applicants`,
                vietnamese: `${recentApplicationsCount} ứng viên gần đây`
              })}</span>
            </div>
          </div>
        </div>
        <Progress value={formProgress} className="h-2" />
      </div>
      
      {/* Template Selector */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <JobTemplateSelector 
            selectedIndustry={industryType} 
            onSelectTemplate={handleTemplateSelection} 
          />
        </motion.div>
      </AnimatePresence>
      
      <div className="space-y-12">
        {/* Job Details Section */}
        <div className="relative">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <JobDetailsSection 
                details={formState.jobDetails}
                onChange={handleJobDetailsChange}
                photoUploads={photoUploads}
                setPhotoUploads={setPhotoUploads}
                industryType={industryType || undefined}
              />
            </CardContent>
          </Card>
          
          {/* Trust indicators */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <TrustIndicator 
              icon={<Shield className="h-4 w-4 text-green-600" />}
              title={t({
                english: "Privacy Protected",
                vietnamese: "Bảo vệ quyền riêng tư"
              })}
              description={t({
                english: "Your contact info is only shared with verified job seekers",
                vietnamese: "Thông tin liên hệ của bạn chỉ được chia sẻ với người tìm việc đã xác minh"
              })}
            />
            <TrustIndicator 
              icon={<Users className="h-4 w-4 text-blue-600" />}
              title={t({
                english: "Targeted Reach",
                vietnamese: "Tiếp cận có mục tiêu"
              })}
              description={t({
                english: "Your job reaches qualified professionals in your area",
                vietnamese: "Công việc của bạn tiếp cận các chuyên gia đủ điều kiện trong khu vực của bạn"
              })}
            />
            <TrustIndicator 
              icon={<ThumbsUp className="h-4 w-4 text-purple-600" />}
              title={t({
                english: "93% Success Rate",
                vietnamese: "Tỷ lệ thành công 93%"
              })}
              description={t({
                english: "Employers fill positions within 14 days on average",
                vietnamese: "Nhà tuyển dụng tuyển được vị trí trong vòng 14 ngày trung bình"
              })}
            />
          </div>
        </div>
        
        {/* Compensation Section */}
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <CompensationSection 
              details={formState.compensation}
              onChange={handleCompensationChange}
            />
          </CardContent>
        </Card>
        
        {/* Contact Information Section */}
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <ContactInformationSection 
              contactInfo={formState.contact_info}
              onChange={handleContactInfoChange}
            />
          </CardContent>
        </Card>
        
        {/* Advanced options toggle - only show if not already displayed */}
        {!showAdvancedOptions && (
          <div className="text-center">
            <Button
              type="button"
              variant="outline"
              onClick={toggleAdvancedOptions}
              className="text-sm"
            >
              <EyeIcon className="h-4 w-4 mr-2" />
              {t(commonTranslations.advancedOptions)}
            </Button>
          </div>
        )}
      </div>
      
      {/* Submit button section */}
      <div className="sticky bottom-0 left-0 right-0 bg-white pt-6 pb-2 px-4 border-t border-gray-100 z-10">
        <div className="flex justify-end">
          <MobileButton
            type="submit"
            size="lg"
            disabled={isSubmitting || formProgress < 100}
            className={`min-w-[180px] ${
              formProgress === 100 ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700' : 'bg-gray-300'
            } text-white font-medium`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t(commonTranslations.submitting)}
              </span>
            ) : (
              <span className="flex items-center">
                {formProgress === 100 && <Sparkles className="mr-2 h-4 w-4" />}
                {t(commonTranslations.continue)}
                <ChevronRight className="ml-1 h-4 w-4" />
              </span>
            )}
          </MobileButton>
        </div>
        
        {/* Show this warning if form is not complete */}
        {formProgress < 100 && (
          <p className="text-center text-xs text-amber-600 mt-2">
            {t({
              english: "Please fill in all required fields to continue",
              vietnamese: "Vui lòng điền vào tất cả các trường bắt buộc để tiếp tục"
            })}
          </p>
        )}
      </div>
    </form>
  );
};

// Trust indicator component for displaying social proof
const TrustIndicator = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex items-start p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
    <div className="flex-shrink-0 p-1.5 bg-gray-50 rounded-full">
      {icon}
    </div>
    <div className="ml-3">
      <h4 className="text-sm font-medium text-gray-900">{title}</h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

export default JobForm;
