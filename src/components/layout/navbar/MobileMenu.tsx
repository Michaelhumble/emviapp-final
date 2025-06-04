
import React, { useState } from "react";
import { Menu, X, User, Home, Briefcase, Store, Users, Info, Mail, Globe, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { useUserRole } from "@/hooks/useUserRole";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import PostYourSalonButton from "@/components/buttons/PostYourSalonButton";
import LanguageToggle from "@/components/ui/LanguageToggle";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { userRole } = useUserRole(user?.id);
  const { t, currentLanguage, toggleLanguage } = useTranslation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate("/");
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  const onPostJobClick = () => {
    navigate("/post-job");
    setIsOpen(false);
  };

  // Strict role check - customers should NEVER see business posting actions
  const isCustomer = userRole === 'customer';

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
      
      {/* Menu Panel */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {user ? (
                <>
                  {/* Business Actions (ONLY for non-customers) */}
                  {!isCustomer && (
                    <div className="space-y-2 pb-4 border-b border-gray-100">
                      <Button 
                        onClick={onPostJobClick} 
                        className="w-full justify-start bg-purple-600 text-white hover:bg-purple-700"
                      >
                        <Briefcase className="h-4 w-4 mr-3" />
                        {t("Post a Job for Free")}
                      </Button>
                      
                      <PostYourSalonButton 
                        variant="outline" 
                        className="w-full justify-start border-purple-600 text-purple-600 hover:bg-purple-50"
                        onClose={() => setIsOpen(false)}
                      />
                    </div>
                  )}

                  {/* User Menu Items (for all authenticated users) */}
                  <Link
                    to="/profile"
                    onClick={handleMenuItemClick}
                    className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <User className="h-4 w-4 mr-3" />
                    {t("Profile")}
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={handleMenuItemClick}
                    className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Home className="h-4 w-4 mr-3" />
                    {t("Dashboard")}
                  </Link>
                </>
              ) : (
                <>
                  {/* Auth buttons for non-authenticated users */}
                  <Link
                    to="/login"
                    onClick={handleMenuItemClick}
                    className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <User className="h-4 w-4 mr-3" />
                    {t("Sign In")}
                  </Link>
                  
                  <Link
                    to="/sign-up"
                    onClick={handleMenuItemClick}
                    className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <User className="h-4 w-4 mr-3" />
                    {t("Sign Up")}
                  </Link>
                </>
              )}

              {/* Navigation Items (for all users) */}
              <Link
                to="/artists"
                onClick={handleMenuItemClick}
                className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Users className="h-4 w-4 mr-3" />
                {t("Find Artists")}
              </Link>

              <Link
                to="/jobs"
                onClick={handleMenuItemClick}
                className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Briefcase className="h-4 w-4 mr-3" />
                {t("Browse Jobs")}
              </Link>

              <Link
                to="/salons"
                onClick={handleMenuItemClick}
                className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Store className="h-4 w-4 mr-3" />
                {t("Salons for Sale")}
              </Link>

              <Link
                to="/community"
                onClick={handleMenuItemClick}
                className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Users className="h-4 w-4 mr-3" />
                {t("Community")}
              </Link>

              <Link
                to="/about"
                onClick={handleMenuItemClick}
                className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Info className="h-4 w-4 mr-3" />
                {t("About")}
              </Link>

              <Link
                to="/contact"
                onClick={handleMenuItemClick}
                className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Mail className="h-4 w-4 mr-3" />
                {t("Contact")}
              </Link>

              {/* Language Toggle */}
              <div className="flex items-center w-full p-3">
                <Globe className="h-4 w-4 mr-3" />
                <LanguageToggle minimal={true} />
              </div>

              {/* Sign Out (only for authenticated users) */}
              {user && (
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  {t("Sign Out")}
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <div className="text-center text-xs text-gray-500">
              Inspired by Sunshine
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
