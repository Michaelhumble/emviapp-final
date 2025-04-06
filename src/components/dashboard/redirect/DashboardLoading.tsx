
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface DashboardLoadingProps {
  onLogout: () => Promise<void>;
}

const DashboardLoading = ({ onLogout }: DashboardLoadingProps) => {
  const [progress, setProgress] = useState(0);
  
  // Simulate progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        // Increase progress but cap at 90% to show that we're waiting for the server
        // This way it doesn't look like it completed but nothing happened
        return prevProgress >= 90 ? 90 : prevProgress + 10;
      });
    }, 800);
    
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
      
      {/* Emergency logout button to break from loading state */}
      <Button variant="outline" onClick={onLogout} className="mt-4">
        Log Out
      </Button>
    </div>
  );
};

export default DashboardLoading;
