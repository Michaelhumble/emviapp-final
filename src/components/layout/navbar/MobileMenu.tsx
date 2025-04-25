
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Menu, X, Home, User, Search, Store, Briefcase, DollarSign, Gift, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { mainNavigationItems } from "./config/navigationItems";
import { NavigationItem } from "./types";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface MobileMenuProps {
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Define icon mapping for navigation items
  const getIcon = (path: string) => {
    switch (path) {
      case "/":
        return <Home className="h-5 w-5 mr-2" />;
      case "/artists":
        return <User className="h-5 w-5 mr-2" />;
      case "/salons":
        return <Store className="h-5 w-5 mr-2" />;
      case "/jobs":
        return <Briefcase className="h-5 w-5 mr-2" />;
      case "/pricing":
        return <DollarSign className="h-5 w-5 mr-2" />;
      case "/early-access-dashboard":
        return <Gift className="h-5 w-5 mr-2" />;
      case "/referral-program":
        return <Gift className="h-5 w-5 mr-2" />;
      default:
        return <Home className="h-5 w-5 mr-2" />;
    }
  };

  // Menu backdrop variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Menu variants
  const menuVariants = {
    hidden: { x: "100%", opacity: 0.5 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  // Menu items stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  // Individual menu item animation
  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button 
          aria-label="Menu"
          className="p-2 -mr-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <Menu className="h-5 w-5" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="mobile-glass-drawer h-[calc(100vh-2rem)] rounded-t-xl overflow-hidden">
        <div className="px-6 py-4 h-full flex flex-col">
          {/* Header with close button and language toggle */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Menu</h2>
            <div className="flex items-center gap-3">
              <div className="mr-2">
                <LanguageToggle minimal={true} className="text-white" />
              </div>
              <DrawerTrigger asChild>
                <button 
                  aria-label="Close menu"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </DrawerTrigger>
            </div>
          </div>
          
          {/* Menu content */}
          <div className="flex flex-col space-y-6 flex-grow overflow-y-auto">
            {/* Explore section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Explore</h3>
              <div className="space-y-1">
                <Link 
                  to="/" 
                  className="flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  <Home size={18} className="mr-3 text-gray-300" />
                  Home
                </Link>
                
                {mainNavigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    {getIcon(item.path)}
                    {item.title || item.label}
                  </Link>
                ))}
                
                <Link 
                  to="/pricing" 
                  className="flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  <DollarSign size={18} className="mr-3 text-gray-300" />
                  Pricing
                </Link>
              </div>
            </div>

            {/* VIP Access section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">VIP Access</h3>
              <div className="space-y-2">
                <Link 
                  to="/early-access-dashboard" 
                  className="flex items-center px-3 py-3 text-base font-medium rounded-md bg-gradient-to-r from-purple-600/40 to-pink-600/40 text-white hover:from-purple-600/50 hover:to-pink-600/50 relative overflow-hidden group"
                  onClick={() => setIsOpen(false)}
                >
                  {/* Animated background effect */}
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  <Gift size={18} className="mr-3 text-pink-300" />
                  <span>Early Access</span>
                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-sm text-xs font-bold bg-yellow-500/30 text-yellow-200">
                    VIP
                  </span>
                </Link>
                
                <Link 
                  to="/referral-program" 
                  className="flex items-center px-3 py-3 text-base font-medium rounded-md bg-gradient-to-r from-indigo-600/40 to-blue-600/40 text-white hover:from-indigo-600/50 hover:to-blue-600/50 relative overflow-hidden group"
                  onClick={() => setIsOpen(false)}
                >
                  {/* Animated background effect */}
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  <Gift size={18} className="mr-3 text-blue-300" />
                  <span>Referral Program</span>
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/dashboard"
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm text-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl mb-1">🚀</span>
                  <span>Go to Dashboard</span>
                </Link>
                
                <Link
                  to="/rewards"
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm text-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl mb-1">🎁</span>
                  <span>Claim Rewards</span>
                </Link>
                
                <Link
                  to="/vip-access"
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm text-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl mb-1">⭐</span>
                  <span>My VIP Access</span>
                </Link>
                
                <Link
                  to="/referrals"
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm text-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl mb-1">📈</span>
                  <span>Track Referrals</span>
                </Link>
              </div>
            </div>

            {/* Account section */}
            {user && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Account</h3>
                <div className="space-y-1">
                  <Link
                    to="/dashboard"
                    className="flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={18} className="mr-3 text-gray-300" />
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={18} className="mr-3 text-gray-300" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center px-2 py-2 text-base font-medium rounded-md text-red-300 hover:bg-red-500/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5 mr-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Sticky footer with VIP upgrade CTA */}
          <div className="pt-4 mt-4 border-t border-white/10">
            <Link 
              to="/pricing" 
              className="block py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md text-center text-white font-medium shadow-lg relative overflow-hidden group animate-subtle-pulse"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <span className="flex items-center justify-center gap-2">
                🌟 Upgrade to VIP — Limited Time Offer
              </span>
            </Link>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
