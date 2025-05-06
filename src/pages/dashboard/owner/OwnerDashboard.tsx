
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OwnerDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Salon Owner Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Salon Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No performance data available.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Add team members to your salon.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Booking Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No bookings available.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default OwnerDashboard;
