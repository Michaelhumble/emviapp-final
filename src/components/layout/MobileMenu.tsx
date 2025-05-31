
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Home, 
  Users, 
  Building2, 
  Briefcase, 
  MessageCircle, 
  Info, 
  Mail, 
  LayoutDashboard,
  LogOut,
  LogIn,
  Globe,
  Plus,
  Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggle from '@/components/layout/LanguageToggle';
import EmviLogo from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
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

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.2,
        ease: 'easeOut'
      }
    }
  };

  const containerVariants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const navigationItems = [
    ...(user ? [{ 
      icon: LayoutDashboard, 
      label: t({ english: 'Dashboard', vietnamese: 'Bảng Điều Khiển' }), 
      path: '/dashboard' 
    }] : []),
    { icon: Home, label: t({ english: 'Home', vietnamese: 'Trang Chủ' }), path: '/' },
    { icon: Users, label: t({ english: 'Artists', vietnamese: 'Thợ Làm Nail' }), path: '/artists' },
    { icon: Building2, label: t({ english: 'Salons', vietnamese: 'Tiệm Nail' }), path: '/salons' },
    { icon: Briefcase, label: t({ english: 'Jobs', vietnamese: 'Việc Làm' }), path: '/jobs' },
    { icon: MessageCircle, label: t({ english: 'Community', vietnamese: 'Cộng Đồng' }), path: '/community' },
    { icon: Info, label: t({ english: 'About', vietnamese: 'Giới Thiệu' }), path: '/about' },
    { icon: Mail, label: t({ english: 'Contact', vietnamese: 'Liên Hệ' }), path: '/contact' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl border-l border-gray-200/50 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50 bg-white/60 backdrop-blur-sm">
              <EmviLogo size="medium" className="flex-shrink-0" />
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 rounded-full hover:bg-gray-100/50 transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
              <motion.div
                variants={containerVariants}
                initial="closed"
                animate="open"
                className="flex-1 p-4 space-y-3"
              >
                {/* CTAs */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Button
                    onClick={() => handleNavigation('/post-job')}
                    className="w-full h-10 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 backdrop-blur-sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t({ english: 'Post a Job for Free', vietnamese: 'Đăng Tin Tuyển Dụng Miễn Phí' })}
                  </Button>
                  
                  <Button
                    onClick={() => handleNavigation('/posting/salon')}
                    variant="outline"
                    className="w-full h-10 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 font-medium rounded-lg transition-all duration-200 backdrop-blur-sm"
                  >
                    <Store className="h-4 w-4 mr-2" />
                    {t({ english: 'Post Your Salon', vietnamese: 'Đăng Bán Tiệm' })}
                  </Button>
                </motion.div>

                {/* Navigation */}
                <motion.div variants={itemVariants} className="space-y-1 pt-2">
                  {navigationItems.map((item) => (
                    <motion.div key={item.path} variants={itemVariants}>
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className="w-full flex items-center px-3 py-2.5 text-gray-700 hover:text-purple-700 hover:bg-purple-50/50 rounded-lg transition-all duration-200 group"
                      >
                        <item.icon className="h-4 w-4 mr-3 text-gray-500 group-hover:text-purple-600 transition-colors" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Bottom Section */}
              <div className="border-t border-gray-200/50 bg-white/40 backdrop-blur-sm">
                <div className="p-4 space-y-3">
                  {/* Auth */}
                  <motion.div variants={itemVariants}>
                    {user ? (
                      <Button
                        onClick={handleSignOut}
                        variant="ghost"
                        className="w-full justify-start h-10 text-red-600 hover:text-red-700 hover:bg-red-50/50 rounded-lg transition-all duration-200"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        {t({ english: 'Sign Out', vietnamese: 'Đăng Xuất' })}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleNavigation('/sign-in')}
                        variant="ghost"
                        className="w-full justify-start h-10 text-purple-600 hover:text-purple-700 hover:bg-purple-50/50 rounded-lg transition-all duration-200"
                      >
                        <LogIn className="h-4 w-4 mr-3" />
                        {t({ english: 'Sign In', vietnamese: 'Đăng Nhập' })}
                      </Button>
                    )}
                  </motion.div>

                  {/* Language Toggle */}
                  <motion.div variants={itemVariants} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      {t({ english: 'Language', vietnamese: 'Ngôn Ngữ' })}
                    </span>
                    <LanguageToggle minimal />
                  </motion.div>
                </div>

                {/* Footer */}
                <div className="px-4 pb-4">
                  <motion.div 
                    variants={itemVariants}
                    className="text-center py-2"
                  >
                    <p className="text-xs text-amber-600 font-medium tracking-wide">
                      Inspired by Sunshine ☀️
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
