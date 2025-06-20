
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from 'react-router-dom';
import MobileBottomNavBar from '@/components/layout/MobileBottomNavBar';

interface LayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean; // Add option to hide footer
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavbar = false, hideFooter = false }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Always show mobile bottom navbar on all pages 
  const showMobileNav = isMobile;

  return (
    <div className="min-h-screen flex flex-col">
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '50px',
        background: '#ff0033',
        color: '#fff',
        fontSize: '2rem',
        zIndex: 99999,
        textAlign: 'center',
        lineHeight: '50px'
      }}>
        🚨 THIS IS THE FILE YOU ARE EDITING: src/components/layout/Layout.tsx 🚨
      </div>
      {!hideNavbar && <Navbar />}
      
      <main className={`flex-grow ${!hideNavbar ? 'pt-16' : ''} ${showMobileNav ? 'pb-16' : ''}`}>
        {children}
      </main>
      
      {/* Only render footer if not explicitly hidden */}
      {!hideFooter && <Footer />}
      
      {/* Show the bottom navbar on all pages */}
      {showMobileNav && <MobileBottomNavBar />}
    </div>
  );
};

export default Layout;
