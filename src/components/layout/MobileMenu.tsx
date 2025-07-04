
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Home, Briefcase, Users, Building2, User, LogOut, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { navigateToRoleDashboard } from '@/utils/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDashboardClick = () => {
    onClose();
    if (user) {
      navigateToRoleDashboard(navigate, user.user_metadata?.role || null);
    } else {
      navigate('/dashboard');
    }
  };

  const menuItems = [
    { icon: Home, label: 'Home', to: '/' },
    { icon: Briefcase, label: 'Jobs', to: '/jobs' },
    { icon: Users, label: 'Artists', to: '/artists' },
    { icon: Building2, label: 'Salons', to: '/salons' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <span className="text-lg font-semibold text-gray-900">Menu</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <nav className="space-y-2">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                
                {/* Community menu item - linking to /freelancers */}
                <Link
                  to="/freelancers"
                  onClick={onClose}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900"
                >
                  <Users className="h-5 w-5" />
                  <span className="font-medium">Community</span>
                </Link>
              </div>

              {/* Auth Buttons Section - Moved higher with better spacing */}
              <div className="border-t border-gray-100 pt-6 mt-6 space-y-3">
                {user ? (
                  <>
                    <Button
                      onClick={handleDashboardClick}
                      className="w-full justify-start h-12 text-left bg-primary hover:bg-primary/90"
                    >
                      <User className="mr-3 h-5 w-5" />
                      Dashboard
                    </Button>
                    <Button
                      onClick={handleSignOut}
                      variant="ghost"
                      className="w-full justify-start h-12 text-left text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Link to="/auth" onClick={onClose}>
                      <Button className="w-full h-12">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={onClose}>
                      <Button variant="outline" className="w-full h-12">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
