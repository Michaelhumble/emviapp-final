
import React, { useState } from "react";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Settings, 
  LogOut, 
  CreditCard, 
  LayoutDashboard, 
  UserPlus, 
  MessageSquare 
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { useTranslation } from "@/hooks/useTranslation";
import { toast } from "sonner";
import { validateRoute } from "@/utils/routeValidator";
import { signOut } from "@/services/auth";

export function UserMenu() {
  const { user, userProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      toast.info("Signing out...");
      
      // Use the service function for more robust logout
      const result = await signOut();
      
      if (result.success) {
        toast.success("Successfully signed out");
      }
      
      setOpen(false);
      navigate('/auth/signin');
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out. Trying alternative method...");
      
      // Clear critical localStorage items
      localStorage.removeItem('artist_dashboard_tab');
      localStorage.removeItem('emviapp_user_role');
      localStorage.removeItem('emviapp_new_user');
      
      // Force redirect as fallback
      setTimeout(() => {
        window.location.href = '/auth/signin';
      }, 1000);
    }
  };

  const getInitials = () => {
    if (!userProfile?.full_name) return "U";
    
    const names = userProfile.full_name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };
  
  const handleNavigation = (path: string, featureName: string) => {
    if (validateRoute(path)) {
      navigate(path);
    } else {
      toast.info(`${t(featureName)} feature coming soon!`);
      navigate("/dashboard");
    }
    setOpen(false);
  };
  
  return (
    <div className="flex items-center gap-2">
      {user && <NotificationCenter className="mr-1" />}
      
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userProfile?.avatar_url || ""} alt={userProfile?.full_name || "User"} />
              <AvatarFallback className="bg-primary text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {userProfile?.full_name || "User"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem 
              onClick={() => handleNavigation("/dashboard", "Dashboard")}
              className="cursor-pointer"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>{t({
                english: "Dashboard",
                vietnamese: "Bảng điều khiển"
              })}</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleNavigation("/profile", "Profile")}
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              <span>{t({
                english: "Profile",
                vietnamese: "Hồ sơ"
              })}</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                toast.info(t("Messages feature coming soon!"));
                navigate("/dashboard");
                setOpen(false);
              }}
              className="cursor-pointer"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>{t({
                english: "Messages",
                vietnamese: "Tin nhắn"
              })}</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                toast.info(t("Credits feature coming soon!"));
                navigate("/dashboard");
                setOpen(false);
              }}
              className="cursor-pointer"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              <span>{t({
                english: "Credits",
                vietnamese: "Tín dụng"
              })}</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleNavigation("/settings", "Settings")}
              className="cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>{t({
                english: "Settings",
                vietnamese: "Cài đặt"
              })}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => {
              toast.info(t("Referrals feature coming soon!"));
              navigate("/dashboard");
              setOpen(false);
            }}
            className="cursor-pointer"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            <span>{t({
              english: "Invite Friends",
              vietnamese: "Mời bạn bè"
            })}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t({
              english: "Sign out",
              vietnamese: "Đăng xuất"
            })}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
