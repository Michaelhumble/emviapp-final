
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import EmviLogo from "@/components/branding/EmviLogo";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { useTranslation } from "@/hooks/useTranslation";
import { mainNavigationItems } from "@/components/layout/navbar/config/navigationItems";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("You've been signed out successfully");
    onClose();
  };

  const onPostJobClick = () => {
    if (user) {
      navigate("/post-job");
    } else {
      navigate("/sign-in");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Mobile Menu Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <EmviLogo className="h-6" />
        <button onClick={onClose} className="text-xl font-bold">×</button>
      </div>

      {/* Menu Content */}
      <div className="p-3 flex flex-col space-y-3">
        {/* Auth Section */}
        {user ? (
          <div className="flex flex-col space-y-2">
            <Link 
              to="/dashboard" 
              onClick={onClose}
              className="text-lg font-medium text-purple-700"
            >
              {t("Dashboard")}
            </Link>
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="w-full"
            >
              {t("Sign Out")}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <Link to="/sign-in" onClick={onClose}>
              <Button variant="outline" className="w-full">
                {t("Sign In")}
              </Button>
            </Link>
            <Link to="/sign-up" onClick={onClose}>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                {t("Sign Up")}
              </Button>
            </Link>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2 pt-3">
          {mainNavigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className="text-lg text-gray-700 hover:text-purple-700 py-1"
            >
              {t({
                english: item.title,
                vietnamese: item.vietnameseTitle || item.title
              })}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col space-y-2 pt-3">
          <Button 
            onClick={onPostJobClick}
            className="w-full bg-purple-600 text-white hover:bg-purple-700"
          >
            {t("Post a Job for Free")}
          </Button>
          
          <Link to="/post-salon" onClick={onClose}>
            <Button 
              variant="outline" 
              className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              {t("Post Your Salon")}
            </Button>
          </Link>
        </div>

        {/* Language Toggle */}
        <div className="pt-3">
          <LanguageToggle minimal={true} />
        </div>

        {/* Footer */}
        <div className="pt-4 text-sm text-center text-gray-400">
          Inspired by Sunshine ☀️
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
