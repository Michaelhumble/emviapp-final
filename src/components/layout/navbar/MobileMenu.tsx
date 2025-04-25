
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Menu, X, Home, Users, Briefcase, Search, DollarSign, Award, Globe, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getLanguagePreference } from "@/utils/languagePreference";

interface MobileMenuProps {
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { userRole } = useAuth();
  
  // Navigation items organized by sections
  const exploreItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Users, label: "Find Artists", path: "/artists" },
    { icon: Briefcase, label: "Search Jobs", path: "/jobs" },
    { icon: Search, label: "Browse Salons", path: "/salons" },
    { icon: DollarSign, label: "Pricing", path: "/pricing" },
  ];
  
  const vipItems = [
    { 
      icon: Award, 
      label: "Early Access", 
      path: "/early-access-dashboard", 
      highlight: true 
    },
    { 
      icon: Users, 
      label: "Referral Program", 
      path: "/referrals", 
      highlight: true 
    },
  ];
  
  const accountItems = user ? [
    { icon: Home, label: "Dashboard", path: getDashboardPath() },
    { icon: User, label: "Profile", path: "/profile" },
  ] : [];
  
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
  
  // Get current language
  const language = getLanguagePreference();
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden relative">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="mobile-glass-drawer p-0 overflow-y-auto flex flex-col h-full w-full max-w-[80%] sm:max-w-[350px]">
        <div className="flex flex-col h-full">
          {/* Header with close button and language toggle */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-xl font-playfair text-white">Menu</h2>
            <div className="flex items-center space-x-1">
              <LanguageToggle minimal className="text-white" />
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="text-white hover:bg-white/10 rounded-full">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>
          
          {/* Menu sections */}
          <div className="flex-1 py-2 px-2 overflow-y-auto">
            {/* Explore Section */}
            <div className="mb-6">
              <h3 className="px-3 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                Explore
              </h3>
              <ul className="space-y-1">
                {exploreItems.map((item) => (
                  <li key={item.label}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-medium text-white hover:bg-white/10"
                      onClick={() => handleMenuItemClick(item.path)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* VIP Access Section with special styling */}
            <div className="mb-6">
              <h3 className="px-3 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                VIP Access
              </h3>
              <ul className="space-y-1">
                {vipItems.map((item) => (
                  <li key={item.label}>
                    <motion.div
                      initial={{ opacity: 0.9 }}
                      animate={{ opacity: 1 }}
                      className={item.highlight ? "glow-effect" : ""}
                    >
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-base font-medium text-white hover:bg-white/10 relative overflow-hidden",
                          item.highlight && "bg-emvi-accent/10"
                        )}
                        onClick={() => handleMenuItemClick(item.path)}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.label}
                      </Button>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Account Section (conditional) */}
            {user && (
              <div className="mb-6">
                <h3 className="px-3 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Account
                </h3>
                <ul className="space-y-1">
                  {accountItems.map((item) => (
                    <li key={item.label}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-base font-medium text-white hover:bg-white/10"
                        onClick={() => handleMenuItemClick(item.path)}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.label}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Footer with sign in/out and CTA */}
          <div className="p-4 space-y-4 border-t border-white/10">
            {user ? (
              <>
                <Button 
                  variant="destructive" 
                  className="w-full justify-center text-white bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    setOpen(false);
                    handleSignOut();
                  }}
                >
                  Sign Out
                </Button>
                <Button 
                  className="w-full justify-center bg-emvi-accent hover:bg-emvi-accent/95"
                  onClick={() => handleMenuItemClick(getDashboardPath())}
                >
                  Go to Dashboard
                </Button>
              </>
            ) : (
              <>
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center border-white/20 text-white hover:bg-white/10 hover:text-white"
                    onClick={() => handleMenuItemClick("/sign-in")}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="w-full justify-center bg-emvi-accent hover:bg-emvi-accent/95"
                    onClick={() => handleMenuItemClick("/early-access-dashboard")}
                  >
                    Unlock Early Access
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
