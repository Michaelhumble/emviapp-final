
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Users, Store, Briefcase, MessageCircle, Info, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import LanguagePreference from '@/components/common/LanguagePreference';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t, toggleLanguage, isVietnamese } = useTranslation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  <h2 className="text-lg font-semibold">Menu</h2>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-4">
                  {/* Action Buttons - Always at the top */}
                  <div className="space-y-3">
                    <Link to="/post-job" onClick={closeMenu}>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3">
                        {t({
                          english: "Post a Job for Free",
                          vietnamese: "Đăng Việc Miễn Phí"
                        })}
                      </Button>
                    </Link>

                    <Link to="/posting/salon" onClick={closeMenu}>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3">
                        {t({
                          english: "Post Your Salon",
                          vietnamese: "Đăng Bán Tiệm"
                        })}
                      </Button>
                    </Link>

                    {!user && (
                      <>
                        <Link to="/auth?mode=signup" onClick={closeMenu}>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3">
                            {t({
                              english: "Sign Up",
                              vietnamese: "Đăng Ký"
                            })}
                          </Button>
                        </Link>

                        <Link to="/auth?mode=signin" onClick={closeMenu}>
                          <Button 
                            variant="outline" 
                            className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3"
                          >
                            {t({
                              english: "Sign In",
                              vietnamese: "Đăng Nhập"
                            })}
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>

                  {/* Navigation Links */}
                  <div className="border-t pt-4 space-y-2">
                    {user && (
                      <Link
                        to="/dashboard"
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Home className="h-5 w-5" />
                        <span className="font-medium">
                          {t({
                            english: "Dashboard",
                            vietnamese: "Bảng Điều Khiển"
                          })}
                        </span>
                      </Link>
                    )}

                    <Link
                      to="/"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Home className="h-5 w-5" />
                      <span className="font-medium">
                        {t({
                          english: "Home",
                          vietnamese: "Trang Chủ"
                        })}
                      </span>
                    </Link>

                    <Link
                      to="/artists"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Users className="h-5 w-5" />
                      <span className="font-medium">
                        {t({
                          english: "Artists",
                          vietnamese: "Thợ Làm Nail"
                        })}
                      </span>
                    </Link>

                    <Link
                      to="/salons"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Store className="h-5 w-5" />
                      <span className="font-medium">
                        {t({
                          english: "Salons",
                          vietnamese: "Tiệm Nail"
                        })}
                      </span>
                    </Link>

                    <Link
                      to="/jobs"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Briefcase className="h-5 w-5" />
                      <span className="font-medium">
                        {t({
                          english: "Jobs",
                          vietnamese: "Việc Làm"
                        })}
                      </span>
                    </Link>

                    <Link
                      to="/community"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="font-medium">
                        {t({
                          english: "Community",
                          vietnamese: "Cộng Đồng"
                        })}
                      </span>
                    </Link>

                    <Link
                      to="/about"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Info className="h-5 w-5" />
                      <span className="font-medium">
                        {t({
                          english: "About",
                          vietnamese: "Giới Thiệu"
                        })}
                      </span>
                    </Link>

                    <Link
                      to="/contact"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="font-medium">
                        {t({
                          english: "Contact",
                          vietnamese: "Liên Hệ"
                        })}
                      </span>
                    </Link>
                  </div>

                  {/* User Section */}
                  {user && (
                    <div className="border-t pt-4 space-y-2">
                      <div className="px-3 py-2 text-sm text-gray-600">
                        {t({
                          english: `Signed in as: ${user.email}`,
                          vietnamese: `Đã đăng nhập: ${user.email}`
                        })}
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                      >
                        {t({
                          english: "Sign Out",
                          vietnamese: "Đăng Xuất"
                        })}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Fixed Bottom Section */}
              <div className="border-t p-4 space-y-3">
                {/* Language Selector */}
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-medium">
                    {isVietnamese ? 'English' : 'Tiếng Việt'}
                  </span>
                </button>

                {/* Credit */}
                <div className="text-center text-sm text-gray-500">
                  Inspired by Sunshine ☀️
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <LanguagePreference />
    </>
  );
};

export default MobileMenu;
