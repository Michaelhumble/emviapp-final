
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import EmviLogo from "@/components/branding/EmviLogo";
import { useSignUpWithInvite } from "@/hooks/useSignUpWithInvite";
import { supabase } from "@/integrations/supabase/client";

const SignUpWithInvite = () => {
  const { user } = useAuth();
  const {
    email,
    setEmail,
    password,
    setPassword,
    fullName,
    setFullName,
    loading,
    error,
    handleSignUp,
    isInvite,
    salonId,
    invitedRole
  } = useSignUpWithInvite();
  
  const [salonName, setSalonName] = useState<string | null>(null);
  const [salonLoading, setSalonLoading] = useState(true);
  
  // If this is an invite, fetch the salon details
  useEffect(() => {
    const fetchSalonDetails = async () => {
      if (!salonId) {
        setSalonLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('salons')
          .select('salon_name')
          .eq('id', salonId)
          .single();
          
        if (error) throw error;
        
        setSalonName(data.salon_name);
      } catch (err) {
        console.error("Error fetching salon details:", err);
      } finally {
        setSalonLoading(false);
      }
    };
    
    fetchSalonDetails();
  }, [salonId]);
  
  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh] p-4 bg-background">
        <Card className="w-full max-w-md">
          <div className="flex justify-center pt-6">
            <EmviLogo size="large" />
          </div>
          
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {isInvite ? "Join Your Salon Team" : "Create Your Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {isInvite && salonName ? (
                <span className="font-medium">
                  You've been invited to join {salonName} as a{" "}
                  {invitedRole === "artist" 
                    ? "Team Artist" 
                    : invitedRole === "manager"
                    ? "Salon Manager"
                    : "Team Member"
                  }
                </span>
              ) : (
                "Enter your information to create an EmviApp account"
              )}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {isInvite && salonLoading ? (
              <div className="py-6 flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Your name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
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
                    disabled={loading}
                    minLength={6}
                  />
                </div>
                
                {isInvite && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertTitle className="text-blue-800">Joining as a {invitedRole}</AlertTitle>
                    <AlertDescription className="text-blue-700">
                      Your account will be automatically linked to {salonName || "the salon"}.
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              onClick={handleSignUp}
              className="w-full" 
              disabled={loading || salonLoading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                isInvite ? "Join Salon Team" : "Create Account"
              )}
            </Button>
            
            <div className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link to="/auth/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default SignUpWithInvite;
