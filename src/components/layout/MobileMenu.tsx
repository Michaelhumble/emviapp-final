
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Home, Briefcase, Store, Scissors, Users, Info, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import EmviLogo from '@/components/branding/EmviLogo';
import LanguageToggle from '@/components/layout/LanguageToggle';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("You've been signed out successfully");
    setIsOpen(false);
  };

  const onPostJobClick = () => {
    navigate("/post-job");
    setIsOpen(false);
  };

  const tooltipText = t("Was $29.99 – Free for a limited time!");

  const navigationItems = [
    { title: "Home", path: "/", icon: Home, vietnameseTitle: "Trang chủ" },
    { title: "Artists", path: "/artists", icon: Scissors, vietnameseTitle: "Nghệ sĩ" },
    { title: "Salons", path: "/salons", icon: Store, vietnameseTitle: "Tiệm Nail" },
    { title: "Jobs", path: "/jobs", icon: Briefcase, vietnameseTitle: "Công việc" },
    { title: "Community", path: "/freelancers", icon: Users, vietnameseTitle: "Cộng đồng" },
    { title: "About", path: "/about", icon: Info, vietnameseTitle: "Giới thiệu" },
    { title: "Contact", path: "/contact", icon: Phone, vietnameseTitle: "Liên hệ" }
  ];

  return (
    <>
      {/* Menu Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden"
        aria-label="Toggle mobile menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Menu Bottom Sheet */}
      {isOpen && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm max-h-[85vh] overflow-y-auto rounded-t-2xl shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <EmviLogo size="medium" showText={true} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Navigation Links */}
            <nav className="space-y-3 mb-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>
                    {t({
                      english: item.title,
                      vietnamese: item.vietnameseTitle || item.title
                    })}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              {/* Post Job Button */}
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    {user ? (
                      <Button 
                        onClick={onPostJobClick} 
                        className="w-full bg-purple-600 text-white hover:bg-purple-700 rounded-lg"
                      >
                        {t("Post a Job for Free")}
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => {
                          navigate("/sign-in");
                          setIsOpen(false);
                        }}
                        className="w-full bg-purple-600 text-white hover:bg-purple-700 rounded-lg"
                      >
                        {t("Post a Job for Free")}
                      </Button>
                    )}
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#FEF7CD] text-[#333] text-xs px-3 py-1.5 shadow-sm rounded-md border border-amber-200">
                    <p>{tooltipText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Post Your Salon Button */}
              <PostYourSalonButton 
                variant="outline" 
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
              />
            </div>

            {/* Language Toggle */}
            <div className="mb-6">
              <LanguageToggle minimal={false} className="w-full" />
            </div>

            {/* User Section */}
            {user ? (
              <div className="space-y-3 mb-6">
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>{t("Dashboard")}</span>
                </Link>
                <Link
                  to="/profile/edit"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>{t("Settings")}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>{t("Sign Out")}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                <Link to="/auth/sign-in" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    {t("Sign In")}
                  </Button>
                </Link>
                <Link to="/auth/sign-up" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    {t("Sign Up")}
                  </Button>
                </Link>
              </div>
            )}

            {/* Footer */}
            <div className="pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                Inspired by Sunshine ☀️
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
