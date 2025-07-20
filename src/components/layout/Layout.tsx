
// DO NOT DUPLICATE. AppFooter is the universal footer — import ONLY in Layout.tsx!

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
      
      {/* 
      ⚠️  UNIVERSAL APPFOOTER CONTROL - CRITICAL LOCKDOWN ⚠️ 
      
      This is the ONLY location where <AppFooter /> should be rendered in the entire app.
      
      STRICT RULES:
      ✅ Only Layout.tsx imports and renders <AppFooter />
      ❌ NO other page, component, or layout should render <AppFooter />
      ❌ NO duplicate Layout wrappers should exist
      ❌ NO custom footers on individual pages
      
      If you see duplicate footers in DEVELOPMENT:
      - This is React StrictMode double-rendering (normal behavior)
      - Check main.tsx for the detailed explanation
      - Production will have exactly ONE footer
      
      If you see duplicate footers in PRODUCTION:
      - Search codebase for unauthorized <AppFooter /> imports
      - Check for multiple <Layout> wrappers
      - Verify no CSS is visually duplicating the footer
      */}
      {!hideFooter && <AppFooter />}
      
      {/* Show the bottom navbar on all pages */}
      {showMobileNav && <MobileBottomNavBar />}
    </div>
  );
};

export default Layout;
