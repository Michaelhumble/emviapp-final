
import { useState, useEffect } from "react";
import OverviewTab from "./tabs/OverviewTab";
import BookingsTab from "./tabs/BookingsTab";
import PortfolioTab from "./tabs/PortfolioTab";
import MessagesTab from "./tabs/MessagesTab";
import ReferralsTab from "./tabs/ReferralsTab";

// Define only the visible tabs
const visibleTabs = ["Overview", "Bookings", "Portfolio", "Messages", "Referrals"];

export default function ArtistDashboardContent() {
  const [activeTab, setActiveTab] = useState("Overview");

  // Load last active tab from localStorage if it's one of the visible tabs
  useEffect(() => {
    const savedTab = localStorage.getItem('artist_dashboard_tab');
    if (savedTab && visibleTabs.includes(savedTab)) {
      setActiveTab(savedTab);
    }
  }, []);

  // Save active tab to localStorage when it changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem('artist_dashboard_tab', tab);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="flex space-x-4 overflow-x-auto pb-2 border-b border-gray-200 mb-6">
        {visibleTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`pb-2 border-b-2 transition-all whitespace-nowrap px-2 ${
              activeTab === tab
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-gray-500 hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "Overview" && <OverviewTab />}
        {activeTab === "Bookings" && <BookingsTab />}
        {activeTab === "Portfolio" && <PortfolioTab />}
        {activeTab === "Messages" && <MessagesTab />}
        {activeTab === "Referrals" && <ReferralsTab />}
      </div>
    </div>
  );
}
