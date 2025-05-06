
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Jobs = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Beauty Industry Jobs</h1>
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No job listings available at the moment. Check back soon for opportunities!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
