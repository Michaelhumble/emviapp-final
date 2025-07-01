
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Home, 
  Scissors, 
  Store, 
  Briefcase, 
  Users, 
  Info, 
  Phone,
  User,
  Settings,
  LogOut,
  Crown,
  MessageCircle,
  Bell,
  Calendar,
  Heart,
  Search,
  Plus,
  Globe
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggle from '@/components/layout/LanguageToggle';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
    toast.success('Signed out successfully');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const mainNavItems = [
    {
      title: t({ english: "Home", vietnamese: "Trang chủ" }),
      path: "/",
      icon: Home,
    },
    {
      title: t({ english: "Artists", vietnamese: "Nghệ sĩ" }),
      path: "/artists",
      icon: Scissors,
    },
    {
      title: t({ english: "Salons", vietnamese: "Tiệm Nail" }),
      path: "/salons",
      icon: Store,
    },
    {
      title: t({ english: "Jobs", vietnamese: "Công việc" }),
      path: "/jobs",
      icon: Briefcase,
    },
    {
      title: t({ english: "Community", vietnamese: "Cộng đồng" }),
      path: "/freelancers",
      icon: Users,
    },
  ];

  const secondaryNavItems = [
    {
      title: t({ english: "About", vietnamese: "Giới thiệu" }),
      path: "/about",
      icon: Info,
    },
    {
      title: t({ english: "Contact", vietnamese: "Liên hệ" }),
      path: "/contact",
      icon: Phone,
    },
  ];

  const userMenuItems = user ? [
    {
      title: t({ english: "Dashboard", vietnamese: "Bảng điều khiển" }),
      path: "/dashboard",
      icon: User,
    },
    {
      title: t({ english: "My Profile", vietnamese: "Hồ sơ của tôi" }),
      path: "/profile",
      icon: User,
    },
    {
      title: t({ english: "Messages", vietnamese: "Tin nhắn" }),
      path: "/messages",
      icon: MessageCircle,
    },
    {
      title: t({ english: "Bookings", vietnamese: "Đặt lịch" }),
      path: "/bookings",
      icon: Calendar,
    },
    {
      title: t({ english: "Favorites", vietnamese: "Yêu thích" }),
      path: "/favorites",
      icon: Heart,
    },
    {
      title: t({ english: "Notifications", vietnamese: "Thông báo" }),
      path: "/notifications",
      icon: Bell,
    },
    {
      title: t({ english: "Settings", vietnamese: "Cài đặt" }),
      path: "/settings",
      icon: Settings,
    },
  ] : [];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-80 px-0 overflow-y-auto">
        <SheetHeader className="px-6 pb-4">
          <SheetTitle className="text-left">
            {t({ english: "Menu", vietnamese: "Thực đơn" })}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          {user && userProfile ? (
            <div className="px-6 pb-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={userProfile.avatar_url || ''} />
                  <AvatarFallback>
                    {userProfile.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {userProfile.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                  {userProfile.role && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {userProfile.role}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="px-6 pb-4">
              <div className="flex flex-col space-y-2">
                <Button 
                  onClick={() => handleNavigation('/sign-in')}
                  className="w-full"
                >
                  {t({ english: "Sign In", vietnamese: "Đăng nhập" })}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleNavigation('/sign-up')}
                  className="w-full"
                >
                  {t({ english: "Sign Up", vietnamese: "Đăng ký" })}
                </Button>
              </div>
            </div>
          )}

          <Separator />

          {/* Main Navigation */}
          <div className="px-6 py-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {t({ english: "Navigation", vietnamese: "Điều hướng" })}
            </h3>
            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="px-6 py-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {t({ english: "Quick Actions", vietnamese: "Hành động nhanh" })}
            </h3>
            <div className="space-y-2">
              <Button
                onClick={() => handleNavigation('/post-job')}
                className="w-full justify-start bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t({ english: "Post a Job", vietnamese: "Đăng công việc" })}
              </Button>
              
              <PostYourSalonButton 
                variant="outline" 
                className="w-full justify-start border-purple-600 text-purple-600 hover:bg-purple-50"
                onClose={() => setIsOpen(false)}
              />
              
              <Button
                variant="outline"
                onClick={() => handleNavigation('/search')}
                className="w-full justify-start"
              >
                <Search className="mr-2 h-4 w-4" />
                {t({ english: "Search", vietnamese: "Tìm kiếm" })}
              </Button>
            </div>
          </div>

          {/* User Menu Items (if logged in) */}
          {user && userMenuItems.length > 0 && (
            <>
              <Separator />
              <div className="px-6 py-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {t({ english: "My Account", vietnamese: "Tài khoản của tôi" })}
                </h3>
                <nav className="space-y-1">
                  {userMenuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-purple-100 text-purple-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="mr-3 h-4 w-4" />
                        {item.title}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </>
          )}

          <Separator />

          {/* Secondary Navigation */}
          <div className="px-6 py-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {t({ english: "Support", vietnamese: "Hỗ trợ" })}
            </h3>
            <nav className="space-y-1">
              {secondaryNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          <Separator />

          {/* Language Toggle */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {t({ english: "Language", vietnamese: "Ngôn ngữ" })}
                </span>
              </div>
              <LanguageToggle minimal={true} />
            </div>
          </div>

          {/* Sign Out (if logged in) */}
          {user && (
            <>
              <Separator />
              <div className="px-6 py-4 mt-auto">
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t({ english: "Sign Out", vietnamese: "Đăng xuất" })}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
