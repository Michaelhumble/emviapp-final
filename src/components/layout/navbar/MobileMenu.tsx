
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { mainNavigationItems } from "./config/navigationItems";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { motion } from "framer-motion";

interface MobileMenuProps {
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useAuth();

  // Animation variants for staggered menu items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Get the primary menu items we want to display
  const menuItems = mainNavigationItems.filter(item => 
    ["Artists", "Salons", "Jobs", "Community"].includes(item.title || "")
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="flex md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="mobile-glass-drawer w-full max-w-[80vw] overflow-y-auto pb-safe-area"
      >
        {/* Menu header with language toggle */}
        <div className="flex justify-between items-center py-4 px-2 mb-6">
          <LanguageToggle minimal={false} className="text-white" />
        </div>

        {/* Primary Navigation links */}
        <motion.div
          className="flex flex-col gap-5 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {menuItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-2 py-3 text-lg font-medium text-white rounded-lg transition duration-200 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                <span className="font-playfair">{item.title}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Sign in/out section */}
        <div className="mt-auto pt-10">
          <div className="border-t border-white/10 pt-5">
            {user ? (
              <Button
                variant="outline"
                className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
                onClick={() => {
                  handleSignOut();
                  setOpen(false);
                }}
              >
                Sign Out
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/sign-in"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link
                  to="/sign-up"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white border-none">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
