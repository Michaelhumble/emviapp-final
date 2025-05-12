
import React, { useState } from 'react';
import { JobForm } from './JobForm';
import { JobFormValues } from './jobFormSchema';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth'; 
import { useTranslation } from '@/hooks/useTranslation';
import JobPostingHeader from '../JobPostingHeader';
import UpsellSidebar from '../upsell/UpsellSidebar';
import MotivationalFooter from '../MotivationalFooter';
import SmartAdOptions from '../SmartAdOptions';
import WeeklyPaySuggestion from '../WeeklyPaySuggestion';

interface EnhancedJobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: JobFormValues;
  industry?: string;
}

export const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting,
  defaultValues,
  industry = "nails" // Default to nails
}) => {
  const { userProfile } = useAuth(); // Get user profile with contact details
  const { t, isVietnamese, toggleLanguage } = useTranslation();
  const [weeklyPay, setWeeklyPay] = useState(defaultValues?.weeklyPay || false);
  const [isNationwide, setIsNationwide] = useState(false);
  
  // Enhanced submit handler to include upsell options
  const handleSubmit = (values: JobFormValues) => {
    // Add upsell options to the submitted values
    const enhancedValues = {
      ...values,
      weeklyPay,
      pricingOptions: {
        isNationwide
      }
    };
    
    onSubmit(enhancedValues);
  };
  
  return (
    <div className="space-y-8">
      <JobPostingHeader 
        currentStep={1}
        totalSteps={2}
      />
      
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-gray-900 mb-3">
          {t("Let's Create a Beautiful Job Post Together 💅", "Hãy Cùng Tạo Một Bài Đăng Tuyển Tuyệt Đẹp 💅")}
        </h2>
        <p className="text-gray-600 text-lg">
          {t("It only takes a few minutes. Vietnamese included ❤️", "Chỉ mất vài phút. Có hỗ trợ tiếng Việt ❤️")}
        </p>
        
        {industry === "nails" && (
          <div className="mt-4 inline-flex items-center bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-full shadow-sm border border-purple-100">
            <span className="mr-2">🇺🇸 🇻🇳</span>
            <button
              onClick={toggleLanguage}
              className="text-sm text-purple-700 hover:text-purple-900 transition-colors"
            >
              {isVietnamese ? "Switch to English" : "Chuyển sang tiếng Việt"}
            </button>
          </div>
        )}
      </div>
      
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <JobForm 
              onSubmit={handleSubmit}
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              isSubmitting={isSubmitting}
              defaultValues={defaultValues}
              industry={industry}
              userProfile={userProfile} // Pass the user profile with contact info
            />
          </div>
          
          <div className="mt-6 space-y-6">
            <WeeklyPaySuggestion checked={weeklyPay} onChange={setWeeklyPay} />
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-medium mb-4">
                {t("Job Post Options", "Tuỳ chọn đăng tuyển")}
              </h3>
              <SmartAdOptions 
                postType="job"
                isFirstPost={!userProfile?.has_posted_job}
                hasReferrals={userProfile?.has_referral_credits}
                onNationwideChange={setIsNationwide}
              />
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block">
          <UpsellSidebar />
        </div>
      </div>
      
      {/* Mobile upsell will appear here via floating button */}
      <MobileUpsellButton />
      
      <div className="max-w-3xl mx-auto">
        <MotivationalFooter 
          icon="🫶"
          message="Artists check for new jobs every morning. Make yours the one they remember."
          subMessage="Post now — and let the best talent come to you."
        />
      </div>
      
      <p className="text-xs text-neutral-400 text-center mt-6">
        🌞 Inspired by Sunshine — we're here to help your salon grow, one great hire at a time.
      </p>
    </div>
  );
};

// Create mobile floating upsell button component
const MobileUpsellButton = () => {
  const [showButton, setShowButton] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState('basic'); // This would be connected to your actual state

  // Only show for Basic or Standard plans
  const shouldShow = selectedPlan === 'basic' || selectedPlan === 'standard';
  
  React.useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled 70% down the page
      const scrollPosition = window.scrollY;
      const pageHeight = document.body.scrollHeight - window.innerHeight;
      const scrollThreshold = pageHeight * 0.7;
      
      if (scrollPosition > scrollThreshold && shouldShow) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldShow]);

  if (!showButton) return null;
  
  return (
    <div className="fixed bottom-4 w-full px-4 md:hidden z-50">
      <button 
        className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-3 rounded-lg shadow-xl"
        onClick={() => console.log("Upgrade clicked")}
      >
        🔼 Boost My Post (+$5)
      </button>
    </div>
  );
};

export default EnhancedJobForm;
