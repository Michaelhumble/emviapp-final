
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";

const AccessDenied = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/early-access");
  };

  return (
    <Layout>
      <div className="container max-w-lg py-16 px-4 min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-100 p-4">
              <ShieldAlert className="h-12 w-12 text-red-500" />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Beta Access Required</h1>
          
          <p className="text-gray-600 mb-8">
            Thanks for your interest in EmviApp! Currently, we're in private beta and your 
            account hasn't been approved for access yet.
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={() => navigate("/early-access")}
              className="w-full"
            >
              Request Beta Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="w-full"
            >
              Sign Out
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-8">
            If you believe you should have access, please contact our support team.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AccessDenied;
