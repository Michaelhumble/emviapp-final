
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  Building, 
  Briefcase, 
  MessageCircle, 
  LayoutDashboard,
  Info,
  Mail,
  Plus,
  Store,
  UserPlus,
  ArrowRight,
  X,
  Globe,
  Heart,
  LogOut
} from 'lucide-react';
import { PostYourSalonButton } from '@/components/buttons/PostYourSalonButton';
import { useAuth } from '@/context/auth';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  if (!isOpen) return null;

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const exploreLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/artists', label: 'Artists', icon: Users },
    { path: '/salons', label: 'Salons', icon: Building },
    { path: '/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/community', label: 'Community', icon: MessageCircle },
    ...(user ? [{ path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }] : [])
  ];

  const companyLinks = [
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Mail }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header with Logo and Close */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-purple-600">Emvi.App</div>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Hero Zone - Action Buttons */}
            <div className="p-6 space-y-3 bg-gradient-to-br from-purple-50 to-pink-50 border-b border-gray-100">
              <Button
                onClick={() => handleNavigation('/post-job')}
                className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Post a Job for Free
              </Button>
              
              <PostYourSalonButton 
                variant="default"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md"
                onClose={onClose}
              />
              
              {!user && (
                <>
                  <Button
                    onClick={() => handleNavigation('/auth?mode=signup')}
                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium shadow-md"
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Sign Up
                  </Button>
                  
                  <Button
                    onClick={() => handleNavigation('/auth?mode=signin')}
                    variant="outline"
                    className="w-full h-12 border-2 border-purple-200 text-purple-700 hover:bg-purple-50 font-medium"
                  >
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Sign In
                  </Button>
                </>
              )}
            </div>

            {/* Navigation Links */}
            <div className="p-6 space-y-6">
              {/* Explore Section */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">
                  EXPLORE
                </h3>
                <div className="space-y-1">
                  {exploreLinks.map(({ path, label, icon: Icon }) => (
                    <button
                      key={path}
                      onClick={() => handleNavigation(path)}
                      className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                        isActive(path)
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span className="text-left font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200" />

              {/* Company Section */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">
                  COMPANY
                </h3>
                <div className="space-y-1">
                  {companyLinks.map(({ path, label, icon: Icon }) => (
                    <button
                      key={path}
                      onClick={() => handleNavigation(path)}
                      className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                        isActive(path)
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span className="text-left font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sign Out Button - Only show for authenticated users */}
              {user && (
                <>
                  <div className="border-t border-gray-200 mt-6" />
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full h-12 border-2 border-red-200 text-red-600 hover:bg-red-50 font-medium mt-4"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="space-y-4">
              {/* Language Selector */}
              <div className="flex items-center justify-center">
                <div className="flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                  <Globe className="h-4 w-4 mr-2 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">English</span>
                </div>
              </div>
              
              {/* Credit */}
              <div className="text-center">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent font-medium">
                    Inspired by Sunshine
                  </span>
                  <span className="ml-1 text-orange-400">☀️</span>
                  <Heart className="h-3 w-3 ml-1 text-pink-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
