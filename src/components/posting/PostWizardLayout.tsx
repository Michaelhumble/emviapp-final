
import React, { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobilePostMenu from '@/components/posting/MobilePostMenu';

interface PostWizardLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
}

const PostWizardLayout: React.FC<PostWizardLayoutProps> = ({ children, currentStep, totalSteps }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-white">
      <div className="px-4 py-3 border-b bg-white fixed top-0 left-0 right-0 z-50 flex items-center justify-between shadow-sm">
        <button 
          onClick={handleGoBack}
          className="text-gray-700 flex items-center text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
        <div className="text-center font-medium text-sm">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="flex items-center">
          <MobilePostMenu />
        </div>
      </div>
      
      <div className="container max-w-3xl mx-auto pt-20 pb-16 px-4">
        <div className="my-4">
          <h1 className="text-2xl font-playfair font-semibold text-gray-900 mb-2">Create Job Posting</h1>
          <p className="text-gray-600">Fill out the details of your job posting.</p>
        </div>
        
        {/* Progress indicator */}
        <div className="w-full bg-gray-200 h-1.5 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-pink-500" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default PostWizardLayout;
