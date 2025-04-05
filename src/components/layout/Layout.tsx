
import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
}

const Layout = ({ children, hideNavbar = false }: LayoutProps) => {
  const location = useLocation();
  const [showStickyCta, setShowStickyCta] = useState(false);
  const isAuthPage = location.pathname === "/auth/signin" || location.pathname === "/auth/signup" ||
    location.pathname === "/sign-in" || location.pathname === "/sign-up";
  const isHomePage = location.pathname === "/";

  // Control visibility of sticky CTA based on scroll position
  useEffect(() => {
    if (!isHomePage) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show CTA after scrolling 800px
      setShowStickyCta(scrollY > 800);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && !hideNavbar && <Navbar />}
      <main className={`flex-grow ${!isAuthPage && !hideNavbar ? "pt-16" : ""}`}>
        {children}
      </main>
      <Footer />
      
      {/* Sticky CTA for home page */}
      {isHomePage && (
        <AnimatePresence>
          {showStickyCta && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="flex gap-4 bg-white/80 backdrop-blur-md shadow-xl p-3 rounded-full border border-gray-100">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Layout;
