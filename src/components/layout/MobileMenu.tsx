
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Users, Building, Briefcase, MessageSquare, Phone, User, HelpCircle } from 'lucide-react';
import { useAuth } from '@/context/auth';
import Logo from '@/components/ui/Logo';
import LanguageToggle from '@/components/layout/LanguageToggle';
import { mainNavigationItems } from '@/components/layout/navbar/config/navigationItems';
import { useTranslation } from '@/hooks/useTranslation';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-full p-0 border-0"
        style={{ 
          background: 'white',
          maxHeight: '85vh',
          borderTopLeftRadius: '1rem',
          borderTopRightRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          position: 'fixed',
          bottom: 0,
          top: 'auto',
          right: 0,
          left: 0,
          transform: 'none'
        }}
      >
        <div className="fixed bottom-0 inset-x-0 z-50 bg-white max-h-[85vh] overflow-y-auto rounded-t-2xl shadow-lg backdrop-blur">
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between p-3 border-b bg-white sticky top-0 z-10">
            <Logo size="medium" showText={true} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex flex-col h-full">
            {/* Auth Section - if not logged in */}
            {!user && (
              <div className="p-3 border-b bg-gray-50">
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-purple-600 text-white hover:bg-purple-700" 
                    onClick={() => handleNavigation('/sign-up')}
                  >
                    {t('Sign Up')}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleNavigation('/sign-in')}
                  >
                    {t('Sign In')}
                  </Button>
                </div>
              </div>
            )}

            {/* Main Navigation */}
            <nav className="flex-1 p-3">
              <div className="space-y-3">
                {mainNavigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.path === '/' && <Home className="h-5 w-5" />}
                    {item.path === '/artists' && <Users className="h-5 w-5" />}
                    {item.path === '/salons' && <Building className="h-5 w-5" />}
                    {item.path === '/jobs' && <Briefcase className="h-5 w-5" />}
                    {item.path === '/community' && <MessageSquare className="h-5 w-5" />}
                    {item.path === '/about' && <HelpCircle className="h-5 w-5" />}
                    {item.path === '/contact' && <Phone className="h-5 w-5" />}
                    <span className="font-medium">
                      {t({
                        english: item.title,
                        vietnamese: item.vietnameseTitle || item.title
                      })}
                    </span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* CTA Buttons */}
            <div className="p-3 space-y-3 border-t bg-gray-50/50">
              <Button 
                className="w-full bg-purple-600 text-white hover:bg-purple-700" 
                onClick={() => handleNavigation(user ? '/post-job' : '/sign-in')}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                {t('Post a Job for Free')}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50" 
                onClick={() => handleNavigation('/post-salon')}
              >
                <Building className="h-4 w-4 mr-2" />
                {t('Post Your Salon')}
              </Button>
            </div>

            {/* User Section - if logged in */}
            {user && (
              <div className="p-3 border-t">
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleNavigation('/dashboard')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {t('Dashboard')}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
                    onClick={handleSignOut}
                  >
                    {t('Sign Out')}
                  </Button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="p-4 text-center border-t bg-gray-50/50">
              <div className="mb-3">
                <LanguageToggle className="mx-auto" />
              </div>
              
              <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                Inspired by Sunshine ☀️
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
