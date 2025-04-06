
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface DashboardLoadingProps {
  onLogout: () => Promise<void>;
}

const DashboardLoading = ({ onLogout }: DashboardLoadingProps) => {
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  // Simulate progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        // Cap at 90% to show we're waiting for server
        return prevProgress >= 90 ? 90 : prevProgress + 5;
      });
      
      setTimeElapsed(prev => prev + 1);
    }, 500);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex items-center space-x-2 mb-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="text-lg">Loading your dashboard...</span>
      </div>
      <p className="text-gray-500 text-sm mb-4">We're redirecting you to the appropriate dashboard</p>
      
      {/* Progress indicator */}
      <div className="w-full max-w-md mb-8">
        <Progress 
          value={progress} 
          className="h-2"
          indicatorClassName={`${progress >= 75 ? 'bg-green-500' : 'bg-primary'}`}
        />
        <p className="text-xs text-gray-400 mt-2 text-center">
          {progress < 30 ? 'Checking your account...' : 
           progress < 60 ? 'Loading your personalized content...' : 
           progress < 90 ? 'Almost there...' : 
           'Finalizing...'}
        </p>
      </div>
      
      {/* Show logout option if it's taking too long */}
      <div className="flex flex-col items-center">
        {timeElapsed > 10 && (
          <p className="text-amber-600 text-sm mb-3">
            Taking longer than expected? Try signing out and back in.
          </p>
        )}
        
        <Button 
          variant="outline" 
          onClick={onLogout} 
          className="mt-2"
          size={timeElapsed > 10 ? "default" : "sm"}
        >
          {timeElapsed > 10 ? "Sign Out and Try Again" : "Sign Out"}
        </Button>
      </div>
    </div>
  );
};

export default DashboardLoading;
