
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Home, Users, Store, Briefcase, 
  DollarSign, Rocket, Gift, Star, BarChart, User 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { NavigationItem } from "./types";
import { mainNavigationItems } from "./config/navigationItems";
import EmviLogo from "@/components/branding/EmviLogo";
import LanguageToggle from "@/components/layout/LanguageToggle";

type MobileMenuProps = {
  user: any;
  handleSignOut: () => Promise<void>;
};

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const closeMenu = () => setIsOpen(false);
  
  // Enhanced animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    closed: { 
      x: 50, 
      opacity: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    open: { 
      x: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
  };
  
  // VIP section with visual highlight
  const VipMenuItem = ({ icon: Icon, label, path, badge }: { icon: any; label: string; path: string; badge?: string }) => (
    <motion.li variants={itemVariants}>
      <Link 
        to={path} 
        className="relative flex items-center p-3 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 shadow-sm mb-1.5 group overflow-hidden"
        onClick={closeMenu}
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 to-indigo-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* VIP badge */}
        {badge && (
          <div className="absolute top-1 right-2">
            <span className="text-[10px] font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-1.5 py-0.5 rounded-sm">
              {badge}
            </span>
          </div>
        )}
        
        <span className="mr-3 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 glow-effect">
          <Icon className="w-4 h-4" />
        </span>
        <span className="text-sm font-medium text-indigo-900">{label}</span>
      </Link>
    </motion.li>
  );
  
  // Regular menu item with icon
  const RegularMenuItem = ({ icon: Icon, label, path }: { icon: any; label: string; path: string }) => (
    <motion.li variants={itemVariants}>
      <Link 
        to={path} 
        className="flex items-center p-3 rounded-lg hover:bg-gray-50 mb-1 transition-colors"
        onClick={closeMenu}
      >
        <span className="mr-3 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700">
          <Icon className="w-4 h-4" />
        </span>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </Link>
    </motion.li>
  );
  
  // Quick action button
  const QuickActionButton = ({ icon: Icon, label }: { icon: any; label: string }) => (
    <motion.button 
      variants={itemVariants}
      className="flex flex-col items-center justify-center p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all w-[70px]"
      onClick={() => {
        navigate("/dashboard");
        closeMenu();
      }}
    >
      <span className="flex items-center justify-center w-9 h-9 mb-1 rounded-full bg-gradient-to-br from-gray-50 to-indigo-50 text-indigo-600">
        <Icon className="w-4 h-4" />
      </span>
      <span className="text-[10px] font-medium text-gray-700 text-center">{label}</span>
    </motion.button>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(true)} 
        className="md:hidden"
        aria-label="Open mobile menu"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
              onClick={closeMenu}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-y-0 right-0 w-[85%] max-w-xs bg-white shadow-lg z-50 md:hidden overflow-y-auto mobile-glass-drawer flex flex-col"
            >
              {/* Menu Header */}
              <motion.div variants={itemVariants} className="relative flex items-center justify-between p-4 border-b border-gray-200">
                <EmviLogo size="small" />
                <div className="flex items-center">
                  {/* Language Toggle in Top Corner */}
                  <LanguageToggle minimal={true} className="mr-2" />
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={closeMenu}
                    className="h-8 w-8"
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
              
              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* EXPLORE Section */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider px-2">Explore</h3>
                  <ul>
                    <RegularMenuItem icon={Home} label="Home" path="/" />
                    <RegularMenuItem icon={Users} label="Find Artists" path="/artists" />
                    <RegularMenuItem icon={Store} label="Browse Salons" path="/salons" />
                    <RegularMenuItem icon={Briefcase} label="Search Jobs" path="/jobs" />
                    <RegularMenuItem icon={DollarSign} label="Pricing" path="/pricing" />
                  </ul>
                </motion.div>
                
                {/* VIP ACCESS Section */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider px-2">
                    VIP Access
                  </h3>
                  <ul>
                    <VipMenuItem icon={Rocket} label="Early Access Dashboard" path="/early-access-dashboard" badge="VIP" />
                    <VipMenuItem icon={Gift} label="Referral Program" path="/referral-program" badge="REWARDS" />
                  </ul>
                </motion.div>
                
                {/* Quick Actions Grid */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider px-2">Quick Actions</h3>
                  <motion.div className="grid grid-cols-4 gap-2" variants={itemVariants}>
                    <QuickActionButton icon={Rocket} label="Dashboard" />
                    <QuickActionButton icon={Gift} label="Rewards" />
                    <QuickActionButton icon={Star} label="VIP Access" />
                    <QuickActionButton icon={BarChart} label="Referrals" />
                  </motion.div>
                </motion.div>
                
                {/* ACCOUNT Section */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider px-2">Account</h3>
                  <ul>
                    {user ? (
                      <>
                        <RegularMenuItem icon={Rocket} label="Dashboard" path="/dashboard" />
                        <RegularMenuItem icon={User} label="Profile" path="/profile" />
                        <motion.li variants={itemVariants}>
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center p-3 rounded-lg text-left mb-1 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <span className="mr-3 flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                              <X className="w-4 h-4 text-red-600" />
                            </span>
                            <span className="text-sm font-medium">Sign Out</span>
                          </button>
                        </motion.li>
                      </>
                    ) : (
                      <>
                        <RegularMenuItem icon={User} label="Sign In" path="/auth/signin" />
                        <motion.li variants={itemVariants}>
                          <Link
                            to="/auth/signup"
                            className="flex items-center p-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 mb-1 transition-colors"
                            onClick={closeMenu}
                          >
                            <span className="mr-3 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/30 text-white">
                              <User className="w-4 h-4" />
                            </span>
                            <span className="text-sm font-medium">Sign Up</span>
                          </Link>
                        </motion.li>
                      </>
                    )}
                  </ul>
                </motion.div>
              </div>
              
              {/* Sticky VIP Footer */}
              <motion.div 
                variants={itemVariants}
                className="p-4 border-t border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50"
              >
                <Link 
                  to="/early-access-dashboard" 
                  className="block w-full p-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center relative overflow-hidden group"
                  onClick={closeMenu}
                >
                  {/* Subtle pulse animation */}
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200 animate-pulse"></span>
                  <span className="text-sm font-medium">🌟 Upgrade to VIP — Limited Time Offer</span>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
