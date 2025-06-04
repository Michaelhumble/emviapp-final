
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, User, Search, Briefcase, Users, MessageCircle, 
  Info, Phone, Globe, LogOut, Plus, Building 
} from "lucide-react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageToggle from "@/components/ui/LanguageToggle";
import CustomerMobileMenu from "./CustomerMobileMenu";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { signOut, userProfile } = useAuth();
  const navigate = useNavigate();
  const { t, toggleLanguage } = useTranslation();

  console.log("MobileMenu - userProfile:", userProfile);
  console.log("MobileMenu - userProfile.role:", userProfile?.role);

  // Route customers to their isolated menu
  if (userProfile?.role?.toLowerCase() === 'customer') {
    return <CustomerMobileMenu isOpen={isOpen} onClose={onClose} />;
  }

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
        {/* Business Menu Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
        </div>

        {/* Business Actions */}
        <div className="p-4 space-y-3 border-b border-gray-100">
          <Button
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            onClick={() => handleNavigation('/post-job')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Post a Job
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleNavigation('/post-salon')}
          >
            <Building className="h-4 w-4 mr-2" />
            Post Your Salon
          </Button>
        </div>

        {/* Navigation Links */}
        <div className="p-4 space-y-3">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/dashboard')}
          >
            <Home className="h-4 w-4 mr-3" />
            Dashboard
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/')}
          >
            <Home className="h-4 w-4 mr-3" />
            Home
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/artists')}
          >
            <User className="h-4 w-4 mr-3" />
            Artists
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/salons')}
          >
            <Search className="h-4 w-4 mr-3" />
            Salons
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/jobs')}
          >
            <Briefcase className="h-4 w-4 mr-3" />
            Jobs
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/messages')}
          >
            <MessageCircle className="h-4 w-4 mr-3" />
            Messages
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/about')}
          >
            <Info className="h-4 w-4 mr-3" />
            About
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('/contact')}
          >
            <Phone className="h-4 w-4 mr-3" />
            Contact
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
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
