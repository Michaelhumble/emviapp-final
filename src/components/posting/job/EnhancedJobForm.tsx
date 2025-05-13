
import React, { useState } from 'react';
import { JobForm } from './JobForm';
import { JobFormValues } from './jobFormSchema';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth';

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
  
  return (
    <div className="space-y-8">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-semibold text-center mb-3">
          Find your next artist — the one who stays
        </h1>
        <p className="text-gray-600 text-center">
          Post smart. We'll guide you every step.
        </p>
      </div>
      
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <JobForm 
              onSubmit={onSubmit}
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              isSubmitting={isSubmitting}
              defaultValues={defaultValues}
              industry={industry}
              userProfile={userProfile} // Pass the user profile with contact info
            />
          </div>
        </div>
        
        <div className="hidden lg:block">
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="text-xl font-medium mb-4">Tips for Success</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• Be specific about compensation</li>
              <li>• Include working hours and days</li>
              <li>• Mention any benefits or perks</li>
              <li>• Describe the work environment</li>
              <li>• Specify skills or experience needed</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Mobile tips will appear here via floating button */}
      <MobileUpsellButton />
      
      <div className="max-w-3xl mx-auto text-center mt-8">
        <p className="text-sm text-gray-500">
          Artists check for new jobs every morning. Make yours the one they remember.
        </p>
      </div>
    </div>
  );
};

// Simple mobile floating tips button component
const MobileUpsellButton = () => {
  const [showButton, setShowButton] = React.useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled 70% down the page
      const scrollPosition = window.scrollY;
      const pageHeight = document.body.scrollHeight - window.innerHeight;
      const scrollThreshold = pageHeight * 0.7;
      
      if (scrollPosition > scrollThreshold) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showButton) return null;
  
  return (
    <div className="fixed bottom-4 w-full px-4 md:hidden z-50">
      <button 
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg shadow-xl"
        onClick={() => console.log("Tips button clicked")}
      >
        See Tips for Better Results
      </button>
    </div>
  );
};

export default EnhancedJobForm;
