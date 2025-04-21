
import React from 'react';
import Navbar from './Navbar';
// Swap to new nav bar:
import SuperMobileBottomNavBar from './SuperMobileBottomNavBar';

interface LayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, hideNavbar = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className={`flex-grow ${!hideNavbar ? 'pt-16' : ''}`}>
        {children}
      </main>
      <SuperMobileBottomNavBar />
    </div>
  );
};

export default Layout;
