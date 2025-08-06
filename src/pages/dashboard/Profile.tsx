import React from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import ProfileDashboard from "@/components/dashboard/unified/ProfileDashboard";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";
import ProfileCompletionGuard from "@/components/profile/ProfileCompletionGuard";
import { useAuth } from "@/context/auth";

export default function ProfileDashboardPage() {
  const { userProfile, userRole } = useAuth();
  
  // Dynamic title based on role
  const getPageTitle = () => {
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        return 'Artist Dashboard | EmviApp';
      case 'freelancer':
        return 'Freelancer Dashboard | EmviApp';
      default:
        return 'Profile Dashboard | EmviApp';
    }
  };
  
  return (
    <Layout>
      <Helmet>
        <title>{getPageTitle()}</title>
      </Helmet>
      <ProfileCompletionProvider>
        <ProfileCompletionGuard>
          <div className="container mx-auto px-4 py-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ProfileDashboard />
            </motion.div>
          </div>
        </ProfileCompletionGuard>
      </ProfileCompletionProvider>
    </Layout>
  );
}