
import React from "react";

interface RoleDashboardLayoutProps {
  children?: React.ReactNode;
}

const RoleDashboardLayout: React.FC<RoleDashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-4">Billion-Dollar Dashboard</h1>
            <p className="text-xl opacity-90">Transform your salon into an empire</p>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Revenue Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Monthly Revenue</h3>
                <p className="text-3xl font-bold text-green-600">$127,500</p>
                <p className="text-sm text-green-600 mt-1">↗ +23% from last month</p>
              </div>

              {/* Clients Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Active Clients</h3>
                <p className="text-3xl font-bold text-blue-600">2,847</p>
                <p className="text-sm text-blue-600 mt-1">↗ +156 new this month</p>
              </div>

              {/* Bookings Card */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Bookings Today</h3>
                <p className="text-3xl font-bold text-purple-600">47</p>
                <p className="text-sm text-purple-600 mt-1">95% capacity utilization</p>
              </div>
            </div>

            {/* Growth Insights */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-amber-800 mb-4">🚀 Growth Opportunities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-amber-700">Revenue Optimization</h3>
                  <ul className="space-y-2 text-sm text-amber-600">
                    <li>• Introduce premium service packages (+$15k/month potential)</li>
                    <li>• Implement dynamic pricing for peak hours (+$8k/month)</li>
                    <li>• Launch membership program (+$12k/month recurring)</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-amber-700">Expansion Strategy</h3>
                  <ul className="space-y-2 text-sm text-amber-600">
                    <li>• Add 2 more stations (2x capacity)</li>
                    <li>• Launch mobile beauty service</li>
                    <li>• Partner with luxury hotels</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
                Add Staff
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg">
                Manage Services
              </button>
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg">
                View Analytics
              </button>
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg">
                Growth Plan
              </button>
            </div>

            {children && (
              <div className="mt-8">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleDashboardLayout;
