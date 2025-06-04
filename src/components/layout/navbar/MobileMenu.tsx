
import React from "react";
import { Link } from "react-router-dom";
import { X, Globe } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useUserRole } from "@/hooks/useUserRole";
import { useTranslation } from "@/hooks/useTranslation";
import PostYourSalonButton from "@/components/buttons/PostYourSalonButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth();
  const { userRole } = useUserRole(user?.id);
  const { t, language, setLanguage } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  // Surgical role-check: if primary role is customer, show ONLY customer menu
  const isCustomerOnly = userRole === 'customer';

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      {/* Menu Panel */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl flex flex-col">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Action Buttons - Only show for business roles, NOT customers */}
          {!isCustomerOnly && (
            <div className="p-4 space-y-3 border-b flex-shrink-0">
              <Link
                to="/post-job"
                onClick={onClose}
                className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg text-center font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                {t({
                  english: "Post a Job",
                  vietnamese: "Đăng Việc"
                })}
              </Link>
              
              <PostYourSalonButton 
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 transition-all"
                onClose={onClose}
              />
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {/* Profile link for all logged-in users - at the top */}
            {user && (
              <Link
                to="/profile"
                onClick={onClose}
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Profile
              </Link>
            )}

            {/* Dashboard link for all logged-in users */}
            {user && (
              <Link
                to="/dashboard"
                onClick={onClose}
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Dashboard
              </Link>
            )}

            <Link
              to="/artists"
              onClick={onClose}
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {t({
                english: "Find Artists",
                vietnamese: "Tìm Thợ"
              })}
            </Link>

            <Link
              to="/jobs"
              onClick={onClose}
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {t({
                english: "Browse Jobs",
                vietnamese: "Tìm Việc"
              })}
            </Link>

            <Link
              to="/salons"
              onClick={onClose}
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {t({
                english: "Salons for Sale",
                vietnamese: "Tiệm Bán"
              })}
            </Link>

            <Link
              to="/community"
              onClick={onClose}
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {t({
                english: "Community",
                vietnamese: "Cộng Đồng"
              })}
            </Link>

            <Link
              to="/about"
              onClick={onClose}
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {t({
                english: "About",
                vietnamese: "Về Chúng Tôi"
              })}
            </Link>

            <Link
              to="/contact"
              onClick={onClose}
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {t({
                english: "Contact",
                vietnamese: "Liên Hệ"
              })}
            </Link>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'english' ? 'vietnamese' : 'english')}
              className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language === 'english' ? 'Tiếng Việt' : 'English'}
            </button>

            {/* Sign Out */}
            {user && (
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                {t({
                  english: "Sign Out",
                  vietnamese: "Đăng Xuất"
                })}
              </button>
            )}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t text-center text-xs text-gray-500 flex-shrink-0">
          Inspired by Sunshine
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
