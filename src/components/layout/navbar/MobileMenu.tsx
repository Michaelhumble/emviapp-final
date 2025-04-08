
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Search, LogOut, User, MessageSquare, CreditCard, Users, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";

interface MobileMenuProps {
  handleSignOut: () => Promise<void>;
}

const MobileMenu = ({ handleSignOut }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const { user, userRole } = useAuth();

  const closeMenu = () => setOpen(false);
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pt-10 flex flex-col">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-3 right-3"
          onClick={() => setOpen(false)}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close menu</span>
        </Button>

        <nav className="flex flex-col gap-2 mt-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 text-lg rounded-md hover:bg-gray-100"
            onClick={closeMenu}
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          
          <Link 
            to="/jobs" 
            className="flex items-center gap-2 px-4 py-2 text-lg rounded-md hover:bg-gray-100"
            onClick={closeMenu}
          >
            <Briefcase className="h-5 w-5" />
            Jobs
          </Link>
          
          <Link 
            to="/salons" 
            className="flex items-center gap-2 px-4 py-2 text-lg rounded-md hover:bg-gray-100"
            onClick={closeMenu}
          >
            <Search className="h-5 w-5" />
            Find Salons
          </Link>
          
          <Link 
            to="/explore/artists" 
            className="flex items-center gap-2 px-4 py-2 text-lg rounded-md hover:bg-gray-100"
            onClick={closeMenu}
          >
            <Users className="h-5 w-5" />
            Artists
          </Link>
        </nav>

        <hr className="my-4" />

        {user ? (
          <div className="mt-auto flex flex-col gap-2">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 px-4 py-2 text-lg rounded-md hover:bg-gray-100"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            
            <Link 
              to="/profile" 
              className="flex items-center gap-2 px-4 py-2 text-lg rounded-md hover:bg-gray-100"
              onClick={closeMenu}
            >
              <User className="h-5 w-5" />
              Profile
            </Link>
            
            <Link 
              to="/messages" 
              className="flex items-center gap-2 px-4 py-2 text-lg rounded-md hover:bg-gray-100"
              onClick={closeMenu}
            >
              <MessageSquare className="h-5 w-5" />
              Messages
            </Link>
            
            <Link 
              to="/checkout" 
              className="flex items-center gap-2 px-4 py-2 text-lg rounded-md hover:bg-gray-100"
              onClick={closeMenu}
            >
              <CreditCard className="h-5 w-5" />
              Credits
            </Link>
            
            <Button 
              variant="ghost" 
              className="flex items-center justify-start gap-2 px-4 py-2 text-lg rounded-md hover:bg-red-50 hover:text-red-500 mt-4"
              onClick={() => {
                handleSignOut();
                closeMenu();
              }}
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="mt-auto flex flex-col gap-2">
            <Link 
              to="/auth/signin" 
              className="w-full"
              onClick={closeMenu}
            >
              <Button className="w-full" variant="outline">Sign In</Button>
            </Link>
            
            <Link 
              to="/auth/signup" 
              className="w-full"
              onClick={closeMenu}
            >
              <Button className="w-full">Join Now</Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
