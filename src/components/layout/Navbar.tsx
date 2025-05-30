
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle, Store, Menu, X } from 'lucide-react';
import { EmviLogo } from '@/components/branding/EmviLogo';
import { UserMenu } from '@/components/layout/navbar/UserMenu';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useAuth } from '@/context/auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

const Navbar = () => {
  const { user, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePostJobClick = () => {
    if (isSignedIn) {
      navigate('/post-job');
    } else {
      navigate('/auth/signin?redirect=/post-job');
    }
  };

  const handleListSalonClick = () => {
    if (isSignedIn) {
      navigate('/post-salon');
    } else {
      navigate('/auth/signin?redirect=/post-salon');
    }
  };

  const navItems = [
    { label: 'Jobs', path: '/jobs' },
    { label: 'Salons', path: '/salons' },
    { label: 'Artists', path: '/artists' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <EmviLogo className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              {/* Center Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-sm font-medium transition-colors hover:text-[#9A7B69] ${
                      location.pathname === item.path ? 'text-[#9A7B69]' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-3">
                {/* Post Job CTA */}
                <Button
                  onClick={handlePostJobClick}
                  className="bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white shadow-md hover:shadow-lg transition-all duration-300 font-playfair font-semibold px-6 py-2 rounded-lg border border-[#8A6B59]/20"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Post a Job
                </Button>

                {/* List Salon CTA */}
                <Button
                  onClick={handleListSalonClick}
                  className="bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white shadow-md hover:shadow-lg transition-all duration-300 font-playfair font-semibold px-6 py-2 rounded-lg border border-[#8A6B59]/20"
                >
                  <Store className="mr-2 h-4 w-4" />
                  List Your Salon
                </Button>

                <LanguageToggle />
                
                {user ? (
                  <UserMenu />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" asChild>
                      <Link to="/auth/signin">Sign In</Link>
                    </Button>
                    <Button asChild className="bg-[#9A7B69] hover:bg-[#8A6B59]">
                      <Link to="/auth/signup">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <div className="flex items-center space-x-2">
              <LanguageToggle />
              {user ? (
                <UserMenu />
              ) : (
                <Button variant="ghost" asChild size="sm">
                  <Link to="/auth/signin">Sign In</Link>
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors hover:text-[#9A7B69] hover:bg-gray-50 ${
                    location.pathname === item.path ? 'text-[#9A7B69] bg-gray-50' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <Button
                  onClick={() => {
                    handlePostJobClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white shadow-md hover:shadow-lg transition-all duration-300 font-playfair font-semibold rounded-lg border border-[#8A6B59]/20"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Post a Job
                </Button>
                
                <Button
                  onClick={() => {
                    handleListSalonClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white shadow-md hover:shadow-lg transition-all duration-300 font-playfair font-semibold rounded-lg border border-[#8A6B59]/20"
                >
                  <Store className="mr-2 h-4 w-4" />
                  List Your Salon
                </Button>
              </div>

              {!user && (
                <div className="pt-2 space-y-2">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
