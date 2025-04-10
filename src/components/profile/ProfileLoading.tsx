
import React, { useEffect, useState } from "react";
import { Loader2, Clock, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileLoadingProps {
  message?: string;
  duration?: number;
  onRefresh?: () => void;
  loadingType?: 'profile' | 'edit' | 'gallery' | 'settings';
}

const ProfileLoading: React.FC<ProfileLoadingProps> = ({ 
  message = "Loading your profile data...",
  duration = 0,
  onRefresh,
  loadingType = 'profile'
}) => {
  const [extendedLoading, setExtendedLoading] = useState(false);
  const [longLoading, setLongLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [dots, setDots] = useState('');
  const [loadingSteps, setLoadingSteps] = useState<{step: string, complete: boolean}[]>([]);
  
  // Configure loading steps based on type
  useEffect(() => {
    switch(loadingType) {
      case 'edit':
        setLoadingSteps([
          { step: "Fetching profile data", complete: false },
          { step: "Loading form elements", complete: false },
          { step: "Preparing editor", complete: false }
        ]);
        break;
      case 'gallery':
        setLoadingSteps([
          { step: "Connecting to storage", complete: false },
          { step: "Retrieving images", complete: false },
          { step: "Preparing gallery", complete: false }
        ]);
        break;
      case 'settings':
        setLoadingSteps([
          { step: "Loading user preferences", complete: false },
          { step: "Fetching account details", complete: false },
          { step: "Preparing settings panel", complete: false }
        ]);
        break;
      default:
        setLoadingSteps([
          { step: "Connecting to server", complete: false },
          { step: "Retrieving profile data", complete: false },
          { step: "Preparing layout", complete: false }
        ]);
    }
  }, [loadingType]);
  
  // Complete loading steps in sequence
  useEffect(() => {
    if (loadingSteps.length === 0) return;
    
    const timers: NodeJS.Timeout[] = [];
    
    // Mark steps as complete sequentially
    loadingSteps.forEach((_, index) => {
      const timer = setTimeout(() => {
        setLoadingSteps(prev => 
          prev.map((step, i) => 
            i === index ? { ...step, complete: true } : step
          )
        );
      }, (index + 1) * 1200); // Complete a step every 1.2 seconds
      
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [loadingSteps]);
  
  // Show extended message if loading takes more than specified duration
  useEffect(() => {
    if (duration === 0) return;
    
    const timer = setTimeout(() => {
      setExtendedLoading(true);
    }, duration);
    
    const longTimer = setTimeout(() => {
      setLongLoading(true);
    }, duration * 2);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(longTimer);
    };
  }, [duration]);
  
  // Cycle through loading phases every 3 seconds
  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setLoadingPhase((prev) => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(phaseTimer);
  }, []);
  
  // Animate loading dots
  useEffect(() => {
    const dotsTimer = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 400);
    
    return () => clearInterval(dotsTimer);
  }, []);
  
  // Generate loading message based on phase
  const getLoadingMessage = () => {
    const messages = [
      "Fetching your profile data",
      "Loading your information",
      "Processing profile details",
      "Almost there"
    ];
    return `${messages[loadingPhase]}${dots}`;
  };
  
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
      <div className="relative">
        <Loader2 className="h-16 w-16 animate-spin mb-4 text-primary" />
        {longLoading && (
          <Clock className="h-6 w-6 text-amber-500 absolute bottom-4 right-0" />
        )}
      </div>
      
      <h2 className="text-xl font-semibold mb-3">
        {message}
      </h2>
      
      {loadingSteps.length > 0 ? (
        <div className="w-full max-w-md space-y-2 mb-4">
          {loadingSteps.map((step, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {step.complete ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <div className="h-4 w-4 relative">
                  <div className={`h-4 w-4 rounded-full border-2 ${
                    loadingPhase % loadingSteps.length === index 
                      ? "border-primary border-t-transparent animate-spin" 
                      : "border-gray-300"
                  }`}></div>
                </div>
              )}
              <span className={step.complete ? "text-gray-600" : "text-gray-800"}>
                {step.step}{!step.complete && loadingPhase % loadingSteps.length === index && dots}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center max-w-md mb-2">
          {extendedLoading 
            ? "This is taking longer than expected. Please wait a moment..." 
            : getLoadingMessage()}
        </p>
      )}
      
      {longLoading && onRefresh && (
        <div className="mt-6">
          <p className="text-sm text-amber-600 mb-4">
            If this continues, you may want to try refreshing your profile data.
          </p>
          <Button 
            onClick={onRefresh} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" /> Refresh Profile Data
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileLoading;
