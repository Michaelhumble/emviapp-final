
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogIn, Home, Scissors, Building2, Briefcase, Users, Info, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { UserMenu } from './navbar/UserMenu';
import { mainNavigationItems } from '@/components/layout/navbar/config/navigationItems';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggle from '@/components/layout/LanguageToggle';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const currentPath = encodeURIComponent(location.pathname + location.search);

  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { path: '/dashboard', title: 'Dashboard', icon: User },
    { path: '/', title: 'Home', icon: Home },
    { path: '/artists', title: 'Artists', icon: Scissors },
    { path: '/salons', title: 'Salons', icon: Building2 },
    { path: '/jobs', title: 'Jobs', icon: Briefcase },
    { path: '/community', title: 'Community', icon: Users },
    { path: '/about', title: 'About', icon: Info },
    { path: '/contact', title: 'Contact', icon: Phone },
  ];

  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DrawerTrigger>
        
        <DrawerContent className="h-[90vh]">
          <DrawerHeader className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">
                <span className="text-orange-500">M</span>
                <span className="ml-1">Emvi.</span>
                <span className="text-orange-500">App</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={closeMenu}>
              <X className="h-5 w-5" />
            </Button>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {/* Auth Section */}
            {!user && (
              <div className="space-y-3 mb-6">
                <Link to={`/auth/signup?redirect=${currentPath}`} onClick={closeMenu}>
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 rounded-lg h-12 text-base font-medium flex items-center justify-center gap-2">
                    <User className="h-5 w-5" />
                    Sign Up
                  </Button>
                </Link>
                <Link to={`/sign-in?redirect=${currentPath}`} onClick={closeMenu}>
                  <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg h-12 text-base font-medium flex items-center justify-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </Button>
                </Link>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="space-y-1 mb-6">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? "text-purple-700 bg-purple-50"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    {t({
                      english: item.title,
                      vietnamese: item.title
                    })}
                  </Link>
                );
              })}
            </nav>

            {/* User Menu for authenticated users */}
            {user && (
              <div className="mb-6">
                <UserMenu />
              </div>
            )}

            {/* Post Job Button */}
            <div className="mb-6">
              <Button 
                onClick={closeMenu}
                className="w-full bg-purple-600 text-white hover:bg-purple-700 rounded-lg mb-3"
                asChild
              >
                <Link to={user ? "/post-job" : "/sign-in"}>
                  {t("Post a Job for Free")}
                </Link>
              </Button>

              {/* Post Your Salon Button */}
              <PostYourSalonButton 
                variant="outline" 
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                onClose={closeMenu}
              />
            </div>

            {/* Language Section */}
            <div className="border-t pt-4 mb-6">
              <div className="mb-3">
                <span className="text-sm font-medium text-gray-700">Language</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                <Globe className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">English</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center py-4">
              <span className="text-sm text-orange-500 font-medium">
                Inspired by Sunshine ☀️
              </span>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileMenu;
