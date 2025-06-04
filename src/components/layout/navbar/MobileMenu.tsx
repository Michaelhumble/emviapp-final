
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Home, Briefcase, Store, Scissors, Users, Info, Mail, Globe, PlusCircle } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CustomerMobileMenu from './CustomerMobileMenu';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const navigate = useNavigate();
  const { userProfile, userRole, signOut } = useAuth();
  const { t, currentLanguage, setLanguage } = useTranslation();

  console.log('MobileMenu - userRole:', userRole, 'userProfile:', userProfile);

  // Route customer users to isolated CustomerMobileMenu
  if (userRole?.toLowerCase() === 'customer') {
    return <CustomerMobileMenu isOpen={isOpen} onClose={onClose} />;
  }

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'en' ? 'vi' : 'en');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{t('Menu')}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              ✕
            </button>
          </div>

          {/* Business/Artist Actions */}
          <div className="space-y-3 mb-6">
            <Button
              onClick={() => handleNavigate('/post-job')}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              {t('Post a Job')}
            </Button>
            
            <Button
              onClick={() => handleNavigate('/sell-salon')}
              variant="outline"
              className="w-full border-purple-200 hover:bg-purple-50"
            >
              <Store className="h-4 w-4 mr-2" />
              {t('Post Your Salon')}
            </Button>
          </div>

          <Separator className="my-6" />

          {/* Navigation Links */}
          <div className="space-y-2">
            <button
              onClick={() => handleNavigate('/dashboard')}
              className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg"
            >
              <User className="h-5 w-5 mr-3" />
              {t('Dashboard')}
            </button>

            <button
              onClick={() => handleNavigate('/')}
              className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg"
            >
              <Home className="h-5 w-5 mr-3" />
              {t('Home')}
            </button>

            <button
              onClick={() => handleNavigate('/artists')}
              className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg"
            >
              <Scissors className="h-5 w-5 mr-3" />
              {t('Artists')}
            </button>

            <button
              onClick={() => handleNavigate('/salons')}
              className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg"
            >
              <Store className="h-5 w-5 mr-3" />
              {t('Salons')}
            </button>

            <button
              onClick={() => handleNavigate('/jobs')}
              className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg"
            >
              <Briefcase className="h-5 w-5 mr-3" />
              {t('Jobs')}
            </button>

            <button
              onClick={() => handleNavigate('/community')}
              className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg"
            >
              <Users className="h-5 w-5 mr-3" />
              {t('Community')}
            </button>

            <button
              onClick={() => handleNavigate('/about')}
              className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg"
            >
              <Info className="h-5 w-5 mr-3" />
              {t('About')}
            </button>

            <button
              onClick={() => handleNavigate('/contact')}
              className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg"
            >
              <Mail className="h-5 w-5 mr-3" />
              {t('Contact')}
            </button>
          </div>

          <Separator className="my-6" />

          {/* Settings & Actions */}
          <div className="space-y-2">
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg"
            >
              <Globe className="h-5 w-5 mr-3" />
              {currentLanguage === 'en' ? 'Tiếng Việt' : 'English'}
            </button>

            <button
              onClick={() => handleNavigate('/settings')}
              className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg"
            >
              <Settings className="h-5 w-5 mr-3" />
              {t('Settings')}
            </button>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center p-3 text-left hover:bg-red-50 text-red-600 rounded-lg"
            >
              <LogOut className="h-5 w-5 mr-3" />
              {t('Sign Out')}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              {t('Inspired by Sunshine')} ☀️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
