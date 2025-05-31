
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Users, Briefcase, User, LogIn, LogOut, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';
import EmviLogo from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, signOut } = useAuth();
  const { t, language, setLanguage } = useTranslation();

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'english' ? 'vietnamese' : 'english');
  };

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
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
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
          
          {/* Menu */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl border-l border-gray-200/50 shadow-2xl z-50 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
                <EmviLogo size="small" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Primary CTAs */}
                <motion.div
                  variants={itemVariants}
                  className="space-y-3"
                >
                  <Link to="/posting/job" onClick={onClose}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg">
                      {t({ english: "Post a Job for Free", vietnamese: "Đăng Tuyển Dụng Miễn Phí" })}
                    </Button>
                  </Link>
                  
                  <div onClick={onClose}>
                    <PostYourSalonButton 
                      variant="outline" 
                      className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                    />
                  </div>
                </motion.div>

                {/* Navigation Links */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Link
                    to="/"
                    onClick={onClose}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Home className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">{t({ english: "Home", vietnamese: "Trang Chủ" })}</span>
                  </Link>
                  
                  <Link
                    to="/jobs"
                    onClick={onClose}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Briefcase className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">{t({ english: "Browse Jobs", vietnamese: "Tìm Việc" })}</span>
                  </Link>
                  
                  <Link
                    to="/salons"
                    onClick={onClose}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Users className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">{t({ english: "Salons for Sale", vietnamese: "Tiệm Cần Bán" })}</span>
                  </Link>
                  
                  <Link
                    to="/artists"
                    onClick={onClose}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">{t({ english: "Find Artists", vietnamese: "Tìm Thợ" })}</span>
                  </Link>
                </motion.div>

                {/* Language Toggle */}
                <motion.div variants={itemVariants}>
                  <Button
                    variant="outline"
                    onClick={handleLanguageToggle}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <Globe className="h-4 w-4" />
                    <span>{language === 'english' ? 'Tiếng Việt' : 'English'}</span>
                  </Button>
                </motion.div>

                {/* Auth Section */}
                <motion.div variants={itemVariants} className="space-y-2">
                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={onClose}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <User className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">{t({ english: "Dashboard", vietnamese: "Bảng Điều Khiển" })}</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
                      >
                        <LogOut className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">{t({ english: "Sign Out", vietnamese: "Đăng Xuất" })}</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={onClose}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <LogIn className="h-5 w-5 text-gray-500" />
                      <span className="font-medium">{t({ english: "Sign In", vietnamese: "Đăng Nhập" })}</span>
                    </Link>
                  )}
                </motion.div>
              </div>

              {/* Footer */}
              <motion.div
                variants={itemVariants}
                className="p-4 border-t border-gray-200/50 text-center"
              >
                <p className="text-sm text-gray-500">
                  Inspired by Sunshine ☀️
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
