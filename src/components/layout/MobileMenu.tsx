
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Home, Users, Building, Briefcase, MessageSquare, User, Settings, HelpCircle, LogOut, Mail, Heart, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useProfile } from '@/context/profile';
import { useTranslation } from '@/hooks/useTranslation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, signOut } = useAuth();
  const profile = useProfile();
  const { t, toggleLanguage, currentLanguage } = useTranslation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    onClose();
    navigate('/');
  };

  const handleLinkClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header with user info */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              {user && (
                <>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url || ''} />
                    <AvatarFallback>
                      {profile?.full_name ? profile.full_name.charAt(0) : user.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {profile?.full_name || user.email}
                    </span>
                    {profile?.full_name && (
                      <span className="text-xs text-gray-500 truncate">
                        {user.email}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="flex-shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4 space-y-1">
              {/* Top Section */}
              <div className="space-y-1 mb-6">
                <Link
                  to="/"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  <Home className="mr-3 h-5 w-5" />
                  {t('Home')}
                </Link>
                
                <Link
                  to="/artists"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  <Users className="mr-3 h-5 w-5" />
                  {t('Artists')}
                </Link>
                
                <Link
                  to="/salons"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  <Building className="mr-3 h-5 w-5" />
                  {t('Salons')}
                </Link>
                
                <Link
                  to="/jobs"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  <Briefcase className="mr-3 h-5 w-5" />
                  {t('Jobs')}
                </Link>
                
                <Link
                  to="/community"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  <Heart className="mr-3 h-5 w-5" />
                  {t('Community')}
                </Link>
              </div>

              {/* Middle Section */}
              <div className="space-y-1 mb-6 pt-4 border-t border-gray-200">
                <Link
                  to="/about"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  <Info className="mr-3 h-5 w-5" />
                  {t('About')}
                </Link>
                
                <Link
                  to="/contact"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  <Mail className="mr-3 h-5 w-5" />
                  {t('Contact')}
                </Link>

                {user && (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      <Building className="mr-3 h-5 w-5" />
                      {t('Dashboard')}
                    </Link>
                    
                    <Link
                      to="/messages"
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      <MessageSquare className="mr-3 h-5 w-5" />
                      {t('Messages')}
                    </Link>
                    
                    <Link
                      to="/profile"
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      <User className="mr-3 h-5 w-5" />
                      {t('Profile')}
                    </Link>
                  </>
                )}
              </div>

              {/* Bottom Section */}
              <div className="space-y-1 pt-4 border-t border-gray-200">
                {user && (
                  <Link
                    to="/settings"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                    onClick={handleLinkClick}
                  >
                    <Settings className="mr-3 h-5 w-5" />
                    {t('Settings')}
                  </Link>
                )}
                
                <button
                  className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                  onClick={() => {
                    // Help & Support functionality can be added here
                    handleLinkClick();
                  }}
                >
                  <HelpCircle className="mr-3 h-5 w-5" />
                  {t('Help & Support')}
                </button>
              </div>
            </nav>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 space-y-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
            >
              <span>{t('Language')}</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {currentLanguage === 'vi' ? 'VI' : 'EN'}
              </span>
            </button>

            {/* Sign Out */}
            {user && (
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="w-full justify-start"
              >
                <LogOut className="mr-3 h-4 w-4" />
                {t('Sign Out')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
