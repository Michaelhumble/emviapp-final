
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

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
            <Link 
              to="/" 
              className="px-2 py-1.5 text-md hover:bg-gray-100 rounded"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/artists" 
              className="px-2 py-1.5 text-md hover:bg-gray-100 rounded"
              onClick={closeMenu}
            >
              Find Artists
            </Link>
            <Link 
              to="/salon-owners" 
              className="px-2 py-1.5 text-md hover:bg-gray-100 rounded"
              onClick={closeMenu}
            >
              For Salon Owners
            </Link>
            <Link 
              to="/jobs" 
              className="px-2 py-1.5 text-md hover:bg-gray-100 rounded"
              onClick={closeMenu}
            >
              Jobs
            </Link>
            
            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-2 py-1.5 text-md hover:bg-gray-100 rounded"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="px-2 py-1.5 text-md hover:bg-gray-100 rounded"
                  onClick={closeMenu}
                >
                  Profile
                </Link>
                <Link 
                  to="/referrals" 
                  className="px-2 py-1.5 text-md hover:bg-gray-100 rounded"
                  onClick={closeMenu}
                >
                  Referrals
                </Link>
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
              <Link to="/auth/signin" className="w-full" onClick={closeMenu}>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/signup" className="w-full" onClick={closeMenu}>
                <Button className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
