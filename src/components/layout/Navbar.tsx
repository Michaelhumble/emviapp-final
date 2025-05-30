
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import Logo from '@/components/ui/Logo';
import AuthButtons from './navbar/AuthButtons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPostDropdownOpen, setIsPostDropdownOpen] = useState(false);
  const { user } = useAuth();
  const { isVietnamese } = useTranslation();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo size="small" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Desktop Post Job/Salon CTA with Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                className="flex items-center space-x-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                onClick={() => setIsPostDropdownOpen(!isPostDropdownOpen)}
              >
                <span>{isVietnamese ? 'Đăng Tin' : 'Post Job/Salon'}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {isPostDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    to="/post-job"
                    className="block px-4 py-3 hover:bg-purple-50 transition-colors"
                    onClick={() => setIsPostDropdownOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <div className="font-medium text-purple-700">
                          {isVietnamese ? 'Tìm Thợ' : 'Post a Job'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {isVietnamese ? 'Tìm thợ nails, tóc, spa' : 'Hire qualified professionals'}
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  <Link
                    to="/posting/salon"
                    className="block px-4 py-3 hover:bg-amber-50 transition-colors"
                    onClick={() => setIsPostDropdownOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                      <div>
                        <div className="font-medium text-amber-700">
                          {isVietnamese ? 'Bán Tiệm' : 'List Your Salon'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {isVietnamese ? 'Bán tiệm, sang tiệm' : 'Sell your business'}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Welcome back!</span>
              </div>
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user && (
              <div className="flex items-center space-x-2 mr-2">
                <span className="text-sm text-gray-700">Welcome!</span>
              </div>
            )}
            <button
              onClick={toggleMenu}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {!user && <AuthButtons />}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
