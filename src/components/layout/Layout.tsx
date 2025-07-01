
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideFooter = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      {!hideFooter && (
        <div className="hidden lg:block">
          <Footer />
        </div>
      )}
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
