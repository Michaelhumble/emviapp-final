
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Home, Briefcase, Users, Store, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userProfile, userRole } = useAuth();
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Briefcase, label: 'Jobs', href: '/jobs' },
    { icon: Users, label: 'Artists', href: '/artists' },
    { icon: Store, label: 'Salons', href: '/salons' },
    { icon: MessageCircle, label: 'Community', href: '/community' },
  ];

  return (
    <>
      {/* Menu Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="md:hidden relative z-50"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white z-50 md:hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMenu}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* User Profile Section */}
              {user && (
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      {userProfile?.avatar_url ? (
                        <img
                          src={userProfile.avatar_url}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {userProfile?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {userRole || 'Member'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Items */}
              <nav className="p-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={closeMenu}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Auth-specific Items */}
              {user && (
                <div className="p-2 border-t border-gray-100 mt-4">
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  
                  <Link
                    to="/profile/edit"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-200 space-y-3">
              {/* Action Buttons */}
              <div className="space-y-2">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={closeMenu}
                >
                  <Link to="/post-job-free">
                    Post a Job for Free
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary/5"
                  onClick={closeMenu}
                >
                  <Link to="/posting/salon">
                    Post Your Salon
                  </Link>
                </Button>
              </div>

              {/* Sign Out */}
              {user && (
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              )}

              {/* Sign In/Up for non-authenticated users */}
              {!user && (
                <div className="space-y-2">
                  <Button 
                    asChild 
                    className="w-full"
                    onClick={closeMenu}
                  >
                    <Link to="/auth/signin">Sign In</Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full"
                    onClick={closeMenu}
                  >
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;
