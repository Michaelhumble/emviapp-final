
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import EmviLogo from '@/components/branding/EmviLogo';
import LanguageToggle from '@/components/layout/LanguageToggle';
import { useTranslation } from '@/hooks/useTranslation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { 
  Menu, 
  X, 
  Home, 
  Search, 
  Briefcase, 
  Store, 
  Users,
  Info, 
  Phone, 
  HelpCircle,
  LogIn,
  UserPlus,
  Settings,
  LogOut,
  CreditCard,
  MessageSquare,
  LayoutDashboard,
  Globe,
  User,
  Scissors
} from 'lucide-react';
import { mainNavigation } from './config/navigationItems';

interface MobileMenuProps {
  user: any;
  handleSignOut: () => void;
}

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const getInitials = () => {
    if (!user?.user_metadata?.full_name) return 'U';
    const names = user.user_metadata.full_name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };
  
  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };
  
  const handleSignOutClick = () => {
    handleSignOut();
    setOpen(false);
    toast.success("You've been signed out successfully");
  };
  
  const getIcon = (path: string) => {
    switch (path) {
      case '/': return <Home className="h-5 w-5" />;
      case '/search': return <Search className="h-5 w-5" />;
      case '/post-job': return <Briefcase className="h-5 w-5" />;
      case '/jobs': return <Briefcase className="h-5 w-5" />;
      case '/salons': return <Store className="h-5 w-5" />;
      case '/artists': return <Scissors className="h-5 w-5" />;
      case '/freelancers': return <Users className="h-5 w-5" />;
      case '/about': return <Info className="h-5 w-5" />;
      case '/contact': return <Phone className="h-5 w-5" />;
      case '/help': return <HelpCircle className="h-5 w-5" />;
      default: return <Home className="h-5 w-5" />;
    }
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="mobile-glass-drawer overflow-y-auto flex flex-col p-0 border-none w-[90%] max-w-[400px]"
        >
          <div className="flex flex-col min-h-full">
            {/* Header with Logo and Close */}
            <div className="flex justify-between items-center p-4 border-b">
              <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </SheetClose>
              
              <div className="mx-auto py-2">
                <EmviLogo size="medium" />
              </div>
            </div>
            
            {/* User Section */}
            {user ? (
              <div className="menu-card mt-6 mx-4 p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10 border border-gray-200">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-purple-100 text-purple-700">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-medium">
                      {user.user_metadata?.full_name || 'Welcome back!'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-6 mx-4">
                <Button
                  onClick={() => handleNavigate('/sign-in')}
                  variant="outline" 
                  className="w-full justify-start menu-item-enter" 
                  style={{ "--index": 0 } as React.CSSProperties}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  {t("Sign In")}
                </Button>
                <Button
                  onClick={() => handleNavigate('/sign-up')}
                  className="w-full justify-start menu-item-enter" 
                  style={{ "--index": 1 } as React.CSSProperties}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  {t("Sign Up")}
                </Button>
              </div>
            )}

            {/* Main Navigation */}
            <nav className="mt-6 flex-1 px-4">
              <div className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2 px-2">
                {t("Navigation")}
              </div>
              <div className="space-y-1">
                {mainNavigation.map((item, index) => (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:bg-purple-50 hover:text-purple-700 menu-item-enter"
                    style={{ "--index": index + 2 } as React.CSSProperties}
                    onClick={() => handleNavigate(item.path)}
                  >
                    {getIcon(item.path)}
                    <span className="ml-2">{t(item.label)}</span>
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-purple-50 hover:text-purple-700 menu-item-enter"
                  style={{ "--index": mainNavigation.length + 2 } as React.CSSProperties}
                  onClick={() => handleNavigate('/post-job')}
                >
                  <Briefcase className="h-5 w-5" />
                  <span className="ml-2">{t("Post a Job")}</span>
                </Button>
              </div>

              {/* User Account Section */}
              {user && (
                <div className="mt-6">
                  <div className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2 px-2">
                    {t("Account")}
                  </div>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:bg-purple-50 hover:text-purple-700 menu-item-enter"
                      style={{ "--index": mainNavigation.length + 3 } as React.CSSProperties}
                      onClick={() => handleNavigate('/dashboard')}
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      {t("Dashboard")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:bg-purple-50 hover:text-purple-700 menu-item-enter"
                      style={{ "--index": mainNavigation.length + 4 } as React.CSSProperties}
                      onClick={() => handleNavigate('/profile')}
                    >
                      <User className="h-4 w-4 mr-2" />
                      {t("Profile")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:bg-purple-50 hover:text-purple-700 menu-item-enter"
                      style={{ "--index": mainNavigation.length + 5 } as React.CSSProperties}
                      onClick={() => {
                        toast.info("Messages feature coming soon!");
                        setOpen(false);
                      }}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {t("Messages")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:bg-purple-50 hover:text-purple-700 menu-item-enter"
                      style={{ "--index": mainNavigation.length + 6 } as React.CSSProperties}
                      onClick={() => {
                        toast.info("Credits feature coming soon!");
                        setOpen(false);
                      }}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {t("Credits")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:bg-purple-50 hover:text-purple-700 menu-item-enter"
                      style={{ "--index": mainNavigation.length + 7 } as React.CSSProperties}
                      onClick={() => handleNavigate('/settings')}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {t("Settings")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:bg-rose-50 hover:text-rose-700 menu-item-enter"
                      style={{ "--index": mainNavigation.length + 8 } as React.CSSProperties}
                      onClick={handleSignOutClick}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t("Sign Out")}
                    </Button>
                  </div>
                </div>
              )}
            </nav>

            {/* Language Toggle & Footer */}
            <div className="mt-auto px-4 pb-6">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
                  <Globe className="w-4 h-4 mr-2 text-gray-600" />
                  <LanguageToggle minimal={true} />
                </div>
              </div>
              
              <div className="text-center text-xs text-gray-500 mt-6">
                <p>Inspired by Sunshine ☀️</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
