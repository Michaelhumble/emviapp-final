
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "@/context/auth";
import { useProfile } from "@/context/profile";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  User, 
  Settings, 
  LogOut, 
  Home, 
  Users, 
  Building, 
  Briefcase, 
  MessageSquare,
  HelpCircle,
  Menu,
  X,
  Languages,
  Plus,
  Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const { t, toggleLanguage, currentLanguage } = useTranslation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { 
      icon: Home, 
      label: "Home", 
      href: "/",
      section: "main"
    },
    { 
      icon: Users, 
      label: "Artists", 
      href: "/artists",
      section: "main"
    },
    { 
      icon: Building, 
      label: "Salons", 
      href: "/salons",
      section: "main"
    },
    { 
      icon: Briefcase, 
      label: "Jobs", 
      href: "/jobs",
      section: "main"
    },
    { 
      icon: MessageSquare, 
      label: "Community", 
      href: "/community",
      section: "main"
    }
  ];

  const aboutItems = [
    { 
      icon: HelpCircle, 
      label: "About", 
      href: "/about",
      section: "about"
    },
    { 
      icon: MessageSquare, 
      label: "Contact", 
      href: "/contact",
      section: "about"
    }
  ];

  const userItems = user ? [
    { 
      icon: Home, 
      label: "Dashboard", 
      href: "/dashboard",
      section: "user"
    },
    { 
      icon: MessageSquare, 
      label: "Messages", 
      href: "/messages",
      section: "user"
    },
    { 
      icon: User, 
      label: "Profile", 
      href: "/profile/edit",
      section: "user"
    }
  ] : [];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
            {/* Fixed Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMenu}
                className="h-8 w-8"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex h-[calc(100vh-80px)] flex-col overflow-y-auto">
              <div className="flex-1 px-4 py-6">
                {/* Main Navigation */}
                <div className="space-y-1">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={closeMenu}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
                      >
                        <IconComponent className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-gray-200" />

                {/* About Section */}
                <div className="space-y-1">
                  {aboutItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={closeMenu}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
                      >
                        <IconComponent className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* User Section */}
                {user && (
                  <>
                    <div className="my-6 h-px bg-gray-200" />
                    <div className="space-y-1">
                      {userItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={closeMenu}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
                          >
                            <IconComponent className="h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Action Buttons Section */}
                <div className="my-6 h-px bg-gray-200" />
                <div className="space-y-3">
                  <Link
                    to="/post-job"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-lg border-2 border-purple-200 bg-purple-50 px-3 py-3 text-purple-700 transition-all hover:border-purple-300 hover:bg-purple-100"
                  >
                    <Plus className="h-5 w-5" />
                    <span className="font-semibold">Post a Job for Free</span>
                  </Link>
                  
                  <Link
                    to="/post-salon"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-lg border-2 border-amber-200 bg-amber-50 px-3 py-3 text-amber-700 transition-all hover:border-amber-300 hover:bg-amber-100"
                  >
                    <Store className="h-5 w-5" />
                    <span className="font-semibold">Post Your Salon</span>
                  </Link>
                </div>

                {/* Settings */}
                {user && (
                  <>
                    <div className="my-6 h-px bg-gray-200" />
                    <Link
                      to="/settings"
                      onClick={closeMenu}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      <Settings className="h-5 w-5" />
                      <span className="font-medium">Settings</span>
                    </Link>
                  </>
                )}

                {/* Help */}
                <Link
                  to="/help"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
                >
                  <HelpCircle className="h-5 w-5" />
                  <span className="font-medium">Help</span>
                </Link>

                {/* Language Toggle */}
                <button
                  onClick={() => {
                    toggleLanguage();
                    closeMenu();
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
                >
                  <Languages className="h-5 w-5" />
                  <span className="font-medium">
                    {currentLanguage === 'en' ? 'Tiếng Việt' : 'English'}
                  </span>
                </button>
              </div>

              {/* Fixed Footer */}
              {user && (
                <div className="border-t border-gray-200 p-4">
                  <div className="mb-3 flex items-center gap-3 px-3 py-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                      <User className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {profile?.full_name || user.email}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
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
