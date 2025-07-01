
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Users, Briefcase, Building2, MessageSquare, Info, Phone, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import EmviLogo from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { t, toggleLanguage, currentLanguage } = useTranslation();

  if (!isOpen) return null;

  const navigationItems = [
    { name: t('nav.dashboard'), href: '/dashboard', icon: LayoutDashboard, showWhenAuth: true },
    { name: t('nav.home'), href: '/', icon: Home },
    { name: t('nav.artists'), href: '/artists', icon: Users },
    { name: t('nav.salons'), href: '/salons', icon: Building2 },
    { name: t('nav.jobs'), href: '/jobs', icon: Briefcase },
    { name: t('nav.community'), href: '/community', icon: MessageSquare },
    { name: t('nav.about'), href: '/about', icon: Info },
    { name: t('nav.contact'), href: '/contact', icon: Phone },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div 
        className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header with logo and close button */}
          <div className="flex items-center justify-between p-3 border-b">
            <EmviLogo />
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Auth buttons - only show if not authenticated */}
          {!user && (
            <div className="px-3 py-2 border-b space-y-2">
              <Link to="/auth/signup" onClick={onClose}>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium">
                  {t('auth.signUp')}
                </Button>
              </Link>
              <Link to="/auth/signin" onClick={onClose}>
                <Button variant="outline" className="w-full">
                  {t('auth.signIn')}
                </Button>
              </Link>
            </div>
          )}

          {/* Navigation items */}
          <nav className="flex-1 py-2">
            <ul className="space-y-1 px-2">
              {navigationItems
                .filter(item => !item.showWhenAuth || user)
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <Icon className="h-5 w-5 mr-3 text-gray-500" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>

            {/* CTA Buttons */}
            <div className="px-2 mt-3 space-y-2">
              <Link to="/post-job" onClick={onClose}>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm py-2">
                  {t('cta.postJobFree')}
                </Button>
              </Link>
              <Link to="/post-salon" onClick={onClose}>
                <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 font-medium text-sm py-2">
                  {t('cta.postYourSalon')}
                </Button>
              </Link>
            </div>
          </nav>

          {/* Footer */}
          <div className="px-3 py-2 border-t mt-auto">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="text-sm text-gray-600 hover:text-gray-800 mb-2 block"
            >
              {currentLanguage === 'en' ? 'Tiếng Việt' : 'English'}
            </button>
            
            {/* Footer text */}
            <p className="text-xs text-gray-500">
              Inspired by Sunshine ☀️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
