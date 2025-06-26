
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from 'react-router-dom';
import MobileBottomNavBar from '@/components/layout/MobileBottomNavBar';

interface LayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavbar = false, hideFooter = false }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Always show mobile bottom navbar on all pages 
  const showMobileNav = isMobile;

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      
      <main className={`flex-grow ${!hideNavbar ? 'pt-16' : ''} ${showMobileNav ? 'pb-16' : ''}`}>
        {children}
      </main>
      
      {/* Global Footer - renders on all pages unless explicitly hidden */}
      {!hideFooter && <Footer />}
      
      {/* Show the bottom navbar on all pages */}
      {showMobileNav && <MobileBottomNavBar />}
    </div>
  );
};

export default Layout;
