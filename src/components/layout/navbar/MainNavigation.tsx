
import { Link, useLocation } from "react-router-dom";
import { Home, Activity, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MainNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary font-medium" : "text-gray-600";
  };

  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link 
        to="/" 
        className={`${isActive('/')} hover:text-primary transition-colors flex items-center gap-1`}
      >
        <Home className="h-4 w-4" />
        Home
      </Link>
      <Link 
        to="/jobs" 
        className={`${isActive('/jobs')} hover:text-primary transition-colors`}
      >
        Jobs
      </Link>
      <Link 
        to="/salons" 
        className={`${isActive('/salons')} hover:text-primary transition-colors`}
      >
        Salons
      </Link>
      
      {/* Community Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-gray-600 hover:text-primary transition-colors flex items-center">
            Community <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to="/customers" className="w-full">Customers</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/artists" className="w-full">Artists</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/salon-owners" className="w-full">Salon Owners</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/suppliers" className="w-full">Suppliers</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Link 
        to="/analysis" 
        className={`${isActive('/analysis')} hover:text-primary transition-colors flex items-center gap-1`}
      >
        <Activity className="h-4 w-4" />
        Analysis
      </Link>
    </nav>
  );
};

export default MainNavigation;
