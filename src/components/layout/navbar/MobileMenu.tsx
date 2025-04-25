
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Search, 
  Store, 
  Globe, 
  Award,
  Gift,
  DollarSign,
  User
} from "lucide-react";
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
      <SheetContent 
        side="right" 
        className="p-0 w-full max-w-[320px] border-l border-gray-100 shadow-xl bg-white/95 backdrop-blur-md"
      >
        <div className="flex flex-col h-full">
          {/* Header with close button and language toggle */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <LanguageToggle minimal className="text-gray-700" />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full hover:bg-gray-100">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          
          {/* Menu content with elegant styling */}
          <div className="flex-1 py-6 px-3 overflow-y-auto">
            {/* Explore Section */}
            <div className="mb-7">
              <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Explore
              </h3>
              <ul className="space-y-1.5">
                <PremiumMenuButton 
                  icon={Home} 
                  label="Home" 
                  path="/" 
                  onClick={() => handleMenuItemClick("/")} 
                />
                
                {/* Map through navigation items */}
                <PremiumMenuButton 
                  icon={Users} 
                  label="Find Artists" 
                  path="/artists" 
                  onClick={() => handleMenuItemClick("/artists")} 
                />
                
                <PremiumMenuButton 
                  icon={Search} 
                  label="Search Jobs" 
                  path="/jobs" 
                  onClick={() => handleMenuItemClick("/jobs")} 
                />
                
                <PremiumMenuButton 
                  icon={Store} 
                  label="Browse Salons" 
                  path="/salon-marketplace" 
                  onClick={() => handleMenuItemClick("/salon-marketplace")} 
                />
                
                <PremiumMenuButton 
                  icon={DollarSign} 
                  label="Pricing" 
                  path="/pricing" 
                  onClick={() => handleMenuItemClick("/pricing")} 
                />
              </ul>
            </div>
            
            {/* VIP Access Section */}
            <div className="mb-7">
              <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                VIP Access
              </h3>
              <ul className="space-y-1.5">
                <PremiumMenuButton 
                  icon={Award} 
                  label="Early Access" 
                  path="/early-access-dashboard" 
                  onClick={() => handleMenuItemClick("/early-access-dashboard")} 
                  highlight={true}
                  premium={true}
                />
                <PremiumMenuButton 
                  icon={Gift} 
                  label="Referral Program" 
                  path="/referrals" 
                  onClick={() => handleMenuItemClick("/referrals")} 
                  highlight={true}
                  premium={true}
                />
              </ul>
            </div>
            
            {/* Account Section (conditional) */}
            {user && (
              <div className="mb-7">
                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Account
                </h3>
                <ul className="space-y-1.5">
                  <PremiumMenuButton 
                    icon={Home} 
                    label="Dashboard" 
                    path={getDashboardPath()} 
                    onClick={() => handleMenuItemClick(getDashboardPath())} 
                  />
                  <PremiumMenuButton 
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
          <div className="p-4 space-y-3 border-t border-gray-100 bg-gray-50/70">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-center border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors"
                  onClick={() => {
                    setOpen(false);
                    handleSignOut();
                  }}
                >
                  Sign Out
                </Button>
                <Button 
                  className="w-full justify-center bg-emvi-accent hover:bg-emvi-accent/90 shadow-sm"
                  onClick={() => handleMenuItemClick(getDashboardPath())}
                >
                  Go to Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-center hover:bg-gray-100 transition-colors"
                  onClick={() => handleMenuItemClick("/sign-in")}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full justify-center bg-emvi-accent hover:bg-emvi-accent/90 shadow-sm transition-all hover:shadow-md"
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

// Enhanced Premium Menu Button component with animations and styling
const PremiumMenuButton = ({ 
  icon: Icon, 
  label, 
  path, 
  onClick, 
  highlight = false,
  premium = false
}: { 
  icon: any; 
  label: string; 
  path: string; 
  onClick: () => void; 
  highlight?: boolean;
  premium?: boolean;
}) => {
  const isActive = window.location.pathname === path;
  
  return (
    <motion.li
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative",
        premium && "overflow-hidden"
      )}
    >
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start text-base font-medium rounded-xl py-2.5 px-4",
          isActive ? "text-emvi-accent bg-emvi-accent/5" : "text-gray-700",
          highlight && "bg-emvi-accent/5",
          premium && "overflow-hidden"
        )}
        onClick={onClick}
      >
        <div className={cn(
          "mr-3 h-5 w-5",
          highlight && "text-emvi-accent"
        )}>
          <Icon size={20} />
        </div>
        <span className={cn(
          highlight ? "text-emvi-accent font-semibold" : "",
          "relative z-10"
        )}>
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
        
        {premium && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={cn(
              "absolute inset-0 opacity-10 rounded-xl",
              premium && "border border-emvi-accent glow-effect"
            )} />
          </div>
        )}
      </Button>
    </motion.li>
  );
};

export default MobileMenu;
