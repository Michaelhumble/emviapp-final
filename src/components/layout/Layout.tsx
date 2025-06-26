
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
      
      {/* 
      ⚠️  GLOBAL FOOTER CONTROL - CRITICAL LOCKDOWN ⚠️ 
      
      This is the ONLY location where <Footer /> should be rendered in the entire app.
      
      STRICT RULES:
      ✅ Only Layout.tsx imports and renders <Footer />
      ❌ NO other page, component, or layout should render <Footer />
      ❌ NO duplicate Layout wrappers should exist
      
      If you see duplicate footers in DEVELOPMENT:
      - This is React StrictMode double-rendering (normal behavior)
      - Check main.tsx for the detailed explanation
      - Production will have exactly ONE footer
      
      If you see duplicate footers in PRODUCTION:
      - Search codebase for unauthorized <Footer /> imports
      - Check for multiple <Layout> wrappers
      - Verify no CSS is visually duplicating the footer
      */}
      {!hideFooter && <Footer />}
      
      {/* Show the bottom navbar on all pages */}
      {showMobileNav && <MobileBottomNavBar />}
    </div>
  );
};

export default Layout;
