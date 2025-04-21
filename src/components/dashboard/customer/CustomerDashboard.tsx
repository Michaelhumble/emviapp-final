
import React from "react";
import CustomerDashboardHeader from "./CustomerDashboardHeader";
import CustomerBookingHistory from "./CustomerBookingHistory";
import CustomerWallet from "../../customer/CustomerWallet";
import CustomerFavoritesSection from "./favorites/CustomerFavoritesSection";

const CustomerDashboard: React.FC = () => {
  return (
    <div className="container max-w-6xl mx-auto">
      <CustomerDashboardHeader />
      <CustomerBookingHistory />
      <CustomerWallet />
      <CustomerFavoritesSection />
    </div>
  );
};

export default CustomerDashboard;
