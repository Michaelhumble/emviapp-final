
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import MarketProofSection from "@/components/home/sections/MarketProofSection";
import ArtistTestimonials from "@/components/home/ArtistTestimonials";
import FeaturedSalons from "@/components/home/FeaturedSalons";
import JobsHighlight from "@/components/home/JobsHighlight";
import ArtistCallout from "@/components/home/ArtistCallout";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { useRoleSelection } from "@/hooks/useRoleSelection";
import AIPowerhouse from "@/components/home/AIPowerhouse";
import AITeam from "@/components/home/AITeam";
import TrustFirstPanel from "@/components/home/TrustFirstPanel";
import FreelancersHighlight from "@/components/home/FreelancersHighlight";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Enhanced homepage components
import DynamicListingGrid from "@/components/home/DynamicListingGrid";
import EmotionalClosingSection from "@/components/home/EmotionalClosingSection";
import FounderMessage from "@/components/home/FounderMessage";
import MissingPieceSection from "@/components/home/missing-piece";
import EnhancedAIFeatures from "@/components/home/EnhancedAIFeatures";
import FinalFounderCTA from "@/components/home/FinalFounderCTA";

const Index = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  const { 
    isRoleModalOpen, 
    setIsRoleModalOpen, 
    hasSelectedRole, 
    isLoading,
    userId
  } = useRoleSelection();
  
  useEffect(() => {
    document.title = "EmviApp | The Beauty Industry Platform";
    console.log("Index page loaded");
  }, []);
  
  return (
    <Layout>
      <Hero />
      
      {/* Early Access Dashboard Link - Made more exciting with VIP styling */}
      <div className="flex justify-center mt-6 mb-10">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden group"
        >
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-all shadow px-8 py-6 rounded-md text-lg relative z-10 overflow-hidden"
            asChild
          >
            <Link to="/early-access-dashboard">
              {/* Animated pulse effect */}
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse"></span>
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-1">
                  <span className="mr-2 text-xl">🚨</span>
                  <span className="font-bold">Exclusive VIP Access — Don't Miss Out!</span>
                </div>
                <span className="text-sm opacity-90">Join thousands securing their future in beauty. Early-bird perks ending soon!</span>
              </div>
            </Link>
          </Button>
          
          {/* VIP Badge */}
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 rotate-12">
            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
              VIP
            </span>
          </div>
        </motion.div>
      </div>
      
      {/* FOUNDER MESSAGE - Always visible and locked in place */}
      <FounderMessage />
      
      <MarketProofSection />
      <ArtistTestimonials />
      <MissingPieceSection />
      <DynamicListingGrid />
      <EnhancedAIFeatures />
      <FreelancersHighlight />
      <TrustFirstPanel />
      <FeaturedSalons />
      <JobsHighlight />
      <ArtistCallout />
      <Testimonials />
      <EmotionalClosingSection />
      <FinalFounderCTA />
      <CallToAction />
      
      {user && userId && (
        <RoleSelectionModal 
          open={isRoleModalOpen} 
          onOpenChange={setIsRoleModalOpen} 
          userId={userId} 
        />
      )}
    </Layout>
  );
};

export default Index;
