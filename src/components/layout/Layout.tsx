
// CLEAN STATE: No footers in the app until universal footer is approved and built.

import React, { ReactNode } from 'react';
import Navbar from './Navbar';

import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from 'react-router-dom';
import UnifiedMobileNavigation from '@/components/layout/UnifiedMobileNavigation';

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
    <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden">
      {!hideNavbar && <Navbar />}
      
      <main className={`flex-grow w-full max-w-full ${!hideNavbar ? 'pt-16' : ''} ${showMobileNav ? 'pb-16' : ''}`}>
        {children}
      </main>
      {/* NO FOOTERS - CLEAN STATE MAINTAINED */}
      
      {/* Show the unified bottom navbar on all pages */}
      {showMobileNav && <UnifiedMobileNavigation />}
    </div>
  );
};

export default Layout;
