
import React from "react";
import { useAuth } from "@/context/auth";
import { motion } from "framer-motion";
import ArtistProfile from "./ArtistProfile";
import SalonProfile from "./SalonProfile";
import FreelancerProfile from "./FreelancerProfile";
import PremiumCustomerProfile from "./customer/PremiumCustomerProfile";
import { Loader2 } from "lucide-react";

const RoleSpecificProfile = () => {
  const { userProfile, userRole, loading } = useAuth();

  console.log("🔍 PROFILE DEBUG:", { userRole, userProfile, loading });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="text-gray-600">Loading your premium profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
          <p className="text-gray-600">Please complete your profile setup to continue.</p>
        </div>
      </div>
    );
  }

  // Debug banner for testing
  const debugBanner = (
    <div className="w-full py-4 px-6 mb-6 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
      <p className="text-center font-bold text-yellow-800">
        🔍 DEBUG: Current Role = "{userRole}" | Loading Profile Component
      </p>
    </div>
  );

  // Render appropriate profile based on user role
  const renderRoleProfile = () => {
    console.log("🎯 Rendering profile for role:", userRole);
    
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        console.log("✅ Loading ArtistProfile component");
        return (
          <>
            {debugBanner}
            <ArtistProfile />
          </>
        );
      
      case 'salon':
      case 'owner':
        console.log("✅ Loading SalonProfile component");
        return (
          <>
            {debugBanner}
            <SalonProfile />
          </>
        );
      
      case 'freelancer':
        console.log("✅ Loading FreelancerProfile component");
        return (
          <>
            {debugBanner}
            <FreelancerProfile />
          </>
        );
      
      case 'customer':
      default:
        console.log("✅ Loading PremiumCustomerProfile component");
        return (
          <>
            {debugBanner}
            <PremiumCustomerProfile userProfile={userProfile} />
          </>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {renderRoleProfile()}
    </motion.div>
  );
};

export default RoleSpecificProfile;
