
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Mail, AlertTriangle } from "lucide-react";

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

  useEffect(() => {
    async function checkAuthStatus() {
      if (user) {
        // Check if email is verified
        const { data, error } = await supabase.auth.getUser();
        if (!error && data?.user) {
          setIsVerified(data.user.email_confirmed_at !== null);
        }
      }
      setChecking(false);
    }

    if (!loading) {
      checkAuthStatus();
    }
  }, [user, loading]);

  const handleResendVerification = async () => {
    if (!user?.email) return;
    
    setSendingVerification(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email
      });
      
      if (error) throw error;
      
      toast.success("Verification email sent! Please check your inbox.");
    } catch (error: any) {
      console.error("Error resending verification:", error);
      toast.error(error.message || "Failed to send verification email");
    } finally {
      setSendingVerification(false);
    }
  };

  // If not requiring auth and just using as a conditional wrapper
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
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>;
  }

  // Not logged in, redirect to sign-in
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
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
            <Button 
              variant="outline" 
              className="bg-amber-100 hover:bg-amber-200 border-amber-300"
              onClick={handleResendVerification}
              disabled={sendingVerification}
            >
              <Mail className="mr-2 h-4 w-4" />
              {sendingVerification ? "Sending..." : "Resend Verification Email"}
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // User is logged in and verified (if required)
  return <>{children}</>;
};

export default AuthGuard;
