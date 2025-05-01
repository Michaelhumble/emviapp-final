import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, Mail } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import EmviLogo from "@/components/branding/EmviLogo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { signInWithEmail } from "@/services/auth";
import { supabase } from "@/integrations/supabase/client";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sendingVerification, setSendingVerification] = useState(false);
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect') || '/dashboard';

  useEffect(() => {
    if (user) {
      // Determine where to redirect based on user role
      let targetDashboard = '/dashboard';
      
      if (userRole) {
        switch (userRole) {
          case 'artist':
          case 'nail technician/artist':
            targetDashboard = '/dashboard/artist';
            break;
          case 'salon':
          case 'owner':
            targetDashboard = '/dashboard/salon';
            break;
          case 'freelancer':
            targetDashboard = '/dashboard/freelancer';
            break;
          case 'customer':
            targetDashboard = '/dashboard/customer';
            break;
          case 'supplier':
          case 'beauty supplier':
            targetDashboard = '/dashboard/supplier';
            break;
          default:
            targetDashboard = '/dashboard/other';
        }
      }
      
      // If a specific redirect URL was provided, use that instead
      const finalRedirect = redirectUrl !== '/dashboard' ? decodeURIComponent(redirectUrl) : targetDashboard;
      navigate(finalRedirect, { replace: true });
    }
  }, [user, userRole, navigate, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setShowVerificationAlert(false);

    try {
      const result = await signInWithEmail(email, password);
      
      if (result.success) {
        const decodedRedirect = redirectUrl ? decodeURIComponent(redirectUrl) : '/dashboard';
        navigate(decodedRedirect);
      } else if (result.error?.message?.includes("Email not confirmed")) {
        setShowVerificationAlert(true);
      } else {
        setError("Invalid login credentials. Please try again.");
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      setError(error.message || "Failed to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setSendingVerification(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
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

  if (user) {
    return null;
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh] p-4 bg-background">
        <Card className="w-full max-w-md">
          <div className="flex justify-center pt-6">
            <EmviLogo size="large" />
          </div>
          
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {showVerificationAlert && (
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    <p className="font-medium">Email not verified</p>
                    <p className="mt-1 mb-2">Please verify your email before signing in.</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-1 bg-amber-100 hover:bg-amber-200 border-amber-300"
                      onClick={handleResendVerification}
                      disabled={sendingVerification}
                      type="button"
                    >
                      <Mail className="mr-2 h-3 w-3" />
                      {sendingVerification ? "Sending..." : "Resend Verification Email"}
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              
              <div className="flex w-full justify-between text-sm text-muted-foreground">
                <Link to="/forgot-password" className="text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              
              <div className="text-sm text-center text-gray-500">
                Don't have an account?{" "}
                <Link to={`/sign-up${redirectUrl ? `?redirect=${redirectUrl}` : ''}`} className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default SignIn;
