import React, { useState } from 'react';
import { JobForm } from './JobForm';
import { JobFormValues } from './jobFormSchema';
import { Separator } from '@/components/ui/separator';
import PostHeader from '../PostHeader';
import MotivationalFooter from '../MotivationalFooter';
import UpsellSidebar from '../upsell/UpsellSidebar';
import { useAuth } from '@/context/auth'; // Add auth context import
import BetterResultsSection from './BetterResultsSection'; // Import new component
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

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
              userProfile={userProfile} // Pass the user profile with contact info
            />
            
            {/* Better Results Section made more prominent */}
            <div className="px-6 py-4">
              <Separator className="my-6" />
              <BetterResultsSection />
            </div>
            
            {/* New Yes Ladder Section - Emotional Guidance */}
            <div className="px-6 py-4">
              <Separator className="my-6" />
              <YesLadderSection />
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

// New YesLadder Section Component
const YesLadderSection = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    'professionalThợ', 'experiencedApplicants', 'fasterApplications', 'attractivePost', 
    'autoRenew', 'realApplicants', 'weeklyPay', 'timeManagement', 'aiTools'
  ]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedOptions(prev => 
      checked 
        ? [...prev, id] 
        : prev.filter(item => item !== id)
    );
  };

  const yesLadderOptions = [
    {
      id: 'professionalThợ',
      label: 'I want my post to attract serious, professional thợ giỏi',
      description: 'We\'ll optimize your listing to appeal to experienced professionals who care about quality.'
    },
    {
      id: 'experiencedApplicants',
      label: 'I prefer applicants who are already experienced in nail art and dip/gel',
      description: 'Our AI matching connects your post with artists who specifically match your skill requirements.'
    },
    {
      id: 'fasterApplications',
      label: 'I want to receive applications faster so I can hire quickly',
      description: 'Time matters. We\'ll help boost early visibility to qualified candidates.'
    },
    {
      id: 'attractivePost',
      label: 'I\'d love help writing a more attractive post if it gets more views',
      description: 'Our smart recommendations can help optimize your listing for better engagement.'
    },
    {
      id: 'autoRenew',
      label: 'I\'m open to auto-renew if the price is fair and I can cancel anytime',
      description: 'Avoid the stress of expiring posts and reopening positions with hassle-free renewals.'
    },
    {
      id: 'realApplicants',
      label: 'I want real applicants, not just views',
      description: 'Our platform prioritizes quality engagement from serious candidates.'
    },
    {
      id: 'weeklyPay',
      label: 'I\'m willing to offer weekly pay if it brings better talent',
      description: 'Weekly pay is one of the top factors that attracts reliable thợ giỏi to your salon.'
    },
    {
      id: 'timeManagement',
      label: 'I don\'t have time to post often — I want EmviApp to handle it',
      description: 'Let us take care of the details while you focus on running your business.'
    },
    {
      id: 'aiTools',
      label: 'I\'m open to AI tools helping me find more thợ giỏi near me',
      description: 'Our AI assistant can identify potential candidates and reach out proactively on your behalf.'
    }
  ];

  return (
    <div className="space-y-5 rounded-lg border border-purple-100 bg-purple-50/30 p-5 my-8">
      <div className="mb-5">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <span className="text-purple-500">💜</span> We understand running a salon isn't easy
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Let us support your journey with these thoughtful options that help salon owners like you succeed:
        </p>
      </div>

      <div className="space-y-4">
        {yesLadderOptions.map(option => (
          <div key={option.id} className="flex items-start">
            <Checkbox 
              id={option.id} 
              checked={selectedOptions.includes(option.id)}
              onCheckedChange={(checked) => handleCheckboxChange(option.id, checked === true)}
              className="mt-1"
            />
            <div className="ml-3">
              <Label 
                htmlFor={option.id} 
                className="font-medium text-base cursor-pointer"
              >
                {option.label}
              </Label>
              <p className="text-sm text-purple-700/70 mt-1">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-purple-100/50 p-4 rounded-lg">
        <p className="text-sm text-purple-800 italic">
          "I used to struggle with finding reliable thợ giỏi. EmviApp's smart suggestions helped me find artists who actually stay. It's like they understand what salon owners go through."
          <span className="block mt-1 text-right">— Kim T., Nail Salon Owner</span>
        </p>
      </div>
    </div>
  );
};

export default EnhancedJobForm;
