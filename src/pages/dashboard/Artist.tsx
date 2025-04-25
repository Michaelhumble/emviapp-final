
import React from "react";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";
import ProfileCompletionGuard from "@/components/profile/ProfileCompletionGuard";
import { motion } from "framer-motion";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";
import ErrorBoundary from "@/components/error-handling/ErrorBoundary";

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
              <ErrorBoundary
                fallback={
                  <div className="p-8 text-center">
                    <h2 className="text-xl font-medium mb-3">Unable to load dashboard</h2>
                    <p className="text-gray-600 mb-4">
                      We encountered an error loading your artist dashboard.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-4 py-2 bg-primary text-white rounded-md"
                    >
                      Try Again
                    </button>
                  </div>
                }
              >
                <ArtistDashboard />
              </ErrorBoundary>
            </motion.div>
          </div>
        </ProfileCompletionGuard>
      </ProfileCompletionProvider>
    </Layout>
  );
};

export default ArtistDashboardPage;
