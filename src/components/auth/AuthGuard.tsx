
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Mail, AlertTriangle, RefreshCw, Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiresAuth?: boolean;
  requiresVerification?: boolean;
  blurContent?: boolean;
}

const AuthGuard = ({ 
  children, 
  fallback, 
  requiresAuth = true,
  requiresVerification = true,
  blurContent = false
}: AuthGuardProps) => {
  const { user, loading, isSignedIn } = useAuth();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);
  const [sendingVerification, setSendingVerification] = useState(false);
  const [refreshingSession, setRefreshingSession] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [recoveryAttempts, setRecoveryAttempts] = useState(0);
  const location = useLocation();

  useEffect(() => {
    async function checkAuthStatus() {
      if (user) {
        // Check if email is verified
        try {
          const { data, error } = await supabase.auth.getUser();
          if (error) {
            throw error;
          }
          
          if (data?.user) {
            setIsVerified(data.user.email_confirmed_at !== null);
            
            // If email is not verified, suggest verification
            if (data.user.email_confirmed_at === null && requiresVerification) {
              setVerificationError("Your email is not verified");
            } else {
              setVerificationError(null);
            }
          }
        } catch (error: any) {
          console.error("Error checking verification status:", error);
          setVerificationError(error.message);
        }
      }
      setChecking(false);
    }

    if (!loading) {
      checkAuthStatus();
    }
  }, [user, loading, requiresVerification]);

  const handleResendVerification = async () => {
    if (!user?.email) return;
    
    setSendingVerification(true);
    setVerificationError(null);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email
      });
      
      if (error) throw error;
      
      toast.success("Verification email sent! Please check your inbox and spam folder.");
    } catch (error: any) {
      console.error("Error resending verification:", error);
      setVerificationError(error.message || "Failed to send verification email. Please try again later.");
      toast.error(error.message || "Failed to send verification email");
    } finally {
      setSendingVerification(false);
    }
  };

  const handleSessionRecovery = async () => {
    setRefreshingSession(true);
    try {
      await supabase.auth.refreshSession();
      // Check if the session was successfully refreshed
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      if (data.session) {
        setRecoveryAttempts(prev => prev + 1);
        toast.success("Authentication session refreshed successfully");
        // Force re-check of user verification status
        if (data.session.user) {
          setIsVerified(data.session.user.email_confirmed_at !== null);
        }
      } else {
        throw new Error("Unable to restore session");
      }
    } catch (error: any) {
      console.error("Session recovery failed:", error);
      toast.error("Session recovery failed. Please try signing in again.");
      // If recovery fails after 2 attempts, redirect to sign in
      if (recoveryAttempts >= 1) {
        const currentPath = encodeURIComponent(location.pathname + location.search);
        window.location.href = `/sign-in?redirect=${currentPath}&error=session_expired`;
      }
    } finally {
      setRefreshingSession(false);
    }
  };

  // Not requiring auth and just using as a conditional wrapper
  if (!requiresAuth) {
    // If user is signed in, show the children
    if (isSignedIn) {
      return <>{children}</>;
    }
    // If fallback is provided, show that instead
    if (fallback) {
      return <>{fallback}</>;
    }
    // Default behavior is to show nothing
    return null;
  }

  // While loading auth state or checking invitation, show loading
  if (loading || checking) {
    return <div className="flex justify-center items-center h-[70vh]">
      <div className="flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <div className="text-muted-foreground">Verifying authentication...</div>
      </div>
    </div>;
  }

  // Not logged in, redirect to sign-in with current path for redirect after login
  if (!user) {
    const currentPath = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/sign-in?redirect=${currentPath}`} replace />;
  }

  // User is logged in but email is not verified
  if (requiresVerification && isVerified === false) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-8">
        <Alert className="bg-amber-50 border-amber-200 mb-6">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <AlertDescription className="text-amber-800">
            <h3 className="font-medium text-lg mb-2">Email Verification Required</h3>
            <p className="mb-4">
              Please verify your email address to access this page. We've sent a verification link to <strong>{user.email}</strong>.
            </p>
            {verificationError && (
              <div className="mb-4 p-2 bg-red-100 text-red-800 rounded-md text-sm">
                {verificationError}
              </div>
            )}
            <div className="space-x-2">
              <Button 
                variant="outline" 
                className="bg-amber-100 hover:bg-amber-200 border-amber-300 mr-2"
                onClick={handleResendVerification}
                disabled={sendingVerification}
              >
                <Mail className="mr-2 h-4 w-4" />
                {sendingVerification ? "Sending..." : "Resend Verification Email"}
              </Button>
              
              <Button
                variant="outline"
                className="border-amber-300 bg-white hover:bg-gray-100"
                onClick={handleSessionRecovery}
                disabled={refreshingSession}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${refreshingSession ? 'animate-spin' : ''}`} />
                {refreshingSession ? "Refreshing..." : "Refresh Session"}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // User is logged in and verified (if required)
  return <>{children}</>;
};

export default AuthGuard;
