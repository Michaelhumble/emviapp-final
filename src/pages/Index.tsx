import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ClientSuccessStories from "@/components/home/ClientSuccessStories";
import Testimonials from "@/components/home/Testimonials";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { useRoleSelection } from "@/hooks/useRoleSelection";
import AIPowerhouse from "@/components/home/AIPowerhouse";
import AITeam from "@/components/home/AITeam";
import TrustFirstPanel from "@/components/home/TrustFirstPanel";
import MissingPieceSection from "@/components/home/missing-piece";
import { runListingsVerification } from "@/utils/runListingsVerification";
import HomepageSEO from "@/components/seo/HomepageSEO";

// Enhanced homepage components
import AIMatchmakerSection from "@/components/home/ai-matchmaker";
import FounderMessage from "@/components/home/FounderMessage";
import FinalFounderCTA from "@/components/home/FinalFounderCTA";
import SalonClientGrowthSystem from "@/components/home/SalonClientGrowthSystem";
import WhyTrustSection from "@/components/home/sections/WhyTrustSection";
import WhatYouCanDoSection from "@/components/home/sections/WhatYouCanDoSection";
import EmviQASection from "@/components/home/EmviQASection";

// Jobs-related components
import JobsCallToAction from "@/components/home/JobsCallToAction";
import JobsFooterCTA from "@/components/home/JobsFooterCTA";

// Premium Industry Showcase - Optimized for performance
import OptimizedIndustryListings from "@/components/home/OptimizedIndustryListings";
import ArtistsForHireStrip from "@/components/home/ArtistsForHireStrip";

// Quick Action Buttons for testing
import QuickActionButtons from "@/components/home/QuickActionButtons";

// Trust & Social Proof Components
import LiveStatsBar from "@/components/home/trust/LiveStatsBar";
import TrustBadges from "@/components/home/trust/TrustBadges";
import RealTimeActivity from "@/components/home/trust/RealTimeActivity";
import PartnerLogos from "@/components/home/trust/PartnerLogos";

import CredibilityRibbon from "@/components/home/CredibilityRibbon";
import { isFeatureEnabled } from "@/config/premiumFeatures";

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
    document.title = "Find Nail Artists & Beauty Jobs with AI | EmviApp";
    console.log("Index page loaded");
    
    // Run verification to ensure all listings have proper routing
    runListingsVerification()
      .then(() => console.log("Listings verification completed"))
      .catch(err => console.error("Error in listings verification:", err));
  }, []);
  
  return (
    <Layout>
      <HomepageSEO />
      {/* SEO Content Section - Optimized intro content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
              Find Nail Artists & Beauty Jobs with AI | EmviApp
            </h1>
            <div className="prose prose-lg mx-auto text-slate-700">
              <p className="text-xl leading-relaxed mb-6">
                EmviApp is revolutionizing the beauty industry by connecting talented professionals with their dream opportunities through cutting-edge AI technology. Whether you're a skilled nail artist seeking your next career move, a salon owner looking to hire top talent, or an aspiring beauty professional ready to take the next step, EmviApp is your comprehensive platform for success.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Our AI-powered matching system understands the unique needs of beauty professionals across all specialties - from nail technicians and hair stylists to makeup artists and estheticians. We've built intelligent algorithms that consider your skills, experience, location preferences, and career goals to connect you with opportunities that truly match your potential.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                For salon owners and businesses, EmviApp eliminates the guesswork in hiring. Our platform showcases verified professionals with detailed portfolios, genuine reviews, and comprehensive skill assessments. Find the perfect team member who not only has the technical expertise you need but also aligns with your salon's culture and values.
              </p>
              
              <p className="text-lg leading-relaxed">
                Join thousands of beauty professionals who have already discovered their perfect match through EmviApp. From bustling metropolitan areas to growing suburban markets, we're building a connected community where talent meets opportunity, and careers flourish in the beauty industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Hero section as first */}
      <Hero />
      
      {/* Credibility ribbon under hero */}
      <div className="px-4">
        <CredibilityRibbon />
      </div>
      
      {/* 1.2 Social Media Proof */}
      <section className="py-12 bg-gradient-to-br from-purple-50/50 to-pink-50/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
            Join the EmviApp Community
          </h2>
          <p className="text-gray-600 mb-6">
            Thousands of beauty professionals are growing with EmviApp every day. Read real stories on our social channels.
          </p>
          <div className="flex justify-center items-center gap-8">
            <a href="#" className="text-red-600 hover:text-red-700 transition-colors" aria-label="YouTube">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className="text-black hover:text-gray-700 transition-colors" aria-label="TikTok">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a href="#" className="text-pink-600 hover:text-pink-700 transition-colors" aria-label="Instagram">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-blue-700 hover:text-blue-800 transition-colors" aria-label="LinkedIn">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      {/* 1.5. Jobs Call to Action - Above the fold */}
      <section>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-slate-900 mb-8">Nail & Beauty Jobs</h2>
        <JobsCallToAction />
      </section>
      
      {/* Quick Action Buttons for Testing */}
      <QuickActionButtons />
      
      {/* 1.6 Real-time Activity Feed */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <RealTimeActivity />
        </div>
      </section>
      
      {/* 2. Premium Industry Showcases - Optimized loading with top 3 only */}
      <section>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-slate-900 mb-8">Salons for Sale</h2>
        <OptimizedIndustryListings />
      </section>

      {isFeatureEnabled('SHOW_HOME_METRICS') && (
        <div className="py-12">
          <LiveStatsBar />
        </div>
      )}

      {/* Artists Available for Hire - FOMO strip under industry showcases */}
      <section>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-slate-900 mb-8">Top Artists in Your City</h2>
        <ArtistsForHireStrip />
      </section>

      {/* Trust Badges after industry showcases */}
      <section className="py-12 bg-gradient-to-r from-purple-50/30 to-pink-50/20">
        <div className="container mx-auto px-4 text-center">
          <TrustBadges />
        </div>
      </section>
      
      {/* 3. Why Artists & Salons Trust Us */}
      <WhyTrustSection />
      
      {/* 4. Meet Your AI Matchmaker - NEW PREMIUM SECTION */}
      <AIMatchmakerSection />
      
      {/* 5. What's Really Keeping Your Salon From Growing? */}
      <SalonClientGrowthSystem />
      
      {/* 6. No Matter Your Craft — We Know the Struggle */}
      <ClientSuccessStories />
      
      {/* 7. Let's Experience EmviApp Together - bilingual content */}
      <MissingPieceSection />
      
      {/* 8. Founder Message */}
      <FounderMessage />
      
      {/* 9. Final CTA */}
      <FinalFounderCTA />
      
      {/* 10. EmviApp Community Q&A - NEW SECTION */}
      <EmviQASection />
      
      {/* 10.5. Jobs Footer CTA - Final jobs promotion */}
      <JobsFooterCTA />
      
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
