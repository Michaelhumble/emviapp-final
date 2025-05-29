
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import DashboardRedirector from '@/components/dashboard/DashboardRedirector';

const Dashboard = () => {
  const [redirectError, setRedirectError] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(true);

  return (
    <Layout>
      <Helmet>
        <title>Dashboard | EmviApp</title>
        <meta name="description" content="Your EmviApp dashboard" />
      </Helmet>
      
      {redirectError && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{redirectError}</p>
          </div>
        </div>
      )}
      
      <DashboardRedirector 
        setRedirectError={setRedirectError}
        setLocalLoading={setLocalLoading}
      />
    </Layout>
  );
};

export default Dashboard;
