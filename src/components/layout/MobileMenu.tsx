
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/context/auth';
import { mainNavigationItems } from './navbar/config/navigationItems';
import { useTranslation } from '@/hooks/useTranslation';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { isVietnamese } = useTranslation();

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  const handleSalonButtonClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 p-0 bg-gradient-to-b from-purple-50 to-white">
          <div className="flex flex-col h-full">
            {/* Fixed Header */}
            <div className="flex items-center justify-between p-6 border-b border-purple-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="text-xl font-bold text-gray-900">EmviApp</span>
              </div>
            </div>

            {/* Scrollable Navigation Items */}
            <div className="flex-1 overflow-y-auto">
              <nav className="py-6">
                <div className="space-y-2 px-6">
                  {mainNavigationItems.map((item) => {
                    const Icon = item.icon;
                    const title = isVietnamese && item.vietnameseTitle ? item.vietnameseTitle : item.title;
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={handleNavClick}
                        className="flex items-center space-x-3 py-3 px-4 rounded-xl hover:bg-purple-100 transition-colors group"
                      >
                        {Icon && (
                          <Icon className="h-5 w-5 text-purple-600 group-hover:text-purple-700" />
                        )}
                        <span className="text-gray-700 font-medium group-hover:text-purple-700">
                          {title}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-8 px-6">
                  <div className="border-t border-purple-100 pt-6">
                    <div onClick={handleSalonButtonClick}>
                      <PostYourSalonButton />
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            {/* Fixed Footer - Auth Section */}
            <div className="border-t border-purple-100 p-6">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        {isVietnamese ? 'Đã đăng nhập' : 'Signed in'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Link
                      to="/dashboard"
                      onClick={handleNavClick}
                      className="block w-full text-center py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-colors"
                    >
                      {isVietnamese ? 'Bảng điều khiển' : 'Dashboard'}
                    </Link>
                    
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      {isVietnamese ? 'Đăng xuất' : 'Sign Out'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/auth/signin"
                    onClick={handleNavClick}
                    className="block w-full text-center py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-colors"
                  >
                    {isVietnamese ? 'Đăng nhập' : 'Sign In'}
                  </Link>
                  
                  <Link
                    to="/auth/signup"
                    onClick={handleNavClick}
                    className="block w-full text-center py-3 px-4 border-2 border-purple-600 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors"
                  >
                    {isVietnamese ? 'Đăng ký' : 'Sign Up'}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
