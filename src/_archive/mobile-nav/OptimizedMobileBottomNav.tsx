/** ARCHIVED – DO NOT USE. UnifiedMobileNavigation is the only bottom nav. */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Scissors, Store, Briefcase, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';
import { useKeyboardVisible, useScrollDirection, MOBILE_LAYOUT } from '@/utils/mobileLayoutManager';
import { useIsMobile } from '@/hooks/use-mobile';

const OptimizedMobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { loading } = useAuth();
  const isKeyboardVisible = useKeyboardVisible();
  const scrollDirection = useScrollDirection();
  const isMobile = useIsMobile();

  if (!isMobile || loading) return null;

  const shouldHide = isKeyboardVisible || scrollDirection === 'down';

  const bottomNavItems = [
    { icon: Home, path: '/', label: t('Home') },
    { icon: Briefcase, path: '/jobs', label: t('Jobs') },
    { icon: Store, path: '/salons', label: t('Salons') },
    { icon: Scissors, path: '/artists', label: t('Artists') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <AnimatePresence>
      {!shouldHide && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg"
          style={{ 
            zIndex: MOBILE_LAYOUT.Z_INDEX.BOTTOM_NAV,
            height: `${MOBILE_LAYOUT.SAFE_AREAS.BOTTOM_NAV_HEIGHT}px`,
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <div className="flex items-center justify-around h-full px-2">
            {bottomNavItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center transition-all duration-200 rounded-xl",
                  "min-w-[48px] min-h-[48px] px-3 py-2 touch-manipulation",
                  isActive(item.path) 
                    ? "text-purple-700 bg-purple-50" 
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                )}
                aria-label={item.label}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          <motion.button 
            onClick={() => navigate('/post-job')}
            className="absolute bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-xl hover:shadow-2xl active:scale-95"
            style={{ 
              top: '-28px',
              right: '50%',
              transform: 'translateX(50%)',
              width: '56px',
              height: '56px',
              zIndex: MOBILE_LAYOUT.Z_INDEX.FAB_PRIMARY,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Post a job"
          >
            <PlusCircle className="h-6 w-6 mx-auto" />
          </motion.button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default OptimizedMobileBottomNav;
