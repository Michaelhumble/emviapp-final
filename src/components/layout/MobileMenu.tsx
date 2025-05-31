
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  Home, 
  Users, 
  Building, 
  Briefcase, 
  MessageCircle, 
  Info, 
  Mail, 
  LogIn, 
  LogOut,
  User,
  LayoutDashboard,
  Sun
} from 'lucide-react';
import Logo from '@/components/ui/Logo';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';
import LanguageToggle from '@/components/ui/LanguageToggle';

const MobileMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        when: 'beforeChildren',
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      x: '100%',
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 120
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  const navigationItems = [
    ...(user ? [{ 
      name: t('Dashboard'), 
      path: '/dashboard', 
      icon: LayoutDashboard,
      isPremium: true 
    }] : []),
    { name: t('Home'), path: '/', icon: Home },
    { name: t('Artists'), path: '/artists', icon: Users },
    { name: t('Salons'), path: '/salons', icon: Building },
    { name: t('Jobs'), path: '/jobs', icon: Briefcase },
    { name: t('Community'), path: '/community', icon: MessageCircle },
    { name: t('About'), path: '/about', icon: Info },
    { name: t('Contact'), path: '/contact', icon: Mail },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative p-2 hover:bg-purple-50/80 transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-full max-w-sm p-0 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/20 backdrop-blur-xl border-l border-purple-100/50 shadow-2xl"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col h-full"
            >
              {/* Premium Header with Logo */}
              <motion.div 
                variants={itemVariants}
                className="px-6 py-8 bg-gradient-to-r from-white/90 to-purple-50/60 backdrop-blur-sm border-b border-purple-100/30"
              >
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-lg rounded-full scale-110" />
                    <Logo size="large" showText={true} className="relative z-10 drop-shadow-sm" />
                  </div>
                </div>
              </motion.div>

              {/* Premium CTAs Section */}
              <motion.div 
                variants={itemVariants}
                className="px-6 py-6 space-y-4 bg-gradient-to-r from-white/70 to-purple-50/40 backdrop-blur-sm border-b border-purple-100/20"
              >
                {/* Post a Job Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl blur-sm opacity-50 group-hover:opacity-70 transition-opacity" />
                  <Button
                    onClick={() => handleNavigation('/post-job')}
                    className="relative w-full h-14 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 hover:from-purple-700 hover:via-purple-600 hover:to-purple-700 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                  >
                    <motion.span
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3"
                    >
                      <Briefcase className="h-5 w-5" />
                      {t("Post a Job for Free")}
                    </motion.span>
                  </Button>
                </motion.div>

                {/* Post Your Salon Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity" />
                  <Button
                    onClick={() => handleNavigation('/posting/salon')}
                    variant="outline"
                    className="relative w-full h-12 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/70 backdrop-blur-sm"
                  >
                    <motion.span
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3"
                    >
                      <Building className="h-4 w-4" />
                      {t({
                        english: "Post Your Salon",
                        vietnamese: "Đăng Bán Tiệm"
                      })}
                    </motion.span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Navigation Items */}
              <motion.div 
                variants={itemVariants}
                className="flex-1 px-4 py-4 space-y-1 overflow-y-auto"
              >
                {navigationItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.path}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-blue-50/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`relative flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 ${
                          item.isPremium 
                            ? 'text-purple-700 hover:text-purple-800' 
                            : 'text-gray-700 hover:text-gray-900'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          item.isPremium 
                            ? 'bg-gradient-to-r from-purple-100 to-purple-200' 
                            : 'bg-gray-100 group-hover:bg-gray-200'
                        } transition-colors duration-200`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{item.name}</span>
                        {item.isPremium && (
                          <div className="ml-auto">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
                          </div>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Auth & Language Section */}
              <motion.div 
                variants={itemVariants}
                className="px-6 py-6 space-y-4 bg-gradient-to-r from-white/80 to-purple-50/50 backdrop-blur-sm border-t border-purple-100/30"
              >
                {/* Auth Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {user ? (
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      {t('Sign Out')}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleNavigation('/sign-in')}
                      variant="outline"
                      className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    >
                      <LogIn className="h-4 w-4 mr-3" />
                      {t('Sign In')}
                    </Button>
                  )}
                </motion.div>

                {/* Language Toggle */}
                <motion.div 
                  variants={itemVariants}
                  className="flex justify-center"
                >
                  <div className="p-2 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm">
                    <LanguageToggle minimal={true} />
                  </div>
                </motion.div>
              </motion.div>

              {/* Premium Footer */}
              <motion.div 
                variants={itemVariants}
                className="px-6 py-4 text-center bg-gradient-to-r from-amber-50/80 to-orange-50/60 backdrop-blur-sm border-t border-orange-100/30"
              >
                <motion.div
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  className="relative inline-block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 to-orange-200/30 blur-sm rounded-full scale-110" />
                  <p className="relative text-sm font-medium bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
                    Inspired by Sunshine
                    <motion.span
                      animate={{ 
                        rotate: [0, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }}
                      className="text-amber-400 drop-shadow-sm"
                    >
                      <Sun className="h-4 w-4" />
                    </motion.span>
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
