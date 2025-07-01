
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import LanguageToggle from "@/components/layout/LanguageToggle";
import {
  Home,
  Users,
  Store,
  Briefcase,
  Users2,
  Info,
  Mail,
  LayoutDashboard,
  MessageSquare,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Menu
} from "lucide-react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate("/");
  };

  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    // Top Section
    { to: "/", icon: Home, label: t("Home") },
    { to: "/artists", icon: Users, label: t("Artists") },
    { to: "/salons", icon: Store, label: t("Salons") },
    { to: "/jobs", icon: Briefcase, label: t("Jobs") },
    { to: "/community", icon: Users2, label: t("Community") },
    
    // Middle Section  
    { to: "/about", icon: Info, label: t("About") },
    { to: "/contact", icon: Mail, label: t("Contact") },
    { to: "/dashboard", icon: LayoutDashboard, label: t("Dashboard") },
    { to: "/messages", icon: MessageSquare, label: t("Messages") },
    { to: "/profile", icon: User, label: t("Profile") },
    
    // Bottom Section
    { to: "/settings", icon: Settings, label: t("Settings") },
    { to: "/help", icon: HelpCircle, label: t("Help & Support") },
  ];

  const getUserDisplayName = () => {
    if (userProfile?.full_name) return userProfile.full_name;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const getUserAvatar = () => {
    return userProfile?.avatar_url || null;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-80 p-0 bg-white z-50 flex flex-col h-full"
      >
        {/* Fixed Header - User Info */}
        {user && (
          <div className="p-6 border-b bg-gray-50">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={getUserAvatar() || undefined} />
                <AvatarFallback className="bg-purple-100 text-purple-600">
                  {getUserDisplayName().charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {getUserDisplayName()}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Menu Content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-4">
            <div className="space-y-1">
              {menuItems.slice(0, 5).map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-1">
              {menuItems.slice(5, 10).map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-1">
              {menuItems.slice(10).map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Fixed Footer */}
        <div className="p-4 border-t bg-gray-50 space-y-3">
          <div className="flex items-center justify-center">
            <LanguageToggle minimal={true} />
          </div>
          
          {user && (
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              {t("Sign Out")}
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
