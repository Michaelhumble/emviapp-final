
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Home, 
  Briefcase, 
  Building2, 
  Users, 
  Globe, 
  LogIn, 
  UserPlus,
  Star,
  Sparkles,
  Crown,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useTranslation } from "@/hooks/useTranslation";
import { toast } from "sonner";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t, currentLanguage, toggleLanguage } = useTranslation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate("/");
    toast.success("Signed out successfully");
  };

  const menuItems = [
    {
      title: t("Home"),
      path: "/",
      icon: Home,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: t("Jobs"),
      path: "/jobs",
      icon: Briefcase,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: t("Salons"),
      path: "/salons",
      icon: Building2,
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: t("Artists"),
      path: "/artists",
      icon: Users,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const menuVariants = {
    hidden: { 
      x: "100%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    visible: { 
      x: "0%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    })
  };

  return (
    <>
      {/* Premium Hamburger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="relative p-2 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200/50 shadow-sm transition-all duration-300 hover:shadow-md"
      >
        <Menu className="h-5 w-5 text-purple-700" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse" />
      </Button>

      {/* Premium Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="fixed top-0 right-0 bottom-0 w-80 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 backdrop-blur-xl border-l border-purple-200/50 shadow-2xl z-50 overflow-hidden"
            >
              {/* Premium Header */}
              <div className="relative p-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Crown className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-lg">EmviApp</h2>
                      <p className="text-white/80 text-xs">Beauty Empire</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 rounded-xl p-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
              </div>

              {/* Navigation Menu */}
              <div className="p-6 space-y-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.path}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border border-transparent hover:border-purple-200/50 transition-all duration-300 hover:shadow-md"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="text-gray-800 font-semibold text-lg group-hover:text-purple-700 transition-colors">
                            {item.title}
                          </span>
                        </div>
                        <Sparkles className="h-4 w-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Premium Features Section */}
              <div className="px-6 py-4 border-t border-purple-200/50">
                <motion.div
                  custom={4}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                >
                  <Button
                    variant="ghost"
                    onClick={toggleLanguage}
                    className="w-full justify-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border border-transparent hover:border-blue-200/50 text-left transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 p-3 shadow-lg">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="text-gray-800 font-semibold text-lg">
                        {currentLanguage === 'en' ? 'Switch to Vietnamese' : 'Switch to English'}
                      </span>
                      <div className="text-sm text-gray-500">
                        {currentLanguage === 'en' ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}
                      </div>
                    </div>
                  </Button>
                </motion.div>
              </div>

              {/* Premium Auth Section */}
              <div className="px-6 pb-6 space-y-3">
                {user ? (
                  <motion.div
                    custom={5}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    className="space-y-3"
                  >
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                          <Heart className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-green-800">Welcome back!</p>
                          <p className="text-xs text-green-600">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={handleSignOut}
                      variant="outline"
                      className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
                    >
                      Sign Out
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    custom={5}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    className="space-y-3"
                  >
                    <Button 
                      asChild
                      variant="outline"
                      className="w-full rounded-xl border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                    >
                      <Link to="/sign-in" onClick={() => setIsOpen(false)}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                    <Button 
                      asChild
                      className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link to="/sign-up" onClick={() => setIsOpen(false)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Sign Up Free
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Premium Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-purple-50/80 to-transparent">
                <div className="flex items-center justify-center gap-2 text-xs text-purple-600">
                  <Star className="h-3 w-3 fill-current" />
                  <span>Premium Beauty Platform</span>
                  <Star className="h-3 w-3 fill-current" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
