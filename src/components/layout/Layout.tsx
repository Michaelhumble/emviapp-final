
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { ChatSystem } from '../chat/ChatSystem';

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
  hideHeader?: boolean;
  hideNavbar?: boolean; // Added this prop to support ErrorLayout
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  hideFooter = false, 
  hideHeader = false,
  hideNavbar = false // Default value
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeader && <Header />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {!hideFooter && <Footer />}
      
      {/* AI Booking Assistant */}
      <ChatSystem />
    </div>
  );
};

export default Layout;
