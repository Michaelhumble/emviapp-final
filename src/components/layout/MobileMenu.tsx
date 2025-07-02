
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { UserMenu } from "./navbar/UserMenu";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "@/hooks/useTranslation";
import { mainNavigationItems } from "./navbar/config/navigationItems";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignUp = () => {
    navigate("/auth/signup");
    setIsOpen(false);
  };

  const handleSignIn = () => {
    navigate("/sign-in");
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-semibold">Menu</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-2"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-4">
              <nav className="space-y-4">
                {mainNavigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-lg hover:text-purple-600"
                  >
                    {t({
                      english: item.title,
                      vietnamese: item.vietnameseTitle || item.title
                    })}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="p-4 border-t space-y-4">
              <LanguageToggle />
              
              {user ? (
                <UserMenu />
              ) : (
                <div className="space-y-3">
                  <Button
                    onClick={handleSignIn}
                    variant="outline"
                    className="w-full"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={handleSignUp}
                    className="w-full"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
