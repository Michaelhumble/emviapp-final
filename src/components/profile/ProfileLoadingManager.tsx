
import React, { useEffect, useState } from "react";
import { Loader2, Clock, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserProfile } from "@/types/profile";

interface ProfileLoadingManagerProps {
  message?: string;
  duration?: number;
  onRefresh?: () => Promise<void>;
  loadingType?: 'profile' | 'edit' | 'gallery' | 'settings';
  cachedProfile?: UserProfile | null;
  isError?: boolean;
  showFullPageLoader?: boolean;
}

const ProfileLoadingManager: React.FC<ProfileLoadingManagerProps> = ({ 
  message = "Loading profile data...",
  duration = 3000,
  onRefresh,
  loadingType = 'profile',
  cachedProfile = null,
  isError = false,
  showFullPageLoader = true
}) => {
  const [extendedLoading, setExtendedLoading] = useState(false);
  const [longLoading, setLongLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [dots, setDots] = useState('');
  const [loadingSteps, setLoadingSteps] = useState<{step: string, complete: boolean}[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
  // Configure loading steps based on type
  useEffect(() => {
    switch(loadingType) {
      case 'edit':
        setLoadingSteps([
          { step: "Connecting to server", complete: false },
          { step: "Loading profile data", complete: false },
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
  
  // Complete loading steps in sequence but faster
  useEffect(() => {
    if (loadingSteps.length === 0) return;
    
    const timers: NodeJS.Timeout[] = [];
    
    // Mark steps as complete sequentially but faster (800ms instead of 1200ms)
    loadingSteps.forEach((_, index) => {
      const timer = setTimeout(() => {
        setLoadingSteps(prev => 
          prev.map((step, i) => 
            i === index ? { ...step, complete: true } : step
          )
        );
      }, (index + 1) * 800); // Complete a step every 0.8 seconds
      
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
    }, duration * 1.5); // Reduced from 2x to 1.5x
    
    return () => {
      clearTimeout(timer);
      clearTimeout(longTimer);
    };
  }, [duration]);
  
  // Cycle through loading phases every 2 seconds (faster than before)
  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setLoadingPhase((prev) => (prev + 1) % 4);
    }, 2000);
    
    return () => clearInterval(phaseTimer);
  }, []);
  
  // Animate loading dots faster
  useEffect(() => {
    const dotsTimer = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 300); // Faster dots animation
    
    return () => clearInterval(dotsTimer);
  }, []);
  
  // Handle refresh action
  const handleRefresh = async () => {
    if (!onRefresh) return;
    
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  };
  
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
  
  // If there's a cached profile and we're in an extended loading state, show compact loader
  if (cachedProfile && extendedLoading && !showFullPageLoader) {
    return (
      <div className="bg-amber-50 border-amber-200 border rounded-md p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Loader2 className="h-4 w-4 text-amber-500 animate-spin mr-2" />
          <p className="text-amber-700 text-sm">Refreshing profile data...</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>
    );
  }
  
  // If there's an error, show error state
  if (isError) {
    return (
      <div className="min-h-[30vh] flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-3">
            Failed to load profile
          </h2>
          <p className="text-gray-600 mb-4 max-w-md mx-auto">
            We encountered an issue while loading your profile. This might be due to connection problems.
          </p>
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="default"
            className="min-w-40"
          >
            {refreshing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                Trying again...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Try again
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-[30vh] flex flex-col items-center justify-center p-8">
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
      
      {(longLoading || extendedLoading) && onRefresh && (
        <div className="mt-6">
          <p className="text-sm text-amber-600 mb-4">
            If this continues, you may want to try refreshing your profile data.
          </p>
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            className="flex items-center gap-2"
            disabled={refreshing}
          >
            {refreshing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" /> Refresh Profile Data
              </>
            )}
          </Button>
        </div>
      )}
      
      {/* Skeleton placeholders for better perceived performance */}
      {!cachedProfile && showFullPageLoader && (
        <div className="w-full max-w-3xl mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Skeleton className="h-40 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="md:col-span-2">
              <Skeleton className="h-20 w-full mb-4" />
              <Skeleton className="h-32 w-full mb-4" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileLoadingManager;
