
import { AlertTriangle, ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardErrorStateProps {
  error: string;
  onRetry: () => void;
  onGoBack: () => void;
  onEmergencyLogout: () => void;
}

const DashboardErrorState = ({ 
  error, 
  onRetry, 
  onGoBack, 
  onEmergencyLogout 
}: DashboardErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-center text-red-500 mb-4">
          <AlertTriangle size={48} />
        </div>
        <h2 className="text-xl font-semibold text-center mb-4">Dashboard Error</h2>
        <p className="text-gray-600 mb-6 text-center">{error}</p>
        <div className="flex flex-col gap-2">
          <Button 
            variant="default" 
            onClick={onRetry}
          >
            Try Again
          </Button>
          <Button 
            variant="outline" 
            onClick={onGoBack} 
            className="mt-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <Button 
            variant="outline" 
            onClick={onEmergencyLogout} 
            className="mt-2"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out and Restart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardErrorState;
