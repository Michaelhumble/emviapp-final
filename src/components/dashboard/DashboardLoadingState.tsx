
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmviLogo from "@/components/branding/EmviLogo";

interface DashboardLoadingStateProps {
  loadingTime: number;
  handleEmergencyLogout?: () => void;
}

const DashboardLoadingState = ({ loadingTime, handleEmergencyLogout }: DashboardLoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4 mb-4">
        <EmviLogo size="large" className="mb-4" />
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="flex flex-col items-center">
          <span className="text-lg font-medium">Loading your dashboard...</span>
          <span className="text-sm text-gray-500">{loadingTime > 3 ? `(${loadingTime}s)` : ''}</span>
        </div>
      </div>
      <p className="text-gray-500 text-sm max-w-md text-center">
        We're redirecting you to the appropriate dashboard
        {loadingTime > 3 && (
          <>
            <br />
            <br />
            <span className="text-amber-600">
              This is taking longer than expected. If you continue to see this message, try 
              <Button 
                variant="link" 
                className="p-0 h-auto font-medium text-primary" 
                onClick={() => window.location.reload()}
              >
                refreshing the page
              </Button> 
              or 
              <Button 
                variant="link" 
                className="p-0 h-auto font-medium text-red-500" 
                onClick={handleEmergencyLogout}
              >
                signing out
              </Button>.
            </span>
          </>
        )}
      </p>
      
      {/* Progress indicator */}
      <div className="w-64 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full animate-pulse" 
          style={{ width: `${Math.min(loadingTime * 10, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DashboardLoadingState;
