
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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

  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DrawerTrigger>
        
        <DrawerContent>
          <DrawerHeader className="flex items-center justify-between">
            <DrawerTitle>Menu</DrawerTitle>
            <Button variant="ghost" size="icon" onClick={closeMenu}>
              <X className="h-5 w-5" />
            </Button>
          </DrawerHeader>
          
          <div className="p-4 space-y-4">
            {/* Navigation Links */}
            <nav className="space-y-2">
              {mainNavigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-purple-700 bg-purple-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t({
                    english: item.title,
                    vietnamese: item.vietnameseTitle || item.title
                  })}
                </Link>
              ))}
            </nav>

            {/* Post Job Button */}
            <div className="pt-4 border-t">
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

            {/* Auth Section */}
            <div className="pt-4 border-t">
              {user ? (
                <div className="space-y-3">
                  <UserMenu />
                </div>
              ) : (
                <div className="space-y-3">
                  <Link to={`/sign-in?redirect=${currentPath}`} onClick={closeMenu}>
                    <Button variant="ghost" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to={`/auth/signup?redirect=${currentPath}`} onClick={closeMenu}>
                    <Button className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Language Toggle */}
            <div className="pt-4 border-t">
              <LanguageToggle minimal={false} className="w-full" />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileMenu;
