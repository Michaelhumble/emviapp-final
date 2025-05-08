
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LanguageToggle from "@/components/layout/LanguageToggle";

interface MobileMenuProps {
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const onPostJobClick = () => {
    // This function will be implemented later
    // For now, it does nothing as requested
    setOpen(false);
    console.log("Post job button clicked from mobile menu");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="mobile-glass-drawer w-[85%]">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-xl">Menu</SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetHeader>

        <div className="flex flex-col gap-6">
          {/* Post Job Button - mobile */}
          <div className="mb-4">
            {user ? (
              <Button 
                onClick={onPostJobClick} 
                className="bg-primary text-white hover:bg-primary/90 w-full"
              >
                Đăng Tin Tuyển Thợ
              </Button>
            ) : (
              <Button 
                onClick={() => {
                  setOpen(false);
                  navigate("/sign-in");
                }}
                className="bg-primary text-white hover:bg-primary/90 w-full"
              >
                Đăng Tin Tuyển Thợ
              </Button>
            )}
          </div>
          
          {/* Language toggle */}
          <div className="mb-2">
            <p className="text-sm font-medium mb-2">Language</p>
            <LanguageToggle />
          </div>
          
          {/* Auth/Account links */}
          <div>
            <p className="text-sm font-medium mb-2">Account</p>
            {user ? (
              <div className="space-y-2">
                <Link
                  to="/dashboard"
                  className="block p-2 hover:bg-accent rounded-md menu-item-enter transition-all"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block p-2 hover:bg-accent rounded-md menu-item-enter transition-all"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setOpen(false);
                  }}
                  className="w-full text-left p-2 hover:bg-accent rounded-md menu-item-enter transition-all text-destructive"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/sign-in"
                  className="block p-2 hover:bg-accent rounded-md menu-item-enter transition-all"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="block p-2 hover:bg-accent rounded-md menu-item-enter transition-all"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Navigation Menu */}
          <div>
            <p className="text-sm font-medium mb-2">Navigation</p>
            <nav className="space-y-2">
              <Link
                to="/"
                className="block p-2 hover:bg-accent rounded-md menu-item-enter transition-all"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/jobs"
                className="block p-2 hover:bg-accent rounded-md menu-item-enter transition-all"
                onClick={() => setOpen(false)}
              >
                Jobs
              </Link>
              <Link
                to="/salons"
                className="block p-2 hover:bg-accent rounded-md menu-item-enter transition-all"
                onClick={() => setOpen(false)}
              >
                Salons
              </Link>
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
