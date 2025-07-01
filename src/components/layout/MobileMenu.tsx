
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, UserPlus, LogIn, Home, Users, Briefcase, MessageSquare, Info, Globe } from 'lucide-react';
import { useAuth } from '@/context/auth';
import LanguageToggle from './LanguageToggle';

const MobileMenu = () => {
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Home', path: '/', icon: Home },
    { name: 'Artists', path: '/artists', icon: Users },
    { name: 'Salons', path: '/salons', icon: Briefcase },
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
    { name: 'Community', path: '/community', icon: MessageSquare },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: MessageSquare },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-6">
        <div className="flex flex-col h-full">
          {/* Authentication Buttons */}
          <div className="space-y-3 mb-8">
            {!user ? (
              <>
                <Link to={`/auth/signup?redirect=${encodeURIComponent(currentPath)}`} className="block">
                  <Button 
                    size="lg" 
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg"
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Sign Up
                  </Button>
                </Link>
                <Link to="/auth/signin" className="block">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full h-12 border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 font-semibold rounded-xl"
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/dashboard" className="block">
                <Button 
                  size="lg" 
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Dashboard
                </Button>
              </Link>
            )}
          </div>

          {/* Navigation Section */}
          <div className="flex-1">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-purple-600 rounded-lg transition-colors duration-200 font-medium"
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            {/* Language Selector */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Globe className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">English</span>
              </div>
              <LanguageToggle minimal />
            </div>

            {/* Footer */}
            <div className="text-center py-4">
              <p className="text-sm bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent font-medium">
                Inspired by Sunshine ☀️
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
