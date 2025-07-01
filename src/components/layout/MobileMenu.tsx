
import React from 'react';
import { X, Home, Users, Briefcase, MessageSquare, User, Settings, HelpCircle, Mail, FileText, Shield, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, userProfile } = useAuth();

  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl border-l border-gray-200">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto bg-white">
            <div className="p-4 space-y-1">
              {/* Tagline */}
              <p className="text-xs text-gray-500 mb-4 px-2">
                The first platform purpose-built for the beauty industry with embedded AI intelligence.
              </p>

              {/* Explore Section */}
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900 px-2 mb-2">Explore</h3>
                
                <Link
                  to="/"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>

                <Link
                  to="/artists"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <Users className="h-5 w-5" />
                  <span>Artists</span>
                </Link>

                <Link
                  to="/salons"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <Briefcase className="h-5 w-5" />
                  <span>Salons</span>
                </Link>

                <Link
                  to="/jobs"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <Briefcase className="h-5 w-5" />
                  <span>Jobs</span>
                </Link>

                <Link
                  to="/community"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Community</span>
                </Link>
              </div>

              <Separator className="my-4" />

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  to="/post-job"
                  onClick={handleLinkClick}
                  className="block w-full"
                >
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Post a Job for Free
                  </Button>
                </Link>

                <Link
                  to="/post-salon"
                  onClick={handleLinkClick}
                  className="block w-full"
                >
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Post Your Salon
                  </Button>
                </Link>
              </div>

              <Separator className="my-4" />

              {/* Company Section */}
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900 px-2 mb-2">Company</h3>
                
                <Link
                  to="/about"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <HelpCircle className="h-5 w-5" />
                  <span>About</span>
                </Link>

                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <Mail className="h-5 w-5" />
                  <span>Contact</span>
                </Link>
              </div>

              <Separator className="my-4" />

              {/* Legal Links */}
              <div className="space-y-1 text-xs">
                <div className="flex flex-wrap gap-4 px-2 text-gray-500">
                  <Link to="/terms" onClick={handleLinkClick} className="hover:text-gray-700">
                    Terms of Service
                  </Link>
                  <Link to="/privacy" onClick={handleLinkClick} className="hover:text-gray-700">
                    Privacy Policy
                  </Link>
                  <Link to="/cookies" onClick={handleLinkClick} className="hover:text-gray-700">
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-white p-4">
            {user ? (
              <div className="space-y-2">
                <Link
                  to="/dashboard"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/messages"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Messages</span>
                  <span className="ml-auto bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full">
                    ✨ New
                  </span>
                </Link>

                <Link
                  to="/profile/edit"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/auth/signin"
                  onClick={handleLinkClick}
                  className="block w-full"
                >
                  <Button variant="default" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link
                  to="/auth/signup"
                  onClick={handleLinkClick}
                  className="block w-full"
                >
                  <Button variant="outline" className="w-full">
                    Sign Up
                  </Button>
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
