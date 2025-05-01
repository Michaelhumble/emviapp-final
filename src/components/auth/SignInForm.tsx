
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";

/**
 * SignInForm component for user authentication
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {string|null} [props.redirectUrl] - URL to redirect after successful sign in
 * @param {string|null} [props.initialError] - Initial error message to display
 * @returns {JSX.Element} Sign in form component
 */
const SignInForm = ({ 
  redirectUrl, 
  initialError 
}: { 
  redirectUrl?: string | null;
  initialError?: string | null;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(initialError || null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn, loading: loggingIn } = useAuth();

  /**
   * Handles form submission for user authentication
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    
    try {
      // Show loading state message
      setFormSuccess("Signing in...");
      
      // Attempt to sign in
      const { success, error } = await signIn(email, password);
      
      if (error) {
        setFormError(error.message || "Invalid login credentials");
        setFormSuccess(null);
        return;
      }
      
      if (success) {
        setFormSuccess("Login successful! Redirecting...");
        // Decode the redirect URL if it exists
        const decodedRedirect = redirectUrl ? decodeURIComponent(redirectUrl) : '/dashboard';
        
        // Short delay for a better UX before redirect
        setTimeout(() => {
          navigate(decodedRedirect);
        }, 1500);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setFormError(error.message || "Failed to sign in");
      setFormSuccess(null);
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-b from-white to-indigo-50/30 rounded-2xl overflow-hidden">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-3xl font-bold text-center font-serif text-indigo-900">
          Welcome Back
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Display form errors */}
          {formError && (
            <Alert variant="destructive" className="animate-in fade-in-50 slide-in-from-top-5">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
          
          {/* Display success messages */}
          {formSuccess && (
            <Alert className="bg-green-50 border-green-200 animate-in fade-in-50 slide-in-from-top-5">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">{formSuccess}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-600">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loggingIn}
              className="py-3 px-4"
              placeholder="your@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium text-gray-600">
                Password
              </Label>
              <Link 
                to="/forgot-password" 
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loggingIn}
              className="py-3 px-4"
              placeholder="••••••••"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
          <Button
            type="submit"
            className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            disabled={loggingIn}
          >
            {loggingIn ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-sm text-center text-gray-500">
            Don't have an account yet?{" "}
            <Link to={`/sign-up${redirectUrl ? `?redirect=${redirectUrl}` : ''}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignInForm;
