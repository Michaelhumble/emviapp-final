import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import OverviewTab from "./tabs/OverviewTab";
import BookingsTab from "./tabs/BookingsTab";
import PortfolioTab from "./tabs/PortfolioTab";
import MessagesTab from "./tabs/MessagesTab";
import ReferralsTab from "./tabs/ReferralsTab";
import ClientsTab from "./tabs/ClientsTab";
import QuickActions from "./QuickActions";
import EarningsTabContent from "./tabs/EarningsTabContent";
import PortfolioShowcase from "./tabs/PortfolioShowcase";

const tabs = [
  { id: "Overview", label: "Overview", visible: true },
  { id: "Bookings", label: "Bookings", visible: true },
  { id: "Portfolio", label: "Portfolio", visible: true },
  { id: "Clients", label: "Clients", visible: true },
  { id: "Messages", label: "Messages", visible: true },
  { id: "Referrals", label: "Referrals", visible: true },
  { id: "Calendar", label: "Calendar", visible: false },
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
          <>
            <OverviewTab />
            <div className="mt-8">
              <PortfolioShowcase />
            </div>
          </>
        )}
        {activeTab === "Bookings" && <BookingsTab />}
        {activeTab === "Portfolio" && <PortfolioTab />}
        {activeTab === "Clients" && <ClientsTab />}
        {activeTab === "Messages" && <MessagesTab />}
        {activeTab === "Referrals" && <ReferralsTab />}
        {activeTab === "Earnings" && <EarningsTabContent />}
      </div>
    </div>
  );
}
