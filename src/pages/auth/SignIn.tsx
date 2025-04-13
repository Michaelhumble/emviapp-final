
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import EmviLogo from "@/components/branding/EmviLogo";
import { supabase } from "@/integrations/supabase/client";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingInvite, setIsCheckingInvite] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user && !isCheckingInvite) {
    return <Navigate to="/dashboard" replace />;
  }

  const checkInvitedStatus = async (userId: string) => {
    setIsCheckingInvite(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('invited')
        .eq('id', userId)
        .single();

      if (error) throw error;
      
      // If user is not invited, redirect to access denied
      if (!data.invited) {
        navigate("/access-denied");
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error checking invite status:", error);
      toast.error("Error verifying access permissions");
      return false;
    } finally {
      setIsCheckingInvite(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await signIn(email, password);
      
      if (!result.success) {
        throw new Error(result.error?.message || "Failed to sign in");
      }
      
      // Get the current user after login
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("No user found after login");
      }
      
      // Check if the user is invited
      const isInvited = await checkInvitedStatus(user.id);
      
      if (isInvited) {
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "Failed to sign in");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting || isCheckingInvite}
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
                  disabled={isSubmitting || isCheckingInvite}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || isCheckingInvite}
              >
                {isSubmitting || isCheckingInvite ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isCheckingInvite ? "Verifying Access..." : "Signing In..."}
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <div className="text-sm text-center text-gray-500">
                Don't have an account?{" "}
                <Link to="/early-access" className="text-primary hover:underline">
                  Request Access
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
