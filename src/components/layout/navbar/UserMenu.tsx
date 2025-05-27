
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";
import { useTranslation } from "@/hooks/useTranslation";
import {
  User,
  Settings,
  LogOut,
  PlusCircle,
  Building,
  CreditCard,
  Bell,
} from "lucide-react";

const UserMenu = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getProfilePath = () => {
    if (userProfile?.role === "salon_owner") return "/dashboard/owner";
    if (userProfile?.role === "artist") return "/dashboard/artist";
    if (userProfile?.role === "customer") return "/dashboard/customer";
    return "/profile";
  };

  const getDashboardLabel = () => {
    if (userProfile?.role === "salon_owner") return "Salon Dashboard";
    if (userProfile?.role === "artist") return "Artist Dashboard";
    if (userProfile?.role === "customer") return "Customer Dashboard";
    return "Dashboard";
  };

  const isSalonOwner = userProfile?.role === "salon_owner";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userProfile?.avatar_url || ""} alt={userProfile?.full_name || ""} />
            <AvatarFallback>
              {getInitials(userProfile?.full_name || user?.email || "U")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userProfile?.full_name || t({ english: "User", vietnamese: "Người Dùng" })}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to={getProfilePath()} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>{getDashboardLabel()}</span>
          </Link>
        </DropdownMenuItem>

        {isSalonOwner && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/post-job" className="cursor-pointer">
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>{t({ english: "Post Job", vietnamese: "Đăng Việc" })}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/sell-salon" className="cursor-pointer">
                <Building className="mr-2 h-4 w-4" />
                <span>{t({ english: "Sell Salon", vietnamese: "Bán Tiệm" })}</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem asChild>
          <Link to="/notifications" className="cursor-pointer">
            <Bell className="mr-2 h-4 w-4" />
            <span>{t({ english: "Notifications", vietnamese: "Thông Báo" })}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>{t({ english: "Settings", vietnamese: "Cài Đặt" })}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t({ english: "Log out", vietnamese: "Đăng Xuất" })}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
