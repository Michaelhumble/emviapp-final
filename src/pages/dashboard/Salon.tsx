
import React, { useEffect } from "react";
import { useAuth } from "@/context/auth";
import { SalonProvider } from "@/context/salon";
import Layout from "@/components/layout/Layout";
import SalonOwnerDashboard from "@/components/dashboard/salon/SalonOwnerDashboard";

const SalonDashboardPage = () => {
  const { userProfile, userRole, user } = useAuth();
  
  // GIANT DEBUG BANNER AND CONSOLE LOG
  console.log('🚨 RENDERING DASHBOARD FOR ROLE:', userRole, '— USING FILE: Salon.tsx (src/pages/dashboard/Salon.tsx) -> SalonOwnerDashboard.tsx');
  
  useEffect(() => {
    document.title = "Salon Dashboard | EmviApp";
  }, []);

  return (
    <Layout>
      <SalonProvider>
        {/* GIANT DEBUG BANNER */}
        <div className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white py-8 px-6 text-center shadow-xl">
          <h1 className="text-4xl font-black mb-2">🏢 SALON PAGE LOADED</h1>
          <p className="text-xl font-bold">FILE: Salon.tsx</p>
          <p className="text-lg">PATH: src/pages/dashboard/Salon.tsx</p>
          <p className="text-lg">RENDERING: SalonOwnerDashboard.tsx</p>
          <p className="text-lg">USER ROLE: {userRole} | USER: {user?.email}</p>
        </div>
        
        <SalonOwnerDashboard />
      </SalonProvider>
    </Layout>
  );
};

export default SalonDashboardPage;
