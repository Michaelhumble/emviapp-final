
import React, { useEffect } from "react";
import { useAuth } from "@/context/auth";
import { SalonProvider } from "@/context/salon";
import Layout from "@/components/layout/Layout";
import SalonOwnerDashboardWidgets from "@/components/dashboard/salon/SalonOwnerDashboardWidgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileCompletionBar from "@/components/profile/ProfileCompletionBar";

const SalonDashboardPage = () => {
  const { userProfile } = useAuth();
  
  useEffect(() => {
    document.title = "Premium Salon Dashboard | EmviApp";
  }, []);

  console.log('🏪 SALON DASHBOARD PAGE LOADED - SHOULD SHOW PREMIUM WIDGETS');

  return (
    <Layout>
      {/* GIANT PREMIUM DASHBOARD BANNER */}
      <div className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-6 text-3xl font-bold shadow-lg">
        🏆 PREMIUM SALON OWNER DASHBOARD 🏆
        <div className="text-lg font-normal mt-2">SalonOwnerDashboardWidgets.tsx is now active</div>
      </div>
      
      <SalonProvider>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="space-y-4">
                <ProfileCompletionBar />
                
                <Card className="border-muted shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-playfair">
                      {userProfile?.salon_name || "Your Premium Salon"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground font-inter">
                      {userProfile?.bio || "Welcome to your premium salon dashboard with advanced features."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Main Content - Premium Dashboard */}
            <div className="md:col-span-3">
              <SalonOwnerDashboardWidgets />
            </div>
          </div>
        </div>
      </SalonProvider>
    </Layout>
  );
};

export default SalonDashboardPage;
