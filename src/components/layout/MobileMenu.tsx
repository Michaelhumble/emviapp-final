
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Users, Store, Briefcase, Scissors, Info, Phone, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggle from '@/components/layout/LanguageToggle';
import Logo from '@/components/ui/Logo';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';
import { toast } from 'sonner';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    navigate("/");
    toast.success("You've been signed out successfully");
  };

  const handlePostJob = () => {
    setOpen(false);
    if (user) {
      navigate("/post-job");
    } else {
      navigate("/sign-in");
    }
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  const navigationItems = [
    ...(user ? [{ 
      title: t({ english: "Dashboard", vietnamese: "Bảng điều khiển" }), 
      path: "/dashboard", 
      icon: Home 
    }] : []),
    { 
      title: t({ english: "Home", vietnamese: "Trang chủ" }), 
      path: "/", 
      icon: Home 
    },
    { 
      title: t({ english: "Artists", vietnamese: "Nghệ sĩ" }), 
      path: "/artists", 
      icon: Scissors 
    },
    { 
      title: t({ english: "Salons", vietnamese: "Tiệm Nail" }), 
      path: "/salons", 
      icon: Store 
    },
    { 
      title: t({ english: "Jobs", vietnamese: "Công việc" }), 
      path: "/jobs", 
      icon: Briefcase 
    },
    { 
      title: t({ english: "Community", vietnamese: "Cộng đồng" }), 
      path: "/freelancers", 
      icon: Users 
    },
    { 
      title: t({ english: "About", vietnamese: "Giới thiệu" }), 
      path: "/about", 
      icon: Info 
    },
    { 
      title: t({ english: "Contact", vietnamese: "Liên hệ" }), 
      path: "/contact", 
      icon: Phone 
    }
  ];

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="h-[95vh] px-0">
        <div className="flex flex-col h-full bg-white">
          {/* Header with Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <Logo size="medium" showText={true} />
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </DrawerClose>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Main CTAs */}
              <div className="space-y-3">
                {/* Post a Job Button */}
                <Button 
                  onClick={handlePostJob}
                  className="w-full bg-purple-600 text-white hover:bg-purple-700 rounded-lg h-12 text-base font-medium"
                >
                  {t({ english: "Post a Job for Free", vietnamese: "Đăng việc miễn phí" })}
                </Button>

                {/* Post Your Salon Button */}
                <PostYourSalonButton 
                  variant="outline" 
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 rounded-lg h-12 text-base font-medium"
                />
              </div>

              {/* Navigation Items */}
              <div className="space-y-1 pt-4">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <IconComponent className="h-5 w-5 text-gray-500" />
                      <span className="text-base font-medium">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="border-t border-gray-100 p-4 space-y-4">
            {/* Auth Section */}
            <div className="flex flex-col space-y-2">
              {user ? (
                <Button 
                  onClick={handleSignOut}
                  variant="outline" 
                  className="w-full flex items-center gap-2 justify-center h-11"
                >
                  <LogOut className="h-4 w-4" />
                  {t({ english: "Sign Out", vietnamese: "Đăng xuất" })}
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Link to="/sign-in" onClick={handleLinkClick} className="flex-1">
                    <Button variant="outline" className="w-full flex items-center gap-2 justify-center h-11">
                      <LogIn className="h-4 w-4" />
                      {t({ english: "Sign In", vietnamese: "Đăng nhập" })}
                    </Button>
                  </Link>
                  <Link to="/sign-up" onClick={handleLinkClick} className="flex-1">
                    <Button className="w-full h-11">
                      {t({ english: "Sign Up", vietnamese: "Đăng ký" })}
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Language Toggle */}
            <div className="flex justify-center">
              <LanguageToggle minimal={true} />
            </div>

            {/* Emotional Footer */}
            <div className="text-center pt-2 border-t border-gray-50">
              <p className="text-sm text-gray-400 font-light">
                {t({ 
                  english: "Inspired by Sunshine ☀️", 
                  vietnamese: "Được truyền cảm hứng bởi ánh nắng ☀️" 
                })}
              </p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
