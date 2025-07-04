
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
  const { user, userProfile, signOut } = useAuth();

  if (!isOpen) return null;

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <EmviLogo />
            <button onClick={onClose} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col space-y-1 p-4 pb-8">
              {/* Navigation Links */}
              <Link
                to="/jobs"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={onClose}
              >
                <span>Jobs</span>
              </Link>

              <Link
                to="/freelancers"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={onClose}
              >
                <span>Community</span>
              </Link>

              <Link
                to="/salons"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={onClose}
              >
                <span>Salons</span>
              </Link>

              <Link
                to="/explore"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={onClose}
              >
                <span>Artists</span>
              </Link>

              <Link
                to="/about"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={onClose}
              >
                <span>About</span>
              </Link>

              <Link
                to="/contact"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={onClose}
              >
                <span>Contact</span>
              </Link>

              {/* CTA Buttons */}
              <div className="pt-4 space-y-3">
                <Link
                  to="/post-job"
                  className="block"
                  onClick={onClose}
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Post a Job
                  </Button>
                </Link>

                <Link
                  to="/post-salon"
                  className="block"
                  onClick={onClose}
                >
                  <Button variant="outline" className="w-full">
                    Sell Your Salon
                  </Button>
                </Link>

                {/* Auth Buttons */}
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block"
                      onClick={onClose}
                    >
                      <Button variant="outline" className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/signin"
                      className="block"
                      onClick={onClose}
                    >
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      to="/auth/signup"
                      className="block"
                      onClick={onClose}
                    >
                      <Button variant="outline" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </>
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
