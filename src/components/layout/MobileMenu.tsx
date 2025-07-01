
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import EmviLogo from '@/components/branding/EmviLogo';
import { 
  Home, 
  Users, 
  Building2, 
  Briefcase, 
  MessageSquare, 
  Info, 
  Mail,
  LayoutDashboard,
  LogOut,
  X
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t, toggleLanguage, currentLanguage } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    onClose();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header with Logo */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex-1 flex justify-center">
              <EmviLogo size="medium" showText={true} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="ml-2"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Auth Section */}
            {!user && (
              <div className="space-y-2 mb-6">
                <Button
                  onClick={() => handleNavigation('/auth/signup')}
                  className="w-full bg-primary text-white hover:bg-primary/90"
                >
                  Sign Up
                </Button>
                <Button
                  onClick={() => handleNavigation('/auth/signin')}
                  variant="outline"
                  className="w-full"
                >
                  Sign In
                </Button>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="space-y-1">
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              
              <Link
                to="/artists"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Users className="h-5 w-5" />
                <span>Artists</span>
              </Link>
              
              <Link
                to="/salons"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Building2 className="h-5 w-5" />
                <span>Salons</span>
              </Link>
              
              <Link
                to="/jobs"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Briefcase className="h-5 w-5" />
                <span>Jobs</span>
              </Link>
              
              <Link
                to="/community"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Community</span>
              </Link>
              
              <Link
                to="/about"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Info className="h-5 w-5" />
                <span>About</span>
              </Link>
              
              <Link
                to="/contact"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>Contact</span>
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="space-y-2 mt-6">
              <Button
                onClick={() => handleNavigation('/post-job')}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white"
              >
                Post a Job
              </Button>
              <Button
                onClick={() => handleNavigation('/post-salon')}
                variant="outline"
                className="w-full border-purple-500 text-purple-600 hover:bg-purple-50"
              >
                Post Your Salon
              </Button>
            </div>

            {/* User Menu */}
            {user && (
              <div className="mt-6 pt-6 border-t space-y-1">
                <Link
                  to="/dashboard"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <button
                onClick={toggleLanguage}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  currentLanguage === 'en'
                    ? 'bg-purple-100 text-purple-700 border border-purple-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                English
              </button>
              <button
                onClick={toggleLanguage}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  currentLanguage === 'vi'
                    ? 'bg-purple-100 text-purple-700 border border-purple-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Tiếng Việt
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 text-center text-xs text-gray-500 border-t">
            Inspired by Sunshine ☀️
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
