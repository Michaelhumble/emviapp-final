
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, LogOut, Home, Briefcase, Building2, Settings, Edit, Plus, Store } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, userProfile, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleSignOut = async () => {
    onClose();
    await signOut();
    navigate('/');
  };

  const menuItems = [
    {
      icon: Home,
      label: t('Home'),
      path: '/',
    },
    {
      icon: Briefcase,
      label: t('Jobs'),
      path: '/jobs',
    },
    {
      icon: Building2,
      label: t('Salons'),
      path: '/salons',
    },
    {
      icon: User,
      label: t('Artists'),
      path: '/artists',
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {userProfile?.full_name || user?.email || 'User'}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {userRole || 'Member'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <item.icon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-900">{item.label}</span>
              </Link>
            ))}

            {/* Salon Owner specific buttons */}
            {(userRole === 'salon' || userRole === 'owner') && (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Button
                  onClick={() => handleNavigation('/post-job')}
                  className="w-full justify-start space-x-3 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Plus className="h-5 w-5" />
                  <span>Post a Job</span>
                </Button>
                <Button
                  onClick={() => handleNavigation('/post-salon')}
                  className="w-full justify-start space-x-3 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Store className="h-5 w-5" />
                  <span>Post a Salon</span>
                </Button>
              </div>
            )}

            {/* User Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              {user && (
                <>
                  <Button
                    onClick={() => handleNavigation('/dashboard')}
                    variant="ghost"
                    className="w-full justify-start space-x-3"
                  >
                    <Settings className="h-5 w-5" />
                    <span>{t('Dashboard')}</span>
                  </Button>
                  <Button
                    onClick={() => handleNavigation('/profile/edit')}
                    variant="ghost"
                    className="w-full justify-start space-x-3"
                  >
                    <Edit className="h-5 w-5" />
                    <span>{t('Edit Profile')}</span>
                  </Button>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    className="w-full justify-start space-x-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>{t('Sign Out')}</span>
                  </Button>
                </>
              )}
              {!user && (
                <div className="space-y-2">
                  <Button
                    onClick={() => handleNavigation('/auth/signin')}
                    variant="ghost"
                    className="w-full justify-start space-x-3"
                  >
                    <User className="h-5 w-5" />
                    <span>{t('Sign In')}</span>
                  </Button>
                  <Button
                    onClick={() => handleNavigation('/auth/signup')}
                    className="w-full justify-start space-x-3 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <User className="h-5 w-5" />
                    <span>{t('Sign Up')}</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
