
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import SuperMobileBottomNavBar from './SuperMobileBottomNavBar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavbar = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className={`flex-grow ${!hideNavbar ? 'pt-16' : ''}`}>
        {children}
      </main>
      <Footer />
      <SuperMobileBottomNavBar />
    </div>
  );
};

export default Layout;
