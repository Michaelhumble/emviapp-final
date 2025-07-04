
import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import EmviLogo from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, signOut } = useAuth();

  if (!isOpen) return null;

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />
      
      {/* Menu Panel */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <EmviLogo size="medium" />
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-md">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Scrollable Menu Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col p-4 space-y-2 pb-20">
              
              {/* Main Navigation Links */}
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="font-medium">Home</span>
              </Link>

              <Link
                to="/jobs"
                onClick={onClose}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="font-medium">Jobs</span>
              </Link>

              <Link
                to="/artists"
                onClick={onClose}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="font-medium">Artists</span>
              </Link>

              <Link
                to="/salons"
                onClick={onClose}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="font-medium">Salons</span>
              </Link>

              <Link
                to="/freelancers"
                onClick={onClose}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="font-medium">Community</span>
              </Link>

              {/* Dashboard Link (only show when user is logged in) */}
              {user && (
                <Link
                  to="/dashboard"
                  onClick={onClose}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-medium">Dashboard</span>
                </Link>
              )}

              <Link
                to="/about"
                onClick={onClose}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="font-medium">About</span>
              </Link>

              <Link
                to="/contact"
                onClick={onClose}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="font-medium">Contact</span>
              </Link>

              {/* Divider */}
              <div className="border-t my-4"></div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link to="/post-job" onClick={onClose} className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                    Post a Job
                  </Button>
                </Link>

                <Link to="/posting/salon" onClick={onClose} className="block">
                  <Button variant="outline" className="w-full py-3">
                    Sell Your Salon
                  </Button>
                </Link>

                {/* Authentication Buttons */}
                {user ? (
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full py-3 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Link to="/auth/signin" onClick={onClose} className="block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth/signup" onClick={onClose} className="block">
                      <Button variant="outline" className="w-full py-3">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
