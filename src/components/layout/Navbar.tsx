
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import LanguageToggle from './LanguageToggle';
import MobileHamburgerMenu from './MobileHamburgerMenu';
import MainNavigation from './navbar/MainNavigation';
import AuthButtons from './navbar/AuthButtons';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            {/* Post Job and Post Salon Buttons - Desktop Only */}
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/post-job">
                <Button 
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Post a Job
                </Button>
              </Link>
              <Link to="/sell-salon">
                <Button 
                  size="sm"
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  Post Your Salon
                </Button>
              </Link>
            </div>

            {/* Language Toggle */}
            <LanguageToggle />
            
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <AuthButtons />
            </div>

            {/* Mobile Menu */}
            <MobileHamburgerMenu 
              isOpen={isMobileMenuOpen} 
              onClose={() => setIsMobileMenuOpen(false)} 
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
