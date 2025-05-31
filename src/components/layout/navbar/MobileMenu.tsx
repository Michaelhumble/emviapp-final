
import React from "react";
import { Link } from "react-router-dom";
import { X, Menu, User, LogOut, Globe, Briefcase, Building2, Users, MessageSquare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth";
import { useTranslation } from "@/hooks/useTranslation";
import PostYourJobButton from "@/components/buttons/PostYourJobButton";
import PostYourSalonButton from "@/components/buttons/PostYourSalonButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, logout } = useAuth();
  const { t, isVietnamese, toggleLanguage } = useTranslation();

  if (!isOpen) return null;

  const handleLanguageToggle = () => {
    toggleLanguage();
    onClose();
  };

  const handleSignOut = () => {
    logout();
    onClose();
  };

  const handleNavClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Link to="/" onClick={onClose} className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="font-serif text-lg font-bold">EmviApp</span>
        </Link>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex flex-col h-full">
        <div className="flex-1 px-4 py-6 space-y-6">
          {/* CTAs */}
          <div className="space-y-3">
            <PostYourJobButton size="sm" className="w-full justify-center text-sm py-2" />
            <div onClick={handleNavClick}>
              <PostYourSalonButton size="sm" variant="outline" className="w-full justify-center text-sm py-2" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <Link
              to="/jobs"
              onClick={handleNavClick}
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm"
            >
              <Briefcase className="h-4 w-4 mr-3" />
              {t({ english: "Jobs", vietnamese: "Việc Làm" })}
            </Link>
            <Link
              to="/salons"
              onClick={handleNavClick}
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm"
            >
              <Building2 className="h-4 w-4 mr-3" />
              {t({ english: "Salons", vietnamese: "Tiệm Nail" })}
            </Link>
            <Link
              to="/booths"
              onClick={handleNavClick}
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm"
            >
              <Users className="h-4 w-4 mr-3" />
              {t({ english: "Booths", vietnamese: "Booth Thuê" })}
            </Link>
          </nav>

          {/* User Section */}
          {user ? (
            <div className="space-y-1 pt-4 border-t">
              <Link
                to="/dashboard"
                onClick={handleNavClick}
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm"
              >
                <User className="h-4 w-4 mr-3" />
                {t({ english: "Dashboard", vietnamese: "Bảng Điều Khiển" })}
              </Link>
              <Link
                to="/messages"
                onClick={handleNavClick}
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm"
              >
                <MessageSquare className="h-4 w-4 mr-3" />
                {t({ english: "Messages", vietnamese: "Tin Nhắn" })}
              </Link>
              <Link
                to="/profile"
                onClick={handleNavClick}
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm"
              >
                <Settings className="h-4 w-4 mr-3" />
                {t({ english: "Profile", vietnamese: "Hồ Sơ" })}
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm"
              >
                <LogOut className="h-4 w-4 mr-3" />
                {t({ english: "Sign Out", vietnamese: "Đăng Xuất" })}
              </button>
            </div>
          ) : (
            <div className="space-y-3 pt-4 border-t">
              <Link
                to="/auth/signin"
                onClick={handleNavClick}
                className="flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
              >
                {t({ english: "Sign In", vietnamese: "Đăng Nhập" })}
              </Link>
              <Link
                to="/auth/signup"
                onClick={handleNavClick}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm"
              >
                {t({ english: "Sign Up", vietnamese: "Đăng Ký" })}
              </Link>
            </div>
          )}

          {/* Language Toggle */}
          <button
            onClick={handleLanguageToggle}
            className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm w-full"
          >
            <Globe className="h-4 w-4 mr-3" />
            {isVietnamese ? 'English' : 'Tiếng Việt'}
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t bg-gray-50">
          <p className="text-center text-xs text-gray-500">
            Inspired by Sunshine ☀️
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
