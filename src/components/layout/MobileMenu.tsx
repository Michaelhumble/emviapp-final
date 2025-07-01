
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LanguageToggle from '@/components/layout/LanguageToggle';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="left" 
        className="w-full max-w-sm bg-white p-0 overflow-y-auto"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-semibold">Menu</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeMenu}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Action Buttons - ALWAYS AT TOP */}
          <div className="p-4 space-y-3 border-b">
            <Button 
              asChild
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              size="lg"
            >
              <Link to="/posting/job" onClick={closeMenu}>
                Post a Job for Free
              </Link>
            </Button>
            
            <PostYourSalonButton 
              variant="default"
              size="lg"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              onClose={closeMenu}
            />
            
            <Button 
              asChild
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              size="lg"
            >
              <Link to="/auth/signup" onClick={closeMenu}>
                Sign Up
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              className="w-full"
              size="lg"
            >
              <Link to="/auth/signin" onClick={closeMenu}>
                Sign In
              </Link>
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 p-4 space-y-1">
            <Link 
              to="/dashboard" 
              onClick={closeMenu}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Dashboard
            </Link>
            <Link 
              to="/" 
              onClick={closeMenu}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Home
            </Link>
            <Link 
              to="/artists" 
              onClick={closeMenu}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Artists
            </Link>
            <Link 
              to="/salons" 
              onClick={closeMenu}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Salons
            </Link>
            <Link 
              to="/jobs" 
              onClick={closeMenu}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Jobs
            </Link>
            <Link 
              to="/community" 
              onClick={closeMenu}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Community
            </Link>
            <Link 
              to="/about" 
              onClick={closeMenu}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              onClick={closeMenu}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Contact
            </Link>
          </div>

          {/* Bottom Section - FIXED */}
          <div className="p-4 border-t bg-gray-50">
            <div className="mb-3">
              <LanguageToggle />
            </div>
            <div className="text-center text-sm text-gray-500">
              Inspired by Sunshine ☀️
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
