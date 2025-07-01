
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Users, Briefcase, MessageSquare, User, Settings, HelpCircle, LogOut, Calendar, Info, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';
import LanguageToggle from '@/components/common/LanguagePreference';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  // Get display name - prefer full_name, fallback to email
  const displayName = userProfile?.full_name || user?.email || 'User';
  const initials = userProfile?.full_name 
    ? userProfile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <>
      {/* Hamburger Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={closeMenu} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
            <div className="flex h-full flex-col">
              {/* Header - Fixed */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center space-x-3">
                  {user && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userProfile?.avatar_url} alt={displayName} />
                      <AvatarFallback className="text-sm">{initials}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {user ? displayName : 'Guest'}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={closeMenu}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Navigation - Scrollable */}
              <nav className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-1">
                  {/* Top Section */}
                  <Link
                    to="/"
                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    <Home className="h-5 w-5" />
                    <span>{t({ english: "Home", vietnamese: "Trang chủ" })}</span>
                  </Link>

                  <Link
                    to="/artists"
                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    <Users className="h-5 w-5" />
                    <span>{t({ english: "Artists", vietnamese: "Thợ làm nail" })}</span>
                  </Link>

                  <Link
                    to="/salons"
                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    <Briefcase className="h-5 w-5" />
                    <span>{t({ english: "Salons", vietnamese: "Tiệm nail" })}</span>
                  </Link>

                  <Link
                    to="/jobs"
                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    <Briefcase className="h-5 w-5" />
                    <span>{t({ english: "Jobs", vietnamese: "Việc làm" })}</span>
                  </Link>

                  <Link
                    to="/community"
                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    <Users className="h-5 w-5" />
                    <span>{t({ english: "Community", vietnamese: "Cộng đồng" })}</span>
                  </Link>

                  {/* Divider */}
                  <div className="my-4 border-t border-gray-200" />

                  {/* Middle Section */}
                  <Link
                    to="/about"
                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    <Info className="h-5 w-5" />
                    <span>{t({ english: "About", vietnamese: "Giới thiệu" })}</span>
                  </Link>

                  <Link
                    to="/contact"
                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    <Mail className="h-5 w-5" />
                    <span>{t({ english: "Contact", vietnamese: "Liên hệ" })}</span>
                  </Link>

                  {user && (
                    <>
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        <Calendar className="h-5 w-5" />
                        <span>{t({ english: "Dashboard", vietnamese: "Bảng điều khiển" })}</span>
                      </Link>

                      <Link
                        to="/messages"
                        className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        <MessageSquare className="h-5 w-5" />
                        <span>{t({ english: "Messages", vietnamese: "Tin nhắn" })}</span>
                      </Link>

                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        <User className="h-5 w-5" />
                        <span>{t({ english: "Profile", vietnamese: "Hồ sơ" })}</span>
                      </Link>
                    </>
                  )}
                </div>
              </nav>

              {/* Footer - Fixed */}
              <div className="border-t p-4">
                <div className="space-y-2">
                  {user && (
                    <>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        <Settings className="h-5 w-5" />
                        <span>{t({ english: "Settings", vietnamese: "Cài đặt" })}</span>
                      </Link>

                      <Link
                        to="/help"
                        className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        <HelpCircle className="h-5 w-5" />
                        <span>{t({ english: "Help & Support", vietnamese: "Trợ giúp & Hỗ trợ" })}</span>
                      </Link>
                    </>
                  )}

                  {/* Language Toggle */}
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <Globe className="h-5 w-5" />
                    <LanguageToggle />
                  </div>

                  {/* Auth Buttons */}
                  {user ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-start space-x-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>{t({ english: "Sign Out", vietnamese: "Đăng xuất" })}</span>
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Link to="/auth" onClick={closeMenu}>
                        <Button variant="outline" className="w-full">
                          {t({ english: "Sign In", vietnamese: "Đăng nhập" })}
                        </Button>
                      </Link>
                      <Link to="/auth" onClick={closeMenu}>
                        <Button className="w-full">
                          {t({ english: "Sign Up", vietnamese: "Đăng ký" })}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
