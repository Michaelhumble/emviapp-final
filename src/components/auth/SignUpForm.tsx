
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserRole } from "@/context/auth/types";
import RoleSelectionCards from "./RoleSelectionCards";

interface SignUpFormProps {
  redirectUrl?: string | null;
}

const SignUpForm = ({ redirectUrl }: SignUpFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      console.log("Attempting to sign up with:", { email, role: selectedRole, fullName });
      
      // Use Supabase auth directly for better debugging
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: selectedRole,
            user_type: selectedRole, // For backward compatibility
            ...(referralCode.trim() ? { referred_by_referral_code: referralCode.trim() } : {})
          },
        },
      });

      console.log("Supabase signUp response:", { data, error: signUpError });

      if (signUpError) {
        console.error("Sign up error:", signUpError);
        setError(signUpError.message);
        toast.error(signUpError.message);
        return;
      }

      if (!data.user) {
        setError("Failed to create user account");
        toast.error("Failed to create user account");
        return;
      }

      console.log("User created successfully:", data.user);
      toast.success("Account created successfully! Please check your email for verification.");
      
      // Redirect after successful signup
      const decodedRedirect = redirectUrl ? decodeURIComponent(redirectUrl) : '/dashboard';
      navigate(decodedRedirect);

    } catch (err: any) {
      console.error("Unexpected sign up error:", err);
      setError(err.message || "An unexpected error occurred during sign up");
      toast.error(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-b from-white to-indigo-50/30 rounded-2xl overflow-hidden max-w-lg w-full mx-auto">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-3xl font-bold text-center font-serif text-indigo-900">
          Create Your Account
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-600">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
              className="py-3 px-4"
              placeholder="Your full name"
            />
          </div>

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
              className="py-3 px-4"
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              className="py-3 px-4"
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-600">I am a...</Label>
            <RoleSelectionCards 
              selectedRole={selectedRole} 
              onChange={setSelectedRole}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="referralCode" className="text-sm font-medium text-gray-600">Referral Code (Optional)</Label>
            <Input
              id="referralCode"
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              disabled={loading}
              className="py-3 px-4"
              placeholder="Enter referral code"
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
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
