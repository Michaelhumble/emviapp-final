
import React from "react";
import { useAuth } from "@/context/auth";
import { motion } from "framer-motion";
import PremiumArtistProfile from "../artist-profile/PremiumArtistProfile";
import PremiumSalonProfile from "./salon/PremiumSalonProfile";
import PremiumCustomerProfile from "./customer/PremiumCustomerProfile";
import { Loader2 } from "lucide-react";

const RoleSpecificProfile = () => {
  const { userProfile, userRole, loading } = useAuth();

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

  // Render appropriate profile based on user role
  const renderRoleProfile = () => {
    switch (userRole) {
      case 'nail-artist':
      case 'hair-stylist':
      case 'lash-tech':
      case 'barber':
      case 'esthetician':
      case 'massage-therapist':
      case 'freelancer':
        return <PremiumArtistProfile userProfile={userProfile} />;
      
      case 'salon':
      case 'salon-owner':
      case 'owner':
        return <PremiumSalonProfile userProfile={userProfile} />;
      
      case 'customer':
      default:
        return <PremiumCustomerProfile userProfile={userProfile} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
    >
      {renderRoleProfile()}
    </motion.div>
  );
};

export default RoleSpecificProfile;
