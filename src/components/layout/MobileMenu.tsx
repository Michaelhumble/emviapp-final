
import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import EmviLogo from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isSignedIn, signOut, userProfile } = useAuth();

  if (!isOpen) return null;

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header with close button */}
      <div className="flex justify-end p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-10 w-10"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close menu</span>
        </Button>
      </div>

      {/* Scrollable content container */}
      <div className="flex flex-col h-full overflow-y-auto pb-8">
        {/* Logo at the very top, centered */}
        <div className="flex justify-center py-6 mb-4">
          <EmviLogo size="large" showText={true} />
        </div>

        {/* Auth section moved to top */}
        <div className="px-6 py-4 border-b bg-gray-50 mb-6">
          {!isSignedIn ? (
            <div className="space-y-4">
              <Button asChild variant="default" className="w-full h-12 text-lg font-semibold">
                <Link to="/auth/signin" onClick={handleLinkClick}>
                  Sign In
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full h-12 text-lg font-semibold">
                <Link to="/auth/signup" onClick={handleLinkClick}>
                  Sign Up
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {userProfile?.email && (
                <p className="text-sm text-gray-600 text-center truncate">
                  {userProfile.email}
                </p>
              )}
              <Button
                variant="outline"
                className="w-full h-12 text-lg font-semibold border-red-200 text-red-600 hover:bg-red-50"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>

        {/* All menu items in one scrollable section */}
        <div className="px-6 space-y-3 flex-1">
          {/* Navigation Links */}
          <Link
            to="/"
            onClick={handleLinkClick}
            className="block py-4 px-4 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            onClick={handleLinkClick}
            className="block py-4 px-4 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Jobs
          </Link>

          <Link
            to="/artists"
            onClick={handleLinkClick}
            className="block py-4 px-4 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Artists
          </Link>

          <Link
            to="/salons"
            onClick={handleLinkClick}
            className="block py-4 px-4 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Salons
          </Link>

          <Link
            to="/freelancers"
            onClick={handleLinkClick}
            className="block py-4 px-4 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Community
          </Link>

          <Link
            to="/dashboard"
            onClick={handleLinkClick}
            className="block py-4 px-4 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Dashboard
          </Link>

          <Link
            to="/about"
            onClick={handleLinkClick}
            className="block py-4 px-4 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={handleLinkClick}
            className="block py-4 px-4 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Contact
          </Link>

          {/* Action Buttons */}
          <Button asChild className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 mt-4">
            <Link to="/post-job" onClick={handleLinkClick}>
              Post a Job
            </Link>
          </Button>

          <Button asChild className="w-full h-12 text-lg font-semibold bg-purple-600 hover:bg-purple-700">
            <Link to="/sell-salon" onClick={handleLinkClick}>
              Sell Your Salon
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
