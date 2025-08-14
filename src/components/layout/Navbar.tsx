
/** PROTECTED: Do not modify without explicit approval. */
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
import UniversalMobileMenu from './UniversalMobileMenu';
import AuthButtons from './navbar/AuthButtons';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { Briefcase, User, Building2, Plus, ChevronDown } from 'lucide-react';
import { NAV_ITEMS } from '@/config/nav.config';

const Navbar = () => {
  // 🔐 SINGLE SOURCE OF TRUTH: Use only centralized auth state
  // NO local state needed - AuthProvider handles all auth state management
  const { isSignedIn, loading } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Logo size="small" showText={true} />
            </Link>
          </div>

          {/* Desktop Navigation - Optimized Dropdown Structure */}
          <div className="hidden md:flex items-center space-x-5">
            {NAV_ITEMS.filter(i => i.location === 'top').map(item => (
              <Link 
                key={item.key}
                to={item.path}
                className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                {item.label}
              </Link>
            ))}
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
                  {NAV_ITEMS.filter(i => ['postJob','sellSalon'].includes(i.key)).map(item => (
                    <Link key={item.key} to={item.path} className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                      {item.key === 'postJob' ? <Briefcase className="w-4 h-4 mr-3" /> : <Building2 className="w-4 h-4 mr-3" />}
                      {item.label}
                    </Link>
                  ))}
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
            <UniversalMobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
