import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { PlusCircle, Store, Menu, X } from 'lucide-react';
import EmviLogo from '@/components/branding/EmviLogo';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { UserMenu } from './navbar/UserMenu';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn, user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center">
          <EmviLogo size="medium" showText />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
            {t('Home')}
          </Link>
          <Link to="/jobs" className="text-gray-700 hover:text-primary transition-colors">
            {t('Jobs')}
          </Link>
          <Link to="/salons" className="text-gray-700 hover:text-primary transition-colors">
            {t('Salons')}
          </Link>
          <Link to="/artists" className="text-gray-700 hover:text-primary transition-colors">
            {t('Artists')}
          </Link>
        </nav>

        {/* Action Buttons / Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isSignedIn ? (
            <>
              <Link to="/post-job">
                <Button variant="outline" size="sm" className="font-normal">
                  {t('Post a Job')}
                </Button>
              </Link>
              <UserMenu />
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="ghost" size="sm">
                  {t('Sign In')}
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button size="sm">{t('Sign Up')}</Button>
              </Link>
            </>
          )}
          <LanguageToggle />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none">
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 z-30">
          <nav className="px-4 py-3 flex flex-col space-y-3">
            <Link to="/" className="block py-2 text-gray-700 hover:text-primary transition-colors" onClick={closeMobileMenu}>
              {t('Home')}
            </Link>
            <Link to="/jobs" className="block py-2 text-gray-700 hover:text-primary transition-colors" onClick={closeMobileMenu}>
              {t('Jobs')}
            </Link>
            <Link to="/salons" className="block py-2 text-gray-700 hover:text-primary transition-colors" onClick={closeMobileMenu}>
              {t('Salons')}
            </Link>
             <Link to="/artists" className="block py-2 text-gray-700 hover:text-primary transition-colors" onClick={closeMobileMenu}>
              {t('Artists')}
            </Link>
            {isSignedIn ? (
              <>
                <Link to="/post-job" className="block py-2 text-gray-700 hover:text-primary transition-colors" onClick={closeMobileMenu}>
                  {t('Post a Job')}
                </Link>
                <Button variant="destructive" size="sm" className="w-full" onClick={handleLogout}>
                  {t('Logout')}
                </Button>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="block py-2 text-gray-700 hover:text-primary transition-colors" onClick={closeMobileMenu}>
                  {t('Sign In')}
                </Link>
                <Link to="/sign-up" className="block py-2 text-gray-700 hover:text-primary transition-colors" onClick={closeMobileMenu}>
                  {t('Sign Up')}
                </Link>
              </>
            )}
            <LanguageToggle className="mt-2" />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
