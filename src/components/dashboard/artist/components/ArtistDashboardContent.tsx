
import { useState, useEffect } from "react";
import OverviewTab from "./tabs/OverviewTab";
import BookingsTab from "./tabs/BookingsTab";
import PortfolioTab from "./tabs/PortfolioTab";
import MessagesTab from "./tabs/MessagesTab";
import ReferralsTab from "./tabs/ReferralsTab";
import CalendarTab from "./tabs/CalendarTab";
import ServicesTab from "./tabs/ServicesTab";

// Define the tabs with their names and visibility
const tabs = [
  { id: "Overview", label: "Overview", visible: true },
  { id: "Bookings", label: "Bookings", visible: true },
  { id: "Portfolio", label: "Portfolio", visible: true },
  { id: "Messages", label: "Messages", visible: true },
  { id: "Referrals", label: "Referrals", visible: true },
  { id: "Calendar", label: "Calendar", visible: true },
  { id: "Services", label: "Services", visible: true }
];

// Get only visible tabs
const visibleTabs = tabs.filter(tab => tab.visible).map(tab => tab.id);

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
      <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 border-b border-gray-200 mb-6 no-scrollbar">
        {tabs.filter(tab => tab.visible).map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`pb-2 border-b-2 transition-all whitespace-nowrap px-3 text-sm sm:text-base ${
              activeTab === tab.id
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-gray-500 hover:text-primary hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-2">
        {activeTab === "Overview" && <OverviewTab />}
        {activeTab === "Bookings" && <BookingsTab />}
        {activeTab === "Portfolio" && <PortfolioTab />}
        {activeTab === "Messages" && <MessagesTab />}
        {activeTab === "Referrals" && <ReferralsTab />}
        {activeTab === "Calendar" && <CalendarTab />}
        {activeTab === "Services" && <ServicesTab />}
      </div>
    </div>
  );
}
