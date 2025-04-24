
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OverviewTab from "./components/tabs/OverviewTab";
import BookingsTab from "./components/tabs/BookingsTab";
import PortfolioTab from "./components/tabs/PortfolioTab";
import MessagesTab from "./components/tabs/MessagesTab";
import ReferralsTab from "./components/tabs/ReferralsTab";
import ClientsTab from "./components/tabs/ClientsTab";
import QuickActions from "./components/QuickActions";
import EarningsTabContent from "./components/tabs/EarningsTabContent";
import { motion } from "framer-motion";
import { useArtistDashboardData } from "./hooks/useArtistDashboardData";

const tabs = [
  { id: "Overview", label: "Overview", visible: true },
  { id: "Bookings", label: "Bookings", visible: true },
  { id: "Portfolio", label: "Portfolio", visible: true },
  { id: "Clients", label: "Clients", visible: true },
  { id: "Messages", label: "Messages", visible: true },
  { id: "Referrals", label: "Referrals", visible: true },
  { id: "Earnings", label: "Earnings", visible: true },
  { id: "Calendar", label: "Calendar", visible: true },
  { id: "Services", label: "Services", visible: false }
];

const visibleTabs = tabs.filter(tab => tab.visible).map(tab => tab.id);

const tabVariants = {
  inactive: { opacity: 0.7, y: 0 },
  active: { opacity: 1, y: 0 },
  hover: { opacity: 0.9, y: 0 }
};

export default function ArtistDashboardContent() {
  const [activeTab, setActiveTab] = useState("Overview");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Add useArtistDashboardData hook to get required props for OverviewTab
  const {
    stats,
    isLoadingStats,
    recentBookings,
    isLoadingBookings,
    error: dashboardError
  } = useArtistDashboardData(activeTab);

  useEffect(() => {
    // Set error state if dashboard data fails to load
    if (dashboardError) {
      setLoadError("Failed to load dashboard data. Please try again.");
      console.error("Dashboard data error:", dashboardError);
    } else {
      setLoadError(null);
    }
  }, [dashboardError]);

  // Set loading timeout to prevent long loading screens
  useEffect(() => {
    const loading = isLoadingStats || isLoadingBookings;
    setIsLoading(loading);
    
    if (loading) {
      // Auto-clear loading state after timeout
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 10000); // 10 seconds max loading time
      
      return () => clearTimeout(timeoutId);
    }
  }, [isLoadingStats, isLoadingBookings]);

  useEffect(() => {
    const savedTab = localStorage.getItem('artist_dashboard_tab');
    if (savedTab && visibleTabs.includes(savedTab)) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem('artist_dashboard_tab', tab);
    
    // Navigate to full calendar page when calendar tab is clicked
    if (tab === "Calendar") {
      navigate("/dashboard/artist/booking-calendar");
    }
  };

  // Show error message if loading failed
  if (loadError) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-6">
        <div className="bg-red-50 border border-red-100 rounded-md p-6 text-center">
          <h3 className="text-lg font-medium text-red-800 mb-2">Dashboard Error</h3>
          <p className="text-sm text-red-600 mb-4">{loadError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Reload Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 border-b border-gray-200 w-full sm:w-auto">
          {tabs.filter(tab => tab.visible).map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              id={tab.id}
              className={`pb-2 border-b-2 transition-all whitespace-nowrap px-3 text-sm sm:text-base ${
                activeTab === tab.id
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-gray-500 hover:text-primary hover:border-gray-300"
              }`}
              variants={tabVariants}
              initial="inactive"
              animate={activeTab === tab.id ? "active" : "inactive"}
              whileHover="hover"
              transition={{ duration: 0.2 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
        <QuickActions />
      </div>

      <div className="py-2">
        {activeTab === "Overview" && (
          <OverviewTab 
            stats={stats}
            isLoadingStats={isLoadingStats}
            bookings={recentBookings}
            isLoadingBookings={isLoadingBookings}
          />
        )}
        {activeTab === "Bookings" && <BookingsTab />}
        {activeTab === "Portfolio" && <PortfolioTab />}
        {activeTab === "Clients" && <ClientsTab />}
        {activeTab === "Messages" && <MessagesTab />}
        {activeTab === "Referrals" && <ReferralsTab />}
        {activeTab === "Earnings" && <EarningsTabContent />}
        {/* We don't render CalendarTab directly anymore as we navigate to the full page */}
        {activeTab === "Calendar" && <div className="text-center py-10 text-gray-500">Navigating to calendar view...</div>}
      </div>
    </div>
  );
}
