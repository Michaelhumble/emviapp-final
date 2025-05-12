import React, { useState } from 'react';
import { JobForm } from './JobForm';
import { JobFormValues } from './jobFormSchema';
import { Separator } from '@/components/ui/separator';
import PostHeader from '../PostHeader';
import MotivationalFooter from '../MotivationalFooter';
import UpsellSidebar from '../upsell/UpsellSidebar';

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
  return (
    <div className="space-y-8">
      <PostHeader 
        title="Find your next artist — the one who stays, thrives, and grows your salon."
        subtitle="Post smart. We'll guide you every step."
      />
      
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
            />
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
          subMessage="Post now — and let the best artists come to you."
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
