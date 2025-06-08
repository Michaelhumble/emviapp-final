
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
  
  // 🔍 TEMPORARY DEBUGGING - Remove after testing
  console.log('DEBUG: userRole =', userRole);
  console.log('DEBUG: userProfile =', userProfile);
  console.log('DEBUG: loading =', loading);
  
  // 🔧 TEMPORARY ROLE OVERRIDE FOR TESTING - Uncomment one at a time to test
  // const overrideRole = 'artist';
  // const overrideRole = 'salon';
  // const overrideRole = 'freelancer';
  // const overrideRole = 'customer';
  
  // Use override role if defined, otherwise use real userRole
  // const effectiveRole = overrideRole || userRole;
  const effectiveRole = userRole; // Using real role for now
  
  console.log('DEBUG: effectiveRole =', effectiveRole);

  console.log("🔍 ROLE SPECIFIC PROFILE DEBUG:", { userRole: effectiveRole, userProfile, loading });
  console.log("🔍 RoleSpecificProfile Component - About to route to:", effectiveRole);

  if (loading) {
    console.log("🔍 LOADING STATE: Still loading auth data");
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
    console.log("🔍 NO USER PROFILE: userProfile is null or undefined");
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
          <p className="text-gray-600">Please complete your profile setup to continue.</p>
        </div>
      </div>
    );
  }

  // Debug banner for RoleSpecificProfile routing
  const debugRoutingInfo = (
    <div className="w-full py-3 px-6 mb-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
      <p className="text-center font-bold text-yellow-800">
        🔍 ROUTING DEBUG: Role = "{effectiveRole}" | Will load: {
          effectiveRole === 'artist' || effectiveRole === 'nail technician/artist' ? 'ArtistProfile.tsx' :
          effectiveRole === 'salon' || effectiveRole === 'owner' ? 'SalonProfile.tsx' :
          effectiveRole === 'freelancer' ? 'FreelancerProfile.tsx' :
          'PremiumCustomerProfile.tsx (Customer)'
        }
      </p>
    </div>
  );

  // Render appropriate profile based on user role
  const renderRoleProfile = () => {
    console.log("🎯 RENDERING PROFILE FOR ROLE:", effectiveRole);
    
    switch (effectiveRole) {
      case 'artist':
      case 'nail technician/artist':
        console.log("✅ ROUTING TO: ArtistProfile component");
        return (
          <>
            {debugRoutingInfo}
            <ArtistProfile />
          </>
        );
      
      case 'salon':
      case 'owner':
        console.log("✅ ROUTING TO: SalonProfile component");
        return (
          <>
            {debugRoutingInfo}
            <SalonProfile />
          </>
        );
      
      case 'freelancer':
        console.log("✅ ROUTING TO: FreelancerProfile component");
        return (
          <>
            {debugRoutingInfo}
            <FreelancerProfile />
          </>
        );
      
      case 'customer':
      default:
        console.log("✅ ROUTING TO: PremiumCustomerProfile component (Customer)");
        return (
          <>
            {debugRoutingInfo}
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
