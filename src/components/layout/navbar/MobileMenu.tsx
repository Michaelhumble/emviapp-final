
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Users, 
  Store, 
  Briefcase, 
  DollarSign, 
  Gift, 
  Award, 
  Globe,
  LogOut,
  ChevronRight,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavItem } from "@/components/layout/navbar/NavItem";
import { mainNavigationItems } from "@/components/layout/navbar/config/navigationItems";
import { motion, AnimatePresence } from "framer-motion";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Button 
        onClick={toggleMenu} 
        variant="ghost" 
        size="icon"
        className="rounded-full w-10 h-10"
        aria-label="Menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-xs mobile-glass-drawer z-50 overflow-y-auto pb-16"
            >
              {/* Header with close button */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <LanguageToggle minimal={true} className="mr-1" />
                </div>
                <Button 
                  onClick={closeMenu} 
                  variant="ghost" 
                  size="icon"
                  className="rounded-full w-9 h-9"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <Separator className="mb-4" />

              {/* Menu Content */}
              <div className="px-5 py-2 space-y-6">
                {/* Explore Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2.5">EXPLORE</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link 
                        to="/" 
                        className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        <Home className="h-4 w-4 mr-3" />
                        <span>Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/artists" 
                        className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        <Users className="h-4 w-4 mr-3" />
                        <span>Find Artists</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/jobs" 
                        className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        <Briefcase className="h-4 w-4 mr-3" />
                        <span>Search Jobs</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/salons" 
                        className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        <Store className="h-4 w-4 mr-3" />
                        <span>Browse Salons</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/pricing" 
                        className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        <DollarSign className="h-4 w-4 mr-3" />
                        <span>Pricing</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* VIP Access Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2.5">VIP ACCESS</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link 
                        to="/early-access-dashboard" 
                        className="flex items-center px-3 py-2 rounded-md bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100"
                        onClick={closeMenu}
                      >
                        <Rocket className="h-4 w-4 mr-3 text-purple-600" />
                        <span className="text-purple-700">Early Access</span>
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-yellow-100 text-yellow-800 font-medium">
                          VIP
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/referral-program" 
                        className="flex items-center px-3 py-2 rounded-md bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100"
                        onClick={closeMenu}
                      >
                        <Gift className="h-4 w-4 mr-3 text-purple-600" />
                        <span className="text-purple-700">Referral Program</span>
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-yellow-100 text-yellow-800 font-medium">
                          VIP
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2.5">QUICK ACTIONS</h3>
                  <ul className="grid gap-2">
                    <li>
                      <Link 
                        to="/dashboard" 
                        className="flex items-center px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        <span className="mr-2">🚀</span>
                        <span>Go to Dashboard</span>
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/rewards" 
                        className="flex items-center px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        <span className="mr-2">🎁</span>
                        <span>Claim Rewards</span>
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/vip-access" 
                        className="flex items-center px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        <span className="mr-2">⭐</span>
                        <span>My VIP Access</span>
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/referrals" 
                        className="flex items-center px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        <span className="mr-2">📈</span>
                        <span>Track Referrals</span>
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Account Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2.5">ACCOUNT</h3>
                  <ul className="space-y-2">
                    {user ? (
                      <>
                        <li>
                          <Link 
                            to="/dashboard" 
                            className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
                            onClick={closeMenu}
                          >
                            <Award className="h-4 w-4 mr-3" />
                            <span>Dashboard</span>
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/profile" 
                            className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
                            onClick={closeMenu}
                          >
                            <User className="h-4 w-4 mr-3" />
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li>
                          <button 
                            onClick={() => {
                              handleSignOut();
                              closeMenu();
                            }}
                            className="flex w-full items-center px-3 py-2 rounded-md hover:bg-red-50 text-red-600"
                          >
                            <LogOut className="h-4 w-4 mr-3" />
                            <span>Sign Out</span>
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link 
                            to="/login" 
                            className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
                            onClick={closeMenu}
                          >
                            <User className="h-4 w-4 mr-3" />
                            <span>Login</span>
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/signup" 
                            className="flex w-full items-center justify-center px-4 py-2 rounded-md bg-primary text-white"
                            onClick={closeMenu}
                          >
                            Sign Up
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* Sticky VIP Upgrade Footer */}
              <div className="sticky bottom-0 mt-auto bg-gradient-to-r from-purple-600 to-indigo-600 p-3 text-white">
                <Link 
                  to="/early-access-dashboard"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 text-center font-medium"
                >
                  <span className="text-lg">🌟</span> 
                  <span>Upgrade to VIP — Limited Time Offer</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
