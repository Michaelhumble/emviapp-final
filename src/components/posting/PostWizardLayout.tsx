
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Menu } from 'lucide-react';
import EmviLogo from '@/components/branding/EmviLogo';
import { Progress } from '@/components/ui/progress';
import MobileMenu from '@/components/layout/MobileMenu';
import { useTranslation } from '@/hooks/useTranslation';
import { useIsMobile } from "@/hooks/use-mobile";
import MobileBottomNavBar from '@/components/layout/MobileBottomNavBar';

interface PostWizardLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  expressMode?: boolean;
  onToggleExpressMode?: () => void;
}

const PostWizardLayout: React.FC<PostWizardLayoutProps> = ({
  children,
  currentStep,
  totalSteps,
  expressMode = false,
  onToggleExpressMode,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
                className="md:hidden"
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
        <div className="container max-w-6xl mx-auto py-6 px-4 md:py-8 pb-20">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-medium mb-1">
                {t({
                  english: 'Post a Job',
                  vietnamese: 'Đăng tin tuyển dụng'
                })}
              </h1>
              
              {onToggleExpressMode && currentStep === 1 && (
                <Button
                  onClick={onToggleExpressMode}
                  variant="outline"
                  size="sm"
                  className="text-xs md:text-sm"
                >
                  {expressMode ? (
                    t({
                      english: 'Switch to Guided Mode',
                      vietnamese: 'Chuyển sang Chế độ Hướng dẫn'
                    })
                  ) : (
                    t({
                      english: 'Express Posting Mode',
                      vietnamese: 'Chế độ Đăng nhanh'
                    })
                  )}
                </Button>
              )}
            </div>
            <p className="text-gray-600">
              {expressMode ? (
                t({
                  english: 'Express Mode: All information on one page',
                  vietnamese: 'Chế độ nhanh: Tất cả thông tin trên một trang'
                })
              ) : (
                t({
                  english: `Step ${currentStep} of ${totalSteps}`,
                  vietnamese: `Bước ${currentStep} của ${totalSteps}`
                })
              )}
            </p>
          </div>
          
          {children}
        </div>
      </div>

      {/* Add mobile bottom navbar to the PostWizardLayout */}
      {isMobile && <MobileBottomNavBar />}

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </div>
  );
};

export default PostWizardLayout;
