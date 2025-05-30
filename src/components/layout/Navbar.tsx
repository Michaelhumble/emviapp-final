import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsMobile } from "@/hooks/use-mobile";
import { mainNavigationItems } from "@/components/layout/navbar/config/navigationItems";
import MobileMenu from "@/components/layout/MobileMenu";
import { ChevronDown, Briefcase, Store } from "lucide-react";
import LanguageToggle from "@/components/ui/LanguageToggle";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">EmviApp</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {mainNavigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? "text-purple-600"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>

        {/* Auth buttons or user menu with language toggle and Post Job/Salon button */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Post Job/Salon CTA Button - only visible on desktop */}
          <div className="hidden md:block">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="bg-emvi-accent text-white hover:bg-emvi-accent/90 rounded-lg flex items-center gap-2 px-4 py-2 font-medium">
                  {t({
                    english: "Post Job/Salon",
                    vietnamese: "Đăng Tin/Bán Tiệm"
                  })}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4 bg-white border border-gray-200 shadow-xl rounded-lg z-50">
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => navigate("/post-job")}
                    className="w-full bg-emvi-accent hover:bg-emvi-accent/90 text-white rounded-lg py-4 flex items-center gap-3 justify-start transition-all"
                  >
                    <Briefcase className="h-5 w-5 text-white" />
                    <div className="text-left">
                      <div className="font-semibold text-base">
                        {t({
                          english: "Post a Job",
                          vietnamese: "Tìm Thợ"
                        })}
                      </div>
                      <div className="text-sm opacity-90">
                        {t({
                          english: "Find nail technicians",
                          vietnamese: "Tuyển thợ nail"
                        })}
                      </div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => navigate("/posting/salon")}
                    className="w-full bg-emvi-brown hover:bg-emvi-brown/90 text-white rounded-lg py-4 flex items-center gap-3 justify-start transition-all"
                  >
                    <Store className="h-5 w-5 text-white" />
                    <div className="text-left">
                      <div className="font-semibold text-base">
                        {t({
                          english: "List Your Salon",
                          vietnamese: "Bán Tiệm"
                        })}
                      </div>
                      <div className="text-sm opacity-90">
                        {t({
                          english: "Sell your salon business",
                          vietnamese: "Bán tiệm, sang tiệm"
                        })}
                      </div>
                    </div>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Language Toggle */}
          <div className="hidden md:block">
            <LanguageToggle />
          </div>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="rounded-full">
                      {user.email}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is your email.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                {t({ english: "Sign Out", vietnamese: "Thoát" })}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/signin")}
              >
                {t({ english: "Sign In", vietnamese: "Đăng Nhập" })}
              </Button>
              <Button size="sm" onClick={() => navigate("/signup")}>
                {t({ english: "Sign Up", vietnamese: "Đăng Ký" })}
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          {isMobile && <MobileMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
