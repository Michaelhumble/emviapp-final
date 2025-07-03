
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Home, Briefcase, Users, Search, Calendar, User, Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';

interface MobileHamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileHamburgerMenu: React.FC<MobileHamburgerMenuProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    onClose();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      <div className="fixed top-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 max-h-[65vh] overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Emvi.App</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Primary Navigation Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => handleNavigation('/')}
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Home className="h-4 w-4 text-gray-600 mb-1" />
              <span className="text-xs font-medium text-gray-700">Home</span>
            </button>
            
            <button
              onClick={() => handleNavigation('/jobs')}
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Briefcase className="h-4 w-4 text-gray-600 mb-1" />
              <span className="text-xs font-medium text-gray-700">Jobs</span>
            </button>
            
            <button
              onClick={() => handleNavigation('/artists')}
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users className="h-4 w-4 text-gray-600 mb-1" />
              <span className="text-xs font-medium text-gray-700">Artists</span>
            </button>
            
            <button
              onClick={() => handleNavigation('/salons')}
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Search className="h-4 w-4 text-gray-600 mb-1" />
              <span className="text-xs font-medium text-gray-700">Salons</span>
            </button>
            
            {user && (
              <>
                <button
                  onClick={() => handleNavigation('/dashboard')}
                  className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Calendar className="h-4 w-4 text-gray-600 mb-1" />
                  <span className="text-xs font-medium text-gray-700">Dashboard</span>
                </button>
                
                <button
                  onClick={() => handleNavigation('/profile/edit')}
                  className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <User className="h-4 w-4 text-gray-600 mb-1" />
                  <span className="text-xs font-medium text-gray-700">Profile</span>
                </button>
              </>
            )}
          </div>

          {/* Secondary Navigation */}
          <div className="flex justify-center gap-4 mb-4 py-2 border-t border-gray-100">
            <button
              onClick={() => handleNavigation('/about')}
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Info className="h-3 w-3" />
              About
            </button>
            <button
              onClick={() => handleNavigation('/contact')}
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Phone className="h-3 w-3" />
              Contact
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-2 mb-3">
            <Button
              onClick={() => handleNavigation('/post-job')}
              className="w-full h-9 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl"
            >
              Post a Job
            </Button>
            
            <Button
              onClick={() => handleNavigation('/post-salon')}
              variant="outline"
              className="w-full h-9 border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50"
            >
              Post Your Salon
            </Button>
          </div>

          {/* Auth Buttons */}
          {user ? (
            <Button
              onClick={handleSignOut}
              className="w-full h-10 bg-white border border-red-200 text-red-600 font-semibold rounded-2xl mt-3 mb-1 hover:bg-rose-50 transition-colors"
            >
              Sign Out
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={() => handleNavigation('/auth/signin')}
                variant="ghost"
                className="flex-1 h-9 text-gray-700 text-sm rounded-xl hover:bg-gray-50"
              >
                Sign In
              </Button>
              <Button
                onClick={() => handleNavigation('/signup')}
                variant="outline"
                className="flex-1 h-9 border-gray-200 text-gray-700 text-sm rounded-xl hover:bg-gray-50"
              >
                Sign Up
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="text-center pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Inspired by Sunshine ☀️</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHamburgerMenu;
