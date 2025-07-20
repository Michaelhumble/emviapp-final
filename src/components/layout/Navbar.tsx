
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
import { Briefcase, User, Building2, Plus, ChevronDown } from 'lucide-react';

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

          {/* Desktop Navigation - Optimized Dropdown Structure */}
          <div className="hidden md:flex items-center space-x-5">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              Home
            </Link>
            
            {/* Marketplace Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                Marketplace
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/jobs" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                  <Briefcase className="w-4 h-4 mr-3" />
                  Jobs
                </Link>
                <Link to="/artists" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                  <User className="w-4 h-4 mr-3" />
                  Artists
                </Link>
                <Link to="/salons" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                  <Building2 className="w-4 h-4 mr-3" />
                  Salons
                </Link>
              </div>
            </div>
            
            <Link 
              to="/booking-services" 
              className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              Book Services
            </Link>
            <Link 
              to="/community" 
              className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              Community
            </Link>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Combined Post Button - Desktop Only */}
            <div className="hidden md:flex items-center">
              <div className="relative group">
                <Button 
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Post
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link to="/post-job" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                    <Briefcase className="w-4 h-4 mr-3" />
                    Post a Job
                  </Link>
                  <Link to="/sell-salon" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                    <Building2 className="w-4 h-4 mr-3" />
                    Post Your Salon
                  </Link>
                </div>
              </div>
            </div>

            {/* Language Toggle */}
            <LanguageToggle />
            
            {/* Dashboard Link for Signed In Users */}
            {isSignedIn && (
              <div className="hidden md:flex">
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
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
