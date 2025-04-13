
import React, { useState } from 'react';
import { Menu, X, Home, Users, Store, Briefcase, LayoutDashboard, User, Gift, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { validateRoute } from '@/utils/routeValidator';
import { motion } from 'framer-motion';
import LanguageToggle from '../LanguageToggle';

interface MobileMenuProps {
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setOpen(false);
  
  const handleNavigation = (path: string, label: string) => {
    if (validateRoute(path)) {
      navigate(path);
    } else {
      toast.info(`${label} feature coming soon!`);
      navigate("/dashboard");
    }
    closeMenu();
  };

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Users, label: "Find Artists", path: "/artists" },
    { icon: Store, label: "For Salon Owners", path: "/salon-owners" },
    { icon: Briefcase, label: "Jobs", path: "/jobs" },
  ];

  const userMenuItems = user ? [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Gift, label: "Referrals", path: "/referrals" },
  ] : [];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="md:hidden p-2 relative"
          aria-label="Menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-[85vw] sm:max-w-sm p-0">
        <SheetHeader className="px-4 py-4 border-b">
          <SheetTitle className="text-xl">Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col space-y-1 p-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.label}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`justify-start px-4 py-6 h-auto text-lg ${isActive ? 'bg-primary/10 font-medium' : ''}`}
                  onClick={() => handleNavigation(item.path, item.label)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}

            {user && (
              <>
                <div className="mt-4 px-4 py-2 text-sm font-medium text-muted-foreground">
                  Account
                </div>
                {userMenuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Button
                      key={item.label}
                      variant={isActive ? "secondary" : "ghost"}
                      className={`justify-start px-4 py-6 h-auto text-lg ${isActive ? 'bg-primary/10 font-medium' : ''}`}
                      onClick={() => handleNavigation(item.path, item.label)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Button>
                  );
                })}
              </>
            )}
          </div>
        </div>
        
        <div className="border-t p-4">
          <div className="mb-4">
            <LanguageToggle minimal={false} />
          </div>
          
          {user ? (
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center" 
              onClick={() => {
                handleSignOut();
                closeMenu();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleNavigation("/auth/signin", "Sign In")}
              >
                Sign In
              </Button>
              <Button 
                className="w-full"
                onClick={() => handleNavigation("/auth/signup", "Sign Up")}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
