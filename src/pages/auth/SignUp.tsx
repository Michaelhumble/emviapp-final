
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Gift, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const { signUp, user, isNewUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check URL for referral code
  useEffect(() => {
    const refFromUrl = searchParams.get('ref');
    if (refFromUrl) {
      setReferralCode(refFromUrl);
      console.log('Referral code detected:', refFromUrl);
    }
  }, [searchParams]);

  // Redirect if already logged in
  if (user) {
    // If they're a new user, redirect straight to dashboard to select role
    if (isNewUser) {
      return <Navigate to="/dashboard" replace />;
    }
    // Otherwise go to home page
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Sign up the user
      const signUpResponse = await signUp(email, password);
      
      if (signUpResponse.error) {
        toast.error(signUpResponse.error.message || "Failed to sign up");
        return;
      }
      
      // If there's a referral code, process it
      if (referralCode && signUpResponse.data?.user?.id) {
        try {
          // Option 1: Use custom RPC function
          const { error: rpcError } = await supabase.rpc('process_referral', {
            referral_code: referralCode,
            new_user_id: signUpResponse.data.user.id
          });
          
          if (rpcError) {
            console.error('Error processing referral:', rpcError);
          } else {
            console.log('Referral processed successfully');
          }
          
          // Option 2: Direct update approach (if RPC fails)
          if (rpcError) {
            const { error: updateError } = await supabase
              .from('users')
              .update({ referred_by: referralCode })
              .eq('id', signUpResponse.data.user.id);
              
            if (updateError) {
              console.error('Error updating referral data:', updateError);
            }
          }
        } catch (refErr) {
          console.error('Unexpected error processing referral:', refErr);
        }
      }
      
      toast.success("Account created successfully!");
      // User will be redirected automatically via the conditional above
      // when auth state updates
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
      console.error("Sign up error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh] p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Enter your email and create a password to get started
            </CardDescription>
            {referralCode && (
              <div className="mt-2 bg-indigo-50 p-3 rounded-md text-center">
                <div className="flex items-center justify-center text-indigo-700 mb-1">
                  <Gift className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">You were invited!</span>
                </div>
                <p className="text-xs text-indigo-600">
                  Signing up with a referral gives you a bonus start.
                </p>
              </div>
            )}
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <div className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <Link to="/auth/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default SignUp;
