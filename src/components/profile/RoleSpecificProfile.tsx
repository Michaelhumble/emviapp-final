
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
  
  // 🚨 ENHANCED DEBUGGING - Force print to console
  console.log('🚨 URGENT DEBUG: userRole =', userRole);
  console.log('🚨 URGENT DEBUG: userProfile =', userProfile);
  console.log('🚨 URGENT DEBUG: loading =', loading);
  console.log('🚨 URGENT DEBUG: typeof userRole =', typeof userRole);
  console.log('🚨 URGENT DEBUG: userRole === null?', userRole === null);
  console.log('🚨 URGENT DEBUG: userRole === undefined?', userRole === undefined);
  
  // 🔧 TEMPORARY ROLE OVERRIDE FOR TESTING - Uncomment one at a time to test
  // const overrideRole = 'artist';
  // const overrideRole = 'salon';
  // const overrideRole = 'freelancer';
  // const overrideRole = 'customer';
  
  // Use override role if defined, otherwise use real userRole
  // const effectiveRole = overrideRole || userRole;
  const effectiveRole = userRole; // Using real role for now
  
  console.log('🎯 FINAL EFFECTIVE ROLE =', effectiveRole);
  console.log('🎯 EFFECTIVE ROLE TYPE =', typeof effectiveRole);
  console.log('🎯 ABOUT TO RENDER COMPONENT FOR ROLE:', effectiveRole);

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

  // GIANT debug banner for routing info
  const giantDebugBanner = (
    <div className="w-full py-8 px-6 mb-6 bg-yellow-200 border-4 border-yellow-600 rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-4xl font-black text-yellow-900 mb-4">🚨 ROUTING DEBUG 🚨</h1>
        <p className="text-2xl font-bold text-yellow-800 mb-2">
          Detected Role: "{effectiveRole || 'NULL/UNDEFINED'}"
        </p>
        <p className="text-xl font-semibold text-yellow-700 mb-2">
          Role Type: {typeof effectiveRole}
        </p>
        <p className="text-lg font-medium text-yellow-700">
          Will Route To: {
            effectiveRole === 'artist' || effectiveRole === 'nail technician/artist' ? 'ArtistProfile.tsx' :
            effectiveRole === 'salon' || effectiveRole === 'owner' ? 'SalonProfile.tsx' :
            effectiveRole === 'freelancer' ? 'FreelancerProfile.tsx' :
            'PremiumCustomerProfile.tsx (Customer Default)'
          }
        </p>
      </div>
    </div>
  );

  // Render appropriate profile based on user role
  const renderRoleProfile = () => {
    console.log("🎯 RENDERING PROFILE FOR ROLE:", effectiveRole);
    console.log("🎯 SWITCH STATEMENT EVALUATION:");
    console.log("  - effectiveRole === 'artist':", effectiveRole === 'artist');
    console.log("  - effectiveRole === 'nail technician/artist':", effectiveRole === 'nail technician/artist');
    console.log("  - effectiveRole === 'salon':", effectiveRole === 'salon');
    console.log("  - effectiveRole === 'owner':", effectiveRole === 'owner');
    console.log("  - effectiveRole === 'freelancer':", effectiveRole === 'freelancer');
    console.log("  - effectiveRole === 'customer':", effectiveRole === 'customer');
    
    switch (effectiveRole) {
      case 'artist':
      case 'nail technician/artist':
        console.log("✅ ROUTING TO: ArtistProfile component");
        return (
          <>
            {giantDebugBanner}
            <ArtistProfile />
          </>
        );
      
      case 'salon':
      case 'owner':
        console.log("✅ ROUTING TO: SalonProfile component");
        return (
          <>
            {giantDebugBanner}
            <SalonProfile />
          </>
        );
      
      case 'freelancer':
        console.log("✅ ROUTING TO: FreelancerProfile component");
        return (
          <>
            {giantDebugBanner}
            <FreelancerProfile />
          </>
        );
      
      case 'customer':
      default:
        console.log("✅ ROUTING TO: PremiumCustomerProfile component (Customer)");
        console.log("🔍 DEFAULT CASE HIT - effectiveRole was:", effectiveRole);
        return (
          <>
            {giantDebugBanner}
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
