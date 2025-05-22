
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Briefcase, Store, Scissors, Users, Phone, Info, MessageCircle, PlusSquare, User } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggle from '@/components/layout/LanguageToggle';
import { cn } from '@/lib/utils';
import { mainNavigationItems } from '@/components/layout/navbar/config/navigationItems';
import Logo from '@/components/ui/Logo';

const MobileMenu: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  
  // Close menu when navigating to a new route
  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };
  
  // Get additional navigation items not in the main nav
  const additionalNavItems = [
    { 
      title: 'Home', 
      path: '/', 
      icon: Home 
    },
    {
      title: 'About',
      path: '/about',
      icon: Info
    },
    {
      title: 'Contact',
      path: '/contact',
      icon: Phone
    },
    { 
      title: 'Dashboard', 
      path: '/dashboard',
      icon: User
    },
  ];
  
  // Combine all nav items, filtering out duplicates
  const allNavItems = [...additionalNavItems, ...mainNavigationItems]
    .filter((item, index, self) => 
      index === self.findIndex((t) => t.path === item.path)
    );
    
  // Check current route for active state
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
  
  return (
    <div className="relative z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="flex md:hidden rounded-full p-2 h-10 w-10"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        
        <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0 border-r shadow-lg">
          <div className="flex flex-col h-full">
            {/* Header with Logo */}
            <div className="flex items-center justify-between border-b p-4">
              <div onClick={() => handleNavigation('/')} className="cursor-pointer">
                <Logo size="small" showText={true} />
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Nav Links */}
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="space-y-1 px-2">
                {/* Post Job button (highlighted) */}
                <div className="px-2 mb-6">
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex gap-2"
                    onClick={() => handleNavigation('/post-job')}
                  >
                    <PlusSquare size={18} />
                    {t({
                      english: 'Post a Job',
                      vietnamese: 'Đăng việc làm'
                    })}
                  </Button>
                </div>
                
                {/* Navigation Items */}
                {allNavItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={cn(
                      "flex items-center w-full px-3 py-2.5 text-sm rounded-md transition-colors",
                      isActive(item.path) 
                        ? "bg-purple-100 text-purple-700 font-medium" 
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    {t({
                      english: item.title,
                      vietnamese: item.title // Add Vietnamese translation as needed
                    })}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Footer section */}
            <div className="border-t p-4 space-y-4">
              {/* Language Toggle */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500">
                  {t({
                    english: 'Language',
                    vietnamese: 'Ngôn ngữ'
                  })}
                </h4>
                <LanguageToggle minimal={true} />
              </div>
              
              {/* Sunshine credit */}
              <div className="text-center pt-2">
                <p className="text-sm bg-gradient-to-r from-yellow-500 to-pink-400 bg-clip-text text-transparent font-medium">
                  Inspired by Sunshine ☀️
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
