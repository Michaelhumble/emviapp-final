
import React from 'react';
import { AlertTriangle, RefreshCcw, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ArtistErrorStateProps {
  error: Error;
  retryAction: () => void;
  logoutAction?: () => void;
}

const ArtistErrorState = ({ error, retryAction, logoutAction }: ArtistErrorStateProps) => {
  const handleLogout = () => {
    if (logoutAction) {
      toast.info("Signing out...");
      logoutAction();
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-lg w-full text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Something went wrong
        </h3>
        
        <p className="text-sm text-gray-600 mb-6">
          {error.message || "We couldn't load your dashboard. Please try again or contact support if the issue persists."}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={retryAction}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </Button>
          
          {logoutAction && (
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistErrorState;
