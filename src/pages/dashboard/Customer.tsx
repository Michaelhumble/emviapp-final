
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CustomerDashboard from "@/components/dashboard/customer/CustomerDashboard";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { hasRoleAccess } from "@/utils/navigation";
import { UserRole } from "@/context/auth/types";
import Layout from "@/components/layout/Layout";
import { useReferralNotifications } from "@/hooks/useReferralNotifications";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ErrorBoundary from "@/components/error-handling/ErrorBoundary";

const CustomerDashboardPage = () => {
  const { userProfile, userRole, loading, isError, session } = useAuth();
  const navigate = useNavigate();
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Set up referral notifications listener
  useReferralNotifications();
  
  // Add loading timeout to prevent endless loading states
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (loading) {
      timeoutId = setTimeout(() => {
        console.log("Loading timeout reached for customer dashboard");
        setLoadingTimeout(true);
      }, 6000); // 6 second timeout for better UX
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loading]);
  
  useEffect(() => {
    document.title = "Customer Dashboard | EmviApp";
    
    if (loading) return;

    // Check authentication first
    if (!session && !loading && !isError) {
      console.log("No authenticated session found, redirecting to sign in");
      setIsRedirecting(true);
      toast.info("Please sign in to access your dashboard");
      navigate("/auth/signin");
      return;
    }

    const allowedRoles: UserRole[] = ['customer'];
    
    if (userRole && !hasRoleAccess(userRole, allowedRoles)) {
      toast.error(`You don't have access to the customer dashboard. Redirecting...`);
      navigate("/dashboard");
      return;
    }
    
    if (!userRole && !loading) {
      toast.error("Please complete your profile to access your dashboard");
      navigate("/profile/edit");
      return;
    }
    
    if (userRole !== 'customer') {
      toast.info("You're currently viewing the Customer dashboard, but your role is set as " + userRole);
    }
  }, [userProfile, userRole, session, loading, isError, navigate]);
  
  // Handle loading timeout
  if (loadingTimeout) {
    return (
      <Layout>
        <div className="container mx-auto p-6 text-center">
          <AlertTriangle size={40} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-xl font-semibold mb-4">⚠️ Unable to load dashboard. Please refresh or try again later.</h2>
          <Button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Page
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Handle auth error
  if (isError) {
    return (
      <Layout>
        <div className="container mx-auto p-6 text-center">
          <AlertTriangle size={40} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-4">Authentication Error</h2>
          <p className="mb-6">There was a problem authenticating your account. Please try signing in again.</p>
          <Button onClick={() => navigate('/auth/signin')}>Sign In</Button>
        </div>
      </Layout>
    );
  }
  
  // Loading state with improved visual feedback
  if (loading || isRedirecting) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <ErrorBoundary>
        <motion.div
          className="min-h-screen bg-gradient-to-b from-white to-pink-50/40 px-1 sm:px-0 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CustomerDashboard />
        </motion.div>
      </ErrorBoundary>
    </Layout>
  );
};

export default CustomerDashboardPage;
