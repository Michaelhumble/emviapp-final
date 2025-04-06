
import { User } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole } from "@/context/auth/types";
import { getInitials } from "@/utils/userUtils";
import { 
  LogOut, Settings, User as UserIcon, 
  Home, BookOpenText, Calendar, 
  Sparkles, ChevronDown 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UserMenuProps {
  user: User;
  userRole: UserRole | null;
  handleSignOut: () => Promise<void>;
}

const UserMenu = ({ user, userRole, handleSignOut }: UserMenuProps) => {
  const navigate = useNavigate();
  const userEmail = user.email || '';
  const userName = user.user_metadata?.name || userEmail;
  
  // Get role-specific dashboard label
  const getDashboardLabel = () => {
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        return "Artist Dashboard";
      case 'salon':
      case 'owner':
        return "Salon Dashboard";
      case 'customer':
        return "Beauty Dashboard";
      case 'freelancer':
        return "Freelancer Hub";
      case 'supplier':
      case 'beauty supplier':
      case 'vendor':
        return "Supplier Dashboard";
      default:
        return "Dashboard";
    }
  };

  // Handle standard logout with fallback
  const safeSignOut = async () => {
    try {
      await handleSignOut();
    } catch (err) {
      console.error("Sign out error:", err);
      toast.error("Error signing out. Trying emergency logout...");
      await emergencyLogout();
    }
  };

  // Emergency logout function as fallback
  const emergencyLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/sign-in");
      toast.success("You've been signed out successfully");
    } catch (err) {
      console.error("Emergency logout error:", err);
      toast.error("Logout failed. Reloading the page...");
      // Force reload as a last resort
      window.location.href = "/sign-in";
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      {/* Direct dashboard button */}
      <Button 
        variant="ghost" 
        size="sm"
        className="mr-1 hidden md:flex items-center gap-1 hover:bg-secondary"
        onClick={() => navigate('/dashboard')}
      >
        <Sparkles className="h-4 w-4 text-amber-400 mr-1" />
        {getDashboardLabel()}
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.user_metadata?.avatar_url} alt={userName} />
              <AvatarFallback>{getInitials(userName)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {userEmail}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate('/dashboard')}>
              <Home className="mr-2 h-4 w-4" />
              <span>{getDashboardLabel()}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/jobs')}>
              <BookOpenText className="mr-2 h-4 w-4" />
              <span>Jobs Board</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/messages')}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Bookings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/profile/edit')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={safeSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
          {/* Emergency logout option */}
          <DropdownMenuItem onClick={emergencyLogout} className="text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Force Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
