
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Home, 
  Briefcase, 
  Users, 
  MessageSquare, 
  User,
  LogOut,
  LogIn,
  UserPlus,
  Building2,
  Globe
} from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggle from '@/components/layout/LanguageToggle';
import { mainNavigationItems } from '@/components/layout/navbar/config/navigationItems';

interface MobileMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const effectiveOpen = isOpen !== undefined ? isOpen : open;
  const effectiveOnClose = onClose || (() => setOpen(false));

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    toast.success(t({
      english: "You've been signed out successfully",
      vietnamese: "Bạn đã đăng xuất thành công"
    }));
    effectiveOnClose();
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    effectiveOnClose();
  };

  const getIcon = (path: string) => {
    switch (path) {
      case '/': return <Home className="w-5 h-5" />;
      case '/jobs': return <Briefcase className="w-5 h-5" />;
      case '/artists': return <Users className="w-5 h-5" />;
      case '/community': return <MessageSquare className="w-5 h-5" />;
      case '/salons': return <Building2 className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <Drawer open={effectiveOpen} onOpenChange={isOpen !== undefined ? onClose : setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="h-[85vh] p-3">
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b">
            <Logo size="large" showText={true} />
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="w-6 h-6" />
              </Button>
            </DrawerClose>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto py-3">
            {/* Main Navigation */}
            <nav className="space-y-3">
              {mainNavigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${
                    location.pathname === item.path
                      ? 'bg-purple-50 text-purple-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {getIcon(item.path)}
                  <span className="ml-3">
                    {t({
                      english: item.title,
                      vietnamese: item.vietnameseTitle || item.title
                    })}
                  </span>
                </button>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="mt-4 space-y-3">
              {user ? (
                <>
                  <Button 
                    onClick={() => handleNavigation('/post-job')}
                    className="w-full bg-purple-600 text-white hover:bg-purple-700"
                  >
                    {t({
                      english: "Post a Job for Free",
                      vietnamese: "Đăng tin tuyển dụng miễn phí"
                    })}
                  </Button>
                  
                  <Button 
                    onClick={() => handleNavigation('/dashboard')}
                    variant="outline"
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {t({
                      english: "Dashboard",
                      vietnamese: "Bảng điều khiển"
                    })}
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => handleNavigation('/sign-in')}
                    className="w-full bg-purple-600 text-white hover:bg-purple-700"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    {t({
                      english: "Sign In",
                      vietnamese: "Đăng nhập"
                    })}
                  </Button>
                  
                  <Button 
                    onClick={() => handleNavigation('/sign-up')}
                    variant="outline"
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {t({
                      english: "Sign Up",
                      vietnamese: "Đăng ký"
                    })}
                  </Button>
                </>
              )}
            </div>

            {/* Language Toggle */}
            <div className="mt-4 flex justify-center">
              <LanguageToggle minimal={false} />
            </div>

            {/* Sign Out (if authenticated) */}
            {user && (
              <div className="mt-4">
                <Button 
                  onClick={handleSignOut}
                  variant="ghost"
                  className="w-full text-gray-600 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t({
                    english: "Sign Out",
                    vietnamese: "Đăng xuất"
                  })}
                </Button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t text-center">
            <p className="text-xs text-gray-500">
              {t({
                english: "Inspired by Sunshine ☀️",
                vietnamese: "Lấy cảm hứng từ ánh nắng ☀️"
              })}
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
