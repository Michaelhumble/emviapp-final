
import React from "react";
import { Button } from "@/components/ui/button";
import { X, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import LanguagePreference from "@/components/common/LanguagePreference";
import { PostYourSalonButton } from "@/components/buttons/PostYourSalonButton";

// Customer engagement components
import { CustomerProfileSummary } from "@/components/customer/mobile/CustomerProfileSummary";
import { ReferralTeaser } from "@/components/customer/mobile/ReferralTeaser";
import { MysteryRewardClaim } from "@/components/customer/mobile/MysteryRewardClaim";
import { BeautyJourneyShare } from "@/components/customer/mobile/BeautyJourneyShare";
import { FeatureSuggestionButton } from "@/components/customer/mobile/FeatureSuggestionButton";
import { SocialProofStats } from "@/components/customer/mobile/SocialProofStats";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();

  // Debug log to check user role
  console.log("MobileMenu - Current user role:", userRole);
  console.log("MobileMenu - Current user:", user?.email);

  // More explicit customer detection
  const isCustomer = userRole === 'customer' || userRole === 'Customer';
  
  // Debug log to verify customer detection
  console.log("MobileMenu - Is customer:", isCustomer);

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
      navigate('/');
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

        <div className="flex flex-col">
          {/* Customer Test Banner and Engagement Sections - Only for customers */}
          {isCustomer && (
            <>
              {/* VISUAL TEST BANNER */}
              <div className="px-4 py-4 bg-gradient-to-r from-purple-600 to-pink-600 border-b border-gray-100">
                <div className="text-center">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                    🚀 CUSTOMER VIRAL MENU TEST 🚀
                  </h3>
                  <p className="text-purple-100 text-xs mt-1">
                    This is the new engagement section!
                  </p>
                </div>
              </div>

              {/* Customer Profile Summary */}
              <CustomerProfileSummary />

              {/* Referral Teaser */}
              <ReferralTeaser />

              {/* Mystery Reward Claim */}
              <MysteryRewardClaim />

              {/* Beauty Journey Share */}
              <BeautyJourneyShare />

              {/* Feature Suggestion Button */}
              <FeatureSuggestionButton />

              {/* Social Proof Stats */}
              <SocialProofStats />
            </>
          )}

          {/* Business Posting Actions - Only for non-customers */}
          {!isCustomer && (
            <div className="px-4 py-3 border-b border-gray-100">
              <PostYourSalonButton />
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex-1 py-4">
            <nav className="space-y-1">
              <button
                onClick={() => handleNavigation('/dashboard')}
                className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50"
              >
                <User className="h-5 w-5 mr-3" />
                Dashboard
              </button>
              
              <button
                onClick={() => handleNavigation('/')}
                className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50"
              >
                <span className="h-5 w-5 mr-3">🏠</span>
                Home
              </button>

              <button
                onClick={() => handleNavigation('/artists')}
                className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50"
              >
                <span className="h-5 w-5 mr-3">✨</span>
                Artists
              </button>

              <button
                onClick={() => handleNavigation('/salons')}
                className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50"
              >
                <span className="h-5 w-5 mr-3">🏢</span>
                Salons
              </button>

              <button
                onClick={() => handleNavigation('/jobs')}
                className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50"
              >
                <span className="h-5 w-5 mr-3">💼</span>
                Jobs
              </button>

              <button
                onClick={() => handleNavigation('/community')}
                className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50"
              >
                <span className="h-5 w-5 mr-3">👥</span>
                Community
              </button>

              <button
                onClick={() => handleNavigation('/about')}
                className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50"
              >
                <span className="h-5 w-5 mr-3">ℹ️</span>
                About
              </button>
            </nav>
          </div>

          {/* Footer Actions */}
          <div className="mt-auto">
            <div className="px-4 py-3 border-t border-gray-100">
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>

            <div className="px-4 py-3 border-t border-gray-100">
              <LanguagePreference />
            </div>

            <div className="px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 text-center">
              <p className="text-xs text-orange-600 font-medium">
                Inspired by Sunshine ☀️
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
