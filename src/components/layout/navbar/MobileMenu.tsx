
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useTranslation } from "@/hooks/useTranslation";
import {
  LogOut,
  Settings,
  User,
  Briefcase,
  Building2,
  Users,
  Globe,
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, signOut } = useAuth();
  const { t, toggleLanguage, isVietnamese } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const navItems = [
    { label: "Jobs", path: "/jobs", icon: Briefcase },
    { label: "Salons for Sale", path: "/salons-for-sale", icon: Building2 },
    { label: "Artists", path: "/artists", icon: Users },
    { label: "For Salon Owners", path: "/salon-owners", icon: Building2 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">EmviApp</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">
                      {isVietnamese ? "EN" : "VI"}
                    </span>
                  </Button>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {/* Main Navigation */}
                  <div className="space-y-4">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Icon className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">
                            {t({ english: item.label, vietnamese: "" })}
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* User Section */}
                  {user && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="space-y-4">
                        <Link
                          to="/profile"
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <User className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">
                            {t({ english: "Profile", vietnamese: "Hồ Sơ" })}
                          </span>
                        </Link>

                        <Link
                          to="/settings"
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Settings className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">
                            {t({ english: "Settings", vietnamese: "Cài Đặt" })}
                          </span>
                        </Link>

                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left"
                        >
                          <LogOut className="h-5 w-5 text-gray-600" />
                          <span className="font-medium text-red-600">
                            {t({ english: "Sign Out", vietnamese: "Đăng Xuất" })}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              {!user && (
                <div className="p-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <Link to="/auth/signin" onClick={onClose}>
                      <Button variant="outline" className="w-full">
                        {t({ english: "Sign In", vietnamese: "Đăng Nhập" })}
                      </Button>
                    </Link>
                    <Link to="/auth/signup" onClick={onClose}>
                      <Button className="w-full">
                        {t({ english: "Sign Up", vietnamese: "Đăng Ký" })}
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
