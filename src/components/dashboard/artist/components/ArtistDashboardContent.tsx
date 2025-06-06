
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OverviewTab from "./tabs/OverviewTab";
import BookingsTab from "./tabs/BookingsTab";
import PortfolioTab from "./tabs/PortfolioTab";
import MessagesTab from "./tabs/MessagesTab";
import ReferralsTab from "./tabs/ReferralsTab";
import ClientsTab from "./tabs/ClientsTab";
import QuickActions from "./QuickActions";
import EarningsTabContent from "./tabs/EarningsTabContent";
import { useArtistDashboardData } from "../hooks/useArtistDashboardData";

const tabs = [
  { id: "Overview", label: "Overview", visible: true, icon: "📊" },
  { id: "Bookings", label: "Bookings", visible: true, icon: "📅" },
  { id: "Portfolio", label: "Portfolio", visible: true, icon: "🎨" },
  { id: "Clients", label: "Clients", visible: true, icon: "👥" },
  { id: "Messages", label: "Messages", visible: true, icon: "💬" },
  { id: "Referrals", label: "Referrals", visible: true, icon: "🎯" },
  { id: "Earnings", label: "Earnings", visible: true, icon: "💰" },
];

const visibleTabs = tabs.filter(tab => tab.visible).map(tab => tab.id);

export default function ArtistDashboardContent() {
  const [activeTab, setActiveTab] = useState("Overview");

  const {
    stats,
    isLoadingStats,
    recentBookings,
    isLoadingBookings
  } = useArtistDashboardData(activeTab);

  useEffect(() => {
    const savedTab = localStorage.getItem('artist_dashboard_tab');
    if (savedTab && visibleTabs.includes(savedTab)) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem('artist_dashboard_tab', tab);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Premium Tab Navigation */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
        <div className="relative">
          {/* Glass Tab Container */}
          <div className="backdrop-blur-md bg-white/70 rounded-2xl border border-white/20 shadow-xl p-2">
            <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
              {tabs.filter(tab => tab.visible).map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                    activeTab === tab.id
                      ? "text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active Tab Background */}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Tab Content */}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-sm">{tab.icon}</span>
                    {tab.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        
        <QuickActions />
      </div>

      {/* Tab Content with Smooth Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
