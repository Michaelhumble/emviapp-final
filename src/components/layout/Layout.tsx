
import { ReactNode, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "@/context/auth";
import { Sparkles, ArrowRight, Home, Search, User, Bell } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
}

const Layout = ({ children, hideNavbar = false }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn, userRole } = useAuth();
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [showDashboardCta, setShowDashboardCta] = useState(false);
  const isMobile = useIsMobile();
  
  const isAuthPage = location.pathname === "/auth/signin" || location.pathname === "/auth/signup" ||
    location.pathname === "/sign-in" || location.pathname === "/sign-up";
  const isHomePage = location.pathname === "/";
  const isDashboardPage = location.pathname.startsWith("/dashboard");
  const isProfilePage = location.pathname === "/profile" || location.pathname === "/profile/edit";

  // Control visibility of sticky CTA based on scroll position
  useEffect(() => {
    if (!isHomePage) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show CTA after scrolling 800px
      setShowStickyCta(scrollY > 800);
      
      // Show dashboard CTA for signed-in users on homepage after scrolling 400px
      setShowDashboardCta(isSignedIn && scrollY > 400);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, isSignedIn]);

  // Redirect to appropriate dashboard
  const goToDashboard = () => {
    navigate("/dashboard");
  };

  // Get role-specific dashboard button text
  const getDashboardButtonText = () => {
    if (!userRole) return "Go to Dashboard";
    
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
      default:
        return "Go to Dashboard";
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {!isAuthPage && !hideNavbar && <Navbar />}
      <main className={`flex-grow ${!isAuthPage && !hideNavbar && !isMobile ? "pt-16" : "pt-6"} overflow-x-hidden max-w-full`}>
        {children}
      </main>
      {!isMobile && <Footer />}
      
      {/* Sticky CTA for home page */}
      {isHomePage && !isMobile && (
        <AnimatePresence>
          {showStickyCta && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-auto max-w-[95%]"
            >
              <div className="flex gap-4 bg-white/80 backdrop-blur-md shadow-xl p-3 rounded-full border border-gray-100">
                {isSignedIn ? (
                  <>
                    <Button size="sm" className="font-medium px-6 rounded-full shadow-lg shadow-primary/20" onClick={goToDashboard}>
                      Go to Dashboard
                    </Button>
                    <Link to="/jobs">
                      <Button size="sm" variant="outline" className="font-medium px-6 rounded-full">
                        Explore Jobs
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/auth/signup">
                      <Button size="sm" className="font-medium px-6 rounded-full shadow-lg shadow-primary/20">
                        Join The Movement
                      </Button>
                    </Link>
                    <Link to="/jobs">
                      <Button size="sm" variant="outline" className="font-medium px-6 rounded-full">
                        Explore Jobs
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      
      {/* Dashboard CTA for signed-in users on profile pages */}
      {isProfilePage && isSignedIn && !isDashboardPage && !isMobile && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button 
            size="lg" 
            className="shadow-lg flex items-center gap-2" 
            onClick={goToDashboard}
          >
            <Sparkles className="h-4 w-4 text-yellow-300" />
            {getDashboardButtonText()}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
      
      {/* Dashboard CTA for signed-in users on home page */}
      {isHomePage && isSignedIn && !isDashboardPage && !isMobile && (
        <AnimatePresence>
          {showDashboardCta && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed top-24 right-6 z-40"
            >
              <div className="bg-white/90 backdrop-blur-md shadow-lg p-4 rounded-lg border border-primary/20">
                <h4 className="font-medium mb-2">Welcome back!</h4>
                <p className="text-sm text-gray-600 mb-3">Ready to continue where you left off?</p>
                <Button 
                  size="sm" 
                  className="w-full flex items-center justify-center gap-2" 
                  onClick={goToDashboard}
                >
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                  {getDashboardButtonText()}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      
      {/* Mobile App Bottom Navigation Bar - Fixed with improved animation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-lg border-t border-gray-200 z-50 flex justify-around items-center">
          <Link to="/" className="flex flex-col items-center w-1/4 py-1">
            <Home className={`h-6 w-6 ${isHomePage ? 'text-primary' : 'text-gray-500'}`} />
            <span className="text-xs mt-1">{isHomePage ? (
              <motion.span 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", stiffness: 300 }}
                className="text-primary font-medium"
              >
                Home
              </motion.span>
            ) : 'Home'}</span>
          </Link>
          <Link to="/jobs" className="flex flex-col items-center w-1/4 py-1">
            <Search className={`h-6 w-6 ${location.pathname === '/jobs' ? 'text-primary' : 'text-gray-500'}`} />
            <span className="text-xs mt-1">{location.pathname === '/jobs' ? (
              <motion.span 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", stiffness: 300 }}
                className="text-primary font-medium"
              >
                Search
              </motion.span>
            ) : 'Search'}</span>
          </Link>
          <Link to="/notifications" className="flex flex-col items-center w-1/4 py-1">
            <Bell className={`h-6 w-6 ${location.pathname === '/notifications' ? 'text-primary' : 'text-gray-500'}`} />
            <span className="text-xs mt-1">{location.pathname === '/notifications' ? (
              <motion.span 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", stiffness: 300 }}
                className="text-primary font-medium"
              >
                Alerts
              </motion.span>
            ) : 'Alerts'}</span>
          </Link>
          <Link to={isSignedIn ? "/profile" : "/auth/signin"} className="flex flex-col items-center w-1/4 py-1">
            <User className={`h-6 w-6 ${location.pathname.includes('/profile') ? 'text-primary' : 'text-gray-500'}`} />
            <span className="text-xs mt-1">{location.pathname.includes('/profile') ? (
              <motion.span 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", stiffness: 300 }}
                className="text-primary font-medium"
              >
                Profile
              </motion.span>
            ) : 'Profile'}</span>
          </Link>
        </div>
      )}
      
      {/* Add padding at bottom for mobile to prevent content from being hidden behind the navigation bar */}
      {isMobile && <div className="h-16"></div>}
    </div>
  );
};

export default Layout;
