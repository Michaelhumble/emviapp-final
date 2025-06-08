
import React from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";
import ProfileCompletionGuard from "@/components/profile/ProfileCompletionGuard";
import { useAuth } from "@/context/auth";

export default function ArtistDashboardPage() {
  const { userProfile } = useAuth();
  
  return (
    <Layout>
      <Helmet>
        <title>Artist Dashboard | EmviApp</title>
      </Helmet>
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
}
