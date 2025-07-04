
import React from "react";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import PremiumCustomerProfile from "@/components/profile/customer/PremiumCustomerProfile";
import { Loader2 } from "lucide-react";

const CustomerProfilePage = () => {
  const { userProfile, userRole, loading, isSignedIn } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <p className="text-gray-600">Loading your customer profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (userRole !== 'customer') {
    return <Navigate to="/profile" replace />;
  }

  if (!userProfile) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
            <p className="text-gray-600">Please complete your profile setup to continue.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
      >
        <PremiumCustomerProfile userProfile={userProfile} />
      </motion.div>
    </Layout>
  );
};

export default CustomerProfilePage;
