
/**
 * 🧭 NAVBAR - CENTRALIZED AUTH STATE
 * 
 * CRITICAL: Uses ONLY centralized auth context
 * NO local auth state to prevent stale data
 * 
 * Features:
 * - Real-time auth state updates
 * - Immediate button state changes
 * - No local state conflicts
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import LanguageToggle from './LanguageToggle';
import MobileHamburgerMenu from './MobileHamburgerMenu';
import AuthButtons from './navbar/AuthButtons';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';

const Navbar = () => {
  // 🔐 SINGLE SOURCE OF TRUTH: Use only centralized auth state
  // NO local state needed - AuthProvider handles all auth state management
  const { isSignedIn, loading } = useAuth();

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

          {/* Desktop Navigation - Clean Public Order */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/jobs" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Jobs
            </Link>
            <Link 
              to="/artists" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Artists
            </Link>
            <Link 
              to="/salons" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Salons
            </Link>
            <Link 
              to="/community" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Community
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Contact
            </Link>
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
            
            {/* Dashboard Link for Signed In Users */}
            {isSignedIn && (
              <div className="hidden md:flex">
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            )}

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
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
