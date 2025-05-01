
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/auth";
import { signInWithEmail } from "@/services/auth";
import { ForgotPasswordLink, SignUpLink } from "@/components/auth/AuthLinks";
import { ExclamationTriangleIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sendingVerification, setSendingVerification] = useState(false);
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  const { user, userRole, userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect URL from query parameters or use dashboard as default
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect') || '/dashboard';

  // Redirect if user is already signed in and role is available
  useEffect(() => {
    if (user && (userRole || userProfile?.role)) {
      // Use the centralized navigation helper
      navigateToRoleDashboard(navigate, userRole || userProfile?.role);
    }
  }, [user, userRole, userProfile, navigate, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await signInWithEmail(email, password);

      if (response.error) {
        setError(response.error.message || "Invalid credentials. Please try again.");
        return;
      }

      if (response.user?.email && !response.user?.email_confirmed_at) {
        setShowVerificationAlert(true);
        return;
      }

      // Redirect to the specified URL after successful sign-in
      if (userRole || userProfile?.role) {
        navigateToRoleDashboard(navigate, userRole || userProfile?.role);
      } else {
        navigate(redirectUrl);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setSendingVerification(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        setError(error.message || "Failed to resend verification email.");
      } else {
        toast.success("Verification email resent successfully!");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setSendingVerification(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-50/50 to-white">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {showVerificationAlert && (
          <Alert variant="destructive" className="mb-4">
            <CheckCircledIcon className="h-4 w-4" />
            <AlertDescription>
              Please verify your email to continue.{" "}
              <Button variant="link" onClick={handleResendVerification} disabled={sendingVerification}>
                {sendingVerification ? "Sending..." : "Resend verification email"}
              </Button>
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <div className="flex justify-between mt-4">
          <ForgotPasswordLink />
          <SignUpLink />
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
