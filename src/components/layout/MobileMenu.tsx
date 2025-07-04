
import React from 'react';
import { X, Home, Users, Briefcase, Store, Mail, Info, LogOut, User, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { EmviLogo } from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, signOut, profile } = useAuth();

  if (!isOpen) return null;

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Users, label: 'Community', href: '/freelancers' },
    { icon: Info, label: 'About', href: '/about' },
    { icon: Mail, label: 'Contact', href: '/contact' },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="absolute right-0 top-0 h-full w-[90%] bg-gradient-to-br from-white/95 to-gray-50/90 backdrop-blur-xl shadow-2xl border-l border-white/20 flex flex-col">
        
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100/50 bg-white/30 backdrop-blur-sm">
          <EmviLogo className="h-8" />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 hover:bg-white/50"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            
            {/* Profile Section */}
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-lg">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {profile?.full_name || 'User'}
                    </p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <Link 
                      to="/dashboard" 
                      onClick={onClose}
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Dashboard →
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome!</h3>
                  <p className="text-sm text-gray-600 mb-4">Join thousands of beauty professionals</p>
                </div>
              )}
            </div>

            {/* Navigation Items */}
            <div className="space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className="flex items-center space-x-4 p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 shadow-lg hover:bg-white/60 hover:shadow-xl transition-all duration-200 group"
                >
                  <item.icon className="h-6 w-6 text-gray-700 group-hover:text-purple-600 transition-colors" />
                  <span className="text-lg font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Add sufficient bottom spacing for the last items */}
            <div className="h-32" />
          </div>
        </div>

        {/* Sticky Bottom CTAs */}
        <div className="bg-white/50 backdrop-blur-sm border-t border-gray-100/50 p-6">
          {user ? (
            <div className="space-y-3">
              <div className="flex space-x-3">
                <Link 
                  to="/post-job" 
                  onClick={onClose}
                  className="flex-1"
                >
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Post a Job
                  </Button>
                </Link>
                <Link 
                  to="/sell-salon" 
                  onClick={onClose}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                    <Store className="h-4 w-4 mr-2" />
                    Sell Salon
                  </Button>
                </Link>
              </div>
              <Button 
                onClick={handleSignOut}
                variant="ghost" 
                className="w-full text-gray-600 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link to="/auth/signup" onClick={onClose}>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
                  Sign Up
                </Button>
              </Link>
              <Link to="/auth/signin" onClick={onClose}>
                <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 text-center">
          <p className="text-xs text-gray-500/70">
            Inspired by Sunshine ☀️
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
