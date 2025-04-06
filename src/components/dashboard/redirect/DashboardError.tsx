
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DashboardErrorProps {
  error: string;
  onRetry: () => void;
  onLogout: () => Promise<void>;
}

const DashboardError = ({ error, onRetry, onLogout }: DashboardErrorProps) => {
  const handleLogout = async () => {
    try {
      await onLogout();
      toast.success("Successfully logged out");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to log out. Reloading the page...");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="flex items-center text-amber-600 mb-4">
          <AlertTriangle className="h-6 w-6 mr-2" />
          <h2 className="text-lg font-medium">Dashboard Error</h2>
        </div>
        <p className="text-gray-600 mb-6">{error}</p>
        <div className="flex gap-3">
          <Button onClick={onRetry} className="w-full">
            Try Again
          </Button>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardError;
