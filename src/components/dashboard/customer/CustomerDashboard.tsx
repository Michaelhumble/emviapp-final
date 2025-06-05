
import React from 'react';
import { Container } from "@/components/ui/container";
import DashboardGreeting from "@/components/dashboard/common/DashboardGreeting";

const CustomerDashboard = () => {
  return (
    <Container className="py-8 max-w-4xl mx-auto">
      <DashboardGreeting />
      
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to Your Dashboard</h2>
          <p className="text-gray-600">
            Your personalized customer dashboard is ready. You can manage your beauty journey and preferences here.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default CustomerDashboard;
