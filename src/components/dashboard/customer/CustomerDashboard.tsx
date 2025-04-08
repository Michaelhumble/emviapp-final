
import React from "react";
import CustomerDashboardHeader from "./CustomerDashboardHeader";
import CustomerProfileSection from "./CustomerProfileSection"; 
import CustomerBookingsSection from "./bookings/CustomerBookingsSection";
import CustomerMetricsSection from "./CustomerMetricsSection";
import CustomerReferralCenter from "./CustomerReferralCenter";
import CustomerDashboardWidgets from "./CustomerDashboardWidgets";
import CustomerWelcomeBanner from "./CustomerWelcomeBanner";
import InviteSalonSection from "./InviteSalonSection";

const CustomerDashboard = () => {
  return (
    <div className="space-y-6">
      <CustomerWelcomeBanner />
      <CustomerDashboardHeader />
      <CustomerDashboardWidgets />
      <CustomerBookingsSection />
      <CustomerProfileSection />
      <CustomerMetricsSection />
      <CustomerReferralCenter />
      <InviteSalonSection />
    </div>
  );
};

export default CustomerDashboard;
