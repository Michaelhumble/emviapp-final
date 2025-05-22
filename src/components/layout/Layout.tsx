
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from 'react-router-dom';
import MobileJobsNavBar from '@/components/jobs/MobileJobsNavBar';
import MobileBottomNavBar from '@/components/layout/MobileBottomNavBar';

interface LayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavbar = false }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Check if we're on a job page
  const isJobsPage = location.pathname === '/jobs' || location.pathname.startsWith('/jobs/');
  
  // Don't show mobile navbar on post-job page as it has its own navigation
  const isPostJobPage = location.pathname === '/post-job';
  const showMobileNav = isMobile && !isPostJobPage;

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className={`flex-grow ${!hideNavbar ? 'pt-16' : ''} ${showMobileNav ? 'pb-16' : ''}`}>
        {children}
      </main>
      <Footer />
      
      {/* Show the appropriate mobile navigation based on the page */}
      {isJobsPage && <MobileJobsNavBar />}
      {!isJobsPage && showMobileNav && <MobileBottomNavBar />}
    </div>
  );
};

export default Layout;
