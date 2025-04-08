
import { Link } from "react-router-dom";
import { Home, Activity, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface MobileMenuProps {
  user: any;
  handleSignOut: () => void;
}

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  return (
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
  );
};

export default MobileMenu;
