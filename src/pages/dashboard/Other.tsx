
import React from 'react';
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OtherDashboardPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Other Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dashboard content for other role users.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OtherDashboardPage;
