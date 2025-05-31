
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Users, 
  Building2, 
  Briefcase, 
  MessageCircle, 
  Info, 
  Mail, 
  LogIn, 
  LogOut, 
  LayoutDashboard,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { t, currentLanguage, toggleLanguage } = useTranslation();

  const handleLinkClick = () => {
    onClose();
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const navigationItems = [
    { 
      icon: LayoutDashboard, 
      label: t({ english: 'Dashboard', vietnamese: 'Bảng Điều Khiển' }), 
      to: '/dashboard',
      requiresAuth: true 
    },
    { 
      icon: Home, 
      label: t({ english: 'Home', vietnamese: 'Trang Chủ' }), 
      to: '/' 
    },
    { 
      icon: Users, 
      label: t({ english: 'Artists', vietnamese: 'Nghệ Sĩ' }), 
      to: '/explore/artists' 
    },
    { 
      icon: Building2, 
      label: t({ english: 'Salons', vietnamese: 'Tiệm Nails' }), 
      to: '/salons' 
    },
    { 
      icon: Briefcase, 
      label: t({ english: 'Jobs', vietnamese: 'Việc Làm' }), 
      to: '/jobs' 
    },
    { 
      icon: MessageCircle, 
      label: t({ english: 'Community', vietnamese: 'Cộng Đồng' }), 
      to: '/community' 
    },
    { 
      icon: Info, 
      label: t({ english: 'About', vietnamese: 'Giới Thiệu' }), 
      to: '/about' 
    },
    { 
      icon: Mail, 
      label: t({ english: 'Contact', vietnamese: 'Liên Hệ' }), 
      to: '/contact' 
    }
  ];

  const filteredNavItems = navigationItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && user)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="fixed inset-y-0 right-0 z-50 w-80 bg-white/95 backdrop-blur-xl border-l border-gray-200/50 shadow-2xl"
        >
          <div className="flex flex-col h-full">
            {/* Header with Logo */}
            <div className="px-6 py-6 border-b border-gray-100/80">
              <div className="text-center">
                <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Emvi.App
                </h2>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="px-6 py-4 space-y-3 border-b border-gray-100/50">
              <Button 
                asChild
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={handleLinkClick}
              >
                <Link to="/posting/job">
                  {t({
                    english: "Post a Job for Free",
                    vietnamese: "Đăng Tuyển Dụng Miễn Phí"
                  })}
                </Link>
              </Button>
              
              <PostYourSalonButton
                variant="outline"
                className="w-full h-11 border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 font-medium transition-all duration-200"
                onClick={handleLinkClick}
              />
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-6 py-4 overflow-y-auto">
              <div className="space-y-1">
                {filteredNavItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50/80 rounded-lg transition-all duration-200 group"
                    >
                      <IconComponent className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Auth & Settings */}
            <div className="px-6 py-4 border-t border-gray-100/50 space-y-3">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50/80 rounded-lg transition-all duration-200"
              >
                <Globe className="h-5 w-5" />
                <span className="font-medium">
                  {currentLanguage === 'english' ? 'Tiếng Việt' : 'English'}
                </span>
              </button>

              {/* Auth Button */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50/80 rounded-lg transition-all duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">
                    {t({ english: 'Sign Out', vietnamese: 'Đăng Xuất' })}
                  </span>
                </button>
              ) : (
                <Link
                  to="/auth/signin"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50/80 rounded-lg transition-all duration-200"
                >
                  <LogIn className="h-5 w-5" />
                  <span className="font-medium">
                    {t({ english: 'Sign In', vietnamese: 'Đăng Nhập' })}
                  </span>
                </Link>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-gray-100/30 bg-gradient-to-r from-orange-50/50 to-yellow-50/50">
              <p className="text-center text-sm text-gray-600 font-medium">
                Inspired by Sunshine ☀️
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
