
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Menu, Home, Users, Building2, Briefcase, MessageSquare, User, Settings, HelpCircle, LogOut, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth';
import { useProfile } from '@/context/profile';
import { useTranslation } from '@/hooks/useTranslation';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { userProfile } = useProfile();
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="md:hidden"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="relative h-full w-80 max-w-sm bg-white shadow-lg">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userProfile?.avatar_url || ''} />
                    <AvatarFallback>
                      {userProfile?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {userProfile?.full_name || user?.email || 'User'}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMenu}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Scrollable Navigation */}
              <div className="flex-1 overflow-y-auto">
                <nav className="space-y-1 p-4">
                  {/* Top Section */}
                  <div className="space-y-1">
                    <button
                      onClick={() => handleNavigation('/')}
                      className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <Home className="h-4 w-4" />
                      <span>{t('Home')}</span>
                    </button>
                    
                    <button
                      onClick={() => handleNavigation('/artists')}
                      className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <Users className="h-4 w-4" />
                      <span>{t('Artists')}</span>
                    </button>
                    
                    <button
                      onClick={() => handleNavigation('/salons')}
                      className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <Building2 className="h-4 w-4" />
                      <span>{t('Salons')}</span>
                    </button>
                    
                    <button
                      onClick={() => handleNavigation('/jobs')}
                      className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <Briefcase className="h-4 w-4" />
                      <span>{t('Jobs')}</span>
                    </button>
                    
                    <button
                      onClick={() => handleNavigation('/community')}
                      className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{t('Community')}</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-2" />

                  {/* Middle Section */}
                  <div className="space-y-1">
                    <button
                      onClick={() => handleNavigation('/about')}
                      className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <span>{t('About')}</span>
                    </button>
                    
                    <button
                      onClick={() => handleNavigation('/contact')}
                      className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <span>{t('Contact')}</span>
                    </button>
                    
                    <button
                      onClick={() => handleNavigation('/dashboard')}
                      className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <span>{t('Dashboard')}</span>
                    </button>
                    
                    <button
                      onClick={() => handleNavigation('/messages')}
                      className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{t('Messages')}</span>
                    </button>
                    
                    <button
                      onClick={() => handleNavigation('/profile')}
                      className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4" />
                      <span>{t('Profile')}</span>
                    </button>
                  </div>
                </nav>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4 space-y-2">
                {/* Bottom Section */}
                <button
                  onClick={() => handleNavigation('/settings')}
                  className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4" />
                  <span>{t('Settings')}</span>
                </button>
                
                <button
                  onClick={() => handleNavigation('/help')}
                  className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>{t('Help & Support')}</span>
                </button>
                
                <button
                  onClick={toggleLanguage}
                  className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <Globe className="h-4 w-4" />
                  <span>{language === 'en' ? 'Tiếng Việt' : 'English'}</span>
                </button>
                
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t('Sign Out')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
