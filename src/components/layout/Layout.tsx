
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavbar = false }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className={`flex-grow ${!hideNavbar ? 'pt-16' : ''} ${isMobile ? 'pb-16' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
