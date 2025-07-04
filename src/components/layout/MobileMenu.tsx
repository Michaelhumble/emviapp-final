
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Home, Briefcase, Users, MessageSquare, User, Building2, Sun } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = (action: string) => {
    onClose();
    if (action === 'signOut') {
      signOut();
    } else {
      navigate(`/auth/${action}`);
    }
  };

  const handleDashboardClick = () => {
    onClose();
    navigate('/dashboard');
  };

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Briefcase, label: 'Jobs', href: '/jobs' },
    { icon: Users, label: 'Artists', href: '/artists' },
    { icon: Building2, label: 'Salons', href: '/salons' },
    { icon: MessageSquare, label: 'Community', href: '/freelancers' },
    { icon: User, label: 'About', href: '/about' },
    { icon: MessageSquare, label: 'Contact', href: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Premium backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Premium slide-in menu */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed top-0 right-0 h-full w-[90%] max-w-sm bg-gradient-to-b from-white to-gray-50/80 backdrop-blur-xl shadow-2xl z-50 flex flex-col"
          >
            {/* Header with logo and close */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100/50">
              <Logo size="small" showText={true} />
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-10 w-10 rounded-full hover:bg-gray-100/50 transition-colors"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Profile Section */}
            <div className="p-6 border-b border-gray-100/50">
              {user ? (
                <div className="flex items-center space-x-4 bg-white/60 rounded-2xl p-4 shadow-sm">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={userProfile?.avatar_url || undefined} />
                    <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold">
                      {userProfile?.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {userProfile?.full_name || 'User'}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDashboardClick}
                      className="mt-1 h-7 px-3 text-xs bg-purple-50 hover:bg-purple-100 text-purple-600"
                    >
                      Dashboard →
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center bg-white/60 rounded-2xl p-6 shadow-sm">
                  <div className="text-2xl mb-2">👋</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Welcome!</h3>
                  <p className="text-sm text-gray-500 mb-4">Join our beauty community</p>
                </div>
              )}
            </div>

            {/* Scrollable Navigation */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-6 space-y-3">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="flex items-center space-x-4 p-4 rounded-2xl bg-white/60 hover:bg-white/80 shadow-sm hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center group-hover:from-purple-100 group-hover:to-purple-200 transition-colors">
                        <item.icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Sticky Bottom CTAs */}
            <div className="p-6 bg-white/80 backdrop-blur-sm border-t border-gray-100/50">
              {user ? (
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Button
                      asChild
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg rounded-xl h-11"
                      onClick={onClose}
                    >
                      <Link to="/post-job">Post a Job</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-gray-200 hover:bg-gray-50 rounded-xl h-11"
                      onClick={onClose}
                    >
                      <Link to="/sell-salon">Sell Salon</Link>
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleAuthAction('signOut')}
                    variant="ghost"
                    className="w-full text-red-600 hover:bg-red-50 rounded-xl h-11"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    onClick={() => handleAuthAction('signin')}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg rounded-xl h-12"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => handleAuthAction('signup')}
                    variant="outline"
                    className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl h-12"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            {/* Inspiration Footer */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                <Sun className="h-3 w-3" />
                <span>Inspired by Sunshine</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
