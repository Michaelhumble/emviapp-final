
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from 'react-router-dom';
import MobileJobsNavBar from '@/components/jobs/MobileJobsNavBar';
import MobileBottomNavBar from '@/components/layout/MobileBottomNavBar';
import MobileMenu from '@/components/layout/MobileMenu';

interface LayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavbar = false }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Check if we're on a job page
  const isJobsPage = location.pathname === '/jobs' || location.pathname.startsWith('/jobs/');
  
  // Don't show mobile bottom navbar on post-job page as it has its own navigation
  const isPostJobPage = location.pathname === '/post-job';
  const showMobileNav = isMobile && !isPostJobPage;

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            {/* Mobile menu hamburger is always present */}
            <div className="md:hidden flex items-center">
              <MobileMenu />
            </div>
            
            {/* Regular navbar when not hidden */}
            <Navbar />
          </div>
        </header>
      )}
      
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
