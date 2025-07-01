
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Users, Building2, Briefcase, MessageSquare, Info, Mail, Plus, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { EmviLogo } from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen = false, onClose = () => {} }) => {
  const { user, isSignedIn, signOut } = useAuth();
  const { t, language, setLanguage } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const handleLanguageToggle = (lang: 'en' | 'vi') => {
    setLanguage(lang);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header with close button */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="w-6" /> {/* Spacer */}
        <div className="flex-1 flex justify-center">
          <EmviLogo className="h-8" />
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Scrollable menu content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Navigation Links */}
          <nav className="space-y-4">
            <Link
              to="/"
              className="flex items-center space-x-3 text-lg font-medium text-gray-900 hover:text-purple-600"
              onClick={onClose}
            >
              <Home className="h-5 w-5" />
              <span>{t('Home')}</span>
            </Link>
            
            <Link
              to="/artists"
              className="flex items-center space-x-3 text-lg font-medium text-gray-900 hover:text-purple-600"
              onClick={onClose}
            >
              <Users className="h-5 w-5" />
              <span>{t('Artists')}</span>
            </Link>
            
            <Link
              to="/salons"
              className="flex items-center space-x-3 text-lg font-medium text-gray-900 hover:text-purple-600"
              onClick={onClose}
            >
              <Building2 className="h-5 w-5" />
              <span>{t('Salons')}</span>
            </Link>
            
            <Link
              to="/jobs"
              className="flex items-center space-x-3 text-lg font-medium text-gray-900 hover:text-purple-600"
              onClick={onClose}
            >
              <Briefcase className="h-5 w-5" />
              <span>{t('Jobs')}</span>
            </Link>
            
            <Link
              to="/community"
              className="flex items-center space-x-3 text-lg font-medium text-gray-900 hover:text-purple-600"
              onClick={onClose}
            >
              <MessageSquare className="h-5 w-5" />
              <span>{t('Community')}</span>
            </Link>
            
            <Link
              to="/about"
              className="flex items-center space-x-3 text-lg font-medium text-gray-900 hover:text-purple-600"
              onClick={onClose}
            >
              <Info className="h-5 w-5" />
              <span>{t('About')}</span>
            </Link>
            
            <Link
              to="/contact"
              className="flex items-center space-x-3 text-lg font-medium text-gray-900 hover:text-purple-600"
              onClick={onClose}
            >
              <Mail className="h-5 w-5" />
              <span>{t('Contact')}</span>
            </Link>
          </nav>

          {/* Auth Section */}
          {!isSignedIn ? (
            <div className="space-y-3 pt-6 border-t">
              <Link to="/auth/signup" onClick={onClose}>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  {t('Sign Up')}
                </Button>
              </Link>
              <Link to="/auth/signin" onClick={onClose}>
                <Button variant="outline" className="w-full">
                  {t('Sign In')}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3 pt-6 border-t">
              <Link
                to="/dashboard"
                className="flex items-center space-x-3 text-lg font-medium text-gray-900 hover:text-purple-600"
                onClick={onClose}
              >
                <User className="h-5 w-5" />
                <span>{t('Dashboard')}</span>
              </Link>
              
              <Link
                to="/profile/edit"
                className="flex items-center space-x-3 text-lg font-medium text-gray-900 hover:text-purple-600"
                onClick={onClose}
              >
                <Settings className="h-5 w-5" />
                <span>{t('Settings')}</span>
              </Link>
              
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-3 text-lg font-medium text-gray-900 hover:text-red-600 w-full text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>{t('Sign Out')}</span>
              </button>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-3 pt-6 border-t">
            <Link to="/post-job" onClick={onClose}>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                {t('Post a Job')}
              </Button>
            </Link>
            
            <Link to="/post-salon" onClick={onClose}>
              <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                <Building2 className="h-4 w-4 mr-2" />
                {t('Post Your Salon')}
              </Button>
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="pt-6 border-t">
            <div className="flex space-x-2">
              <button
                onClick={() => handleLanguageToggle('en')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageToggle('vi')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  language === 'vi'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Tiếng Việt
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t text-center">
            <p className="text-sm text-gray-500">
              Inspired by Sunshine ☀️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
