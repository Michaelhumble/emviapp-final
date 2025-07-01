
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Home, Users, Building2, Briefcase, MessageSquare, Info, Phone, User, LogIn } from 'lucide-react';
import { useAuth } from '@/context/auth';
import EmviLogo from '@/components/branding/EmviLogo';
import { useTranslation } from '@/hooks/useTranslation';

interface MobileMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen = false, onClose = () => {} }) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const { t, currentLanguage, toggleLanguage } = useTranslation();

  const handleLinkClick = () => {
    onClose();
  };

  const handleSignUpClick = () => {
    navigate('/sign-up');
    onClose();
  };

  const handleSignInClick = () => {
    navigate('/sign-in');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex h-full flex-col overflow-y-auto">
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center justify-center flex-1">
            <EmviLogo size="medium" showText={true} />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="p-4 space-y-6">
            {/* Auth Buttons - Top Priority */}
            {!isSignedIn && (
              <div className="space-y-3 pb-4 border-b">
                <Button 
                  onClick={handleSignUpClick}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
                <Button 
                  onClick={handleSignInClick}
                  variant="outline" 
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 font-medium py-3"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </div>
            )}

            {/* Dashboard Link for Signed In Users */}
            {isSignedIn && (
              <div className="pb-4 border-b">
                <Link
                  to="/dashboard"
                  onClick={handleLinkClick}
                  className="flex items-center p-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <Building2 className="h-5 w-5 mr-3 text-purple-600" />
                  <span className="font-medium">Dashboard</span>
                </Link>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="space-y-1">
              <Link
                to="/"
                onClick={handleLinkClick}
                className="flex items-center p-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Home className="h-5 w-5 mr-3 text-purple-600" />
                <span>Home</span>
              </Link>
              
              <Link
                to="/artists"
                onClick={handleLinkClick}
                className="flex items-center p-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Users className="h-5 w-5 mr-3 text-purple-600" />
                <span>Artists</span>
              </Link>
              
              <Link
                to="/salons"
                onClick={handleLinkClick}
                className="flex items-center p-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Building2 className="h-5 w-5 mr-3 text-purple-600" />
                <span>Salons</span>
              </Link>
              
              <Link
                to="/jobs"
                onClick={handleLinkClick}
                className="flex items-center p-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Briefcase className="h-5 w-5 mr-3 text-purple-600" />
                <span>Jobs</span>
              </Link>
              
              <Link
                to="/community"
                onClick={handleLinkClick}
                className="flex items-center p-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <MessageSquare className="h-5 w-5 mr-3 text-purple-600" />
                <span>Community</span>
              </Link>
              
              <Link
                to="/about"
                onClick={handleLinkClick}
                className="flex items-center p-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Info className="h-5 w-5 mr-3 text-purple-600" />
                <span>About</span>
              </Link>
              
              <Link
                to="/contact"
                onClick={handleLinkClick}
                className="flex items-center p-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Phone className="h-5 w-5 mr-3 text-purple-600" />
                <span>Contact</span>
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4 border-t">
              <Link to="/posting/job" onClick={handleLinkClick}>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3">
                  {t({
                    english: "Post a Job for Free",
                    vietnamese: "Đăng Việc Miễn Phí"
                  })}
                </Button>
              </Link>
              
              <Link to="/posting/salon" onClick={handleLinkClick}>
                <Button 
                  variant="outline" 
                  className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 font-medium py-3"
                >
                  {t({
                    english: "Post Your Salon",
                    vietnamese: "Đăng Bán Tiệm"
                  })}
                </Button>
              </Link>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="p-4 border-t bg-gray-50">
            {/* Language Switcher */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2 text-center">Language</p>
              <div className="flex space-x-2">
                <button
                  onClick={toggleLanguage}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    currentLanguage === 'en'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={toggleLanguage}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    currentLanguage === 'vi'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  Tiếng Việt
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500">
              Inspired by Sunshine ☀️
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
