
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Home, Users, Building2, Briefcase, MessageSquare, Info, Mail, LayoutDashboard, User, Settings, HelpCircle, Globe, LogOut, Plus, Store } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useProfile } from '@/context/profile';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, signOut, isSignedIn } = useAuth();
  const { userProfile } = useProfile();
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLanguageToggle = () => {
    if (setLanguage) {
      setLanguage(language === 'en' ? 'vi' : 'en');
    }
  };

  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
        {/* Fixed Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          {isSignedIn && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-lg">
                  {userProfile?.display_name?.charAt(0).toUpperCase() || 
                   user?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {userProfile?.display_name || 'User'}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <nav className="space-y-2">
            {/* Main Navigation */}
            <Link
              to="/"
              onClick={() => handleNavigation('/')}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>{t?.home || 'Home'}</span>
            </Link>

            <Link
              to="/artists"
              onClick={() => handleNavigation('/artists')}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>{t?.artists || 'Artists'}</span>
            </Link>

            <Link
              to="/salons"
              onClick={() => handleNavigation('/salons')}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Building2 className="h-5 w-5" />
              <span>{t?.salons || 'Salons'}</span>
            </Link>

            <Link
              to="/jobs"
              onClick={() => handleNavigation('/jobs')}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Briefcase className="h-5 w-5" />
              <span>{t?.jobs || 'Jobs'}</span>
            </Link>

            <Link
              to="/community"
              onClick={() => handleNavigation('/community')}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              <span>{t?.community || 'Community'}</span>
            </Link>

            <Separator />

            {/* Secondary Navigation */}
            <Link
              to="/about"
              onClick={() => handleNavigation('/about')}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Info className="h-5 w-5" />
              <span>{t?.about || 'About'}</span>
            </Link>

            <Link
              to="/contact"
              onClick={() => handleNavigation('/contact')}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>{t?.contact || 'Contact'}</span>
            </Link>

            {isSignedIn && (
              <>
                <Separator />
                
                <Link
                  to="/dashboard"
                  onClick={() => handleNavigation('/dashboard')}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>{t?.dashboard || 'Dashboard'}</span>
                </Link>

                <Link
                  to="/messages"
                  onClick={() => handleNavigation('/messages')}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>{t?.messages || 'Messages'}</span>
                </Link>

                <Link
                  to="/profile/edit"
                  onClick={() => handleNavigation('/profile/edit')}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>{t?.profile || 'Profile'}</span>
                </Link>

                <Separator />

                {/* Action Buttons */}
                <Link
                  to="/post-job"
                  onClick={() => handleNavigation('/post-job')}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-purple-700 hover:bg-purple-50 transition-colors border border-purple-200 font-medium"
                >
                  <Plus className="h-5 w-5" />
                  <span>Post a Job for Free</span>
                </Link>

                <Link
                  to="/post-salon"
                  onClick={() => handleNavigation('/post-salon')}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-amber-700 hover:bg-amber-50 transition-colors border border-amber-200 font-medium"
                >
                  <Store className="h-5 w-5" />
                  <span>Post Your Salon</span>
                </Link>

                <Separator />

                <Link
                  to="/settings"
                  onClick={() => handleNavigation('/settings')}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>{t?.settings || 'Settings'}</span>
                </Link>
              </>
            )}

            <Link
              to="/help"
              onClick={() => handleNavigation('/help')}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              <span>{t?.help || 'Help & Support'}</span>
            </Link>
          </nav>
        </div>

        {/* Fixed Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          <button
            onClick={handleLanguageToggle}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full"
          >
            <Globe className="h-5 w-5" />
            <span>{language === 'en' ? 'English' : 'Tiếng Việt'}</span>
          </button>

          {isSignedIn ? (
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>{t?.signOut || 'Sign Out'}</span>
            </button>
          ) : (
            <div className="space-y-2">
              <Button
                onClick={() => handleNavigation('/auth/sign-in')}
                className="w-full"
              >
                Sign In
              </Button>
              <Button
                onClick={() => handleNavigation('/auth/sign-up')}
                variant="outline"
                className="w-full"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
