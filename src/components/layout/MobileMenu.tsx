
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { 
  Menu, 
  X, 
  UserPlus, 
  LogIn, 
  Home, 
  Users, 
  Building2, 
  Briefcase, 
  MessageSquare, 
  User,
  Settings,
  HelpCircle,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import Logo from '@/components/ui/Logo';
import { getLanguagePreference, setLanguagePreference } from '@/utils/languagePreference';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'vi'>(getLanguagePreference());
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (language: 'en' | 'vi') => {
    setLanguagePreference(language);
    setCurrentLanguage(language);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, showWhenSignedIn: true },
    { name: 'Home', path: '/', icon: Home },
    { name: 'Artists', path: '/artists', icon: Users },
    { name: 'Salons', path: '/salons', icon: Building2 },
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
    { name: 'Community', path: '/community', icon: MessageSquare },
    { name: 'About', path: '/about', icon: HelpCircle },
    { name: 'Contact', path: '/contact', icon: User },
  ];

  const filteredNavigationItems = navigationItems.filter(item => 
    !item.showWhenSignedIn || (item.showWhenSignedIn && isSignedIn)
  );

  return (
    <div className="md:hidden">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </DrawerTrigger>
        
        <DrawerContent className="h-[90vh] px-4 pb-4">
          <div className="flex flex-col h-full">
            {/* Header with close button */}
            <div className="flex justify-between items-center py-3 border-b">
              <div className="flex-1" />
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>

            {/* Centered Logo */}
            <div className="flex justify-center py-4">
              <Logo size="medium" showText={true} />
            </div>

            {/* Auth buttons when logged out */}
            {!isSignedIn && (
              <div className="space-y-2 mb-4 px-2">
                <Button
                  onClick={() => handleNavigation(`/auth/signup?redirect=${location.pathname}`)}
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
                <Button
                  onClick={() => handleNavigation(`/auth/login?redirect=${location.pathname}`)}
                  variant="outline"
                  className="w-full h-11 font-medium"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="space-y-2 mb-4 px-2">
              <Button
                onClick={() => handleNavigation('/post-job')}
                className="w-full h-10 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium text-sm"
              >
                Post a Job for Free
              </Button>
              <Button
                onClick={() => handleNavigation('/post-salon')}
                variant="outline"
                className="w-full h-10 font-medium text-sm"
              >
                Post Your Salon
              </Button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 space-y-1 px-2">
              {filteredNavigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    variant="ghost"
                    className="w-full justify-start h-10 text-sm font-medium"
                  >
                    <IconComponent className="w-4 h-4 mr-3" />
                    {item.name}
                  </Button>
                );
              })}
            </div>

            {/* Language Switcher */}
            <div className="px-2 py-4 border-t">
              <div className="flex gap-2">
                <Button
                  onClick={() => handleLanguageChange('en')}
                  variant={currentLanguage === 'en' ? 'default' : 'outline'}
                  className={`flex-1 h-9 text-sm font-medium ${
                    currentLanguage === 'en' 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : ''
                  }`}
                >
                  English
                </Button>
                <Button
                  onClick={() => handleLanguageChange('vi')}
                  variant={currentLanguage === 'vi' ? 'default' : 'outline'}
                  className={`flex-1 h-9 text-sm font-medium ${
                    currentLanguage === 'vi' 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : ''
                  }`}
                >
                  Tiếng Việt
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center py-2">
              <p className="text-xs bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Inspired by Sunshine ☀️
              </p>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
