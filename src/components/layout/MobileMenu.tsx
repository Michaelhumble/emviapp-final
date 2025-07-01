
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  Home, 
  Search, 
  Briefcase, 
  Store, 
  Users, 
  MessageCircle, 
  User,
  LogOut,
  Settings,
  HelpCircle,
  Globe
} from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { mainNavigationItems } from '@/components/layout/navbar/config/navigationItems';
import LanguageToggle from '@/components/layout/LanguageToggle';
import { toast } from 'sonner';

const MobileMenu = () => {
  const { user, signOut, isSignedIn } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsOpen(false);
    toast.success("You've been signed out successfully");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const getUserInitials = () => {
    if (!user?.full_name) return 'U';
    return user.full_name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-3">
            {isSignedIn && user && (
              <>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar_url || ''} alt={user.full_name || ''} />
                  <AvatarFallback className="bg-purple-100 text-purple-700 font-medium">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{user.full_name || user.email}</span>
                  {user.role && (
                    <Badge variant="secondary" className="text-xs w-fit">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  )}
                </div>
              </>
            )}
          </div>
          
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
        </div>

        {/* Scrollable Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-2">
          <div className="space-y-1">
            {/* Main Navigation Items */}
            {mainNavigationItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className={`w-full justify-start text-left ${
                  location.pathname === item.path 
                    ? 'bg-purple-50 text-purple-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                {item.icon && <item.icon className="mr-3 h-4 w-4" />}
                {t({
                  english: item.title,
                  vietnamese: item.vietnameseTitle || item.title
                })}
              </Button>
            ))}

            {/* Authenticated User Links */}
            {isSignedIn && (
              <>
                <div className="border-t my-4"></div>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                  onClick={() => handleNavigation('/dashboard')}
                >
                  <Home className="mr-3 h-4 w-4" />
                  {t('Dashboard')}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                  onClick={() => handleNavigation('/messages')}
                >
                  <MessageCircle className="mr-3 h-4 w-4" />
                  {t('Messages')}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                  onClick={() => handleNavigation('/profile')}
                >
                  <User className="mr-3 h-4 w-4" />
                  {t('Profile')}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                  onClick={() => handleNavigation('/post-job')}
                >
                  <Briefcase className="mr-3 h-4 w-4" />
                  {t('Post a Job for Free')}
                </Button>

                <div className="border-t my-4"></div>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                  onClick={() => handleNavigation('/settings')}
                >
                  <Settings className="mr-3 h-4 w-4" />
                  {t('Settings')}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                  onClick={() => handleNavigation('/help')}
                >
                  <HelpCircle className="mr-3 h-4 w-4" />
                  {t('Help & Support')}
                </Button>
              </>
            )}

            {/* Guest User Links */}
            {!isSignedIn && (
              <>
                <div className="border-t my-4"></div>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                  onClick={() => handleNavigation('/sign-in')}
                >
                  <User className="mr-3 h-4 w-4" />
                  {t('Sign In')}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                  onClick={() => handleNavigation('/sign-up')}
                >
                  <User className="mr-3 h-4 w-4" />
                  {t('Sign Up')}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                  onClick={() => handleNavigation('/post-job')}
                >
                  <Briefcase className="mr-3 h-4 w-4" />
                  {t('Post a Job for Free')}
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Fixed Footer */}
        <div className="border-t p-4 bg-white space-y-3">
          {/* Language Toggle */}
          <div className="flex justify-center">
            <LanguageToggle minimal={true} />
          </div>

          {/* Sign Out Button for authenticated users */}
          {isSignedIn && (
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t('Sign Out')}
            </Button>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
