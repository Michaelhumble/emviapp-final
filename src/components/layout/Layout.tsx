
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavbar = false }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Check if we're on a job page
  const isJobsPage = location.pathname === '/jobs' || location.pathname.startsWith('/jobs/') || location.pathname === '/post-job';

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className={`flex-grow ${!hideNavbar ? 'pt-16' : ''} ${isMobile && isJobsPage ? 'pb-16' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
