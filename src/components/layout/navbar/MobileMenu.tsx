
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
// import { CustomerFomoInviteBanner } from '@/components/customer/CustomerFomoInviteBanner'; // Commented out - component doesn't exist

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate(); // Single declaration

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const handleLinkClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {user ? (
              <div className="space-y-4">
                {/* Commented out until component exists */}
                {/* {userProfile?.role === 'customer' && <CustomerFomoInviteBanner />} */}
                
                <div className="text-center pb-4 border-b">
                  <p className="font-medium">{userProfile?.full_name || user.email}</p>
                  <p className="text-sm text-gray-500 capitalize">{userProfile?.role || 'User'}</p>
                </div>

                <nav className="space-y-2">
                  <Link
                    to="/dashboard"
                    onClick={handleLinkClick}
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  {userProfile?.role === 'customer' && (
                    <>
                      <Link
                        to="/artists"
                        onClick={handleLinkClick}
                        className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        Browse Artists
                      </Link>
                      <Link
                        to="/salons"
                        onClick={handleLinkClick}
                        className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        Find Salons
                      </Link>
                    </>
                  )}
                  <Link
                    to="/messages"
                    onClick={handleLinkClick}
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Messages
                  </Link>
                  <Link
                    to="/profile"
                    onClick={handleLinkClick}
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </nav>

                {userProfile?.role === 'customer' && (
                  <div className="pt-4 border-t">
                    <button
                      onClick={() => {
                        if (typeof onClose === 'function') onClose();
                        setTimeout(() => navigate('/profile/edit'), 250);
                      }}
                      className="w-full py-2 px-4 mt-2 rounded-xl bg-gradient-to-r from-[#9A7B69] to-[#F6F6F7] text-[#1A1A1A] font-bold shadow-lg hover:scale-105 transition"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Link
                  to="/auth/signin"
                  onClick={handleLinkClick}
                  className="block w-full text-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  onClick={handleLinkClick}
                  className="block w-full text-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
