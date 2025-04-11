
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { validateRoute } from '@/utils/routeValidator';

interface MobileMenuProps {
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  
  // Safe navigator function that won't break outside Router context
  const safeNavigate = (path: string) => {
    try {
      window.location.href = path;
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const closeMenu = () => setOpen(false);
  
  const handleNavigation = (path: string, label: string) => {
    try {
      if (validateRoute(path)) {
        safeNavigate(path);
      } else {
        toast.info(`${label} feature coming soon!`);
        safeNavigate("/dashboard");
      }
      closeMenu();
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback to basic navigation
      window.location.href = path;
      closeMenu();
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="md:hidden p-2"
          aria-label="Menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 py-6">
          <div className="flex flex-col space-y-3">
            <div 
              className="px-2 py-1.5 text-md hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => handleNavigation("/", "Home")}
            >
              Home
            </div>
            <div 
              className="px-2 py-1.5 text-md hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => handleNavigation("/artists", "Find Artists")}
            >
              Find Artists
            </div>
            <div 
              className="px-2 py-1.5 text-md hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => handleNavigation("/salon-owners", "For Salon Owners")}
            >
              For Salon Owners
            </div>
            <div 
              className="px-2 py-1.5 text-md hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => handleNavigation("/jobs", "Jobs")}
            >
              Jobs
            </div>
            
            {user && (
              <>
                <div 
                  className="px-2 py-1.5 text-md hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => handleNavigation("/dashboard", "Dashboard")}
                >
                  Dashboard
                </div>
                <div 
                  className="px-2 py-1.5 text-md hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => handleNavigation("/profile", "Profile")}
                >
                  Profile
                </div>
                <div 
                  className="px-2 py-1.5 text-md hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => {
                    toast.info("Referrals feature coming soon!");
                    safeNavigate("/dashboard");
                    closeMenu();
                  }}
                >
                  Referrals
                </div>
              </>
            )}
          </div>
        </div>
        
        <SheetFooter>
          {user ? (
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={() => {
                handleSignOut();
                closeMenu();
              }}
            >
              Sign Out
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleNavigation("/auth/signin", "Sign In")}
              >
                Sign In
              </Button>
              <Button 
                className="w-full"
                onClick={() => handleNavigation("/auth/signup", "Sign Up")}
              >
                Sign Up
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
