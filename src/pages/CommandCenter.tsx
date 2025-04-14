
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import CommandCenterLayout from "@/components/command-center/CommandCenterLayout";
import UserOverview from "@/components/command-center/UserOverview";
import LiveMetrics from "@/components/command-center/LiveMetrics";
import ReferralsRevenue from "@/components/command-center/ReferralsRevenue";
import RecentActivity from "@/components/command-center/RecentActivity";
import InternalTools from "@/components/command-center/InternalTools";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CommandCenter = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    document.title = "EmviApp Command Center | Founder Dashboard";
    
    // Check if the user is an admin
    const checkAdminStatus = async () => {
      setLoading(true);
      
      if (!userProfile?.id) {
        navigate("/auth/signin");
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', userProfile.id)
          .single();
          
        if (error) throw error;
        
        if (data?.role === 'admin') {
          setIsAdmin(true);
        } else {
          setAccessDenied(true);
          toast.error("Access denied: Admin privileges required");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        toast.error("Something went wrong. Please try again.");
        setAccessDenied(true);
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminStatus();
  }, [navigate, userProfile]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-6 px-4 w-full max-w-full overflow-hidden">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-full max-w-[250px] mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-40 bg-gray-100 rounded"></div>
              <div className="h-40 bg-gray-100 rounded"></div>
              <div className="h-40 bg-gray-100 rounded"></div>
              <div className="h-40 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (accessDenied) {
    return (
      <Layout>
        <div className="container py-12 px-4">
          <Alert className="bg-red-50 border-red-200 mb-6 max-w-3xl mx-auto">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertTitle className="text-red-800 text-lg">Access Denied</AlertTitle>
            <AlertDescription className="text-red-700">
              <p className="mb-4">You don't have permission to access the Command Center. This area is restricted to admin users only.</p>
              <Button 
                variant="outline" 
                className="border-red-300 text-red-700 hover:bg-red-100"
                onClick={() => navigate("/")}
              >
                Return to Home
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null; // Safety check - shouldn't reach here
  }

  return (
    <Layout>
      <CommandCenterLayout>
        <div className="container px-4 py-6 w-full max-w-full overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                Welcome back, {userProfile?.full_name || 'Admin'} 👋
              </h1>
              <p className="text-sm text-muted-foreground">
                Command Center Dashboard • Private Admin View
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
              Private Mode
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full overflow-x-auto flex-nowrap mb-6 p-1 bg-muted/20">
              <TabsTrigger value="overview" className="flex-1 whitespace-nowrap">User Overview</TabsTrigger>
              <TabsTrigger value="activity" className="flex-1 whitespace-nowrap">Recent Activity</TabsTrigger>
              <TabsTrigger value="metrics" className="flex-1 whitespace-nowrap">Live Metrics</TabsTrigger>
              <TabsTrigger value="revenue" className="flex-1 whitespace-nowrap">Referrals</TabsTrigger>
              <TabsTrigger value="tools" className="flex-1 whitespace-nowrap">Founder Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 w-full">
              <UserOverview />
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-6 w-full">
              <RecentActivity />
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-6 w-full">
              <LiveMetrics />
            </TabsContent>
            
            <TabsContent value="revenue" className="space-y-6 w-full">
              <ReferralsRevenue />
            </TabsContent>
            
            <TabsContent value="tools" className="space-y-6 w-full">
              <InternalTools />
            </TabsContent>
          </Tabs>
        </div>
      </CommandCenterLayout>
    </Layout>
  );
};

export default CommandCenter;
