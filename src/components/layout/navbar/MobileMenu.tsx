
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Menu, X, Home, Users, Briefcase, Search, Store, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { motion } from "framer-motion";
import { NavigationItem } from "../navbar/types";
import { mainNavigationItems } from "./config/navigationItems";

interface MobileMenuProps {
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { userRole } = useAuth();
  
  function getDashboardPath() {
    if (!userRole) return "/dashboard";
    
    switch(userRole) {
      case "artist": return "/dashboard/artist";
      case "owner": return "/dashboard/owner";
      case "customer": return "/dashboard/customer";
      case "freelancer": return "/dashboard/freelancer";
      default: return "/dashboard";
    }
  }
  
  const handleMenuItemClick = (path: string) => {
    setOpen(false);
    navigate(path);
  };
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 w-full max-w-[320px] border-l border-gray-100 shadow-xl bg-white">
        <div className="flex flex-col h-full">
          {/* Header with close button and language toggle */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <LanguageToggle minimal className="text-gray-700" />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          
          {/* Menu content */}
          <div className="flex-1 py-4 px-2 overflow-y-auto">
            {/* Explore Section */}
            <div className="mb-6">
              <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Explore
              </h3>
              <ul className="space-y-1">
                <MenuButton 
                  icon={Home} 
                  label="Home" 
                  path="/" 
                  onClick={() => handleMenuItemClick("/")} 
                />
                
                {/* Map through navigation items */}
                {mainNavigationItems.map((item) => (
                  <MenuButton 
                    key={item.path}
                    icon={item.icon || Users} 
                    label={item.title} 
                    path={item.path} 
                    onClick={() => handleMenuItemClick(item.path)} 
                  />
                ))}
                
                <MenuButton 
                  icon={DollarSign} 
                  label="Pricing" 
                  path="/pricing" 
                  onClick={() => handleMenuItemClick("/pricing")} 
                />
              </ul>
            </div>
            
            {/* VIP Access Section */}
            <div className="mb-6">
              <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                VIP Access
              </h3>
              <ul className="space-y-1">
                <MenuButton 
                  icon={Award} 
                  label="Early Access" 
                  path="/early-access-dashboard" 
                  onClick={() => handleMenuItemClick("/early-access-dashboard")} 
                  highlight
                />
                <MenuButton 
                  icon={Users} 
                  label="Referral Program" 
                  path="/referrals" 
                  onClick={() => handleMenuItemClick("/referrals")} 
                  highlight
                />
              </ul>
            </div>
            
            {/* Account Section (conditional) */}
            {user && (
              <div className="mb-6">
                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Account
                </h3>
                <ul className="space-y-1">
                  <MenuButton 
                    icon={Home} 
                    label="Dashboard" 
                    path={getDashboardPath()} 
                    onClick={() => handleMenuItemClick(getDashboardPath())} 
                  />
                  <MenuButton 
                    icon={User} 
                    label="Profile" 
                    path="/profile" 
                    onClick={() => handleMenuItemClick("/profile")} 
                  />
                </ul>
              </div>
            )}
          </div>
          
          {/* Footer with sign in/out and CTA */}
          <div className="p-4 space-y-2 border-t border-gray-100">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-center border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => {
                    setOpen(false);
                    handleSignOut();
                  }}
                >
                  Sign Out
                </Button>
                <Button 
                  className="w-full justify-center bg-emvi-accent hover:bg-emvi-accent/90"
                  onClick={() => handleMenuItemClick(getDashboardPath())}
                >
                  Go to Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={() => handleMenuItemClick("/sign-in")}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full justify-center bg-emvi-accent hover:bg-emvi-accent/90"
                  onClick={() => handleMenuItemClick("/early-access-dashboard")}
                >
                  Unlock Early Access
                </Button>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Helper component for menu buttons
const MenuButton = ({ 
  icon: Icon, 
  label, 
  path, 
  onClick, 
  highlight = false 
}: { 
  icon: any; 
  label: string; 
  path: string; 
  onClick: () => void; 
  highlight?: boolean;
}) => {
  const isActive = window.location.pathname === path;
  
  return (
    <li>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start text-base font-medium",
          isActive ? "text-emvi-accent" : "text-gray-700",
          highlight && "bg-emvi-accent/5"
        )}
        onClick={onClick}
      >
        <div className={cn(
          "mr-2 h-5 w-5",
          highlight && "text-emvi-accent"
        )}>
          <Icon size={20} />
        </div>
        <span className={highlight ? "text-emvi-accent font-semibold" : ""}>
          {label}
        </span>
        {highlight && (
          <motion.div
            className="ml-2 w-1.5 h-1.5 rounded-full bg-emvi-accent"
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ 
              scale: [0.8, 1.2, 0.8], 
              opacity: [0.8, 1, 0.8] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        )}
      </Button>
    </li>
  );
};

// Import missing icons
import { Award, DollarSign } from "lucide-react";

export default MobileMenu;
