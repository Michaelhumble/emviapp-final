
import { PropsWithChildren } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface RoleDashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const RoleDashboardLayout = ({ children, className = "" }: RoleDashboardLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-white ${className}`}>
      {/* Main Dashboard Container */}
      <div className={`${isMobile ? 'px-4 py-6' : 'px-6 py-8'} max-w-7xl mx-auto space-y-8`}>
        
        {/* Header Section - Greeting & Welcome */}
        <section className="dashboard-header">
          <div className="space-y-2">
            {/* Greeting will be rendered here by child components */}
          </div>
        </section>

        {/* FOMO Feature Gallery Section */}
        <section className="fomo-features-section">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Exciting Features Coming Soon
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* FOMO feature cards will be added here */}
              </div>
            </div>
          </div>
        </section>

        {/* Live Core Widgets Section */}
        <section className="core-widgets-section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Bookings & Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bookings-widget">
                  {/* Bookings content will be rendered here */}
                </div>
                <div className="stats-widget">
                  {/* Stats content will be rendered here */}
                </div>
              </div>

              {/* Team & Performance Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="team-widget">
                  {/* Team management content will be rendered here */}
                </div>
                <div className="performance-widget">
                  {/* Performance metrics will be rendered here */}
                </div>
              </div>

            </div>

            {/* Sidebar Area */}
            <div className="sidebar-area space-y-6">
              
              {/* Messages Widget */}
              <div className="messages-widget bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Messages</h4>
                {/* Messages content will be rendered here */}
              </div>

              {/* Quick Actions Widget */}
              <div className="quick-actions-widget bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                {/* Quick actions will be rendered here */}
              </div>

            </div>
          </div>
        </section>

        {/* Children Content - Existing Dashboard Components */}
        <section className="existing-content">
          {children}
        </section>

      </div>
    </div>
  );
};

export default RoleDashboardLayout;
