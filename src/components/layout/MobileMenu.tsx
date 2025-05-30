
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { mainNavigationItems } from '@/components/layout/navbar/config/navigationItems';
import LanguageToggle from '@/components/layout/LanguageToggle';
import AuthButtons from '@/components/layout/navbar/AuthButtons';
import { UserMenu } from '@/components/layout/navbar/UserMenu';
import ListYourSalonCta from '@/components/common/ListYourSalonCta';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const onPostJobClick = () => {
    navigate("/post-job");
    closeMenu();
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="md:hidden"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={closeMenu} />
          <div className="fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col p-4 space-y-4">
              {/* CTA Buttons at the top of mobile menu */}
              <div className="flex flex-col gap-3 pb-4 border-b bg-gray-50 rounded-lg p-4">
                {user ? (
                  <Button 
                    onClick={onPostJobClick} 
                    className="bg-purple-600 text-white hover:bg-purple-700 rounded-lg w-full"
                  >
                    {t({
                      english: "Post a Job",
                      vietnamese: "Tìm Thợ"
                    })}
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {
                      navigate("/sign-in");
                      closeMenu();
                    }}
                    className="bg-purple-600 text-white hover:bg-purple-700 rounded-lg w-full"
                  >
                    {t({
                      english: "Post a Job",
                      vietnamese: "Tìm Thợ"
                    })}
                  </Button>
                )}
                
                <div onClick={closeMenu}>
                  <ListYourSalonCta variant="mobile" />
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-2">
                {mainNavigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? "text-purple-700 bg-purple-50"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {t({
                      english: item.title,
                      vietnamese: item.vietnameseTitle || item.title
                    })}
                  </Link>
                ))}
              </nav>

              {/* Language Toggle */}
              <div className="pt-4 border-t">
                <LanguageToggle />
              </div>

              {/* Auth Section */}
              <div className="pt-4 border-t">
                {user ? (
                  <div onClick={closeMenu}>
                    <UserMenu />
                  </div>
                ) : (
                  <div onClick={closeMenu}>
                    <AuthButtons />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
