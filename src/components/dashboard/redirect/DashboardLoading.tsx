
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLoadingProps {
  onLogout: () => Promise<void>;
}

const DashboardLoading = ({ onLogout }: DashboardLoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex items-center space-x-2 mb-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="text-lg">Loading your dashboard...</span>
      </div>
      <p className="text-gray-500 text-sm mb-8">We're redirecting you to the appropriate dashboard</p>
      
      {/* Emergency logout button to break from loading state */}
      <Button variant="outline" onClick={onLogout} className="mt-4">
        Log Out
      </Button>
    </div>
  );
};

export default DashboardLoading;
