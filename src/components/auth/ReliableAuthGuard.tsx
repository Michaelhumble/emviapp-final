
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthSession } from "@/hooks/useAuthSession";
import { Loader } from "lucide-react";
import { toast } from "sonner";

interface ReliableAuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ReliableAuthGuard = ({ 
  children, 
  redirectTo = "/auth/signin"
}: ReliableAuthGuardProps) => {
  const { user, loading, error } = useAuthSession();
  const [authChecked, setAuthChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only set authChecked when loading is complete
    if (!loading) {
      setAuthChecked(true);
    }
    
    // Show error toast if auth check fails
    if (error) {
      toast.error(error);
    }
  }, [loading, error]);

  // Show loading state until auth check is complete
  if (loading || !authChecked) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader size={24} className="animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login with the return path
  if (!user) {
    // Save the current path for redirect after login
    const returnPath = location.pathname !== "/auth/signin" && 
                      location.pathname !== "/auth/signup" 
                      ? location.pathname 
                      : "/dashboard";
                      
    sessionStorage.setItem("authRedirectPath", returnPath);
    
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // User is authenticated, render children
  return <>{children}</>;
};

export default ReliableAuthGuard;
