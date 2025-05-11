
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface JobPostingHeaderProps {
  currentStep?: number;
  totalSteps?: number;
}

const JobPostingHeader: React.FC<JobPostingHeaderProps> = ({ 
  currentStep,
  totalSteps
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto mb-8 text-center">
      <h1 className="text-3xl md:text-4xl font-playfair font-semibold mb-3 text-gray-900">
        {t("Let's Help You Hire The Perfect Artist", "Hãy cùng nhau tìm nghệ sĩ hoàn hảo")}
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        {t("Tell us a little about the job — we'll take care of the rest.", "Hãy cho chúng tôi biết một chút về công việc — chúng tôi sẽ lo phần còn lại.")}
      </p>
      
      {currentStep && totalSteps && (
        <div className="mt-6">
          <p className="text-muted-foreground mb-2">
            {t('Step', 'Bước')} {currentStep} {t('of', 'trên')} {totalSteps}
          </p>
          
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-300" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostingHeader;
