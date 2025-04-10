
import React from "react";
import { Loader2 } from "lucide-react";

interface ProfileLoadingProps {
  message?: string;
  duration?: number;
}

const ProfileLoading: React.FC<ProfileLoadingProps> = ({ 
  message = "Loading your profile data...",
  duration = 0 
}) => {
  const [extendedLoading, setExtendedLoading] = React.useState(false);
  
  // Show extended message if loading takes more than specified duration
  React.useEffect(() => {
    if (duration === 0) return;
    
    const timer = setTimeout(() => {
      setExtendedLoading(true);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);
  
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
      <Loader2 className="h-12 w-12 animate-spin mb-4 text-primary" />
      <h2 className="text-xl font-semibold mb-2">
        {message}
      </h2>
      <p className="text-gray-600 text-center max-w-md">
        {extendedLoading 
          ? "This is taking longer than expected. Please wait a moment..." 
          : "We're preparing your information..."}
      </p>
    </div>
  );
};

export default ProfileLoading;
