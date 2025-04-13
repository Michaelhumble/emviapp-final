
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import CommandCenterLayout from "@/components/command-center/CommandCenterLayout";
import UserOverview from "@/components/command-center/UserOverview";
import LiveMetrics from "@/components/command-center/LiveMetrics";
import ReferralsRevenue from "@/components/command-center/ReferralsRevenue";
import InternalTools from "@/components/command-center/InternalTools";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const CommandCenter = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

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
          toast.error("Access denied: Admin privileges required");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        toast.error("Something went wrong. Please try again.");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminStatus();
  }, [navigate, userProfile]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-10">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

  if (!isAdmin) {
    return null; // Navigate has already been triggered
  }

  return (
    <Layout>
      <CommandCenterLayout>
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {userProfile?.full_name || 'Michael'} 👋
              </h1>
              <p className="text-muted-foreground">
                Command Center Dashboard • Private Admin View
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
              Private Mode
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="overview">User Overview</TabsTrigger>
              <TabsTrigger value="metrics">Live Metrics</TabsTrigger>
              <TabsTrigger value="revenue">Referrals & Revenue</TabsTrigger>
              <TabsTrigger value="tools">Internal Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <UserOverview />
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-6">
              <LiveMetrics />
            </TabsContent>
            
            <TabsContent value="revenue" className="space-y-6">
              <ReferralsRevenue />
            </TabsContent>
            
            <TabsContent value="tools" className="space-y-6">
              <InternalTools />
            </TabsContent>
          </Tabs>
        </div>
      </CommandCenterLayout>
    </Layout>
  );
};

export default CommandCenter;
