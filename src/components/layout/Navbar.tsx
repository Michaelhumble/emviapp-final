
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import UserMenu from "./navbar/UserMenu";
import MobileMenu from "./navbar/MobileMenu";
import { useTranslation } from "@/hooks/useTranslation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { label: "Jobs", path: "/jobs" },
    { label: "Salons for Sale", path: "/salons-for-sale" },
    { label: "Artists", path: "/artists" },
    { label: "For Salon Owners", path: "/salon-owners" },
  ];

  const handleSignUp = () => {
    navigate("/auth/signup");
  };

  const handleSignIn = () => {
    navigate("/auth/signin");
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-purple-600">EmviApp</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {t({ english: item.label, vietnamese: "" })}
                </Link>
              ))}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/search">
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
              </Link>
              
              {user ? (
                <UserMenu />
              ) : (
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" onClick={handleSignIn}>
                    {t({ english: "Sign In", vietnamese: "Đăng Nhập" })}
                  </Button>
                  <Button onClick={handleSignUp}>
                    {t({ english: "Sign Up", vietnamese: "Đăng Ký" })}
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </>
  );
};

export default Navbar;
