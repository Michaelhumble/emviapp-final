
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import EmotionalTrust from "@/components/analysis/EmotionalTrust";
import WelcomeHero from "@/components/welcome/WelcomeHero";
import AITeam from "@/components/welcome/AITeam";

const Welcome = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const [showAgents, setShowAgents] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  // Check local storage to see if user has seen the welcome screen
  useEffect(() => {
    const welcomeSeen = localStorage.getItem(`emvi_welcome_seen_${user?.id}`);
    if (welcomeSeen) {
      redirectToDashboard();
    }
  }, [user]);

  // Function to mark welcome as seen and redirect to dashboard
  const completeWelcome = () => {
    if (user?.id) {
      localStorage.setItem(`emvi_welcome_seen_${user.id}`, "true");
      redirectToDashboard();
    }
  };
  
  const redirectToDashboard = () => {
    console.log("Redirecting with user role:", userRole);
    switch(userRole) {
      case 'artist':
        navigate('/dashboard/artist');
        break;
      case 'salon':
        navigate('/dashboard/salon');
        break;
      case 'owner':
        navigate('/dashboard/owner');
        break;
      case 'vendor':
        navigate('/dashboard/supplier');
        break;
      case 'freelancer':
        navigate('/dashboard/freelancer');
        break;
      case 'other':
        navigate('/dashboard/other');
        break;
      case 'customer':
        navigate('/dashboard/customer');
        break;
      default:
        // If role is undefined or not matching any case, redirect to customer dashboard as fallback
        console.log("Unknown role, defaulting to customer dashboard:", userRole);
        navigate('/dashboard/customer');
        break;
    }
  };

  // Function to handle the "Let's go" button click
  const handleContinue = () => {
    if (showAgents) {
      completeWelcome();
    } else {
      setShowAgents(true);
      setHasSeenWelcome(true);
    }
  };

  // Skip directly to dashboard
  const handleSkip = () => {
    completeWelcome();
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto mb-12" />
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-12 md:py-20">
          {!showAgents ? (
            <WelcomeHero 
              userRole={userRole} 
              onContinue={handleContinue} 
              onSkip={handleSkip} 
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <AITeam userRole={userRole} />
              
              <EmotionalTrust />
              
              <div className="text-center mt-12">
                <Button 
                  size="lg" 
                  onClick={handleContinue}
                  className="font-medium px-8 py-6"
                >
                  Let's Go! <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
