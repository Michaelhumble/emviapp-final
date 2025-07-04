
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Menu } from 'lucide-react';
import EmviLogo from '@/components/branding/EmviLogo';
import { Progress } from '@/components/ui/progress';
import MobileMenu from '@/components/layout/MobileMenu';
import { useTranslation } from '@/hooks/useTranslation';

interface PostWizardLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

const PostWizardLayout: React.FC<PostWizardLayoutProps> = ({
  children,
  currentStep,
  totalSteps,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const progress = (currentStep / totalSteps) * 100;
  
  const handleBack = () => {
    if (currentStep === 1) {
      navigate('/dashboard');
    } else {
      // Navigate back handled by the form component
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2 lg:mr-4" 
                onClick={handleBack} 
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              
              <EmviLogo size="small" showText={true} />
            </div>
            
            <div className="flex items-center gap-2">
              {/* Mobile menu hamburger */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Progress bar */}
          <Progress value={progress} className="h-1 rounded-none" />
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-grow">
        <div className="container max-w-6xl mx-auto py-6 px-4 md:py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-medium mb-1">
              {t({
                english: 'Post a Job',
                vietnamese: 'Đăng tin tuyển dụng'
              })}
            </h1>
            <p className="text-gray-600">
              {t({
                english: `Step ${currentStep} of ${totalSteps}`,
                vietnamese: `Bước ${currentStep} của ${totalSteps}`
              })}
            </p>
          </div>
          
          {children}
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </div>
  );
};

export default PostWizardLayout;
