
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Home, Users, Building2, Briefcase, MessageSquare, Info, Phone, Calendar, Store } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { getLanguagePreference, setLanguagePreference } from '@/utils/languagePreference';
import EmviLogo from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps = {}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const auth = useAuth?.();
  const user = auth?.user;
  const signOut = auth?.signOut;
  const { t, currentLanguage, setLanguage } = useTranslation();

  // Use internal state if no props provided
  const menuOpen = isOpen !== undefined ? isOpen : isSheetOpen;
  const closeMenu = onClose || (() => setIsSheetOpen(false));

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'english' ? 'vietnamese' : 'english';
    setLanguage(newLang);
    setLanguagePreference(newLang);
  };

  return (
    <Sheet open={menuOpen} onOpenChange={onClose ? undefined : setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="h-[85vh] bg-white/95 backdrop-blur-sm"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <EmviLogo size="small" showText={true} />
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMenu}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 py-3 px-2 rounded-md hover:bg-purple-50 transition-colors"
              >
                <Store className="h-5 w-5" />
                <span className="font-medium">Dashboard</span>
              </Link>

              <Link
                to="/"
                onClick={closeMenu}
                className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 py-3 px-2 rounded-md hover:bg-purple-50 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </Link>

              <Link
                to="/artists"
                onClick={closeMenu}
                className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 py-3 px-2 rounded-md hover:bg-purple-50 transition-colors"
              >
                <Users className="h-5 w-5" />
                <span className="font-medium">Artists</span>
              </Link>

              <Link
                to="/salons"
                onClick={closeMenu}
                className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 py-3 px-2 rounded-md hover:bg-purple-50 transition-colors"
              >
                <Building2 className="h-5 w-5" />
                <span className="font-medium">Salons</span>
              </Link>

              <Link
                to="/jobs"
                onClick={closeMenu}
                className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 py-3 px-2 rounded-md hover:bg-purple-50 transition-colors"
              >
                <Briefcase className="h-5 w-5" />
                <span className="font-medium">Jobs</span>
              </Link>

              <Link
                to="/community"
                onClick={closeMenu}
                className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 py-3 px-2 rounded-md hover:bg-purple-50 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="font-medium">Community</span>
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 py-3 px-2 rounded-md hover:bg-purple-50 transition-colors"
              >
                <Info className="h-5 w-5" />
                <span className="font-medium">About</span>
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
                className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 py-3 px-2 rounded-md hover:bg-purple-50 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span className="font-medium">Contact</span>
              </Link>
            </div>

            <div className="mt-8 space-y-3">
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700" onClick={closeMenu}>
                <Link to="/post-job">Post a Job for Free</Link>
              </Button>

              <Button asChild variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50" onClick={closeMenu}>
                <Link to="/post-salon">Post Your Salon</Link>
              </Button>

              {user && signOut && (
                <button
                  onClick={() => {
                    signOut();
                    closeMenu();
                  }}
                  className="w-full text-sm text-muted-foreground hover:text-red-500 py-2 px-4 rounded-md hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
              )}
            </div>

            <div className="mt-6 pt-4 border-t">
              <button
                onClick={toggleLanguage}
                className="w-full text-center text-sm text-gray-600 hover:text-purple-600 transition-colors"
              >
                {currentLanguage === 'english' ? 'Tiếng Việt' : 'English'}
              </button>
              <div className="text-center text-xs text-gray-400 mt-2">
                Inspired by Sunshine ☀️
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
