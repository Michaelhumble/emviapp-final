
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SalonDashboard = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Salon Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome to your salon dashboard.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonDashboard;
