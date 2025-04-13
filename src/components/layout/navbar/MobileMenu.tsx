
import React, { useState } from 'react';
import { Menu, X, Home, Users, Store, Briefcase, LayoutDashboard, User, Gift, LogOut, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { validateRoute } from '@/utils/routeValidator';
import { motion, AnimatePresence } from 'framer-motion';
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
    { icon: Search, label: "Search Jobs", path: "/jobs" },
    { icon: Store, label: "Browse Salons", path: "/salons" },
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
          className="md:hidden p-2 min-h-[44px] min-w-[44px] rounded-full"
          aria-label="Menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col w-[85vw] sm:max-w-sm p-0">
        <SheetHeader className="px-4 py-4 border-b flex justify-between items-center">
          <SheetTitle className="text-xl">EmviApp</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </SheetHeader>
        
        <div className="flex-1 overflow-auto py-2">
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col space-y-1 p-2"
            >
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={`justify-start px-4 py-6 h-auto text-lg w-full ${isActive ? 'bg-primary/10 font-medium' : ''}`}
                      onClick={() => handleNavigation(item.path, item.label)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Button>
                  </motion.div>
                );
              })}

              {user && (
                <>
                  <div className="mt-4 px-4 py-2 text-sm font-medium text-muted-foreground">
                    Account
                  </div>
                  {userMenuItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index + menuItems.length) * 0.05 }}
                      >
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={`justify-start px-4 py-6 h-auto text-lg w-full ${isActive ? 'bg-primary/10 font-medium' : ''}`}
                          onClick={() => handleNavigation(item.path, item.label)}
                        >
                          <item.icon className="mr-3 h-5 w-5" />
                          {item.label}
                        </Button>
                      </motion.div>
                    );
                  })}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="border-t p-4">
          <div className="mb-4">
            <LanguageToggle minimal={false} />
          </div>
          
          {user ? (
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center h-12 text-base"
              onClick={() => {
                handleSignOut();
                closeMenu();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button 
                variant="outline" 
                className="w-full h-12 text-base"
                onClick={() => handleNavigation("/auth/signin", "Sign In")}
              >
                Sign In
              </Button>
              <Button 
                className="w-full h-12 text-base"
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
