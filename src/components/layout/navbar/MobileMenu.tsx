
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
      <SheetContent
        side="left"
        className={`
          flex flex-col w-[87vw] max-w-[390px] p-0 border-0 mobile-glass-drawer
          shadow-menuDrawer overflow-hidden
        `}
      >
        <SheetHeader className="px-5 py-5 border-b-0 sm:px-6 flex justify-between items-center w-full bg-transparent">
          <SheetTitle className="text-[1.45rem] font-playfair tracking-tight">EmviApp</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="sm" className="rounded-full h-9 w-9 p-0 hover:bg-emvi-accent/10">
              <X className="h-5 w-5" />
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
              className="flex flex-col space-y-2 pt-2 px-2"
            >
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={`
                        justify-start px-5 py-5 h-auto text-lg w-full
                        rounded-xl mb-0.5 shadow-menuItem font-serif flex items-center leading-none
                        ${isActive ? 'bg-white text-emvi-accent font-bold shadow-menuItemActive' : 'hover:bg-white/70 text-gray-700'}
                        transition-all duration-200
                      `}
                      onClick={() => handleNavigation(item.path, item.label)}
                    >
                      <item.icon className={`mr-4 h-5 w-5 ${isActive ? "text-emvi-accent" : "text-gray-400 group-hover:text-emvi-accent"}`} />
                      <span className="mt-0.5">{item.label}</span>
                    </Button>
                  </motion.div>
                );
              })}

              {user && (
                <>
                  <div className="mt-5 mb-2 px-5 text-[1.03rem] font-semibold text-emvi-accent/80 tracking-wide font-playfair">
                    Account
                  </div>
                  {userMenuItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -28 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index + menuItems.length) * 0.05 }}
                      >
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={`
                            justify-start px-5 py-5 h-auto w-full rounded-xl shadow-menuItem font-serif flex items-center
                            ${isActive ? 'bg-white text-emvi-accent font-bold shadow-menuItemActive' : 'hover:bg-white/70 text-gray-700'}
                            transition-all duration-200
                          `}
                          onClick={() => handleNavigation(item.path, item.label)}
                        >
                          <item.icon className={`mr-4 h-5 w-5 ${isActive ? "text-emvi-accent" : "text-gray-400 group-hover:text-emvi-accent"}`} />
                          <span className="mt-0.5">{item.label}</span>
                        </Button>
                      </motion.div>
                    );
                  })}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <SheetFooter className="pt-6 pb-7 px-5 bg-transparent">
          <div className="mb-4">
            <LanguageToggle minimal={false} />
          </div>
          
          {user ? (
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center h-12 text-base rounded-xl shadow-menuItemActive font-semibold font-serif"
              onClick={() => {
                handleSignOut();
                closeMenu();
              }}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button 
                variant="outline" 
                className="w-full h-12 text-base rounded-xl font-serif shadow-menuItem"
                onClick={() => handleNavigation("/auth/signin", "Sign In")}
              >
                Sign In
              </Button>
              <Button 
                className="w-full h-12 text-base rounded-xl font-serif bg-emvi-accent/95 text-white shadow-menuItem"
                onClick={() => handleNavigation("/auth/signup", "Sign Up")}
              >
                Sign Up
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
