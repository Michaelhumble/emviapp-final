
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface PostWizardLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  onNext?: () => void;
  onPrev?: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
}

const PostWizardLayout: React.FC<PostWizardLayoutProps> = ({
  children,
  currentStep,
  totalSteps,
  title,
  onNext,
  onPrev,
  onSubmit,
  isSubmitting = false
}) => {
  const { t } = useTranslation();
  
  const isLastStep = currentStep === totalSteps;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-2">
          {t('Step', 'Bước')} {currentStep} {t('of', 'trên')} {totalSteps}
        </p>
        
        <div className="w-full bg-gray-200 h-2 mt-4 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border mb-8">
        {children}
      </div>
      
      {currentStep !== totalSteps && (
        <div className="flex justify-between mt-8">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={onPrev}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('Previous', 'Quay lại')}
            </Button>
          ) : (
            <div></div>
          )}
          
          <Button type="button" onClick={onNext}>
            {t('Continue', 'Tiếp tục')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
      
      {isLastStep && (
        <div className="flex justify-end mt-8">
          <Button 
            type="button" 
            onClick={onSubmit} 
            disabled={isSubmitting}
            className="px-8"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('Processing...', 'Đang xử lý...')}
              </>
            ) : (
              t('Submit', 'Gửi bài')
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostWizardLayout;
