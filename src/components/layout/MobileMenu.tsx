
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Menu, Plus, Building, UserPlus, ArrowRight, Home, Users, Building as BuildingIcon, Briefcase, MessageSquare, Info, Phone, Globe, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LanguageToggle from '@/components/layout/LanguageToggle';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';
import EmviLogo from '@/components/branding/EmviLogo';

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
        className="w-full max-w-sm bg-white p-0 overflow-hidden shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Premium Header with Floating Logo & Close */}
          <div className="relative flex items-center justify-center p-6 bg-gradient-to-r from-purple-50 via-white to-pink-50">
            <EmviLogo size="large" showText={true} />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeMenu}
              className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200"
            >
              <X className="h-5 w-5 text-gray-600" />
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Hero Zone - Primary Actions */}
            <div className="p-6 bg-gradient-to-b from-purple-50/30 to-transparent">
              <div className="space-y-4">
                <Button 
                  asChild
                  className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Link to="/posting/job" onClick={closeMenu}>
                    <Plus className="mr-3 h-5 w-5" />
                    Post a Job for Free
                  </Link>
                </Button>
                
                <PostYourSalonButton 
                  variant="default"
                  size="lg"
                  className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  onClose={closeMenu}
                />
                
                <Button 
                  asChild
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Link to="/auth/signup" onClick={closeMenu}>
                    <UserPlus className="mr-3 h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  variant="outline"
                  className="w-full h-12 border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 font-medium shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Link to="/auth/signin" onClick={closeMenu}>
                    <ArrowRight className="mr-3 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="mx-6 border-t border-gray-200"></div>

            {/* EXPLORE Section */}
            <div className="p-6 pb-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">EXPLORE</h3>
              <div className="space-y-1">
                <Link 
                  to="/" 
                  onClick={closeMenu}
                  className="flex items-center px-4 py-3.5 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-all duration-200 group"
                >
                  <Home className="mr-4 h-5 w-5 text-gray-400 group-hover:text-purple-500" />
                  Home
                </Link>
                <Link 
                  to="/artists" 
                  onClick={closeMenu}
                  className="flex items-center px-4 py-3.5 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-all duration-200 group"
                >
                  <Users className="mr-4 h-5 w-5 text-gray-400 group-hover:text-purple-500" />
                  Artists
                </Link>
                <Link 
                  to="/salons" 
                  onClick={closeMenu}
                  className="flex items-center px-4 py-3.5 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-all duration-200 group"
                >
                  <BuildingIcon className="mr-4 h-5 w-5 text-gray-400 group-hover:text-purple-500" />
                  Salons
                </Link>
                <Link 
                  to="/jobs" 
                  onClick={closeMenu}
                  className="flex items-center px-4 py-3.5 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-all duration-200 group"
                >
                  <Briefcase className="mr-4 h-5 w-5 text-gray-400 group-hover:text-purple-500" />
                  Jobs
                </Link>
                <Link 
                  to="/community" 
                  onClick={closeMenu}
                  className="flex items-center px-4 py-3.5 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-all duration-200 group"
                >
                  <MessageSquare className="mr-4 h-5 w-5 text-gray-400 group-hover:text-purple-500" />
                  Community
                </Link>
                <Link 
                  to="/dashboard" 
                  onClick={closeMenu}
                  className="flex items-center px-4 py-3.5 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-all duration-200 group"
                >
                  <Building className="mr-4 h-5 w-5 text-gray-400 group-hover:text-purple-500" />
                  Dashboard
                </Link>
              </div>
            </div>

            {/* Light Divider */}
            <div className="mx-6 border-t border-gray-100"></div>

            {/* COMPANY Section */}
            <div className="p-6 pt-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">COMPANY</h3>
              <div className="space-y-1">
                <Link 
                  to="/about" 
                  onClick={closeMenu}
                  className="flex items-center px-4 py-3.5 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-all duration-200 group"
                >
                  <Info className="mr-4 h-5 w-5 text-gray-400 group-hover:text-purple-500" />
                  About
                </Link>
                <Link 
                  to="/contact" 
                  onClick={closeMenu}
                  className="flex items-center px-4 py-3.5 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-all duration-200 group"
                >
                  <Phone className="mr-4 h-5 w-5 text-gray-400 group-hover:text-purple-500" />
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Premium Footer - Fixed */}
          <div className="p-6 border-t bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
                <Globe className="h-4 w-4 text-gray-500 mr-2" />
                <LanguageToggle minimal={true} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium flex items-center justify-center">
                Inspired by Sunshine 
                <Heart className="ml-1 h-4 w-4 text-pink-400" />
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
