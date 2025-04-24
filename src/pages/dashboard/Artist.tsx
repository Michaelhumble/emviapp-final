
import React from "react";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";
import ArtistRouteGuard from "@/components/auth/ArtistRouteGuard";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";
import { motion } from "framer-motion";

const ArtistDashboardPage = () => {
  return (
    <Layout>
      <ProfileCompletionProvider>
        <ArtistRouteGuard>
          <div className="container mx-auto px-4 py-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ArtistDashboard />
            </motion.div>
          </div>
        </ArtistRouteGuard>
      </ProfileCompletionProvider>
    </Layout>
  );
};

export default ArtistDashboardPage;
