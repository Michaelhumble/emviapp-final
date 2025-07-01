
import React from 'react';
import { X, Home, Search, Calendar, MessageCircle, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { mainNavigationItems } from './navbar/config/navigationItems';

interface MobileMenuTestProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenuTest: React.FC<MobileMenuTestProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const auth = useAuth?.();
  const user = auth?.user;
  const signOut = auth?.signOut;

  if (!isOpen) return null;

  const quickNavItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/jobs', icon: Search, label: 'Jobs' },
    { path: '/dashboard', icon: Calendar, label: 'Dashboard' },
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm max-h-[75vh] overflow-y-auto rounded-t-2xl shadow-xl">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-5 gap-2 mb-3">
            {quickNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{t(item.label)}</span>
                </Link>
              );
            })}
          </div>

          {/* Main Navigation */}
          <div className="space-y-1 mb-3">
            {mainNavigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'bg-purple-50 text-purple-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t({
                  english: item.title,
                  vietnamese: item.vietnameseTitle || item.title
                })}
              </Link>
            ))}
          </div>

          {/* Auth Actions */}
          {!user ? (
            <div className="space-y-2 pt-2 border-t">
              <Link
                to="/sign-in"
                onClick={onClose}
                className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium"
              >
                {t('Sign In')}
              </Link>
              <Link
                to="/sign-up"
                onClick={onClose}
                className="block w-full text-center px-4 py-2 border border-purple-600 text-purple-600 rounded-lg text-sm font-medium"
              >
                {t('Sign Up')}
              </Link>
            </div>
          ) : (
            <div className="pt-2 border-t">
              {user && signOut && (
                <button
                  onClick={signOut}
                  className="text-sm text-muted-foreground hover:text-red-500 mt-2"
                >
                  Sign Out
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenuTest;
