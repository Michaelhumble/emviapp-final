// CLEAN STATE: Universal Footer now integrated - single Footer component for all pages.

import React, { ReactNode, lazy, Suspense } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FallbackBoundary from '@/components/error-handling/FallbackBoundary';
import { PerformanceProvider } from '@/components/performance/PerformanceProvider';


import ChatSystem from '@/components/chat/ChatSystem';
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from 'react-router-dom';
import UnifiedMobileNavigation from '@/components/layout/UnifiedMobileNavigation';

interface LayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  hideMobileNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavbar = false, hideFooter = false, hideMobileNav = false }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Show mobile bottom navbar only if not explicitly hidden
  const showMobileNav = isMobile && !hideMobileNav;

  return (
    <PerformanceProvider>
      <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden">
        {!hideNavbar && <Navbar />}
        
        <main className={`flex-grow w-full max-w-full ${!hideNavbar ? 'pt-16' : ''} ${showMobileNav ? 'pb-16' : ''}`}>
          {children}
        </main>
        
        {/* Universal Footer - Only Footer used on EmviApp */}
        {!hideFooter && <Footer />}
        
        {/* Show the unified bottom navbar on all pages */}
        {showMobileNav && <UnifiedMobileNavigation />}
        
        <ChatSystem />
      </div>
    </PerformanceProvider>
  );
};

export default Layout;