
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Briefcase, Store, Scissors, Users, Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import EmviLogo from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, isSignedIn, signOut } = useAuth();

  if (!isOpen) return null;

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-[90%] max-w-sm bg-white shadow-2xl z-50 flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
          <EmviLogo size="small" />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Profile Section */}
            {isSignedIn && user ? (
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-sm">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.email}</p>
                    <Link
                      to="/dashboard"
                      onClick={handleLinkClick}
                      className="text-purple-600 text-sm hover:underline"
                    >
                      Go to Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                <p className="text-gray-800 font-medium mb-2">Welcome! ☀️</p>
                <p className="text-gray-600 text-sm">Sign in to access your dashboard</p>
              </div>
            )}

            {/* Navigation Items */}
            <div className="space-y-3">
              <Link
                to="/"
                onClick={handleLinkClick}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200 shadow-sm"
              >
                <Home className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-800">Home</span>
              </Link>

              <Link
                to="/jobs"
                onClick={handleLinkClick}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200 shadow-sm"
              >
                <Briefcase className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-800">Jobs</span>
              </Link>

              <Link
                to="/salons"
                onClick={handleLinkClick}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200 shadow-sm"
              >
                <Store className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-800">Salons</span>
              </Link>

              <Link
                to="/artists"
                onClick={handleLinkClick}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200 shadow-sm"
              >
                <Scissors className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-800">Artists</span>
              </Link>

              <Link
                to="/freelancers"
                onClick={handleLinkClick}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200 shadow-sm"
              >
                <Users className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-800">Community</span>
              </Link>

              <Link
                to="/about"
                onClick={handleLinkClick}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200 shadow-sm"
              >
                <Info className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-800">About</span>
              </Link>

              <Link
                to="/contact"
                onClick={handleLinkClick}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200 shadow-sm"
              >
                <Phone className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-800">Contact</span>
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {isSignedIn ? (
                <>
                  <Link
                    to="/post-job"
                    onClick={handleLinkClick}
                    className="block"
                  >
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 rounded-xl font-medium shadow-lg">
                      Post a Job
                    </Button>
                  </Link>
                  
                  <Link
                    to="/sell-salon"
                    onClick={handleLinkClick}
                    className="block"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 h-12 rounded-xl font-medium"
                    >
                      Sell Your Salon
                    </Button>
                  </Link>
                  
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    className="w-full text-gray-600 hover:bg-gray-100 h-12 rounded-xl font-medium"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/sign-in"
                    onClick={handleLinkClick}
                    className="block"
                  >
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 rounded-xl font-medium shadow-lg">
                      Sign In
                    </Button>
                  </Link>
                  
                  <Link
                    to="/sign-up"
                    onClick={handleLinkClick}
                    className="block"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 h-12 rounded-xl font-medium"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Footer with extra padding */}
            <div className="text-center pt-6 pb-8">
              <p className="text-amber-600 text-sm font-medium opacity-70">
                Inspired by Sunshine ☀️
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
