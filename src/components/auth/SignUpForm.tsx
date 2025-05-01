
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRoleBasedSignUp } from "@/hooks/useRoleBasedSignUp";
import { UserRole } from "@/context/auth/types";
import RoleSelectionCards from "./RoleSelectionCards";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SignUpFormProps {
  redirectUrl?: string | null;
}

/**
 * SignUpForm component handles user registration with email/password
 * and role selection
 * 
 * @param {SignUpFormProps} props - Component properties
 * @param {string | null} props.redirectUrl - Optional URL to redirect after successful sign up
 * @returns {JSX.Element} - Rendered sign up form
 */
const SignUpForm = ({ redirectUrl }: SignUpFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const { signUp, loading } = useRoleBasedSignUp();
  const navigate = useNavigate();
  
  /**
   * Handles form submission, validates inputs and triggers sign up process
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setFormError("Passwords don't match");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    try {
      // Attempt to sign up
      setFormSuccess("Creating your account...");
      const result = await signUp(email, password, selectedRole);
      
      if (result) {
        // Show success message and redirect
        setFormSuccess("Account created successfully! Redirecting...");
        toast.success("Welcome to EmviApp! Your account has been created.");
        
        // Decode the redirect URL if it exists
        const decodedRedirect = redirectUrl ? decodeURIComponent(redirectUrl) : '/dashboard';
        
        // Short delay for a better UX before redirect
        setTimeout(() => {
          navigate(decodedRedirect);
        }, 1500);
      } else {
        setFormError("Unable to create account. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setFormError(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-b from-white to-indigo-50/30 rounded-2xl overflow-hidden max-w-lg w-full mx-auto">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-3xl font-bold text-center font-serif text-indigo-900">
          Create an Account
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5">
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
            <Label htmlFor="email" className="text-sm font-medium text-gray-600">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="py-3 px-4"
              placeholder="your@email.com"
              aria-describedby="email-description"
            />
            <p id="email-description" className="text-xs text-gray-500">
              We'll never share your email with anyone else.
            </p>
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
              className="py-3 px-4"
              placeholder="••••••••"
              aria-describedby="password-requirements"
            />
            <p id="password-requirements" className="text-xs text-gray-500">
              Password must be at least 6 characters long
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              className="py-3 px-4"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-4">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Select your role:</h3>
            <RoleSelectionCards
              selectedRole={selectedRole}
              onChange={setSelectedRole}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
          <Button 
            type="submit" 
            className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          <div className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link to={`/sign-in${redirectUrl ? `?redirect=${redirectUrl}` : ''}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignUpForm;
