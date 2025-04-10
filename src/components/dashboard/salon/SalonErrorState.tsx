
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SalonErrorStateProps {
  error: Error;
  retryAction?: () => void;
}

const SalonErrorState = ({ error, retryAction }: SalonErrorStateProps) => {
  return (
    <div className="p-4">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error Loading Dashboard</AlertTitle>
        <AlertDescription>
          <p className="mt-2 text-sm text-gray-500">{error.message || "Something went wrong. Please try again."}</p>
          
          {retryAction && (
            <Button 
              onClick={retryAction} 
              className="mt-4" 
              variant="outline"
              size="sm"
            >
              Try Again
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SalonErrorState;
