
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { getUserRole } from "@/utils/getUserRole";
import { navigateToRoleDashboard } from "@/utils/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await signIn(email, password);
      
      if (response.error) {
        console.error("[SignIn] Login error:", response.error.message);
        setIsSubmitting(false);
        return;
      }
      
      if (!response.data.user) {
        console.error("[SignIn] No user returned after login");
        toast.error("Login failed. Please try again.");
        setIsSubmitting(false);
        return;
      }
      
      console.log("[SignIn] User logged in successfully:", response.data.user.id);
      
      // Get user role and redirect to appropriate dashboard
      const userRole = await getUserRole(response.data.user.id);
      console.log("[SignIn] Detected role for routing:", userRole);
      
      if (userRole) {
        // Use our utility to navigate to the correct dashboard
        console.log(`[SignIn] Routing user with role ${userRole} to appropriate dashboard`);
        navigateToRoleDashboard(navigate, userRole);
      } else {
        // If no role, redirect to role selection
        console.warn("[SignIn] No role detected, redirecting to role selection");
        navigate("/choose-role");
        toast.info("Please select your role to continue");
      }
    } catch (error) {
      console.error("[SignIn] Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh] p-4 bg-background">
        <Card className="w-full max-w-md">
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
              <div className="text-sm text-center text-gray-500">
                Don't have an account?{" "}
                <Link to="/auth/signup" className="text-primary hover:underline">
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
