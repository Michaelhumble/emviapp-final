
import React, { useState } from "react";
import { X, Home, Users, Briefcase, MessageSquare, Info, Mail, LayoutDashboard, UserPlus, User as LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { isSignedIn, userRole } = useAuth();
  const location = useLocation();
  const { t, currentLanguage, switchLanguage } = useTranslation();
  const currentPath = location.pathname;

  if (!isOpen) return null;

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, requiresAuth: true },
    { name: "Home", href: "/", icon: Home },
    { name: "Artists", href: "/artists", icon: Users },
    { name: "Salons", href: "/salons", icon: Briefcase },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Community", href: "/community", icon: MessageSquare },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  const filteredNavItems = navigationItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && isSignedIn)
  );

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex flex-col h-full">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b">
          {/* Centered Logo */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Emvi.App
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Auth buttons - only show when not signed in */}
          {!isSignedIn && (
            <div className="space-y-2 mb-6">
              <Link 
                to={`/auth/signup?redirect=${currentPath}`}
                onClick={onClose}
                className="block"
              >
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
              <Link 
                to={`/auth/signin?redirect=${currentPath}`}
                onClick={onClose}
                className="block"
              >
                <Button variant="outline" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-2 mb-6">
            <Link to="/jobs" onClick={onClose} className="block">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                Post a Job for Free
              </Button>
            </Link>
            <Link to="/sell-salon" onClick={onClose} className="block">
              <Button variant="outline" className="w-full">
                Post Your Salon
              </Button>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Icon className="mr-3 h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer with Language Switcher */}
        <div className="p-4 border-t space-y-4">
          {/* Language Switcher */}
          <div className="flex space-x-2 justify-center">
            <button
              onClick={() => switchLanguage('en')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                currentLanguage === 'en'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => switchLanguage('vi')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                currentLanguage === 'vi'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tiếng Việt
            </button>
          </div>

          {/* Footer Text */}
          <div className="text-center">
            <p className="text-sm bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent font-medium">
              Inspired by Sunshine ☀️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
