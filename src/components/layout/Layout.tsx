
// WARNING: AppFooter is the only footer in the app. Never duplicate or create new footers.
// Only Layout.tsx is allowed to import and render AppFooter.

import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import AppFooter from './AppFooter';

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
      
      
      {/* 🏆 UNIVERSAL APPFOOTER - BILLION-DOLLAR STANDARD 🏆
          
          This is the ONLY location where AppFooter is rendered.
          ✅ Premium design with responsive layout
          ✅ All marketplace, company, and legal links
          ✅ Emotional branding with "Inspired by Sunshine ☀️"
          ✅ Locked down - no duplicates allowed anywhere
      */}
      {!hideFooter && <AppFooter />}
      
      {/* Show the bottom navbar on all pages */}
      {showMobileNav && <MobileBottomNavBar />}
    </div>
  );
};

export default Layout;
