
import React from 'react';
import { X, User, Home, Users, Mail, Phone, FileText, Briefcase, Store, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import EmviLogo from "@/components/branding/EmviLogo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[90%] bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 backdrop-blur-xl border-l border-white/20 shadow-2xl z-50 flex flex-col"
          >
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <EmviLogo className="h-8" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full hover:bg-white/20"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Profile Section */}
              <div className="p-6 border-b border-white/10">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{userProfile?.full_name || user.email}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome!</h3>
                    <p className="text-gray-600 mb-4">Join EmviApp to connect with beauty professionals</p>
                  </div>
                )}
              </div>

              {/* Navigation Items */}
              <div className="p-4 space-y-3">
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/')}
                  className="w-full justify-start h-14 text-left bg-white/40 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/60 transition-all duration-200"
                >
                  <Home className="h-5 w-5 mr-3 text-purple-600" />
                  <span className="font-medium text-gray-900">Home</span>
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/freelancers')}
                  className="w-full justify-start h-14 text-left bg-white/40 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/60 transition-all duration-200"
                >
                  <Users className="h-5 w-5 mr-3 text-purple-600" />
                  <span className="font-medium text-gray-900">Community</span>
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/about')}
                  className="w-full justify-start h-14 text-left bg-white/40 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/60 transition-all duration-200"
                >
                  <FileText className="h-5 w-5 mr-3 text-purple-600" />
                  <span className="font-medium text-gray-900">About</span>
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/contact')}
                  className="w-full justify-start h-14 text-left bg-white/40 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/60 transition-all duration-200"
                >
                  <Phone className="h-5 w-5 mr-3 text-purple-600" />
                  <span className="font-medium text-gray-900">Contact</span>
                </Button>
              </div>

              {/* Bottom Spacing for Scrolling */}
              <div className="h-32"></div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="p-4 bg-white/80 backdrop-blur-xl border-t border-white/20">
              {user ? (
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleNavigation('/post-job')}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl h-12 font-medium shadow-lg"
                    >
                      <Briefcase className="h-4 w-4 mr-2" />
                      Post a Job
                    </Button>
                    <Button
                      onClick={() => handleNavigation('/sell-salon')}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl h-12 font-medium shadow-lg"
                    >
                      <Store className="h-4 w-4 mr-2" />
                      Sell Salon
                    </Button>
                  </div>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full rounded-xl h-12 font-medium border-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-3">
                  <Button
                    onClick={() => handleNavigation('/auth?mode=signin')}
                    variant="outline"
                    className="flex-1 rounded-xl h-12 font-medium border-2 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => handleNavigation('/auth?mode=signup')}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl h-12 font-medium shadow-lg"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
              
              {/* Footer */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500/70">Inspired by Sunshine ☀️</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
