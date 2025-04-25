
import React, { useState } from 'react';
import { 
  Menu, X, Home, Users, Store, Briefcase, CreditCard, Gift, 
  LayoutDashboard, User, LogOut, Search, LogIn, ChevronRight 
} from 'lucide-react';
import { 
  Sheet, SheetContent, SheetFooter, SheetHeader, 
  SheetTitle, SheetTrigger, SheetClose 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { validateRoute } from '@/utils/routeValidator';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageToggle from '@/components/layout/LanguageToggle';
import { Drawer } from '@/components/ui/drawer';
import { useTranslation } from '@/hooks/useTranslation';

interface MobileMenuProps {
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
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

  // Primary navigation items
  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Users, label: "Find Artists", path: "/artists" },
    { icon: Search, label: "Search Jobs", path: "/jobs" },
    { icon: Store, label: "Browse Salons", path: "/salons" },
    { 
      icon: CreditCard, 
      label: "Pricing", 
      path: "/pricing",
      highlight: false 
    },
    { 
      icon: Gift, 
      label: "Early Access", 
      path: "/early-access-dashboard", 
      highlight: true 
    },
    { 
      icon: Gift, 
      label: "Referral Program", 
      path: "/referrals", 
      highlight: true 
    },
  ];

  // Account-related navigation items when user is signed in
  const userMenuItems = user ? [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: User, label: "Profile", path: "/profile" },
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
        side="right"
        className="mobile-glass-drawer w-[85vw] max-w-[390px] p-0 border-0 overflow-hidden"
      >
        <SheetHeader className="px-6 py-5 border-b border-white/10 bg-white/5 flex justify-between items-center w-full sticky top-0 z-10">
          <SheetTitle className="text-[1.45rem] font-playfair tracking-tight bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent">
            EmviApp
          </SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="sm" className="rounded-full h-10 w-10 p-0 hover:bg-white/10">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </SheetHeader>
        
        {/* Language Toggle at top */}
        <div className="p-4 border-b border-white/5">
          <LanguageToggle minimal={false} />
        </div>
        
        <div className="flex-1 overflow-auto py-3 pb-safe-area">
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col space-y-1 pt-1 px-3"
            >
              {/* Primary navigation items */}
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={`
                        justify-start w-full px-4 py-5 h-auto text-lg
                        rounded-xl mb-1 font-serif flex items-center leading-none
                        ${isActive 
                          ? 'bg-white/10 text-white shadow-lg' 
                          : 'hover:bg-white/5 text-gray-100'}
                        ${item.highlight 
                          ? 'bg-gradient-to-r from-emvi-accent/20 to-purple-500/10 hover:from-emvi-accent/30 hover:to-purple-500/20 border border-white/10' 
                          : ''}
                        transition-all duration-200
                      `}
                      onClick={() => handleNavigation(item.path, item.label)}
                    >
                      <item.icon className={`mr-4 h-5 w-5 ${isActive ? "text-emvi-accent" : "text-gray-300"}`} />
                      <span className="mt-0.5">{item.label}</span>
                      {item.highlight && (
                        <motion.span 
                          className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emvi-accent/20 text-emvi-accent"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          VIP
                        </motion.span>
                      )}
                    </Button>
                  </motion.div>
                );
              })}

              {user && (
                <>
                  <div className="mt-5 mb-2 px-3 text-[1.03rem] font-semibold text-gray-300/90 tracking-wide font-playfair border-t border-white/5 pt-5">
                    {t({
                      english: "Account",
                      vietnamese: "Tài khoản"
                    })}
                  </div>
                  {userMenuItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index + menuItems.length) * 0.05 }}
                      >
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={`
                            justify-start w-full px-4 py-5 h-auto rounded-xl font-serif flex items-center
                            ${isActive 
                              ? 'bg-white/10 text-white shadow-lg' 
                              : 'hover:bg-white/5 text-gray-100'}
                            transition-all duration-200
                          `}
                          onClick={() => handleNavigation(item.path, item.label)}
                        >
                          <item.icon className={`mr-4 h-5 w-5 ${isActive ? "text-emvi-accent" : "text-gray-300"}`} />
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
        
        <SheetFooter className="pt-4 pb-7 px-5 bg-white/5 border-t border-white/10 mt-auto">
          {user ? (
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center h-12 text-base rounded-xl shadow-lg font-medium"
              onClick={() => {
                handleSignOut();
                closeMenu();
              }}
            >
              <LogOut className="mr-3 h-5 w-5" />
              {t({
                english: "Sign Out",
                vietnamese: "Đăng xuất"
              })}
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button 
                variant="outline" 
                className="w-full h-12 text-base rounded-xl font-medium shadow-sm bg-white/5 border-white/10 text-white hover:bg-white/10"
                onClick={() => handleNavigation("/auth/signin", "Sign In")}
              >
                <LogIn className="mr-2 h-5 w-5" />
                {t({
                  english: "Sign In",
                  vietnamese: "Đăng nhập"
                })}
              </Button>
              <Button 
                className="w-full h-12 text-base rounded-xl font-medium bg-emvi-accent hover:bg-emvi-accent/90 text-white shadow-lg"
                onClick={() => handleNavigation("/auth/signup", "Sign Up")}
              >
                <User className="mr-2 h-5 w-5" />
                {t({
                  english: "Sign Up", 
                  vietnamese: "Đăng ký"
                })}
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
