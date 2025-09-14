
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
// import { cleanupBeforeAuth } from "@/utils/authCleanup"; // REMOVED - was destroying sessions

interface SignInFormProps {
  redirectUrl?: string | null;
}

const SignInForm = ({ redirectUrl }: SignInFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('🔐 [SIGN IN FORM] Starting sign in process...');
      
      // DON'T clean up valid Supabase sessions during normal sign-in
      // Only clear app-specific keys if needed, but preserve session tokens
      
      const result = await signIn(email, password);
      
      if (result?.success) {
        console.log('✅ [SIGN IN FORM] Sign in successful, preparing redirect...');
        
        // HubSpot tracking for sign-in completion
        try {
          const { captureUtms, identifyUser, trackSignInCompleted } = await import('@/lib/analytics/hubspot');
          const utms = captureUtms();
          identifyUser({ email, provider: 'email', utms });
          trackSignInCompleted({ provider: 'email' });
        } catch (error) {
          console.warn('HubSpot tracking failed:', error);
        }
        
        // Define protected routes that are safe to redirect to
        const protectedRoutes = [
          '/dashboard', '/profile', '/onboarding', '/settings',
          '/dashboard/artist', '/dashboard/salon', '/dashboard/customer', 
          '/dashboard/manager', '/dashboard/admin', '/dashboard/freelancer',
          '/dashboard/supplier', '/dashboard/renter', '/dashboard/other',
          '/my-bookings', '/messaging', '/checkout', '/invite'
        ];
        
        let targetUrl = '/dashboard'; // Default to dashboard
        
        if (redirectUrl) {
          const decodedRedirect = decodeURIComponent(redirectUrl);
          console.log('🔍 [SIGN IN FORM] Checking redirect URL:', decodedRedirect);
          
          // Only redirect to protected routes or dashboard paths
          if (protectedRoutes.some(route => decodedRedirect.startsWith(route))) {
            targetUrl = decodedRedirect;
            console.log('✅ [SIGN IN FORM] Redirect URL is protected, using:', targetUrl);
          } else {
            console.log('⚠️ [SIGN IN FORM] Redirect URL is public, defaulting to dashboard');
          }
        }
        
        // Use navigate instead of window.location.href to avoid full page reload
        setTimeout(() => {
          console.log('🔄 [SIGN IN FORM] Navigating to:', targetUrl);
          navigate(targetUrl, { replace: true });
        }, 500); // Slightly longer delay to ensure auth state propagates
      } else {
        console.error('❌ [SIGN IN FORM] Sign in failed:', result?.error);
      }
    } catch (error) {
      console.error('🚨 [SIGN IN FORM] Unexpected error:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Trust Section */}
      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Secure & Private</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>100% Free</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Industry Trusted</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
          <p className="text-sm text-gray-700 italic">
            "EmviApp helped me find my dream job in just 3 days! The community is so supportive and genuine."
          </p>
          <p className="text-xs text-gray-600 mt-2 font-medium">— Maria S., Nail Technician, Los Angeles</p>
        </div>
      </div>

      <Card className="border-0 shadow-xl bg-gradient-to-b from-white to-indigo-50/30 rounded-2xl overflow-hidden max-w-md w-full mx-auto">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-3xl font-bold text-center font-serif text-indigo-900">
            Welcome Back
          </CardTitle>
        </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-600">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="h-12 px-4"
              placeholder="your@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-600">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="h-12 px-4"
              placeholder="••••••••"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
    </div>
  );
};

export default SignInForm;
