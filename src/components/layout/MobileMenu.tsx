
import React from 'react';
import { X, User, Home, Users, Store, Briefcase, Search, Settings, Bell, Heart, MessageCircle, Calendar, HelpCircle, Phone, Globe, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggle from '@/components/ui/LanguageToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, userProfile, userRole, signOut, isSignedIn } = useAuth();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success(t("Signed out successfully"));
      onClose();
    } catch (error) {
      toast.error(t("Failed to sign out"));
    }
  };

  const handleNavClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">{t("Menu")}</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* User Section */}
        {isSignedIn && (
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-medium">
                  {userProfile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {userProfile?.full_name || 'User'}
                </p>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <p className="text-xs text-purple-600 capitalize">{userRole}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Section */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3">{t("NAVIGATION")}</h3>
          <nav className="space-y-1">
            <Link
              to="/"
              onClick={handleNavClick}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Home className="h-5 w-5 text-gray-600" />
              <span>{t("Home")}</span>
            </Link>
            <Link
              to="/artists"
              onClick={handleNavClick}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Users className="h-5 w-5 text-gray-600" />
              <span>{t("Artists")}</span>
            </Link>
            <Link
              to="/salons"
              onClick={handleNavClick}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Store className="h-5 w-5 text-gray-600" />
              <span>{t("Salons")}</span>
            </Link>
            <Link
              to="/jobs"
              onClick={handleNavClick}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Briefcase className="h-5 w-5 text-gray-600" />
              <span>{t("Jobs")}</span>
            </Link>
            <Link
              to="/community"
              onClick={handleNavClick}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Users className="h-5 w-5 text-purple-600" />
              <span className="text-purple-600">{t("Community")}</span>
            </Link>
          </nav>
        </div>

        <Separator />

        {/* Quick Actions */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3">{t("QUICK ACTIONS")}</h3>
          <div className="space-y-2">
            <Button
              asChild
              className="w-full justify-start bg-purple-600 hover:bg-purple-700"
            >
              <Link to="/posting/job" onClick={handleNavClick}>
                <span>{t("Post a Job")}</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start"
            >
              <Link to="/posting/salon" onClick={handleNavClick}>
                <span>{t("Post Your Salon")}</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start"
            >
              <Link to="/search" onClick={handleNavClick}>
                <Search className="h-4 w-4 mr-2" />
                <span>{t("Search")}</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Account Section (if signed in) */}
        {isSignedIn && (
          <>
            <Separator />
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">{t("MY ACCOUNT")}</h3>
              <nav className="space-y-1">
                <Link
                  to="/dashboard"
                  onClick={handleNavClick}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <span>{t("Dashboard")}</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={handleNavClick}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <span>{t("My Profile")}</span>
                </Link>
                <Link
                  to="/messages"
                  onClick={handleNavClick}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-gray-600" />
                  <span>{t("Messages")}</span>
                </Link>
                <Link
                  to="/bookings"
                  onClick={handleNavClick}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <span>{t("Bookings")}</span>
                </Link>
                <Link
                  to="/favorites"
                  onClick={handleNavClick}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Heart className="h-5 w-5 text-gray-600" />
                  <span>{t("Favorites")}</span>
                </Link>
                <Link
                  to="/notifications"
                  onClick={handleNavClick}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span>{t("Notifications")}</span>
                </Link>
                <Link
                  to="/settings"
                  onClick={handleNavClick}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Settings className="h-5 w-5 text-gray-600" />
                  <span>{t("Settings")}</span>
                </Link>
              </nav>
            </div>
          </>
        )}

        {/* Support Section */}
        <Separator />
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3">{t("SUPPORT")}</h3>
          <nav className="space-y-1">
            <Link
              to="/about"
              onClick={handleNavClick}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <HelpCircle className="h-5 w-5 text-gray-600" />
              <span>{t("About")}</span>
            </Link>
            <Link
              to="/contact"
              onClick={handleNavClick}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Phone className="h-5 w-5 text-gray-600" />
              <span>{t("Contact")}</span>
            </Link>
          </nav>
        </div>

        {/* Language & Sign Out */}
        <Separator />
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-gray-600" />
              <span className="text-sm">{t("Language")}</span>
            </div>
            <LanguageToggle minimal />
          </div>

          {isSignedIn ? (
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>{t("Sign Out")}</span>
            </Button>
          ) : (
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link to="/auth?mode=signin" onClick={handleNavClick}>
                  {t("Sign In")}
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/auth?mode=signup" onClick={handleNavClick}>
                  {t("Sign Up")}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
