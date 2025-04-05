
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  User, 
  X, 
  Menu, 
  LogOut, 
  Settings, 
  Bell, 
  MessageSquare, 
  ChevronDown,
  Activity,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";
import EmviLogo from "@/components/branding/EmviLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { toast } from "sonner";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut, userRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary font-medium" : "text-gray-600";
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("You've been signed out successfully");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between mx-auto h-16 px-4">
        <Link to="/" className="flex items-center">
          <EmviLogo className="h-8 w-auto" />
        </Link>

        {/* Main navigation */}
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

        {/* Auth buttons or user menu */}
        <div className="flex items-center gap-2">
          {user ? (
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
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
          
          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden"
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <div className="grid gap-4 py-4">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1 py-2"
                >
                  <Home className="h-4 w-4" /> Home
                </Link>
                <Link
                  to="/jobs"
                  className="text-gray-600 hover:text-primary transition-colors block py-2"
                >
                  Jobs
                </Link>
                <Link
                  to="/salons"
                  className="text-gray-600 hover:text-primary transition-colors block py-2"
                >
                  Salons
                </Link>
                <Link
                  to="/analysis"
                  className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1 py-2"
                >
                  <Activity className="h-4 w-4" /> Analysis
                </Link>
                <div className="py-2">
                  <p className="font-medium mb-2">Community</p>
                  <div className="pl-4 flex flex-col gap-2">
                    <Link
                      to="/customers"
                      className="text-gray-600 hover:text-primary transition-colors block py-1"
                    >
                      Customers
                    </Link>
                    <Link
                      to="/artists"
                      className="text-gray-600 hover:text-primary transition-colors block py-1"
                    >
                      Artists
                    </Link>
                    <Link
                      to="/salon-owners"
                      className="text-gray-600 hover:text-primary transition-colors block py-1"
                    >
                      Salon Owners
                    </Link>
                    <Link
                      to="/suppliers"
                      className="text-gray-600 hover:text-primary transition-colors block py-1"
                    >
                      Suppliers
                    </Link>
                  </div>
                </div>
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="text-gray-600 hover:text-primary transition-colors block py-2"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="text-gray-600 hover:text-primary transition-colors block py-2"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/messages"
                      className="text-gray-600 hover:text-primary transition-colors block py-2"
                    >
                      Messages
                    </Link>
                    <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/sign-in">
                      <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                    </Link>
                    <Link to="/sign-up">
                      <Button className="w-full justify-start">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
