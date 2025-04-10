
import React, { useEffect, useState } from "react";
import { Loader2, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileLoadingProps {
  message?: string;
  duration?: number;
  onRefresh?: () => void;
}

const ProfileLoading: React.FC<ProfileLoadingProps> = ({ 
  message = "Loading your profile data...",
  duration = 0,
  onRefresh
}) => {
  const [extendedLoading, setExtendedLoading] = useState(false);
  const [longLoading, setLongLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [dots, setDots] = useState('');
  
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
      
      <p className="text-gray-600 text-center max-w-md mb-2">
        {extendedLoading 
          ? "This is taking longer than expected. Please wait a moment..." 
          : getLoadingMessage()}
      </p>
      
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
