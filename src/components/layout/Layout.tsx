
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import SuperMobileBottomNavBar from './SuperMobileBottomNavBar';
import Footer from './Footer';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  hideMobileNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  hideNavbar = false,
  hideFooter = false,
  hideMobileNav = false
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className={`flex-grow ${!hideNavbar ? 'pt-20' : ''}`}>
        {children}
      </main>
      {!hideFooter && <Footer />}
      {!hideMobileNav && <SuperMobileBottomNavBar />}
      
      {/* Additional padding at the bottom on mobile screens to account for navigation bar */}
      {isMobile && !hideMobileNav && <div className="h-16"></div>}
    </div>
  );
};

export default Layout;
