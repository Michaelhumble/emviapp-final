
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import EmviLogo from "@/components/branding/EmviLogo";

const SignUp = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check for query parameters that might indicate this came from an invite
    const params = new URLSearchParams(window.location.search);
    const invite = params.get('invite');
    
    // If no invite parameter, just proceed with redirect
    if (!invite) {
      // Add a small delay to show the message
      const timer = setTimeout(() => {
        navigate("/early-access");
      }, 1500);
      
      return () => clearTimeout(timer);
    }
    
    // If there is an invite param, continue with normal signup
    // We would implement special invite flow here
  }, [navigate]);
  
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh] p-4 bg-background">
        <Card className="w-full max-w-md">
          <div className="flex justify-center pt-6">
            <EmviLogo size="large" />
          </div>
          
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Join the Waitlist</CardTitle>
            <CardDescription className="text-center">
              EmviApp is currently in private beta. Please join our waitlist for access.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8 text-center py-8">
            <p className="text-gray-600">
              We're currently limiting access to ensure the best experience for our early users.
              Please request access to join our community.
            </p>
            
            <Button 
              onClick={() => navigate("/early-access")}
              className="px-8"
            >
              Request Early Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SignUp;
