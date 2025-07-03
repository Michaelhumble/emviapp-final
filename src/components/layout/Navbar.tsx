
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import LanguageToggle from './LanguageToggle';
import MobileHamburgerMenu from './MobileHamburgerMenu';
import MainNavigation from './navbar/MainNavigation';
import AuthButtons from './navbar/AuthButtons';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Logo size="small" showText={true} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <MainNavigation />
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <LanguageToggle />
            
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <AuthButtons />
            </div>

            {/* Mobile Menu */}
            <MobileHamburgerMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
