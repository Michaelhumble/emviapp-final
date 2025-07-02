
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Plus, Building, User, ArrowRight, Home, Users, Briefcase, Globe, Sun, Heart } from 'lucide-react';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import EmviLogo from '@/components/branding/EmviLogo';

const MobileMenu = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleSignUp = () => {
    navigate('/auth/signup');
    setOpen(false);
  };

  const handleSignIn = () => {
    navigate('/auth/signin');
    setOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const exploreLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/artists', label: 'Artists', icon: Users },
    { path: '/salons', label: 'Salons', icon: Building },
    { path: '/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/community', label: 'Community', icon: Users },
    ...(user ? [{ path: '/dashboard', label: 'Dashboard', icon: Home }] : [])
  ];

  const companyLinks = [
    { path: '/about', label: 'About', icon: Globe },
    { path: '/contact', label: 'Contact', icon: Sun }
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-full max-w-sm bg-white p-0 border-0 shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Header with Logo and Close */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex-1 flex justify-center">
              <EmviLogo size="medium" showText={true} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="h-10 w-10 rounded-full bg-gray-50 shadow-sm hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Hero Zone - Action Buttons */}
            <div className="p-6 space-y-3">
              <Button
                onClick={() => handleNavigation('/post-job')}
                className="w-full h-14 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-lg shadow-lg"
              >
                <Plus className="mr-3 h-5 w-5" />
                Post a Job for Free
              </Button>

              <PostYourSalonButton
                variant="default"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-md"
                onClose={() => setOpen(false)}
              >
                <Building className="mr-3 h-5 w-5" />
                Post Your Salon
              </PostYourSalonButton>

              {!user ? (
                <>
                  <Button
                    onClick={handleSignUp}
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium shadow-md"
                  >
                    <User className="mr-3 h-5 w-5" />
                    Sign Up
                  </Button>

                  <Button
                    onClick={handleSignIn}
                    variant="outline"
                    className="w-full h-12 border-2 border-gray-300 hover:border-purple-300 hover:bg-purple-50 font-medium"
                  >
                    <ArrowRight className="mr-3 h-5 w-5" />
                    Sign In
                  </Button>
                </>
              ) : null}
            </div>

            {/* Navigation Sections */}
            <div className="px-6 pb-6 space-y-6">
              {/* EXPLORE Section */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  EXPLORE
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {exploreLinks.map(({ path, label, icon: Icon }) => (
                    <Button
                      key={path}
                      variant={isActivePath(path) ? "default" : "ghost"}
                      onClick={() => handleNavigation(path)}
                      className={`h-12 justify-start font-medium ${
                        isActivePath(path) 
                          ? "bg-purple-100 text-purple-700 hover:bg-purple-200" 
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="mr-3 h-4 w-4" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100"></div>

              {/* COMPANY Section */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  COMPANY
                </h3>
                <div className="space-y-1">
                  {companyLinks.map(({ path, label, icon: Icon }) => (
                    <Button
                      key={path}
                      variant={isActivePath(path) ? "default" : "ghost"}
                      onClick={() => handleNavigation(path)}
                      className={`w-full h-12 justify-start font-medium ${
                        isActivePath(path) 
                          ? "bg-purple-100 text-purple-700 hover:bg-purple-200" 
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="mr-3 h-4 w-4" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-6 space-y-4">
            {/* Language Selector */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="rounded-full px-4 py-2 bg-gray-50 border-gray-200 hover:bg-gray-100"
              >
                <Globe className="mr-2 h-4 w-4" />
                English
              </Button>
            </div>

            {/* Inspired Credit */}
            <div className="text-center">
              <p className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium flex items-center justify-center">
                Inspired by Sunshine
                <Sun className="ml-2 h-4 w-4 text-yellow-500" />
                <Heart className="ml-1 h-3 w-3 text-pink-500" />
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
