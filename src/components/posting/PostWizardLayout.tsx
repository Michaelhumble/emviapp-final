import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggle from '@/components/layout/LanguageToggle';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';
import MobilePostMenu from '@/components/posting/MobilePostMenu';
import { PricingProvider } from '@/context/pricing/PricingProvider';
import { PricingOptions } from '@/utils/posting/types';

interface PostWizardLayoutProps {
  children: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
}

const PostWizardLayout: React.FC<PostWizardLayoutProps> = ({ 
  children, 
  currentStep = 1, 
  totalSteps = 4 // Using 4 steps
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Default pricing options in case we need to provide a fallback PricingProvider
  const defaultPricingOptions: PricingOptions = {
    selectedPricingTier: 'premium',
    durationMonths: 1,
    autoRenew: true,
    isFirstPost: true,
    isNationwide: false
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Mobile navigation menu for posting flow */}
      <div className="fixed top-4 right-4 z-50">
        <MobilePostMenu />
      </div>
      
      <div className="container max-w-6xl py-8 px-4">
        {/* Progress tracking */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-gray-500">
              {t({
                english: `Step ${currentStep} of ${totalSteps}`,
                vietnamese: `Bước ${currentStep} / ${totalSteps}`
              })}
            </span>
            <span className="text-gray-500 font-medium">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-1.5 bg-gray-100"
            indicatorClassName="bg-purple-600" 
          />
        </div>
        
        <motion.div 
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-2xl md:text-4xl font-bold font-playfair bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
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
            
            {/* Desktop language toggle */}
            <div className="hidden md:block">
              <LanguageToggle />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="overflow-hidden"
        >
          {/* Wrap children in a PricingProvider as a fallback in case an outer provider isn't available */}
          <PricingProvider initialOptions={defaultPricingOptions}>
            {children}
          </PricingProvider>
        </motion.div>
        
        <div className="mt-12 text-center text-sm text-gray-500">
          <motion.p 
            className="mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {t({
              english: 'Need help? Contact our support team at support@emviapp.com',
              vietnamese: 'Cần trợ giúp? Liên hệ với đội ngũ hỗ trợ tại support@emviapp.com'
            })}
          </motion.p>
          <motion.p 
            className="text-xs text-purple-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {t({
              english: 'All job postings are reviewed within 24 hours',
              vietnamese: 'Tất cả các bài đăng việc làm được xem xét trong vòng 24 giờ'
            })}
          </motion.p>
          
          <motion.p 
            className="mt-4 text-xs font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            Inspired by Sunshine ☀️
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default PostWizardLayout;
