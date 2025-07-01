
import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { mainNavigationItems } from './navbar/config/navigationItems';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';
import EmviLogo from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isVietnamese } = useTranslation();
  const { user, signOut } = useAuth();

  const handleNavItemClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <EmviLogo />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Menu - Made Scrollable */}
        <nav className="flex-1 overflow-y-auto px-4 pt-4">
          <ul className="space-y-2">
            {mainNavigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={handleNavItemClick}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span className="font-medium">
                    {isVietnamese ? item.vietnameseTitle || item.title : item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="p-4 border-t bg-gray-50">
          {user ? (
            <div className="space-y-3">
              <Link
                to="/dashboard"
                onClick={handleNavItemClick}
                className="block w-full"
              >
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  Dashboard
                </Button>
              </Link>
              <Button
                onClick={() => {
                  signOut();
                  onClose();
                }}
                variant="outline"
                className="w-full"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                to="/auth/signin"
                onClick={handleNavItemClick}
                className="block w-full"
              >
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link
                to="/auth/signup"
                onClick={handleNavItemClick}
                className="block w-full"
              >
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
