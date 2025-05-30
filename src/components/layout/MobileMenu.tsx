
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { mainNavigationItems } from '@/components/layout/navbar/config/navigationItems';
import LanguageToggle from '@/components/layout/LanguageToggle';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  const handlePostJob = () => {
    if (user) {
      navigate('/post-job');
    } else {
      navigate('/sign-in');
    }
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-80">
        <SheetHeader className="text-left mb-6">
          <SheetTitle className="text-xl font-semibold">Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col space-y-4">
          {/* Primary CTA Buttons */}
          <div className="space-y-3 pb-4 border-b border-gray-200">
            <Button 
              onClick={handlePostJob}
              className="w-full bg-purple-600 text-white hover:bg-purple-700"
            >
              {t("Post a Job for Free")}
            </Button>
            
            <PostYourSalonButton 
              variant="outline" 
              className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
            />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {mainNavigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
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
          <div className="pt-4 border-t border-gray-200">
            <LanguageToggle minimal={false} className="w-full justify-center" />
          </div>

          {/* Auth Section */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <User className="h-4 w-4" />
                  {t("Dashboard")}
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("Sign Out")}
                </Button>
              </>
            ) : (
              <>
                <Link to="/sign-in" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">
                    {t("Sign In")}
                  </Button>
                </Link>
                <Link to="/sign-up" onClick={closeMenu}>
                  <Button className="w-full">
                    {t("Sign Up")}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
