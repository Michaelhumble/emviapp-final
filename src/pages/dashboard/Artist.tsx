
import React from "react";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";
import ProfileCompletionGuard from "@/components/profile/ProfileCompletionGuard";
import { motion } from "framer-motion";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";

const ArtistDashboardPage = () => {
  const { userProfile } = useAuth();
  
  return (
    <Layout>
      <ProfileCompletionProvider>
        <ProfileCompletionGuard>
          <div className="container mx-auto px-4 py-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ArtistDashboard />
            </motion.div>
          </div>
        </ProfileCompletionGuard>
      </ProfileCompletionProvider>
    </Layout>
  );
};

export default ArtistDashboardPage;
