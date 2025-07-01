
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Settings, LogOut, Plus, Building2, Briefcase, Search, MessageCircle, Heart, Users, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import LanguageToggle from './LanguageToggle';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const mainNavItems = [
    { label: 'Find Jobs', href: '/jobs', icon: Briefcase },
    { label: 'Find Artists', href: '/artists', icon: Users },
    { label: 'Find Salons', href: '/salons', icon: Building2 },
    { label: 'Browse', href: '/explore', icon: Search },
  ];

  const quickActions = [
    { label: 'Post a Job for Free', href: '/post-job', icon: Plus, primary: true },
    { label: 'Post Your Salon', href: '/post-salon', icon: Building2, primary: true },
  ];

  const userNavItems = user ? [
    { label: 'Dashboard', href: '/dashboard', icon: Calendar },
    { label: 'Messages', href: '/messages', icon: MessageCircle },
    { label: 'Profile', href: '/profile', icon: User },
    { label: 'Settings', href: '/settings', icon: Settings },
  ] : [];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Open mobile menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-full max-w-sm p-0 bg-white border-l border-gray-200 overflow-y-auto"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Quick Actions */}
            <div className="p-4 space-y-3">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Quick Actions</h3>
              {quickActions.map((item) => (
                <Button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className="w-full justify-start bg-primary text-white hover:bg-primary/90 h-12 font-medium"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              ))}
            </div>

            <Separator className="mx-4" />

            {/* Main Navigation */}
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Explore</h3>
              {mainNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => handleNavigation(item.href)}
                  className="w-full justify-start h-12 text-left hover:bg-gray-50 rounded-lg"
                >
                  <item.icon className="h-5 w-5 mr-3 text-gray-500" />
                  <span className="text-gray-700">{item.label}</span>
                  <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                </Button>
              ))}
            </div>

            {/* User Navigation (if logged in) */}
            {user && userNavItems.length > 0 && (
              <>
                <Separator className="mx-4" />
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Your Account</h3>
                  {userNavItems.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      onClick={() => handleNavigation(item.href)}
                      className="w-full justify-start h-12 text-left hover:bg-gray-50 rounded-lg"
                    >
                      <item.icon className="h-5 w-5 mr-3 text-gray-500" />
                      <span className="text-gray-700">{item.label}</span>
                      <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                    </Button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-100 p-4 space-y-4 bg-gray-50">
            {/* Language Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Language</span>
              <LanguageToggle minimal />
            </div>

            {/* User Info & Auth */}
            {user ? (
              <div className="space-y-3">
                {userProfile && (
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {userProfile.full_name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {userProfile.role || 'Member'}
                      </p>
                    </div>
                  </div>
                )}
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 h-10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={() => handleNavigation('/auth/signin')}
                  className="w-full bg-primary text-white hover:bg-primary/90 h-10"
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleNavigation('/auth/signup')}
                  className="w-full h-10"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
