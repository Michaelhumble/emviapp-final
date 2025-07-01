
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Settings, LogOut, Briefcase, Building2 } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'Artists', path: '/artists' },
    { label: 'Salons', path: '/salons' },
    { label: 'Community', path: '/community' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl border-l border-gray-200 flex flex-col">
            {/* Fixed Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMenu}
                className="p-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-white">
              <div className="p-4 space-y-1">
                {/* Main Navigation */}
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Divider */}
                <div className="border-t border-gray-200 my-4" />

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link
                    to="/post-job"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 text-base font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-all"
                  >
                    <Briefcase className="h-5 w-5" />
                    Post a Job for Free
                  </Link>

                  <Link
                    to="/post-salon"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 text-base font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-all"
                  >
                    <Building2 className="h-5 w-5" />
                    Post Your Salon
                  </Link>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4" />

                {/* User Section */}
                {user ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm text-gray-500">
                      {userProfile?.full_name || 'User'}
                    </div>
                    
                    <Link
                      to="/profile/edit"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <User className="h-5 w-5" />
                      Profile
                    </Link>

                    <Link
                      to="/settings"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Settings className="h-5 w-5" />
                      Settings
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full px-3 py-3 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/auth/signin"
                      onClick={closeMenu}
                      className="block px-3 py-3 text-base font-medium text-center text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-300 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/auth/signup"
                      onClick={closeMenu}
                      className="block px-3 py-3 text-base font-medium text-center text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
