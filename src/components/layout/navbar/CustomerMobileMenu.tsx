
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, User, Search, Briefcase, Users, MessageCircle, 
  Info, Phone, Globe, LogOut, Sparkles 
} from "lucide-react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageToggle from "@/components/ui/LanguageToggle";

// Customer viral engagement components
import CustomerProfileSummary from "@/components/customer/mobile/CustomerProfileSummary";
import ReferralTeaser from "@/components/customer/mobile/ReferralTeaser";
import MysteryRewardClaim from "@/components/customer/mobile/MysteryRewardClaim";
import BeautyJourneyShare from "@/components/customer/mobile/BeautyJourneyShare";
import FeatureSuggestionButton from "@/components/customer/mobile/FeatureSuggestionButton";
import SocialProofStats from "@/components/customer/mobile/SocialProofStats";

interface CustomerMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerMobileMenu = ({ isOpen, onClose }: CustomerMobileMenuProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { t, toggleLanguage } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    onClose();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
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
        
        {/* Navigation Links */}
        <div className="p-4 space-y-3 border-t border-gray-100">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/dashboard/customer')}
          >
            <Home className="h-4 w-4 mr-3" />
            {t("Dashboard")}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/')}
          >
            <Home className="h-4 w-4 mr-3" />
            {t("Home")}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/artists')}
          >
            <User className="h-4 w-4 mr-3" />
            {t("Artists")}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/salons')}
          >
            <Search className="h-4 w-4 mr-3" />
            {t("Salons")}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/jobs')}
          >
            <Briefcase className="h-4 w-4 mr-3" />
            {t("Jobs")}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/community')}
          >
            <Users className="h-4 w-4 mr-3" />
            {t("Community")}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/about')}
          >
            <Info className="h-4 w-4 mr-3" />
            {t("About")}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/contact')}
          >
            <Phone className="h-4 w-4 mr-3" />
            {t("Contact")}
          </Button>
        </div>

        {/* Language Toggle */}
        <div className="px-4 py-3 border-t border-gray-100">
          <LanguageToggle />
        </div>

        {/* Sign Out */}
        <div className="px-4 py-3 border-t border-gray-100">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-3" />
            {t("Sign Out")}
          </Button>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-center text-xs text-gray-500">
            <Sparkles className="h-3 w-3 mr-1 text-yellow-500" />
            Inspired by Sunshine
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerMobileMenu;
