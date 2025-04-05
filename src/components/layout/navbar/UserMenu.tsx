
import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  user: any;
  userRole?: string;
  handleSignOut: () => void;
}

const UserMenu = ({ user, userRole, handleSignOut }: UserMenuProps) => {
  return (
    <div className="flex items-center gap-3">
      <Link to="/" className="text-gray-600 hover:text-primary mr-2">
        <Home className="h-5 w-5" />
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt={user.email || ""} />
              <AvatarFallback>
                {user.email ? user.email.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Account</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
              {userRole && (
                <p className="text-xs text-primary capitalize">
                  {userRole}
                </p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/messages" className="cursor-pointer">Messages</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
