import React, { useEffect } from "react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { getWelcomeImage, getWelcomeMessage, getRoleDisplayName } from "@/components/welcome/utils/roleUtils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Welcome: React.FC = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && userRole) {
      // Redirect authenticated users with roles to their dashboard
      navigate('/dashboard');
    }
  }, [user, userRole, loading, navigate]);

  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
        </div>
      </Layout>
    );
  }

  // Check if user is artist - update role check
  const isArtist = userRole === 'nail-artist' || 
                  userRole === 'hair-stylist' || 
                  userRole === 'lash-tech' || 
                  userRole === 'barber' || 
                  userRole === 'esthetician' || 
                  userRole === 'massage-therapist' || 
                  userRole === 'freelancer';

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:flex"
          >
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:w-48"
                src={getWelcomeImage(userRole)}
                alt="Welcome Image"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Welcome, {user?.email}
              </div>
              <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
                {getRoleDisplayName(userRole)}
              </h2>
              <p className="mt-2 text-gray-500">
                {getWelcomeMessage(userRole)}
              </p>
              <div className="mt-4">
                <Button onClick={() => navigate('/profile/edit')}>
                  Complete Profile <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
