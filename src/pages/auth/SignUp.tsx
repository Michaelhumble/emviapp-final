
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Gift, Users, Lock } from "lucide-react";
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
      <div className="flex items-center justify-center min-h-[80vh] p-4 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <p className="text-indigo-600 font-medium text-lg">
              ✨ You're just one step away from your dream profile ✨
            </p>
          </div>
          
          <Card className="border-0 shadow-xl bg-gradient-to-b from-white to-indigo-50/30 rounded-2xl overflow-hidden">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-3xl font-bold text-center font-serif text-indigo-900">
                Create an Account
              </CardTitle>
              <CardDescription className="text-center text-indigo-700/70">
                Tạo tài khoản miễn phí để bắt đầu hành trình làm đẹp của bạn.
              </CardDescription>
              {referralCode && (
                <div className="mt-4 bg-indigo-50 p-4 rounded-xl text-center border border-indigo-100">
                  <div className="flex items-center justify-center text-indigo-700 mb-1">
                    <Gift className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">You were invited!</span>
                  </div>
                  <p className="text-xs text-indigo-600">
                    Signing up with a referral gives you a bonus start.
                  </p>
                </div>
              )}
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-normal text-gray-600">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="py-3 px-4 bg-white border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-normal text-gray-600">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="py-3 px-4 bg-white border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-normal text-gray-600">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="py-3 px-4 bg-white border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all shadow-sm"
                  />
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Lock className="h-3 w-3 mr-1 text-gray-400" />
                    Your password is encrypted and private 🔒
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-5 pt-2 pb-6">
                <Button 
                  type="submit" 
                  className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium text-base transition-all duration-200 shadow-md hover:shadow-lg"
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
                <div className="text-sm text-center text-gray-500 mt-4">
                  Already have an account?{" "}
                  <Link to="/auth/signin" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors">
                    Sign in
                  </Link>
                </div>
                <div className="text-xs text-center text-gray-400 italic mt-4 px-8">
                  "Behind every beauty empire is a powerful login form."
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
